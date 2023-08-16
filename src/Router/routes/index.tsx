import React, { Fragment, ReactNode } from 'react';

// Route Components
import PublicRoute from '../../security/PublicRoute';
import { isObjEmpty } from '../../utils';
import PublicPages from './PublicPages'; 
import AuthPages from './AuthPages';

// Layouts
import BlankLayout from '../../layout/BlankLayout';
import VerticalLayout from '../../layout/VerticalLayout';
import PrivateRoute from '../../security/PrivateRoute';

// Hooks

type RouteMeta = {
  layout?: string;
  publicRoute?: boolean;
  // Define other meta properties here
};

type RouteElement = {
  element: ReactNode;
  meta?: RouteMeta;
};

type Route = {
  path: string;
  element: ReactNode;
  children?: Route[];
  meta?: RouteMeta;
};

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
};

const Routes: Route[] = [...PublicPages, ...AuthPages];

const getRouteMeta = (route: Route): { routeMeta?: RouteMeta } | {} => {
  if (isObjEmpty(route.element as Record<string, any>)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    }
    return {};
  }
  return {};
};

const MergeLayoutRoutes = (layout: string, defaultLayout: string): Route[] => {
  const LayoutRoutes: Route[] = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        let RouteTag: typeof PublicRoute | typeof PrivateRoute = PublicRoute;

        if (route.meta) {
          isBlank = route.meta.layout === 'blank';
          RouteTag = route.meta.publicRoute ? PublicRoute : PrivateRoute;
        }

        if (route.element) {
          const Wrapper = Fragment;

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (): Route[] => {
  const defaultLayout = 'vertical';
  const layouts = ['vertical', 'blank'];

  const AllRoutes: Route[] = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: '/',
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export { Routes, getRoutes };
