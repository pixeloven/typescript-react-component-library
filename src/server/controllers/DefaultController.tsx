import {NextFunction, Request, Response, Router} from "express";
import * as React from "react";
import { renderToString } from "react-dom/server";
import {matchPath, RouteProps, StaticRouter} from "react-router-dom";
import App from "../../shared/App";
import routes from "../../shared/routes";

/**
 * Define DefaultController
 */
const router: Router = Router();

/**
 * Creates default route for all clients
 */
router.get("*", (req: Request, res: Response, next: NextFunction) => {
    const Html = (app: string) => (`
<!DOCTYPE html>
<html>
  <head>
    <title>SSR with RR</title>
    <script src="/bundle.js" defer></script>
  </head>
  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <div id="root">${app}</div
  </body>
</html>
`);
    const markup = renderToString(
        <StaticRouter location={req.url} context={{}}>
            <App />
        </StaticRouter>,
    );
    const activeRoute = routes.find((route: RouteProps) => !!matchPath(req.url, route));
    if (!activeRoute) {
        res.status(404).send(Html(markup));
    } else {
       res.status(200).send(Html(markup));
    }
});

export const DefaultController: Router = router;
