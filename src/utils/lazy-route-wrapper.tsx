import { LazyRouteFunction, RouteObject } from "react-router-dom";

type TImportedRouteOject = RouteObject & {
  default?: (...args: any[]) => JSX.Element;
};

export default function lazyRouteWrapper(
  lazyRouteFn: LazyRouteFunction<TImportedRouteOject>
): () => LazyRouteFunction<RouteObject> {
  return () => lazyRouteFn().then((routeProps) => {
    if (routeProps.default) {
      routeProps = { ...routeProps, Component: routeProps.default };
    }

    routeProps.default = undefined;

    return routeProps as RouteObject;
  }) as unknown as LazyRouteFunction<RouteObject>;
}
