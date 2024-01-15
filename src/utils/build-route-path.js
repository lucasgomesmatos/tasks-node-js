export function buildRoutePath(path) {
  const routeParameters = /:([a-zA-Z]+)/g;
  const pathWithParams = path.replaceAll(routeParameters, '(?<$1>[a-z0-9\-_]+)');
  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`);

  return pathRegex;
}