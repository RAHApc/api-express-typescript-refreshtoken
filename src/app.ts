import * as express from "express";
import { Application } from "express";
import boot from "./boot";
import routers from "./routes";


class App {
    public app: Application;
    public port: number;

    constructor(port:number) {
        this.app = express();
        this.port = port;
    }

    public start(): void{
        boot(this.app);
        routers(this.app);
        this.app.listen(this.port, () => {
            console.log("app is running ...");
        });
    }
}

export default App;
