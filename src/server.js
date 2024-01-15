import http from 'http';
import { json } from './middlewares/json';
import { routes } from './routes/routes';

const server = http.createServer(async (req, res) => {
  const { url, method } = req;

  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.path);

    const { query, ...params } = routeParams.groups;

    req.params = params;
    req.query = query ? extractQueryParams(query) : {};
    return route.handler(req, res);
  }

  res.writeHead(404).end();

});

server.listen(3000, () => {
  console.log('Server started on port 3000');
});