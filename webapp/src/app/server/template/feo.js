module.exports = {
    version: '2.3.8',
    styles: () => {
        return ['<link rel="stylesheet" href="/assets/style/mendies.css">'];
    },
    template: req => {
        return `<!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                ${req.styles}
            </head>
            <body>
                <Component type="DevTools"></Component>
                <div id="router" class="re-admin"></div>

                <script>
                    window.ssr = false;
                    window.restAPI = '/api';
                    window.parseAppId = '${parseAppId}';
                </script>
                ${req.scripts}
            </body>
        </html>`;
    },
};
