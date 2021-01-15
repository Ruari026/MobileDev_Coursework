class ProjectilePrefab extends GameObject
{

    constructor(name, scene)
    {
        super(name, scene);

        // Dimensions
        this.width = 50;
        this.height = 50;

        // Collider
        var newCollider = new BoxCollider(this);
        newCollider.sizeX = 25;
        newCollider.sizeY = 25;
        newCollider.colliderLayer = "Projectile";
        this.AddCollider(newCollider);

        // Renderer
        var newRenderer = new SpriteRenderer(this);
        // General renderer details
        newRenderer.filePath = 'Images/bullet.png';
        newRenderer.spriteWidth = 64;
        newRenderer.spriteHeight = 64;
        this.AddRenderer(newRenderer);

        // Physics
        var physicsHandler = new PhysicsMovement(this);
        physicsHandler.mass = 0.5;
        physicsHandler.layersToIgnore.push('Projectile');
        physicsHandler.collisionEvent = BulletCollisionBehaviour;
        this.AddComponent(physicsHandler);

        // Animation Handling
        var controller = new ProjectileController(this);
        controller.projectileRenderer = newRenderer;
        controller.projectilePhysics = physicsHandler;
        this.AddComponent(controller);
    }
}