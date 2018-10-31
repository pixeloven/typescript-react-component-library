import {Blog, Home, NoMatch} from "./components/pages";
import {Default} from "./components/templates";

// TODO https://medium.com/airbnb-engineering/server-rendering-code-splitting-and-lazy-loading-with-react-router-v4-bfe596a6af70
const routes = [{
    component: Default,
    routes: [
        {
            component: Home,
            exact: true,
            path: "/",
        },
        {
            component: Blog,
            path: "/blog",
        },
        {
            component: NoMatch,
            statusCode: 404,
        },
    ],
}];

export default routes;
