import { Application } from "express"
import * as cors from "cors";
import * as bodyParser from "body-parser";


const boot = (app: Application): void => {
    app.use(cors());
    app.use(bodyParser.json());
}

export default boot;