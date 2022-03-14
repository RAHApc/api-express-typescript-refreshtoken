import App from "./app";
import './../src/utils/mongodbConnect';
const port:number = 5000;
const application = new App(port);

application.start();