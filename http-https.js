const http = require('http');

const httpPort = 2339; // Port for HTTP traffic
const httpsPort = 2340; // Port for HTTPS traffic

const handleRedirect = (req, res) => {
  const redirectUrl = `https://${req.headers.host.split(':')[0]}:${httpsPort}${req.url}`;
  res.writeHead(301, { Location: redirectUrl });
  res.end();
};

const httpServer = http.createServer(handleRedirect);

httpServer.listen(httpPort, () => {
  console.log(`HTTP server listening on port ${httpPort}`);
});
