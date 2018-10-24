import * as React from "react";

interface Props {
    children: React.ReactNode;
    css?: React.Component;
    js?: React.Component;
}

const Html = (props: Props) => {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="theme-color" content="#000000" />
                <link rel="manifest" href="/public/manifest.json" />
                <link rel="shortcut icon" href="/public/favicon.ico" />
                {props.css}
                <title>React App</title>
            </head>
            <body>
            <noscript>
                You need to enable JavaScript to run this app.
            </noscript>
            <div id="root">{props.children}</div>
            {props.js}
            </body>
        </html>
    );
};

export default Html;
