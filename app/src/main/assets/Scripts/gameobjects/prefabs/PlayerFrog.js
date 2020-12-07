class PlayerFrog extends GameObject
{
    constructor(name, scene)
    {
        super(name, scene);

        // Dimensions
        this.width = 50;
        this.height = 50;

        // Collider
        var newCollider = new BoxCollider(this);
        newCollider.sizeX = 45;
        newCollider.sizeY = 45;
        newCollider.colliderLayer = name;
        this.AddCollider(newCollider);

        // Renderer
        var newRenderer = new SpriteRenderer(this);
        // General renderer details
        newRenderer.filePath = 'Images/frog.png';
        newRenderer.spriteWidth = 128;
        newRenderer.spriteHeight = 128;
        // Renderer animation details
        newRenderer.canAnimate = true;
        newRenderer.maxFrames = 2;
        this.AddRenderer(newRenderer);

        // Power Level UI (Exists in world space as child of frog)
        var powerGameObject = new GameObject('Power', scene);
        // Transform
        powerGameObject.active = false;
        powerGameObject.parentObject = this;
        powerGameObject.width = 50;
        powerGameObject.height = 50;
        powerGameObject.SetLocalPos({x : 0, y : -50 * 0.69});
        // Rendering
        newRenderer = new SpriteRenderer(powerGameObject);
        newRenderer.filePath = 'Images/power.png';
        newRenderer.rotationOffset = 45;
        newRenderer.spriteRotation = -90;
        powerGameObject.AddRenderer(newRenderer);

        // Targeting UI (Exists in world space as child of frog)
        var targetGameObject = new GameObject('Target', scene);
        // Transform
        targetGameObject.parentObject = this;
        targetGameObject.width = 25;
        targetGameObject.height = 25;
        targetGameObject.SetLocalPos({x : 0, y : -50});
        // Rendering
        newRenderer = new SpriteRenderer(targetGameObject);
        newRenderer.filePath = 'Images/crosshairs.png';
        targetGameObject.AddRenderer(newRenderer);
        // Button
        var buttonController = new ButtonComponent(targetGameObject);
        buttonController.targetRenderer = newRenderer;
        buttonController.buttonBehaviour = TargetButtonEvent;
        buttonController.isScreenSpace = false;
        targetGameObject.AddComponent(buttonController);

        // Controller
        var frogController = new PlayerController(this);
        frogController.theReticle = targetGameObject;
        frogController.thePowerMeter = powerGameObject;
        buttonController.buttonBehaviour.targetFrog = this;
        this.AddComponent(frogController);

        // Physics
        var physicsHandler = new PhysicsMovement(this);
        physicsHandler.collisionEvent = FrogCollisionBehaviour;
        this.AddComponent(physicsHandler);

        this.children.push(targetGameObject);
        this.children.push(powerGameObject);
    }
}