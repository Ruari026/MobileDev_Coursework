class GameplayScene extends GameScene
{
    LoadScene()
    {
        this.sceneName = 'Gameplay';
        console.info('Loading Scene: '.concat(this.sceneName));

        /*
        ====================================================================================================
        Necessary Scene Details
        ====================================================================================================
        */
        {
        // Every scene needs a camera
        var newCamera = new CameraPrefab("Camera", this);
        this.sceneCamera = newCamera;
        this.sceneObjects.push(newCamera);

        // Parallax Background
        var background = new GameObject("Background", this);
        background.SetGlobalPos({'x' : 0, 'y' : -0});
        background.width = 750;
        background.height = 750;

        var backgroundRenderer = new SpriteRenderer(background);
        backgroundRenderer.filePath = 'Images/environment_layer.png';
        backgroundRenderer.spriteWidth = 1024;
        backgroundRenderer.spriteHeight = 1024;
        backgroundRenderer.frameMax = 1;
        background.AddRenderer(backgroundRenderer);

        this.sceneObjects.push(background);
        }

        /*
        ====================================================================================================
        Game Environment
        ====================================================================================================
        */
        {
        // Adding Starting Platforms
        // Bottom Left
        var newPlatform = new PlatformPrefab("Bottom Left Platform", this);
        //newPlatform.posX = -200;
        newPlatform.posY = 200;
        this.sceneObjects.push(newPlatform);
        // Bottom Right
        newPlatform = new PlatformPrefab("Bottom Right Platform", this);
        //newPlatform.posX = 200;
        newPlatform.posY = -200;
        this.sceneObjects.push(newPlatform);

        // Top Left
        var newPlatform = new WallPrefab("Top Left Platform", this);
        newPlatform.posX = -300;
        //newPlatform.posY = 150;
        this.sceneObjects.push(newPlatform);
        // Top Right
        newPlatform = new WallPrefab("Top Right Platform", this);
        newPlatform.posX = 300;
        //newPlatform.posY = 150;
        this.sceneObjects.push(newPlatform);
        }

        // Adding player character to the scene
        var frog1 = new PlayerFrog("Player 1", this);
        frog1.SetGlobalPos({'x' : 0, 'y' : 125});
        this.sceneObjects.push(frog1);

        /*
        ====================================================================================================
        UI
        ====================================================================================================
        */
        {
        // Camera Button
        var cameraButton = new GameObject('Camera Button', this);
        cameraButton.posX = 47.5;
        cameraButton.posY = -47.5;
        cameraButton.width = 75;
        cameraButton.height = 75;
        cameraButton.anchorX = 0;
        cameraButton.anchorY = 1;

        var buttonRenderer = new UIRenderer(cameraButton);
        buttonRenderer.filePath = 'Images/camera.png';
        cameraButton.AddRenderer(buttonRenderer, 10);

        var buttonController = new ButtonComponent(cameraButton);
        buttonController.targetRenderer = buttonRenderer;
        buttonController.buttonBehaviour = CameraButtonEvent;
        cameraButton.AddComponent(buttonController);

        this.sceneObjects.push(cameraButton);

        // Jump Button
        var jumpButton = new GameObject('Jump Button', this);
        jumpButton.posX = -142.5;
        jumpButton.posY = -47.5;
        jumpButton.width = 75;
        jumpButton.height = 75;
        jumpButton.anchorX = 1;
        jumpButton.anchorY = 1;

        buttonRenderer = new UIRenderer(jumpButton);
        buttonRenderer.filePath = 'Images/arrow.png';
        jumpButton.AddRenderer(buttonRenderer, 10);

        buttonController = new ButtonComponent(jumpButton);
        buttonController.targetRenderer = buttonRenderer;
        buttonController.buttonBehaviour = JumpButtonEvent;
        buttonController.buttonBehaviour.targetFrog = frog1;
        jumpButton.AddComponent(buttonController);

        this.sceneObjects.push(jumpButton);

        // Fire Button
        var fireButton = new GameObject('Fire Button', this);
        fireButton.posX = -47.5;
        fireButton.posY = -47.5;
        fireButton.width = 75;
        fireButton.height = 75;
        fireButton.anchorX = 1;
        fireButton.anchorY = 1;

        buttonRenderer = new UIRenderer(fireButton);
        buttonRenderer.filePath = 'Images/fire.png';
        fireButton.AddRenderer(buttonRenderer, 10);

        buttonController = new ButtonComponent(fireButton);
        buttonController.targetRenderer = buttonRenderer;
        buttonController.buttonBehaviour = FireButtonEvent;
        fireButton.AddComponent(buttonController);

        this.sceneObjects.push(fireButton);

        // WindSpeed Button
        var windButton = new GameObject('Wind Button', this);
        windButton.posX = 60;
        windButton.posY = 22.5;
        windButton.width = 100;
        windButton.height = 25;
        windButton.anchorX = 0;
        windButton.anchorY = 0;

        buttonRenderer = new UIRenderer(windButton);
        buttonRenderer.filePath = 'Images/wind.png';
        buttonRenderer.spriteWidth = 128;
        buttonRenderer.spriteHeight = 32;
        windButton.AddRenderer(buttonRenderer, 10);

        buttonController = new ButtonComponent(windButton);
        buttonController.targetRenderer = buttonRenderer;
        buttonController.buttonBehaviour = WindButtonEvent;
        buttonController.buttonBehaviour.windUIRenderer = buttonRenderer;
        windButton.AddComponent(buttonController);

        this.sceneObjects.push(windButton);
        }
    }
}