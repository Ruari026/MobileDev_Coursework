class MainMenuManager extends Component
{
    componentName = "MainMenuManager";

    mainMenuParent = null;
    instructionsParent = null;


    /*
    ====================================================================================================
    Component Inherited Methods
    ====================================================================================================
    */
    Start()
    {
        // Ensures that the game starts with the main menu being shown
        this.OpenMainMenu();
    }

    Update()
    {

    }


    /*
    ====================================================================================================
    Methods To Be Called From Scene UI Buttons
    ====================================================================================================
    */
    OpenMainMenu()
    {
        if (soundManager != null)
        {
            soundManager.PlaySound(0);
        }

        this.mainMenuParent.active = true;
        this.instructionsParent.active = false;
    }

    OpenInstructions()
    {
        if (soundManager != null)
        {
            console.info("Main Menu Manager: Say Hello");
            soundManager.PlaySound(0);
        }

        this.mainMenuParent.active = false;
        this.instructionsParent.active = true;
    }
}