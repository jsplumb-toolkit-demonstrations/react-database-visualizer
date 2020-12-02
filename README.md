This is a React implementation of the Database Visualizer application, using the React integration from the Toolkit.

This application is built against React 17.  The minimum version of the Toolkit (and the Toolkit's React integration) that you can use with this demonstration is 2.3.0.

### Dependencies

Before you can build the app, you will need to copy several `.tgz` files into the root of the project - these are the relevant lines from `package.json`:

```json
{
    "jsplumbtoolkit": "file:./jsplumbtoolkit.tgz",
    "jsplumbtoolkit-react": "file:./jsplumbtoolkit-react.tgz",
    "jsplumbtoolkit-undo-redo": "file:./jsplumbtoolkit-undo-redo.tgz",
    "jsplumbtoolkit-drop": "file:./jsplumbtoolkit-drop.tgz",
    "jsplumbtoolkit-react-drop": "file:./jsplumbtoolkit-react-drop.tgz",
    "jsplumbtoolkit-syntax-highlighter": "file:./jsplumbtoolkit-syntax-highlighter.tgz",
    "jsplumbtoolkit-demo-support": "file:./jsplumbtoolkit-demo-support.tgz"
}
```

Once you have copied these dependencies over, you can install everything:

```
npm i 
```

### Running the app

`webpack-dev-server` is installed as a dependency to give you a way to run the app standalone. To run the app execute this
command in the terminal:

```
npm run start
```

This will run the app on, by default, port 8080. If that port is in use, 8081 will be tried, and if that is in use, 8082 will be tried, etc. You can see in the console which port the server was successfully started on.
