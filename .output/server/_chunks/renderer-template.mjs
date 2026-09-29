import { o as HTTPResponse } from "../_libs/h3+rou3+srvx.mjs";
//#region #nitro/virtual/renderer-template
var rendererTemplate = () => new HTTPResponse("<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover\" />\n    <title>AK Luxe Chat</title>\n    <meta name=\"description\" content=\"Institutional-grade crypto intelligence and market research chat interface.\" />\n    <meta property=\"og:title\" content=\"AK Luxe Chat\" />\n    <meta property=\"og:description\" content=\"Institutional-grade crypto intelligence and market research chat interface.\" />\n    <meta property=\"og:type\" content=\"website\" />\n    <meta name=\"twitter:card\" content=\"summary_large_image\" />\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.tsx\"><\/script>\n  </body>\n</html>\n\n", { headers: { "content-type": "text/html; charset=utf-8" } });
//#endregion
//#region node_modules/nitro/dist/runtime/internal/routes/renderer-template.mjs
function renderIndexHTML(event) {
	return rendererTemplate(event.req);
}
//#endregion
export { renderIndexHTML as default };
