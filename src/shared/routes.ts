import {Blog, Home} from "./components/pages";

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
