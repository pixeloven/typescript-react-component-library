import * as React from "react";

interface JavaScriptProps {
    sources: string[] | undefined;
}

interface StyleSheetProps {
    hrefs: string[] | undefined;
}

interface HtmlProps {
    children: React.ReactNode;
    files: Express.Files | undefined;
}

const JavaScript = (props: JavaScriptProps) => {
    const files = props.sources
        ? props.sources.map((src, index) => <script key={index} type="text/javascript" src={src} />)
        : undefined;
    return (
        <React.Fragment>
            {files}
        </React.Fragment>
    );
};

const StyleSheet = (props: StyleSheetProps) => {
    const files = props.hrefs
        ? props.hrefs.map((href, index) => <link key={index} rel="stylesheet" type="text/css" href={href} />)
        : undefined;
    return (
        <React.Fragment>
            {files}
        </React.Fragment>
    );
};

const Html = (props: HtmlProps) => {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="theme-color" content="#000000" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="shortcut icon" href="/favicon.ico" />
                {props.files && <StyleSheet hrefs={props.files.css}/>}
                <title>React App</title>
            </head>
            <body>
            <noscript>
                You need to enable JavaScript to run this app.
            </noscript>
            <div id="root">{props.children}</div>
            {props.files && <JavaScript sources={props.files.js}/>}
            </body>
        </html>
    );
};

export default Html;
