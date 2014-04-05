$(document).ready(function() {


  $.fn.fullpage({

    continuousVertical: true,

  });

function getScenes(){
  if (scenes == null){
  $.get('./js/scenes.json', function(data){
    scenes = data;
  }).done(function(){
    shuffle(scenes);
    loadYt(scenes[0].url)
  });
}
}

function loadYt(sceneId){

  if (playerBG){
   playerBG.loadVideoById(sceneId);
  } else {    
   playerBG = new YT.Player('bgytContainer', {
      height: '135%',
      width: '135%',
      playerVars: { 'autoplay': 1, 'controls': 1,'autohide':1,'wmode':'opaque', 'volume' : 0},
      videoId: sceneId,
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange,
        }
     });
  }
}

function onPlayerReady(event){
  getScenes();
  if(playerBG){
    if (playerBG.getDuration() < 1){
          skipScene();
     }
  }
}

function onPlayerStateChange(event){
  if (event.data == 0){
    skipScene();
  }
}

function skipScene(){
  staticCover();
  if (currentScenePos < (scenes.length - 1)){
    currentScenePos ++
    loadYt (scenes[currentScenePos].url)
  } else {
    currentScenePos = 0;
    loadYt (scenes[currentScenePos].url)
  }
}

function staticCover(){
  $('#bgytContainer').css({'opacity' : '0'});
  setTimeout(function(){
      $('#bgytContainer').css({'opacity' : '1'});
    },1500);
}




function shuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

});