// Platform
var platformMobile = null;

// Game Environment
var canvas;
var canvasContext;
var canvasX;
var canvasY;

// Game Managers
var sceneManager = null;
var soundManager; // Sound Manager set by the android native app code through a javascript interface

// Time Management
var deltaTime = 0;
var maxDeltaTime = 0.02;
var timeScale = 1.0;
var prevTime = 0;

// Other Persistant Game Data
var musicPlaying = false;
var winningPlayer = "Player 1";

window.onload = function()
{
    Init();
    Run();
}


/*
========================================================================================================================================================================================================
Game Setup
========================================================================================================================================================================================================
*/
function Init()
{
    // Checking what platform the game is being run on
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    {
        // true for mobile device
        platformMobile = true;
    }
    else
    {
        // false for not mobile device
        platformMobile = false;
    }


    // Getting the environment to render to
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    canvasX = canvas.width / 2;
    canvasY = canvas.height / 2;

    if (canvas.getContext)
    {
        // Set Event Listeners for Window, Mouse & Touch
        window.addEventListener('resize', ResizeCanvas, false);
        window.addEventListener('orientationchange', ResizeCanvas, false);

        // Listening for touch input
        canvas.addEventListener('touchstart', GetTouchDown, false);
        canvas.addEventListener('touchmove', GetTouchUpdate, false);
        canvas.addEventListener('touchend', GetTouchUp, false);
        document.body.addEventListener('touchcancel', GetTouchUp, false);

        // Listening for mouse input
        canvas.addEventListener('mousedown', GetTouchDown, false);
        canvas.addEventListener('mousemove', GetTouchUpdate, false);
        canvas.addEventListener('mouseup', GetTouchUp, false);
        //document.body.addEventListener('touchcancel', GetTouchUp, false);

        ResizeCanvas();
    }

    // Starting Game Info
    prevTime = Date.now();
    // Ensures that the game starts in the main menu scene
    ChangeScene("MainMenu");
}

function ResizeCanvas()
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvasX = canvas.width / 2;
    canvasY = canvas.height / 2;
}


/*
========================================================================================================================================================================================================
Game Setup
========================================================================================================================================================================================================
*/
function Run()
{
    // Clearing Screen
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    // Calculating the time between frames
    deltaTime = ((Date.now() - this.prevTime) / 1000);
    if (deltaTime > maxDeltaTime)
    {
        deltaTime = maxDeltaTime;
    }
    prevTime = Date.now();
    deltaTime = (deltaTime * timeScale);

    // Running Current Scene
    currentScene.UpdateScene();

    // Looping Game Logic
    requestAnimationFrame(Run);
}