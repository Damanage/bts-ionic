const PROXY_CONFIG = {
 "/api": {
   "target": "http://0.0.0.0:9000",
   "secure": false,
   "changeOrigin": true,
   "logLevel": "debug"
 },
  "**": {
    "logLevel": "debug"
  }
};

module.exports = PROXY_CONFIG;
