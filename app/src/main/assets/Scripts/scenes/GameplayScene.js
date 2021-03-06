class GameplayScene extends GameScene
{
    // Scene Specific Details
    sceneGravity = -400;
    windLevel = 4;
    windSpeed = 0;

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

        // Ensuring that the camera starts at it's default zoom value (this also calculates the screen scaling for rendering across multiple devices)
        this.sceneCamera.SetCameraZoom(1.0);

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
        // Adding Middle Platforms
        {
            // Bottom Platform
            var newPlatform = new PlatformPrefab("Bottom Left Platform", this, 21, 5);
            //newPlatform.posX = -200;
            newPlatform.posY = 200;
            this.sceneObjects.push(newPlatform);

            // Top Roof
            newPlatform = new PlatformPrefab("Bottom Right Platform", this, 11, 3);
            //newPlatform.posX = 200;
            newPlatform.posY = -200;
            this.sceneObjects.push(newPlatform);

            // Left Wall
            var newPlatform = new WallPrefab("Top Left Platform", this, 3, 13);
            newPlatform.posX = -300;
            //newPlatform.posY = 150;
            this.sceneObjects.push(newPlatform);

            // Right Wall
            newPlatform = new WallPrefab("Top Right Platform", this, 3, 13);
            newPlatform.posX = 300;
            //newPlatform.posY = 150;
            this.sceneObjects.push(newPlatform);

            // Middle Wall
            newPlatform = new WallPrefab("Top Right Platform", this, 3, 9);
            //newPlatform.posX = 300;
            newPlatform.posY = -350;
            this.sceneObjects.push(newPlatform);
        }

        // Adding Left Platforms
        {
            var newPlatform = new PlatformPrefab("Left Platform (1)", this, 11, 3);
            newPlatform.posX = -550;
            newPlatform.posY = -350;
            this.sceneObjects.push(newPlatform);

            newPlatform = new PlatformPrefab("Left Platform (2)", this, 11, 3);
            newPlatform.posX = -550;
            newPlatform.posY = -150;
            this.sceneObjects.push(newPlatform);

            newPlatform = new PlatformPrefab("Left Platform (3)", this, 11, 3);
            newPlatform.posX = -550;
            newPlatform.posY = 50;
            this.sceneObjects.push(newPlatform);
        }

        // Adding Right Platforms
        {
            newPlatform = new PlatformPrefab("Right Platform (1)", this, 11, 3);
            newPlatform.posX = 550;
            newPlatform.posY = -350;
            this.sceneObjects.push(newPlatform);

            newPlatform = new PlatformPrefab("Right Platform (2)", this, 11, 3);
            newPlatform.posX = 550;
            newPlatform.posY = -150;
            this.sceneObjects.push(newPlatform);

            newPlatform = new PlatformPrefab("Right Platform (3)", this, 11, 3);
            newPlatform.posX = 550;
            newPlatform.posY = 50;
            this.sceneObjects.push(newPlatform);
        }


        /*
        ====================================================================================================
        Player Characters (Exists on the mid-ground layer)
        ====================================================================================================
        */
        // Adding player characters to the scene
        var frog1 = new PlayerFrog("Player 1", this);
        frog1.SetGlobalPos({x : -150, y : -75});
        // Ensuring that the player 1 frog start facing right
        frog1.GetRenderer().filePath = 'Images/frog.png';
        frog1.GetRenderer().flipX = false;
        this.sceneObjects.push(frog1);

        var frog2 = new PlayerFrog("Player 2", this);
        frog2.SetGlobalPos({x : 150, y : -75});
        // Ensuring that the player 2 frog start facing left
        frog2.GetRenderer().filePath = 'Images/frog2.png';
        frog2.GetRenderer().flipX = true;
        this.sceneObjects.push(frog2);

        // Letting the scene manager know about the player frogs
        managerComponent.player1 = frog1;
        managerComponent.player2 = frog2;
        managerComponent.currentPlayer = frog1;

        /*
        ====================================================================================================
        Foreground (Handled in 3 layers)
        ====================================================================================================
        */
        // Purple Layer (Furthest Back)
        {
            // Controller to store all of the individual wave tiles and handle animation
            var waveController1 = new GameObject("WaveController (1)");
            this.sceneObjects.push(waveController1);

            var waveAnimator = new WaveAnimatorController(waveController1);
            waveAnimator.animationSpeed = -30;
            waveController1.AddComponent(waveAnimator);

            // Spawning individual tiles
            var numberOfTiles = 24;
            for (var i = 0; i < numberOfTiles; i++)
            {
                var waveTile = new GameObject("WaveTile", this);
                waveTile.width = 130;
                waveTile.height = 250;

                waveTile.SetGlobalPos(
                {
                    'x' : ((-125 * ((numberOfTiles - 1) / 2)) + (125 * i)),
                    'y' : 322.5
                });

                var spriteRenderer = new SpriteRenderer(waveTile);
                spriteRenderer.filePath = 'Images/waves (1).png';
                spriteRenderer.spriteWidth = 180;
                spriteRenderer.spriteHeight = 360;
                spriteRenderer.frameMax = 1;
                waveTile.AddRenderer(spriteRenderer);
                this.sceneObjects.push(waveTile);

                waveTile.parentObject = waveController1;
                waveAnimator.spawnedWaves.push(waveTile);
            }
        }

        // Dark Blue Layer (Middle)
        {
            // Controller to store all of the individual wave tiles and handle animation
            var waveController2 = new GameObject("WaveController (2)");
            this.sceneObjects.push(waveController2);

            var waveAnimator = new WaveAnimatorController(waveController2);
            waveAnimator.animationSpeed = -40;
            waveController2.AddComponent(waveAnimator);

            // Spawning individual tiles
            var numberOfTiles = 24;
            for (var i = 0; i < numberOfTiles; i++)
            {
                var waveTile = new GameObject("WaveTile", this);
                waveTile.width = 130;
                waveTile.height = 250;

                waveTile.SetGlobalPos(
                {
                    'x' : ((-125 * ((numberOfTiles - 1) / 2)) + (125 * i)),
                    'y' : 317.5
                });

                var spriteRenderer = new SpriteRenderer(waveTile);
                spriteRenderer.filePath = 'Images/waves (2).png';
                spriteRenderer.spriteWidth = 180;
                spriteRenderer.spriteHeight = 360;
                spriteRenderer.frameMax = 1;
                waveTile.AddRenderer(spriteRenderer);
                this.sceneObjects.push(waveTile);

                waveTile.parentObject = waveController2;
                waveAnimator.spawnedWaves.push(waveTile);
            }
        }

        // Light Blue Layer (Furthest Forward)
        {
            // Controller to store all of the individual wave tiles and handle animation
            var waveController3 = new GameObject("WaveController (3)");
            this.sceneObjects.push(waveController3);

            var waveAnimator = new WaveAnimatorController(waveController3);
            waveAnimator.animationSpeed = -50;
            waveController3.AddComponent(waveAnimator);

            // Spawning individual tiles
            var numberOfTiles = 24;
            for (var i = 0; i < numberOfTiles; i++)
            {
                var waveTile = new GameObject("WaveTile", this);
                waveTile.width = 130;
                waveTile.height = 250;

                waveTile.SetGlobalPos(
                {
                    'x' : ((-125 * ((numberOfTiles - 1) / 2)) + (125 * i)),
                    'y' : 312.5
                });

                var spriteRenderer = new SpriteRenderer(waveTile);
                spriteRenderer.filePath = 'Images/waves (3).png';
                spriteRenderer.spriteWidth = 180;
                spriteRenderer.spriteHeight = 360;
                spriteRenderer.frameMax = 1;
                waveTile.AddRenderer(spriteRenderer);
                this.sceneObjects.push(waveTile);

                waveTile.parentObject = waveController3;
                waveAnimator.spawnedWaves.push(waveTile);
            }
        }

        /*
        ====================================================================================================
        UI ( Needs to be added to the scene last to ensure it renders over the game environment & players)
        ====================================================================================================
        */
        // UI Buttons
        {
            // Jump Button
            var jumpButton = new GameObject('Jump Button', this);
            jumpButton.posX = -215;
            jumpButton.posY = -72.5;
            jumpButton.width = 112.5;
            jumpButton.height = 112.5;
            jumpButton.anchorX = 1;
            jumpButton.anchorY = 1;

            var buttonRenderer = new UIRenderer(jumpButton);
            buttonRenderer.filePath = 'Images/arrow.png';
            jumpButton.AddRenderer(buttonRenderer, 10);

            var buttonAudio = new AudioSource(jumpButton);
            buttonAudio.filePath = "Audio/pop.wav";
            jumpButton.AddComponent(buttonAudio);

            var buttonController = new ButtonComponent(jumpButton);
            buttonController.targetRenderer = buttonRenderer;
            buttonController.targetAudio = buttonAudio;
            buttonController.buttonBehaviour = JumpButtonEvent;
            buttonController.buttonBehaviour.sceneController = sceneManager;
            jumpButton.AddComponent(buttonController);

            this.sceneObjects.push(jumpButton);

            // Fire Button
            var fireButton = new GameObject('Fire Button', this);
            fireButton.posX = -72.5;
            fireButton.posY = -72.5;
            fireButton.width = 112.5;
            fireButton.height = 112.5;
            fireButton.anchorX = 1;
            fireButton.anchorY = 1;

            buttonRenderer = new UIRenderer(fireButton);
            buttonRenderer.filePath = 'Images/fire.png';
            fireButton.AddRenderer(buttonRenderer, 10);

            var buttonAudio = new AudioSource(fireButton);
            buttonAudio.filePath = "Audio/pop.wav";
            fireButton.AddComponent(buttonAudio);

            buttonController = new ButtonComponent(fireButton);
            buttonController.targetRenderer = buttonRenderer;
            buttonController.targetAudio = buttonAudio;
            buttonController.buttonBehaviour = FireButtonEvent;
            buttonController.buttonBehaviour.sceneController = sceneManager;
            fireButton.AddComponent(buttonController);

            this.sceneObjects.push(fireButton);

            // WindSpeed Button
            var windButton = new GameObject('Wind Button', this);
            windButton.posX = 0;
            windButton.posY = 35;
            windButton.width = 150;
            windButton.height = 37.5;
            windButton.anchorX = 0.5;
            windButton.anchorY = 0;

            buttonRenderer = new UIRenderer(windButton);
            buttonRenderer.filePath = 'Images/wind.png';
            buttonRenderer.spriteWidth = 128;
            buttonRenderer.spriteHeight = 32;
            windButton.AddRenderer(buttonRenderer, 10);

            buttonController = new ButtonComponent(windButton);
            buttonController.targetRenderer = buttonRenderer;
            buttonController.buttonBehaviour = WindButtonEvent;
            buttonController.buttonBehaviour.sceneController = sceneManager;
            buttonController.buttonBehaviour.targetScene = this;
            windButton.AddComponent(buttonController);

            managerComponent.windspeedController = windButton;
            this.sceneObjects.push(windButton);


            // Telling the Scene Manager about the UI buttons
            managerComponent.jumpButton = jumpButton;
            managerComponent.fireButton = fireButton;
        }

        // UI Text
        {
            // Turn Timer
            var timerText = new GameObject('Timer Text', this);
            timerText.posX = 0;
            timerText.posY = 112.5;
            timerText.anchorX = 0.5;
            timerText.anchorY = 0;

            textRenderer = new TextRenderer(timerText);
            textRenderer.text = "- XX -";
            textRenderer.textAlign = 'center';
            textRenderer.fontSize = 55;
            timerText.AddRenderer(textRenderer, 10);

            managerComponent.timerText = textRenderer;
            this.sceneObjects.push(timerText);


            // Player 1 Texts
            {
                // Name Text
                var playerText = new GameObject('Player Name Text', this);
                playerText.posX = 37.5;
                playerText.posY = 75;
                playerText.anchorX = 0;
                playerText.anchorY = 0;
                var textRenderer = new TextRenderer(playerText);
                textRenderer.text = "Player 1";
                textRenderer.fontSize = 28;
                playerText.AddRenderer(textRenderer, 10);
                this.sceneObjects.push(playerText);

                // Health Text
                playerText = new GameObject('Player Health Text', this);
                playerText.posX = 37.5;
                playerText.posY = 131.25;
                playerText.anchorX = 0;
                playerText.anchorY = 0;
                textRenderer = new TextRenderer(playerText);
                textRenderer.text = "HP: XXX";
                textRenderer.fontSize = 28;
                playerText.AddRenderer(textRenderer, 10);
                this.sceneObjects.push(playerText);
                frog1.GetComponent("PlayerController").playerHealthUI = textRenderer;
            }

            // Player 2 Texts
            {
                // Name Text
                var playerText = new GameObject('Player Name Text', this);
                playerText.posX = -37.5;
                playerText.posY = 75;
                playerText.anchorX = 1;
                playerText.anchorY = 0;
                textRenderer = new TextRenderer(playerText);
                textRenderer.text = "Player 2";
                textRenderer.textAlign = 'end';
                textRenderer.fontSize = 28;
                playerText.AddRenderer(textRenderer, 10);
                this.sceneObjects.push(playerText);

                // Health Text
                playerText = new GameObject('Player Health Text', this);
                playerText.posX = -37.5;
                playerText.posY = 131.25;
                playerText.anchorX = 1;
                playerText.anchorY = 0;
                textRenderer = new TextRenderer(playerText);
                textRenderer.text = "HP: XXX";
                textRenderer.textAlign = 'end';
                textRenderer.fontSize = 28;
                playerText.AddRenderer(textRenderer, 10);
                this.sceneObjects.push(playerText);
                frog2.GetComponent("PlayerController").playerHealthUI = textRenderer;
            }
        }
    }
}