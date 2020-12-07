class PhysicsMovement extends Component
{
    componentName = "PhysicsMovement";

    // Object Details
    mass = 1;
    friction = 0.5;
    groundResistance = 5;
    airResistance = 0.2;

    // Movement Details
    speedX = 1;
    speedY = 0;
    isGrounded = true;

    // Specific collision details
    layersToIgnore = [];
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
            var isSuitable = true;

            // Obviously dont want the collider to check if it is colliding with itself
            if (sceneColliders[i] == this.parentGameObject.objectCollider)
            {
                isSuitable = false;
            }

            // Also excludes any colliders that are on layers that this object wants to ignore
            if (this.layersToIgnore.includes(sceneColliders[i].colliderLayer))
            {
                isSuitable = false;
            }

            // If it doesn't meet any of the above conditions then specific collision checks can happen
            if (isSuitable)
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
            if (angle <= 45)
            {
                // Collision is occurring below the object
                // Prevent windspeed from affecting the object
                this.isGrounded = true;
                // Reflect on Y-Axis
                this.speedY *= (-this.friction / 2);
            }
            else if ((angle > 45) && (angle < 135))
            {
                // Collision is occurring on the left or right of the object
                // Reflect on X-Axis
                this.speedX *= -this.friction;
                while ((this.speedX < 10) && (this.speedX > -10))
                {
                    this.speedX *= 2;
                }
            }
            else if (angle >= 135)
            {
                // Collision is occurring above the object
                // Reflect on Y-Axis
                this.speedY *= -this.friction;
            }


            // Handling any other necessary collision behaviour
            if (this.collisionEvent != null)
            {
                this.collisionEvent.OnCollision(mostRelevantCollider, this);
            }

            // Returns the GameObject's position to what it was before to prevent the gameobject from getting stuck inside colliders
            this.parentGameObject.SetGlobalPos({x : oldXPos, y: oldYPos});
        }
        else
        {
            // Otherwise no collision, Sets new GameObject's position to be the new position
            this.parentGameObject.SetGlobalPos({x : newXPos, y: newYPos});

            // Also object can no longer be considered grounded
            this.isGrounded = false;
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
        var windStrength = this.isGrounded ? 0 : this.parentGameObject.parentScene.windSpeed;
        var drag = this.isGrounded ? this.groundResistance : this.airResistance;

        newPosition += ((this.parentGameObject.posX) - (((this.mass * this.speedX) - ((windStrength * this.mass) / (drag))) / (-drag)));

        newPosition += ((((this.mass * this.speedX) - ((windStrength * this.mass) / (drag))) / (-drag)) * (Math.exp((-drag * deltaTime) / (this.mass))));

        newPosition += ((windStrength * deltaTime) / (drag));

        return newPosition;
    }

    CalculateYPosition()
    {
        var newPosition = 0;
        var gravity = this.parentGameObject.parentScene.sceneGravity;

        newPosition += ((this.parentGameObject.posY) - (((this.mass * this.speedY) + ((gravity * this.mass * this.mass) / (this.airResistance))) / (-this.airResistance)));

        newPosition += ((((this.mass * this.speedY) + ((gravity * this.mass * this.mass) / (this.airResistance))) / (-this.airResistance)) * (Math.exp((-this.airResistance * deltaTime) / (this.mass))));

        newPosition -= ((gravity * this.mass * deltaTime) / (this.airResistance));

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
        var windStrength = this.isGrounded ? 0 : this.parentGameObject.parentScene.windSpeed;
        var drag = this.isGrounded ? this.groundResistance : this.airResistance;

        newSpeed += (-drag / this.mass);
        newSpeed *= (((this.mass * this.speedX) - ((windStrength * this.mass) / (drag))) / (-drag));
        newSpeed *= (Math.exp((-drag * deltaTime) / (this.mass)));

        newSpeed += (windStrength / drag);

        return newSpeed;
    }

    CalculateYSpeed()
    {
        var newSpeed = 0;
        var gravity = this.parentGameObject.parentScene.sceneGravity;

        newSpeed += ((-this.airResistance) / (this.mass));
        newSpeed *= (((this.mass * this.speedY) + ((gravity * this.mass * this.mass) / (this.airResistance))) / (-this.airResistance));
        newSpeed *= (Math.exp((-this.airResistance * deltaTime) / (this.mass)));

        newSpeed -= ((gravity * this.mass) / (this.airResistance));

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
    OnCollision : function(hitCollider, ownCollider)
    {

    }
}

var BulletCollisionBehaviour =
{
    OnCollision : function(hitCollider, ownCollider)
    {
        console.info("Attempting to destroy: " + hitCollider.parentGameObject.gameObjectName + " & " + ownCollider.parentGameObject.gameObjectName);

        // Destroying the hit object
        var parentScene = hitCollider.parentGameObject.parentScene;
        console.info(parentScene);
        parentScene.DestroyObject(hitCollider.parentGameObject);

        // Destroying Self
        parentScene = ownCollider.parentGameObject.parentScene;
        console.info(parentScene);
        parentScene.DestroyObject(ownCollider.parentGameObject);
    }
}