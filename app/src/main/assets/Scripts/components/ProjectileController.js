class ProjectileController extends Component
{
    componentName = "PlayerController";

    projectileRenderer = null;
    projectilePhysics = null;


    /*
    ====================================================================================================
    Component Inherited Methods
    ====================================================================================================
    */
    Start()
    {

    }

    Update()
    {
        // Handling sprite swaps for animation
        // Projectile sprite animation based off of movement speed
        // Sprite chosen is based off of speed magnitude
        var speedMagnitude = ((this.projectilePhysics.speedX * this.projectilePhysics.speedX) + (this.projectilePhysics.speedY * this.projectilePhysics.speedY))
        speedMagnitude = Math.sqrt(speedMagnitude);
        if (speedMagnitude < 150)
        {
            this.projectileRenderer.offsetY = 0;
        }
        else if (speedMagnitude >= 150 && speedMagnitude < 300)
        {
            this.projectileRenderer.offsetY = 64;
        }
        else if (speedMagnitude >= 300 && speedMagnitude < 450)
        {
            this.projectileRenderer.offsetY = 128;
        }
        else
        {
            this.projectileRenderer.offsetY = 192;
        }

        // Rotates sprite to follow movement direction
        // Can get normalized movement direction since magnitude has already been calculated
        var direction = { x : this.projectilePhysics.speedX, y : this.projectilePhysics.speedY }
        if (speedMagnitude > 1)
        {
            direction.x = (direction.x / speedMagnitude);
            direction.y = (direction.y / speedMagnitude);
        }

        // Converts this to a rotation
        var up = {x : 0, y : 1};
        var angle = Math.atan2(((direction.x * up.x) + (direction.y * up.y)), ((direction.x * up.y) + (up.x * direction.y)))
        angle *= (180 / Math.PI);
        this.projectileRenderer.spriteRotation = (angle + 45);


        // Checks to see if the projectile has fallen out of bounds
        var currentPos = this.parentGameObject.GetGlobalPos();
        if (currentPos.y > 500)
        {
            // Get's the manager in the scene and tells it that it can move to the next player's turn
            var sceneManager = currentScene.GetSceneObject("Scene Manager").GetComponent("GameManager");
            sceneManager.SwitchState(GameState.STATE_TURNEND);

            // Destroys the projectile
            currentScene.DestroyObject(this.parentGameObject);
        }
    }
}