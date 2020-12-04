class GameObject
{
    gameObjectName = "";
    active = true;

    // Transform Details
    posX = 0;
    posY = 0;

    width = 0;
    height = 0;

    anchorX = 0.5;
    anchorY = 0.5;

    // Child GameObjects
    children = [];

    // Storing the scene the object is in
    parentScene = null;
    parentObject = null;

    // Components
    objectComponents = [];
    objectRenderer = null;
    objectCollider = null;

    constructor(name, scene)
    {
        this.gameObjectName = name;
        this.parentScene = scene;
    }


    /*
    ====================================================================================================
    Handling Transform
    ====================================================================================================
    */
    GetLocalPos()
    {
        var x = this.posX;
        var y = this.posY;

        var localPos =
        {
            'x' : x,
            'y' : y
        };

        return localPos;
    }

    GetGlobalPos()
    {
        var x = this.posX;
        var y = this.posY;

        if (this.parentObject != null)
        {
            x += this.parentObject.GetGlobalPos().x;
            y += this.parentObject.GetGlobalPos().y;
        }

        var globalPos =
        {
            'x' : x,
            'y' : y
        };

        return globalPos;
    }

    SetLocalPos(newLocalPos)
    {
        // No transformation needed
        this.posX = newLocalPos.x;
        this.posY = newLocalPos.y;
    }

    SetGlobalPos(newGlobalPos)
    {
        var x = newGlobalPos.x;
        var y = newGlobalPos.y;

        if (this.parentObject != null)
        {
            x -= this.parentObject.GetGlobalPos().x;
            y -= this.parentObject.GetGlobalPos().y;
        }

        this.posX = x;
        this.posY = y;
    }

    /*
    ====================================================================================================
    Handling Components
    ====================================================================================================
    */
    StartObject()
    {
        // Starting Self
        for (var i = 0; i < this.objectComponents.length; i++)
        {
            this.objectComponents[i].Start();
        }
        if (this.objectRenderer != null)
        {
            this.objectRenderer.Start();
        }

        // Starting Children
        for (i = 0; i < this.children.length; i++)
        {
            this.children[i].StartObject();
        }
    }

    UpdateObject()
    {
        //console.info('Updating Object - '.concat(this.gameObjectName));

        // Updating Self (Only if GameObject is active)
        if (this.active)
        {
            for (var i = 0; i < this.objectComponents.length; i++)
            {
                this.objectComponents[i].Update();
            }
            if (this.objectRenderer != null)
            {
                this.objectRenderer.Update();
            }

            // Updating Children
            for (i = 0; i < this.children.length; i++)
            {
                this.children[i].UpdateObject();
            }
        }
    }

    InputObject(event)
    {
        //console.info('Updating Object - '.concat(this.gameObjectName));

        // Handling Input On Self (Only if GameObject is active)
        if (this.active)
        {
            for (var i = 0; i < this.objectComponents.length; i++)
            {
                this.objectComponents[i].Input(event);
            }
            if (this.objectRenderer != null)
            {
                this.objectRenderer.Input(event);
            }

            // Handling Input On Children
            for (i = 0; i < this.children.length; i++)
            {
                this.children[i].InputObject(event);
            }
        }
    }

    EndObject()
    {
        // Ending Self
        for (var i = 0; i < this.objectComponents.length; i++)
        {
            this.objectComponents[i].End();
        }
        if (this.objectRenderer != null)
        {
            this.objectRenderer.End();
        }

        // Ending Children
        for (i = 0; i < this.children.length; i++)
        {
            this.children[i].EndObject();
        }
    }

    AddComponent(newComponent)
    {
        this.objectComponents.push(newComponent);
    }

    GetComponent(componentName)
    {
        var component = null;

        for (var i = 0; i < this.objectComponents.length; i++)
        {
            if (this.objectComponents[i].componentName == componentName)
            {
                component = this.objectComponents[i];
            }
        }

        return component;
    }


    /*
    ====================================================================================================
    Handling Colliders
    ====================================================================================================
    */
    GetColliders()
    {
        var colliders = [];

        // Adding Own Collider to the List (Only if GameObject is active)
        if (this.active)
        {
            if (this.objectCollider != null)
            {
                colliders.push(this.objectCollider);
            }

            // Getting child object colliders and adding them to the list
            for (var i = 0; i < this.children.length; i++)
            {
                var childColliders = this.children[i].GetColliders();
                for (var j = 0; j < childColliders.length; j++)
                {
                    colliders.push(childColliders[j]);
                }
            }
        }

        return colliders;
    }

    AddCollider(newCollider)
    {
        this.objectCollider = newCollider;
    }


    /*
    ====================================================================================================
    Handling Rendering
    ====================================================================================================
    */
    RenderObject(camera)
    {
        // Rendering Self (Only if GameObject is active)
        if (this.active)
        {
            if (this.objectRenderer != null)
            {
                //console.info('Drawing Object - '.concat(this.gameObjectName));
                this.objectRenderer.Draw(camera);
            }

            // Rendering Children
            for (var i = 0; i < this.children.length; i++)
            {
                //console.info(this.children[i].name);
                this.children[i].RenderObject(camera);
            }
        }
    }

    AddRenderer(newRenderer)
    {
        this.objectRenderer = newRenderer;
    }

    GetRenderer()
    {
        return this.objectRenderer;
    }
}