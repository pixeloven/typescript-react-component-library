import {Blog, Home, NoMatch} from "./components/pages";
import {Default} from "./components/templates";

/**
 * Defines routes for both client and server
 * @description Nested routes allow for pages to share templates.
 */
const routes = [
    {
        component: Default,
        exact: true,
        path: "/",
        routes: [
            {
                component: Home,
            },
        ],
    }, {
        component: Default,
        path: "/blog",
        routes: [
            {
                component: Blog,
                exact: true,
                path: "/blog",
            },
            {
                component: Blog,
                path: "/blog/:post",
            },
        ],
    }, {
        component: NoMatch,
        statusCode: 404,
    },
];

export default routes;
