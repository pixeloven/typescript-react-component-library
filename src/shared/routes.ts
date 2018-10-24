import {Blog, Home} from "./components/pages";

// TODO create docker for server side
// TODO create development entry point for server code
// TODO https://medium.com/airbnb-engineering/server-rendering-code-splitting-and-lazy-loading-with-react-router-v4-bfe596a6af70

// TODO PUBLIC_URL is not working
// TODO App should be roote comp here (follow above)
const routes = [
    {
        component: Home,
        exact: true,
        path: "/",
    }, {
        component: Blog,
        path: "/blog",
    },
];

export default routes;
