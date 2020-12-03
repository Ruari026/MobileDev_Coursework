class GameScene
{
    sceneName = '';
    sceneObjects = [];
    sceneCamera = null;

    LoadScene()
    {
        // Intended to be overridden in extended classes
    }

    StartScene()
    {
        console.info('Scene Starting - '.concat(this.sceneName));

        // Setting up individual game objects
        for (var i = 0; i < this.sceneObjects.length; i++)
        {
            this.sceneObjects[i].StartObject();
        }
    }

    UpdateScene()
    {
        // Updating Each Game Object Before Rendering
        for (var i = 0; i < this.sceneObjects.length; i++)
        {
            this.sceneObjects[i].UpdateObject();
        }

        for (i = 0; i < this.sceneObjects.length; i++)
        {
            this.sceneObjects[i].RenderObject(this.sceneCamera);
        }
    }

    InputScene(event)
    {
        // Updating Each Game Object Before Rendering
        for (var i = 0; i < this.sceneObjects.length; i++)
        {
            this.sceneObjects[i].InputObject(event);
        }
    }

    GetSceneColliders()
    {
        var sceneColliders = [];

        for (var i = 0; i < this.sceneObjects.length; i++)
        {
            var objectColliders = this.sceneObjects[i].GetColliders();
            for (var j = 0; j < objectColliders.length; j++)
            {
                sceneColliders.push(objectColliders[j]);
            }
        }

        return sceneColliders;
    }

    CreateObject(newObject)
    {
        // Setting up new object

        // Adding new object to scene memory
        this.sceneObjects.push(newObject);
    }

    DestroyObject(objectToDestroy)
    {
        // Cleaning up object specific details
        objectToDestroy.EndObject();

        // Removing object from scene memory
    }
}

class MainMenuScene extends GameScene
{
    LoadScene()
    {
        this.sceneName = 'MainMenu';
        console.info('Loading Scene: '.concat(this.sceneName));;

        // Every scene needs a camera
        var newCamera = new GameObject("Camera", this);
        newCamera.zoom = 1;
        this.sceneCamera = newCamera;
    }
}

class GameOverScene extends GameScene
{
    LoadScene()
    {
        this.sceneName = 'GameOver';
        console.info('Loading Scene: '.concat(this.sceneName));

        // Every scene needs a camera
        var newCamera = new GameObject("Camera", this);
        newCamera.zoom = 1;
        this.sceneCamera = newCamera;
    }
}