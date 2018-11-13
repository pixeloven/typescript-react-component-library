import * as React from "react";
import { HelmetData } from "react-helmet";

interface JavaScriptProps {
    sources: string[] | undefined;
}

interface StyleSheetProps {
    hrefs: string[] | undefined;
}

interface HtmlProps {
    children: React.ReactNode;
    files: Express.Files | undefined;
    helmet: HelmetData;
}

const JavaScript = (props: JavaScriptProps) => {
    const files = props.sources
        ? props.sources.map((src, index) => (
              <script key={index} type="text/javascript" src={src} />
          ))
        : undefined;
    return <React.Fragment>{files}</React.Fragment>;
};

const StyleSheet = (props: StyleSheetProps) => {
    const files = props.hrefs
        ? props.hrefs.map((href, index) => (
              <link key={index} rel="stylesheet" type="text/css" href={href} />
          ))
        : undefined;
    return <React.Fragment>{files}</React.Fragment>;
};

const Html = (props: HtmlProps) => {
    return (
        <html lang="en">
            <head>
                {props.helmet.title.toComponent()}
                {props.helmet.meta.toComponent()}
                {props.helmet.link.toComponent()}
                <link rel="manifest" href="/manifest.json" />
                <link rel="shortcut icon" href="/favicon.ico" />
                {props.files && <StyleSheet hrefs={props.files.css} />}
            </head>
            <body>
                <noscript>
                    You need to enable JavaScript to run this app.
                </noscript>
                <div id="root">{props.children}</div>
                {props.files && <JavaScript sources={props.files.js} />}
            </body>
        </html>
    );
};

export default Html;
