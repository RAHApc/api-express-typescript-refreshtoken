import App from "./app";
import './../infrastructure/connections/mongoose';
const port: number = 5000;
const application = new App(port);

application.start();