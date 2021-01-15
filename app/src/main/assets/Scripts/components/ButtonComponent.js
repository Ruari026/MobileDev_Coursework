class ButtonComponent extends Component
{
    componentName = "ButtonComponent";

    targetRenderer = null;
    targetAudio = null;

    buttonDisabled = false;
    buttonPressed = false;
    isScreenSpace = true;

    lastXPos = 0;
    lastYPos = 0;

    buttonBehaviour = null;


    /*
    ====================================================================================================
    Component Inherited Methods
    ====================================================================================================
    */
    Update()
    {
        if (this.buttonPressed && !this.buttonDisabled)
        {
            this.buttonBehaviour.OnHold(this.lastXPos, this.lastYPos);
        }
    }

    Input(event)
    {
        // If button is disabled then there is no point checking input
        if (this.buttonDisabled)
        {
            return;
        }

        // Otherwise check if input is relevant to buttons
        // Checks for both mobile input (screen touches) & web input (mouse clicks)
        if (event.type == 'touchstart' || event.type == 'mousedown')
        {
            // Storing input position (based on platform)
            if (platformMobile)
            {
                this.lastXPos = event.touches[0].pageX;
                this.lastYPos = event.touches[0].pageY;
            }
            else
            {
                this.lastXPos = event.clientX;
                this.lastYPos = event.clientY;
            }

            // Checking if the mouse is in the rect of the button
            if (this.isScreenSpace ? this.IsWithinRectScreen(this.lastXPos, this.lastYPos) : this.IsWithinRectWorld(this.lastXPos, this.lastYPos))
            {
                //console.info('Button Pressed')
                this.buttonPressed = true;

                // Updating Button Renderer
                if (this.targetRenderer != null)
                {
                    this.targetRenderer.spriteOffsetX = this.targetRenderer.spriteWidth;
                }
            }
        }

        if (this.buttonPressed)
        {
            if (event.type == 'touchmove' || event.type == 'mousemove')
            {
                // Checking if platform is mobile or web
                if (platformMobile)
                {
                    this.lastXPos = event.touches[0].pageX;
                    this.lastYPos = event.touches[0].pageY;
                }
                else
                {
                    this.lastXPos = event.clientX;
                    this.lastYPos = event.clientY;
                }
            }
        }

        if (event.type == 'touchend' || event.type == 'mouseup')
        {
            if (this.buttonBehaviour != null && this.buttonPressed)
            {
                if (this.targetAudio != null)
                {
                    this.targetAudio.PlaySound();
                }

                this.buttonBehaviour.OnClick(this.lastXPos, this.lastYPos);
            }

            // If the button was pressed return to normal state
            // console.info('Button Released')
            this.buttonPressed = false;

            // Updating Renderer
            if (this.targetRenderer != null)
            {
                this.targetRenderer.spriteOffsetX = 0;
            }
        }
    }

    IsWithinRectScreen(inputX, inputY)
    {
        var rectMin = { x : 0, y : 0 };

        rectMin.x = (canvas.width * this.parentGameObject.anchorX);
        rectMin.x += (this.parentGameObject.posX * currentScene.sceneCamera.viewScale);
        rectMin.x -= ((this.parentGameObject.width * currentScene.sceneCamera.viewScale) / 2);

        rectMin.y = (canvas.height * this.parentGameObject.anchorY);
        rectMin.y += (this.parentGameObject.posY * currentScene.sceneCamera.viewScale);
        rectMin.y -= ((this.parentGameObject.height * currentScene.sceneCamera.viewScale) / 2)

        // Checking X Axis
        if((inputX > rectMin.x) && (inputX < rectMin.x + (this.parentGameObject.width * currentScene.sceneCamera.viewScale)))
        {
            // Checking Y Axis
            if((inputY > rectMin.y) && (inputY < rectMin.y + (this.parentGameObject.height * currentScene.sceneCamera.viewScale)))
            {
                //console.info('Within Rect')
                return true;
            }
        }

        // Otherwise input was not within button rect
        //console.info('Outside Rect')
        return false;
    }

    IsWithinRectWorld(inputX, inputY)
    {
        // Gameobject center relative to camera pos
        var gameobjectCenter =
        {
            x : ((this.parentGameObject.GetGlobalPos().x - this.parentGameObject.parentScene.sceneCamera.GetGlobalPos().x) * this.parentGameObject.parentScene.sceneCamera.viewScale),
            y : ((this.parentGameObject.GetGlobalPos().y - this.parentGameObject.parentScene.sceneCamera.GetGlobalPos().y) * this.parentGameObject.parentScene.sceneCamera.viewScale)
        };
        // Adjusting for screen space coordinates
        gameobjectCenter.x += canvasX;
        gameobjectCenter.y += canvasY;

        // Rect in screen space
        var rectMin =
        {
            x : (gameobjectCenter.x - ((this.parentGameObject.width / 2) * this.parentGameObject.parentScene.sceneCamera.viewScale)),
            y : (gameobjectCenter.y - ((this.parentGameObject.height / 2) * this.parentGameObject.parentScene.sceneCamera.viewScale))
        };

        //console.info('Input: ' + inputX + ', ' + inputY);
        //console.info('Gameobject: ' + gameobjectCenter.x + ', ' + gameobjectCenter.y);
        //console.info('Min: ' + rectMin.x + ', ' + rectMin.y);

        // Checking X Axis
        if((inputX > rectMin.x) && (inputX < rectMin.x + (this.parentGameObject.width * this.parentGameObject.parentScene.sceneCamera.viewScale)))
        {
            // Checking Y Axis
            if((inputY > rectMin.y) && (inputY < rectMin.y + (this.parentGameObject.height * this.parentGameObject.parentScene.sceneCamera.viewScale)))
            {
                console.info('Within Rect')
                return true;
            }
        }

        // Otherwise input was not within button rect
        console.info('Outside Rect')
        return false;
    }

    DisableButton(isDisabled)
    {
        if (isDisabled)
        {
            // Prevent input checking
            this.buttonDisabled = isDisabled;

            // Update button image
        }
        else
        {
            // Re-enable input checking
            this.buttonDisabled = isDisabled;

            // Reset button image
        }
    }
}


/*
====================================================================================================
Main Menu Button Behaviours
====================================================================================================
*/
var StartGameButtonEvent =
{
    OnHold : function(inputX, inputY)
    {

    },

    OnClick : function(inputX, inputY)
    {
        console.info("Starting Game");

        ChangeScene("Gameplay");
    }
}

var OpenInstructionsButtonEvent =
{
    OnHold : function(inputX, inputY)
    {

    },

    OnClick : function(inputX, inputY)
    {
        console.info("Opening Instructions");

        // Gets the Main Menu Controller in the scene & opens the instructions UI
        var mainMenuController = currentScene.GetSceneObject("Main Menu Controller").GetComponent("MainMenuManager");
        mainMenuController.OpenInstructions();
    }
}

var CloseInstructionsButtonEvent =
{
    OnHold : function(inputX, inputY)
    {

    },

    OnClick : function(inputX, inputY)
    {
        console.info("Closing Instructions");

        // Gets the Main Menu Controller in the scene & opens the main menu UI
        var mainMenuController = currentScene.GetSceneObject("Main Menu Controller").GetComponent("MainMenuManager");
        mainMenuController.OpenMainMenu();
    }
}


/*
====================================================================================================
Gameplay Scene Button Behaviours
====================================================================================================
*/
var JumpButtonEvent =
{
    sceneController : null,

    OnHold : function(inputX, inputY)
    {
        if (this.sceneController != null)
        {
            //console.info("Frog Charging");
            this.sceneController.GetComponent("GameManager").ChargeCurrentFrog();
        }
    },

    OnClick : function(inputX, inputY)
    {
        if (this.sceneController != null)
        {
            console.info("Frog Jumping");
            this.sceneController.GetComponent("GameManager").JumpCurrentFrog();
        }
        else
        {
            console.error("ERROR: Scene Manager Has Not Been Assigned");
        }
    }
}

var TargetButtonEvent =
{
    targetFrog : null,

    OnHold : function(inputX, inputY)
    {
        //console.info("Changing Target Angle");
        // Input position should be passed though as it's position in worldspace
        this.targetFrog.GetComponent("PlayerController").Aim(inputX, inputY);
    },

    OnClick : function(inputX, inputY)
    {

    }
}

var FireButtonEvent =
{
    sceneController : null,

    OnHold : function(inputX, inputY)
    {
        if (this.sceneController != null)
        {
            this.sceneController.GetComponent("GameManager").ChargeCurrentFrog();
        }
    },

    OnClick : function(inputX, inputY)
    {
        if (this.sceneController != null)
        {
            console.info("Frog Firing");
            this.sceneController.GetComponent("GameManager").FireCurrentFrog();
        }
        else
        {
            console.error("ERROR: Scene Controller Has Not Been Assigned");
        }
    }
}

var WindButtonEvent =
{
    sceneController : null,

    OnHold : function(inputX, inputY)
    {

    },

    OnClick : function(inputX, inputY)
    {
        this.sceneController.GetComponent("GameManager").ChangeWindSpeed();
    }
}


/*
====================================================================================================
Game Over Button Behaviours
====================================================================================================
*/
var ReturnMenuButtonEvent =
{
    OnHold : function(inputX, inputY)
    {

    },

    OnClick : function(inputX, inputY)
    {
        console.info("Returning to Main Menu");

        ChangeScene("MainMenu");
    }
}