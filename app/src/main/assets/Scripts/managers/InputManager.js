var keysUp = [];
var keysDown = [];
var keysHeld = [];

var touchDown = new Event("TouchDown");
var touchUp = new Event("TouchUp");
var touchHeld = false;
var touches = [];


/*
========================================================================================================================================================================================================
Keyboard Input
========================================================================================================================================================================================================
*/


/*
========================================================================================================================================================================================================
Touch/ Mouse Input
========================================================================================================================================================================================================
*/
function GetTouchUp(event)
{
    //console.info("Player has pressed up");
    event.preventDefault();
    canvas.dispatchEvent(touchUp);

    // Resetting other touch data
    touchHeld = false;
    touches = [];

    currentScene.InputScene(event);
}

function GetTouchDown(event)
{
    //console.info("Player has pressed down");
    event.preventDefault();
    canvas.dispatchEvent(touchDown);

    touchHeld = true;

    currentScene.InputScene(event);
}

function GetTouchUpdate(event)
{
    event.preventDefault();
    touches = event.touches;

    currentScene.InputScene(event);
}