var scenes;
var videos;
var currentScenePos = 0;
var playerBG;

$(document).keydown(function(e) {
      //Moving the main page with the keyboard arrows if keyboard scrolling is enabled
        switch (e.which) {
          //up
          case 38:
          case 33:
            break;

          //down
          case 40:
          case 34:
            break;

          //left
          case 37:
            skipScene();
            break;

          //right
          case 39:
            skipScene();
            break;

          default:
            return; // exit this handler for other keys
        }
    });

$(document).ready(function(){

  $('#Scene1').css({'opacity' : '0'});
  setTimeout(function(){
      $('#Scene1').css({'opacity' : '1'});
    },3500);

  setTimeout(function(){
    onPlayerReady();
  },2000)


})

// Thanks poolside.fm for the vids!
function getScenes(){
  if (scenes == null){
  $.get('http://poolsideapi2.herokuapp.com/scenes?p=2', function(data){
    scenes = data;
  }).done(function(){
    shuffle(scenes);
    loadYt(scenes[0].url)
  });
}
}

/*YOUTUBE STUFF */
function loadYt(sceneId){

  if (playerBG){
   playerBG.loadVideoById(sceneId);
  } else {    
   playerBG = new YT.Player('Scene1', {
      height: '145%',
      width: '145%',
      playerVars: { 'autoplay': 1, 'controls': 0,'autohide':1, 'volume' : 0},
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
  $('#Scene1').css({'opacity' : '0'});
  setTimeout(function(){
      $('#Scene1').css({'opacity' : '1'});
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