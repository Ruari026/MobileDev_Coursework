class ButtonComponent extends Component
{
    componentName = "ButtonComponent";

    targetRenderer = null;

    buttonPressed = false;
    isScreenSpace = true;

    lastXPos = 0;
    lastYPos = 0;

    buttonBehaviour = null;

    Update()
    {
        if (this.buttonPressed)
        {
            this.buttonBehaviour.OnHold(this.lastXPos, this.lastYPos);
        }
    }

    Input(event)
    {
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
                this.buttonBehaviour.OnClick(this.lastXPos, this.lastYPos);
            }

            // If the button was pressed return to normal state
            //console.info('Button Released')
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
        var rectMin =
        {
            x : (((canvas.width * this.parentGameObject.anchorX) + this.parentGameObject.posX) - (this.parentGameObject.width / 2)),
            y : (((canvas.height * this.parentGameObject.anchorY) + this.parentGameObject.posY) - (this.parentGameObject.height / 2))
        };

        // Checking X Axis
        if((inputX > rectMin.x) && (inputX < rectMin.x + this.parentGameObject.width))
        {
            // Checking Y Axis
            if((inputY > rectMin.y) && (inputY < rectMin.y + this.parentGameObject.height))
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
        // Rect in world space
        var rectMin =
        {
            x : (this.parentGameObject.GetGlobalPos().x - (this.parentGameObject.width / 2)) * this.parentGameObject.parentScene.sceneCamera.zoom,
            y : (this.parentGameObject.GetGlobalPos().y - (this.parentGameObject.height / 2)) * this.parentGameObject.parentScene.sceneCamera.zoom
        };
        // Getting Screen Space Pos
        rectMin.x += canvasX;
        rectMin.y += canvasY;

        // Checking X Axis
        if((inputX > rectMin.x) && (inputX < rectMin.x + (this.parentGameObject.width * this.parentGameObject.parentScene.sceneCamera.zoom)))
        {
            // Checking Y Axis
            if((inputY > rectMin.y) && (inputY < rectMin.y + (this.parentGameObject.height * this.parentGameObject.parentScene.sceneCamera.zoom)))
            {
                //console.info('Within Rect')
                return true;
            }
        }

        // Otherwise input was not within button rect
        //console.info('Outside Rect')
        return false;
    }
}


/*
====================================================================================================
Individual Button Behaviours
====================================================================================================
*/
var CameraButtonEvent =
{
    OnHold : function(inputX, inputY)
    {

    },

    OnClick : function(inputX, inputY)
    {
        console.info("Changing Camera View");
    }
}

var JumpButtonEvent =
{
    targetFrog : null,

    OnHold : function(inputX, inputY)
    {
        if (this.targetFrog != null)
        {
            this.targetFrog.GetComponent("PlayerController").Charge();
        }
    },

    OnClick : function(inputX, inputY)
    {
        if (this.targetFrog != null)
        {
            console.info("Frog Jumping");
            this.targetFrog.GetComponent("PlayerController").Jump();
            //this.targetPhysicsMovement.speedX += 2500;
            //this.targetPhysicsMovement.speedY -= 2500;
        }
        else
        {
            console.error("ERROR: Target Frog Has Not Been Assigned");
        }
    }
}

var TargetButtonEvent =
{
    targetFrog : null,

    OnHold : function(inputX, inputY)
    {
        //console.info("Changing Target Angle");
        this.targetFrog.GetComponent("PlayerController").Aim(inputX, inputY);
    },

    OnClick : function(inputX, inputY)
    {

    }
}

var FireButtonEvent =
{
    OnHold : function(inputX, inputY)
    {
        if (this.targetFrog != null)
        {
            this.targetFrog.GetComponent("PlayerController").Charge();
        }
    },

    OnClick : function(inputX, inputY)
    {
        if (this.targetFrog != null)
        {
            console.info("Frog Firing");
            this.targetFrog.GetComponent("PlayerController").Fire();
        }
        else
        {
            console.error("ERROR: Target Frog Has Not Been Assigned");
        }
    }
}

var WindButtonEvent =
{
    windUIRenderer : null,
    windLevel : 0,

    OnHold : function(inputX, inputY)
    {

    },

    OnClick : function(inputX, inputY)
    {
        if (this.windUIRenderer != null)
        {
            console.info('Changing Wind Speed');

            this.windLevel++;
            if (this.windLevel >= 9)
            {
                this.windLevel = 0;
            }

            this.windUIRenderer.spriteOffsetY = (this.windLevel * this.windUIRenderer.spriteHeight);
        }
        else
        {
            console.error("ERROR: Target Wind UI Renderer Has Not Been Assigned")
        }
    }
}