const PROXY_CONFIG = {
 "/api": {
   "target": "http://127.0.0.1:3000",
   "secure": false,
   "changeOrigin": true,
   "logLevel": "debug"
 },
  "**": {
    "logLevel": "debug"
  }
};

module.exports = PROXY_CONFIG;
