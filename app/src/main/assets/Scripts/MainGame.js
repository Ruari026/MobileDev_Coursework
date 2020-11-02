var canvas;
var canvasContext;
var canvasX;
var canvasY;

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

        //canvas.addEventListener('touchstart', touchDown, false);
        //canvas.addEventListener('touchmove', touchXY, false);
        //canvas.addEventListener('touchend', touchUp, false);

        //document.body.addEventListener('touchcancel', touchUp, false);

        ResizeCanvas();
    }

    // Setting up game managers
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

    // Updating Game Engine Info

    // Running Current Scene

    requestAnimationFrame(Run);
}