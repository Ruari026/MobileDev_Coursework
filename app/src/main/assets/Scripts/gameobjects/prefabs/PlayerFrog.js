class PlayerFrog extends GameObject
{
    constructor(name, scene)
    {
        super(name, scene);

        // Dimensions
        this.width = 50;
        this.height = 50;

        // Physics
        var physicsHandler = new PhysicsMovement(this);
        this.AddComponent(physicsHandler);

        // Collider
        var newCollider = new BoxCollider(this);
        newCollider.sizeX = 45;
        newCollider.sizeY = 45;
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

        // Targeting UI (Exists in world space as child of frog)
        var targetGameObject = new GameObject('Target', scene);
        // Transform
        targetGameObject.active = false;
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
        targetGameObject.AddComponent(buttonController);

        this.children.push(targetGameObject);
    }
}