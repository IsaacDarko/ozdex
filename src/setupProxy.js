const { createProxyMiddleware } = require("http-proxy-middleware");
// for API key in .env
require("dotenv").config();

module.exports = function (app) {

app.use( "/swap",
createProxyMiddleware({
  target: "https://api.1inch.dev/swap",
  changeOrigin: true,
  onProxyReq: (proxyReq) => {
    // add API key in Header
    proxyReq.setHeader(
      `Retry-After: 3600`,
      "Authorization",
      `Bearer ${process.env.REACT_APP_1INCH_KEY}`
      );
    },
  })
 )
};