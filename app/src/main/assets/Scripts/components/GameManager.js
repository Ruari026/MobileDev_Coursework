const GameState = Object.freeze({
    "STATE_TURNSTART" : 1,
    "STATE_PROJECTILEFIRED" : 2,
    "STATE_FROGJUMPING" : 3,
    "STATE_TURNEND" : 4,
    "STATE_PAUSED" : 5
})

class GameManager extends Component
{
    componentName = "GameManager";

    // Controlling Game State
    currentGameState = GameState.STATE_TURNSTART;

    // Scene Gameobjects
    player1 = null;
    player2 = null;
    sceneCamera = null;

    // Scene Buttons
    jumpButton = null;
    fireButton = null;

    // Controlling player turns
    isPlayer1 = false;
    currentPlayer = null;
    turnChangeTimer = 0;


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
        switch (this.currentGameState)
        {
            case (GameState.STATE_TURNSTART):
            {
            }
            break;

            case (GameState.STATE_PROJECTILEFIRED):
            {
            }
            break

            case (GameState.STATE_FROGJUMPING):
            {
                // Gets the physics movement from the current player
                var physicsMovement = this.currentPlayer.GetComponent("PhysicsMovement");

                // Checking if the current player has stopped moving
                var movementMagnitude = (physicsMovement.speedX * physicsMovement.speedX) + (physicsMovement.speedY + physicsMovement.speedY);
                if (movementMagnitude < 1)
                {
                    // Player needs to have stopped for a few seconds before their turn can be considered over
                    this.turnChangeTimer += deltaTime;
                    if (this.turnChangeTimer > 0.5)
                    {
                        this.SwitchState(GameState.STATE_TURNEND);
                    }
                }
                else
                {
                    // Reset timer as player is still in motion
                    this.turnChangeTimer = 0;

                    // Also zoom camera out (to a max of 2)
                }
            }
            break

            case (GameState.STATE_TURNEND):
            {
            }
            break;

            case (GameState.STATE_PAUSED):
            {
            }
            break;
        }
    }

    SwitchState(newState)
    {
        this.currentGameState = newState
        console.info('Game State Changed, New Game State: ' + this.currentGameState);
        //console.info(this.jumpButtonController);

        switch (this.currentGameState)
        {
            case (GameState.STATE_TURNSTART):
            {
                // Setting time scale to 1 "Unpauses" the game
                timeScale = 1;

                // Ensures that the gameplay buttons can be interacted with again
                this.jumpButton.GetComponent("ButtonComponent").DisableButton(false);
                this.fireButton.GetComponent("ButtonComponent").DisableButton(false);

                // Show the targeting recticle on the current player

                // Set camera focus to the next player's frog
            }
            break;

            case (GameState.STATE_PROJECTILEFIRED):
            {
                // Setting time scale to 1 "Unpauses" the game
                timeScale = 1;

                // Lock the scene buttons
                this.jumpButton.GetComponent("ButtonComponent").DisableButton(true);
                this.fireButton.GetComponent("ButtonComponent").DisableButton(true);

                // Set camera focus to the newly spawned projectile
            }
            break

            case (GameState.STATE_FROGJUMPING):
            {
                // Setting time scale to 1 "Unpauses" the game
                timeScale = 1;

                // Lock the scene buttons (camera focus should already be on the jumping frog)
                this.jumpButton.GetComponent("ButtonComponent").DisableButton(true);
                this.fireButton.GetComponent("ButtonComponent").DisableButton(true);

                // Ensuring that the turn change timer is reset
                this.turnChangeTimer = 0;
            }
            break

            case (GameState.STATE_TURNEND):
            {
                // Switching control over to the other player
                /*if (this.isPlayer1)
                {
                    // Next is player 2s turn
                    this.currentPlayer = this.player2;
                    this.isPlayer1 = false;
                }
                else
                {
                    // Next is player 1s turn
                    this.currentPlayer = this.player1;
                    this.isPlayer1 = true;
                }*/

                // Start the next turn
                this.SwitchState(GameState.STATE_TURNSTART);
            }
            break;

            case (GameState.STATE_PAUSED):
            {
                // Setting time scale to 0 "Pauses" the game
                timeScale = 0;

                // Ensures that the gameplay buttons can't be interacted with
                this.jumpButton.GetComponent("ButtonComponent").DisableButton(true);
                this.fireButton.GetComponent("ButtonComponent").DisableButton(true);
            }
            break;
        }
    }


    /*
    ====================================================================================================
    Methods To Be Called From Scene UI Buttons
    ====================================================================================================
    */
    ChargeCurrentFrog()
    {
        // Gets the current player's frog to charge up
        this.currentPlayer.GetComponent("PlayerController").Charge();
    }

    JumpCurrentFrog()
    {
        // Gets the current player's frog to jump
        this.currentPlayer.GetComponent("PlayerController").Jump();

        // Changes the game's state to prevent any more actions from happening and track when the player's frog finishes moving
        this.SwitchState(GameState.STATE_FROGJUMPING);
    }

    FireCurrentFrog()
    {
        // Gets the current player's frog to fire a projectile
        this.currentPlayer.GetComponent("PlayerController").Fire();

        // Changes the game's state to prevent any more actions from happening (turn end tracking is handled by the projectile itself)
        this.SwitchState(GameState.STATE_PROJECTILEFIRED);
    }
}