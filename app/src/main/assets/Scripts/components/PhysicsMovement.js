class PhysicsMovement extends Component
{
    componentName = "PhysicsMovement";

    // Object Details
    mass = 0.4;

    // World Forces
    gravity = -98.1;
    airResistance = 0.1;
    windSpeed = 0;

    // Movement Details
    speedX = 1;
    speedY = 0;

    collisionEvent = null;

    Start()
    {

    }

    Update()
    {
        // Checks new speed first
        this.speedX = this.CalculateXSpeed();
        this.speedY = this.CalculateYSpeed();
        //console.info('New Speed - X: ' + this.speedX + ', Y: ' + this.speedY);

        // Storing old GameObject's position
        var oldXPos = this.parentGameObject.GetGlobalPos().x;
        var oldYPos = this.parentGameObject.GetGlobalPos().y;

        // Proposes new GameObject's position
        var newXPos = this.CalculateXPosition();
        var newYPos = this.CalculateYPosition();
        this.parentGameObject.SetGlobalPos({x : newXPos, y : newYPos});
        //console.info('New Pos - X: ' + newXPos + ', Y: ' + newYPos);

        // Checks for collisions
        // Getting Scene Colliders
        var sceneColliders = this.parentGameObject.parentScene.GetSceneColliders();

        // Broad Phase to get nearby colliders
        var broadPhaseColliders = [];
        for (var i = 0; i < sceneColliders.length; i++)
        {
            // Obviously dont want the collider to check if it is colliding with itself
            if (sceneColliders[i] != this.parentGameObject.objectCollider)
            {
                broadPhaseColliders.push(sceneColliders[i]);
            }
        }

        // Narrow Phase to check for specific collisions
        var narrowPhaseColliders = [];
        for (var i = 0; i < broadPhaseColliders.length; i++)
        {
            if (this.parentGameObject.objectCollider.IsCollidingWith(broadPhaseColliders[i]))
            {
                narrowPhaseColliders.push(broadPhaseColliders[i]);
            }
        }

        // If the GameObject is colliding with one or more colliders then a check is needed to find the most relevant one
        if (narrowPhaseColliders.length > 0)
        {
            // Simple distance chack to get most relevant collider (the closest one to this GameObject should be used)
            var mostRelevantCollider = narrowPhaseColliders[0];
            for (var i = 0; i < narrowPhaseColliders.length; i++)
            {
                var a = mostRelevantCollider.parentGameObject.GetGlobalPos(); // Most Relevant Collider Position
                var b = narrowPhaseColliders[i].parentGameObject.GetGlobalPos(); // New Collider To Check Position
                var c = this.parentGameObject.GetGlobalPos(); // This GameObject's Position

                var distanceToCurrent = ((a.x - c.x) * (a.x - c.x)) + ((a.y - c.y) * (a.y - c.y));
                var distanceToNew = ((b.x - c.x) * (b.x - c.x)) + ((b.y - c.y) * (b.y - c.y));

                if (distanceToNew < distanceToCurrent)
                {
                    mostRelevantCollider = narrowPhaseColliders[i];
                }
            }

            // Handling Physics Reflection with most relevant collider
            //console.info(this.parentGameObject.gameObjectName + " Colliding");

            // Gets the direction of the other collider relative to the object
            var thisPos = this.parentGameObject.GetGlobalPos();
            var otherPos = mostRelevantCollider.parentGameObject.GetGlobalPos();
            var direction =
            {
                x : otherPos.x - thisPos.x,
                y : otherPos.y - thisPos.y
            };
            //console.info('Direction - X: ' + direction.x + ', Y: ' + direction.y);

            // Normalizing direction
            var magnitude = Math.sqrt((direction.x * direction.x) + (direction.y * direction.y));
            direction.x /= magnitude;
            direction.y /= magnitude;

            var up = {x : 0, y : 1};
            var angle = Math.acos((direction.x * up.x) + (direction.y * up.y));
            angle *= (180 / Math.PI);
            //console.info('Angle: ' + angle);

            // Reflecting object velocity
            if ((angle > 45) && (angle < 135))
            {
                // Reflect on X-Axis
                this.speedX *= -1;
            }
            else
            {
                // Reflect on Y-Axis
                this.speedY *= -1;
            }

            // Handling any other necessary collision behaviour
            if (this.collisionEvent != null)
            {
                this.collisionEvent.OnCollision(mostRelevantCollider);
            }

            // Returns the GameObject's position to what it was before to prevent the gameobject from getting stuck inside colliders
            this.parentGameObject.SetGlobalPos({x : oldXPos, y: oldYPos});
        }
        // Otherwise no collision, Sets new GameObject's position to be the new position
        else
        {
            this.parentGameObject.SetGlobalPos({x : newXPos, y: newYPos});
        }
    }


    /*
    ====================================================================================================
    Calculating Position
    ====================================================================================================
    */
    CalculateXPosition()
    {
        var newPosition = 0;

        newPosition += ((this.parentGameObject.posX) - (((this.mass * this.speedX) - ((this.windSpeed * this.mass) / (this.airResistance))) / (-this.airResistance)));

        newPosition += ((((this.mass * this.speedX) - ((this.windSpeed * this.mass) / (this.airResistance))) / (-this.airResistance)) * (Math.exp((-this.airResistance * deltaTime) / (this.mass))));

        newPosition += ((this.windSpeed * deltaTime) / (this.airResistance));

        return newPosition;
    }

    CalculateYPosition()
    {
        var newPosition = 0;

        newPosition += ((this.parentGameObject.posY) - (((this.mass * this.speedY) + ((this.gravity * this.mass * this.mass) / (this.airResistance))) / (-this.airResistance)));

        newPosition += ((((this.mass * this.speedY) + ((this.gravity * this.mass * this.mass) / (this.airResistance))) / (-this.airResistance)) * (Math.exp((-this.airResistance * deltaTime) / (this.mass))));

        newPosition -= ((this.gravity * this.mass * deltaTime) / (this.airResistance));

        return newPosition;
    }


    /*
    ====================================================================================================
    Calculating Velocity
    ====================================================================================================
    */
    CalculateXSpeed()
    {
        var newSpeed = 0;

        newSpeed += (-this.airResistance / this.mass);
        newSpeed *= (((this.mass * this.speedX) - ((this.windSpeed * this.mass) / (this.airResistance))) / (-this.airResistance));
        newSpeed *= (Math.exp((-this.airResistance * deltaTime) / (this.mass)));

        newSpeed += (this.windSpeed / this.airResistance);

        return newSpeed;
    }

    CalculateYSpeed()
    {
        var newSpeed = 0;

        newSpeed += ((-this.airResistance) / (this.mass));
        newSpeed *= (((this.mass * this.speedY) + ((this.gravity * this.mass * this.mass) / (this.airResistance))) / (-this.airResistance));
        newSpeed *= (Math.exp((-this.airResistance * deltaTime) / (this.mass)));

        newSpeed -= ((this.gravity * this.mass) / (this.airResistance));

        return newSpeed;
    }
}


/*
====================================================================================================
Individual Collision Behaviours
====================================================================================================
*/
var FrogCollisionBehaviour =
{
    OnCollision : function(hitCollider)
    {

    }
}

var BulletCollisionBehaviour =
{
    OnCollision : function(hitCollider)
    {

    }
}