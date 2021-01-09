class GameplayScene extends GameScene
{
    // Scene Specific Details
    sceneGravity = -400;
    windSpeed = 0; //(75 * 4);

    LoadScene()
    {
        this.sceneName = 'Gameplay';
        console.info('Loading Scene: '.concat(this.sceneName));

        /*
        ====================================================================================================
        Necessary Scene Details
        ====================================================================================================
        */
        // Every scene needs a camera
        var newCamera = new CameraPrefab("Camera", this);
        newCamera.SetGlobalPos({'x' : -0, 'y' : -0});
        this.sceneCamera = newCamera;
        this.sceneObjects.push(newCamera);

        // Controller to allow camera to follow other objects in the scene
        var cameraController = new CameraController(newCamera);
        newCamera.AddComponent(cameraController);

        /*
        ====================================================================================================
        Parallax Background
        ====================================================================================================
        */
        {
            // Tiles the background a few times (only tiles on the x axis)
            var backgroundWidth = 750;
            var numberOfTiles = 3;
            for (var i = 0; i < numberOfTiles; i++)
            {
                var background = new GameObject("Background", this);
                background.width = 750;
                background.height = 750;

                background.SetGlobalPos(
                {
                    'x' : ((-backgroundWidth) + (backgroundWidth * i)),
                    'y' : 0
                });

                var backgroundRenderer = new SpriteRenderer(background);
                backgroundRenderer.filePath = 'Images/environment_layer.png';
                backgroundRenderer.spriteWidth = 1024;
                backgroundRenderer.spriteHeight = 1024;
                backgroundRenderer.frameMax = 1;
                background.AddRenderer(backgroundRenderer);
                this.sceneObjects.push(background);
            }
        }


        /*
        ====================================================================================================
        Scene Specific Controller
        ====================================================================================================
        */
        var sceneManager = new GameObject("Scene Manager");
        this.sceneObjects.push(sceneManager);

        var managerComponent = new GameManager(sceneManager);
        sceneManager.AddComponent(managerComponent);

        // Letting the scene manager know about the camera
        managerComponent.sceneCamera = newCamera;

        /*
        ====================================================================================================
        Game Environment (Exists on the mid-ground layer)
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


        /*
        ====================================================================================================
        Player Characters (Exists on the mid-ground layer)
        ====================================================================================================
        */
        {
            // Adding player characters to the scene
             var frog1 = new PlayerFrog("Player 1", this);
             frog1.SetGlobalPos({x : -150, y : -75});
             // Ensuring that the player 1 frog start facing right
             frog1.GetRenderer().flipX = false;
             this.sceneObjects.push(frog1);

             var frog2 = new PlayerFrog("Player 2", this);
             frog2.SetGlobalPos({x : 150, y : -75});
             // Ensuring that the player 2 frog start facing left
             frog2.GetRenderer().flipX = true;
             this.sceneObjects.push(frog2);

             // Letting the scene manager know about the player frogs
             managerComponent.player1 = frog1;
             managerComponent.player2 = frog2;
             managerComponent.currentPlayer = frog1;
        }

        /*
        ====================================================================================================
        Foreground
        ====================================================================================================
        */
        {
            // Tiles the fore a few times (only tiles on the x axis)
            var backgroundWidth = 128;
            var numberOfTiles = 1;
            // Layer 1
            for (var i = 0; i < numberOfTiles; i++)
            {
                var background = new GameObject("Background", this);
                background.width = backgroundWidth;
                background.height = 128;

                background.SetGlobalPos(
                {
                    'x' : ((-backgroundWidth * numberOfTiles / 2) + (backgroundWidth * i)),
                    'y' : 250
                });

                var backgroundRenderer = new SpriteRenderer(background);
                backgroundRenderer.filePath = 'Images/waves (1).png';
                backgroundRenderer.spriteWidth = 96;
                backgroundRenderer.spriteHeight = 96;
                backgroundRenderer.frameMax = 1;
                background.AddRenderer(backgroundRenderer);
                this.sceneObjects.push(background);
            }
        }


        /*
        ====================================================================================================
        UI ( Needs to be added to the scene last to ensure it renders over the game environment & players)
        ====================================================================================================
        */
        // UI Buttons
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
            buttonController.buttonBehaviour.sceneController = sceneManager;
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
            buttonController.buttonBehaviour.sceneController = sceneManager;
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
            buttonController.buttonBehaviour.targetScene = this;
            windButton.AddComponent(buttonController);

            this.sceneObjects.push(windButton);


            // Telling the Scene Manager about the UI buttons
            managerComponent.jumpButton = jumpButton;
            managerComponent.fireButton = fireButton;
        }

        // UI Text
        {
            // Camera Button
            var testText = new GameObject('Test Text Renderer', this);
            testText.anchorX = 0.5;
            testText.anchorY = 0.5;

            var textRenderer = new TextRenderer(testText);
            textRenderer.text = "Hello World";
            textRenderer.textAlign = 'center';
            testText.AddRenderer(textRenderer, 10);

            this.sceneObjects.push(testText);
        }
    }
}