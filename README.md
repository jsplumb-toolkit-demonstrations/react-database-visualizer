## Database Visualizer (React)

This is a port of the database visualizer demonstration using the Toolkit's React integration, and Javascript.  This branch requires that you have access to version 5.x of the jsPlumb Toolkit.

You can see this demonstration in action here: [https://demo.jsplumbtoolkit.com/react-database-visualizer/](https://demo.jsplumbtoolkit.com/react-database-visualizer/)

### Installation

#### Licensees

If you are a current licensee and you are using either jsPlumb's NPM repository or your own NPM repository to host the Toolkit packages, it will suffice to clone this application and simply run `npm i`

If you are a current licensee who does not use an NPM repository to provision the Toolkit packages, you will need to clone the repository and then update `js/package.json` to set appropriate `file:..` URLs for the Toolkit packages.

#### Evaluators

Evaluators of the Toolkit should ensure they have followed the steps outlined here:

[https://docs.jsplumbtoolkit.com/toolkit/5.x/lib/npm-repository](https://docs.jsplumbtoolkit.com/toolkit/5.x/lib/npm-repository)

to configure their access to the jsPlumb NPM repository.

Then simply clone the repo and run `npm i`.

If you are not a current evaluator but you'd like to be, you can sign up for a 30 day trial here:
[https://jsplumbtoolkit.com/contact?q=evaluate](https://jsplumbtoolkit.com/contact?q=evaluate)  

### Building the app

Once you've installed the dependencies, run this command:

```javascript
npm run build
```

The output will be written into the `dist` directory.
