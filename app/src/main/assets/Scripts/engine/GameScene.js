class GameScene
{
    sceneName = '';
    sceneObjects = [];
    sceneCamera = null;

    objectsToBeAdded = [];
    objectsToBeDestroyed = [];

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

        // Ensuring that any objects to be added to the scene are done so outside of the update & render loop
        for (i = 0; i < this.objectsToBeAdded.length; i++)
        {
            // Setting up new object
            this.objectsToBeAdded[i].StartObject();

            // Adding new object to scene memory
            this.sceneObjects.push(this.objectsToBeAdded[i]);
        }
        // Resetting addition list
        this.objectsToBeAdded = [];


        // Ensuring that any objects to be removed from the scene are done so outside of the update & render loop
        for (i = 0; i < this.objectsToBeDestroyed.length; i++)
        {
            // Checking if object is at the root of the scene or is a child of another gameobject
            var isChild = (this.objectsToBeDestroyed[i].parentObject != null);

            // If it is a child then the object just needs to be removed from it's parent's children list
            if (isChild)
            {
                // Gets index of object from parent's children
                var index = this.objectsToBeDestroyed[i].parentObject.children.map(function(item){return item}).indexOf(this.objectsToBeDestroyed[i]);
                console.info("Destroying Object At: " + index + ", Scene Object Count: " + this.sceneObjects.length);

                // Object my have specific behaviour to run before being destroyed
                this.objectsToBeDestroyed[i].EndObject();

                // Removing object from parent's children array
                this.objectsToBeDestroyed[i].parentObject.children.splice(index, 1);
                this.objectsToBeDestroyed[i].parentObject = null;
            }
            // Otherwise the object is at the root of the scene so just needs to be removed from the scene's objects
            else
            {
                // Gets index of object from base scene objects
                var index = this.sceneObjects.map(function(item){return item}).indexOf(this.objectsToBeDestroyed[i]);

                // Object my have specific behaviour to run before being destroyed
                this.objectsToBeDestroyed[i].EndObject();

                // Removing object from base scene objects array
                this.sceneObjects.splice(index, 1);
            }
        }
        // Resetting destruction list
        this.objectsToBeDestroyed = [];
    }

    InputScene(event)
    {
        // Updating Each Game Object Before Rendering
        for (var i = 0; i < this.sceneObjects.length; i++)
        {
            this.sceneObjects[i].InputObject(event);
        }
    }

    GetSceneObject(objectName)
    {
        // Gets an object that exists at the scene root
        for (var i = 0; i < this.sceneObjects.length; i++)
        {
            if (this.sceneObjects[i].gameObjectName == objectName)
            {
                return this.sceneObjects[i];
            }
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

    AddObject(newObject)
    {
        this.objectsToBeAdded.push(newObject);
    }

    DestroyObject(objectToDestroy)
    {
        // Checking that the requested object hasn't already been requested to be destroyed
        var alreadyAdded = false;
        for (var i = 0; i < this.objectsToBeDestroyed.length; i++)
        {
            if (objectToDestroy == this.objectsToBeDestroyed[i])
            {
                alreadyAdded = true;
            }
        }

        // If not then add the object (will be handled at the end of the scenes update loop)
        if (!alreadyAdded)
        {
            this.objectsToBeDestroyed.push(objectToDestroy);
        }
    }
}