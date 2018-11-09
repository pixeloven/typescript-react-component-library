import {Html} from "@server/views";
import App from "@shared/App";
import rootReducer from "@shared/store/rootReducer";
import rootSaga from "@shared/store/rootSaga";
import {NextFunction, Request, Response} from "express";
import * as React from "react";
import {renderToString} from "react-dom/server";
import {Helmet} from "react-helmet";
import { Provider } from "react-redux";
import {StaticContext, StaticRouter} from "react-router";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

/**
 * Renderer middleware
 * @description Outputs a readable stream which means we could split up the render to faster first to byte
 * @param req
 * @param res
 * @param next
 */
export default (req: Request, res: Response, next: NextFunction): void => {
    // TODO handle data fetching https://medium.freecodecamp.org/demystifying-reacts-server-side-render-de335d408fe4

    /**
     * Setup store and saga middleware
     */
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        applyMiddleware(sagaMiddleware),
    );
    sagaMiddleware.run(rootSaga);

    const staticContext: StaticContext = {
        statusCode: 200,
    };
    try {
        const helmet = Helmet.renderStatic();
        const markup = renderToString(
            <Html files={req.files} helmet={helmet}>
                <Provider store={store}>
                    <StaticRouter location={req.url} context={staticContext}>
                        <App />
                    </StaticRouter>
                </Provider>
            </Html>,
        );
        res.status(staticContext.statusCode || 200).send(`<!DOCTYPE html>${markup}`);
    } catch (error) {
        next(error);
    }
};
