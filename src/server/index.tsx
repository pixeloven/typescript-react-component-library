import * as cors from "cors";
import * as express from "express";
// import { renderToString } from "react-dom/server";
// import App from "../shared/App";

const app = express();

app.use(cors());

// We're going to serve up the public
// folder since that's where our
// client bundle.js file will end up.
app.use(express.static("build"));

app.get("*", (req, res, next) => {
    const markup = "";

    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>SSR with RR</title>
        <script src="/bundle.js" defer></script>
      </head>

      <body>
        <div id="app">${markup}</div>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
    console.log(`Server is listening on port: 3000`);
});
