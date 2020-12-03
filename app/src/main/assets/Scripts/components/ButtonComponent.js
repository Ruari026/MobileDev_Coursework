class ButtonComponent extends Component
{
    componentName = "ButtonComponent";

    targetRenderer = null;

    buttonPressed = false;

    lastXPos = 0;
    lastYPos = 0;

    buttonBehaviour = null;

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
            if (this.IsWithinRect(this.lastXPos, this.lastYPos))
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
            if (this.buttonBehaviour != null)
            {
                this.buttonBehaviour.OnClick();
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

    IsWithinRect(inputX, inputY)
    {
        // Checking X Axis
        if((inputX > (((canvas.width * this.parentGameObject.anchorX) + this.parentGameObject.posX) - (this.parentGameObject.width / 2))) && (inputX < (((canvas.width * this.parentGameObject.anchorX) + this.parentGameObject.posX) + (this.parentGameObject.width / 2))))
        {
            // Checking Y Axis
            if((inputY > (((canvas.height * this.parentGameObject.anchorY) + this.parentGameObject.posY) - (this.parentGameObject.height / 2))) && (inputY < (((canvas.height * this.parentGameObject.anchorY) + this.parentGameObject.posY) + (this.parentGameObject.height / 2))))
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
    OnHold : function()
    {

    },

    OnClick : function()
    {
        console.info("Changing Camera View");
    }
}

var JumpButtonEvent =
{
    targetPhysicsMovement : null,

    OnHold : function()
    {

    },

    OnClick : function()
    {
        if (this.targetPhysicsMovement != null)
        {
            console.info("Frog Jumping");
            this.targetPhysicsMovement.speedX += 2500;
            this.targetPhysicsMovement.speedY -= 2500;
        }
        else
        {
            console.error("ERROR: Target Physics Controller Has Not Been Assigned");
        }
    }
}

var TargetButtonEvent =
{
    OnHold : function()
    {

    },

    OnClick : function()
    {
        console.info("Changing Target Angle");
    }
}

var FireButtonEvent =
{
    OnHold : function()
    {

    },

    OnClick : function()
    {
        console.info("Frog Firing");
    }
}

var WindButtonEvent =
{
    windUIRenderer : null,
    windLevel : 0,

    OnHold : function()
    {

    },

    OnClick : function()
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