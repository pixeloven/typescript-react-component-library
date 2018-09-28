const HtmlTemplate = (app: string) => (`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <link rel="manifest" href="/public/manifest.json">
    <link rel="shortcut icon" href="/public/favicon.ico">
    <link rel="stylesheet" type="text/css" href="/public/static/css/main.css">
    <title>React App</title>
  </head>
  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <div id="root">${app}</div
  </body>
</html>
`);
export default HtmlTemplate;
// TODO make a react comp
