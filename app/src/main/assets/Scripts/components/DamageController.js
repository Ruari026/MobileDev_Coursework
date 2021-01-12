class DamageController extends Component
{
    componentName = "DamageController";

    moveSpeed = -25;
    despawnTimer = 2.5;

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
        // Damage UI Move Upwards at a slow pace
        var newPos = this.parentGameObject.GetGlobalPos();
        newPos.y += (this.moveSpeed * deltaTime);
        this.parentGameObject.SetGlobalPos(newPos);

        // Checking if the damage UI should despawn
        this.despawnTimer -= deltaTime;
        if (despawnTimer <= 0)
        {
            currentScene.DestroyObject(this.parentGameObject);
        }
    }
}