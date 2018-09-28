import * as cors from "cors";
import * as express from "express";
import {DefaultController} from "./controllers/DefaultController";

const app = express();
app.use(cors());
app.use(express.static("build"));
app.use("/", DefaultController);
app.listen(3000, () => {
    console.log(`Server is listening on port: 3000`);
});
