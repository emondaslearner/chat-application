import React, { Fragment, ReactNode } from 'react';

// Route Components
import PublicRoute from '../../security/PublicRoute';
import { isObjEmpty } from '../../utils';
import PublicPages from '../../configs/router.config/PublicPages'; 
import AuthPages from '../../configs/router.config/AuthPages';

// Layouts
import BlankLayout from '../../layout/BlankLayout';
import VerticalLayout from '../../layout/VerticalLayout';
// import PrivateRoute from '../../security/PrivateRoute';

// Hooks

type RouteMeta = {
  layout?: string;
  publicRoute?: boolean;
  // Define other meta properties here
};

type Route = {
  path: string;
  element: ReactNode;
  children?: any;
  meta?: RouteMeta;
};

type LayoutType = 'blank' | 'vertical'; // Define the possible layout types

const getLayout: Record<LayoutType, React.ReactNode> = {
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

const MergeLayoutRoutes = (layout: LayoutType, defaultLayout: LayoutType): Route[] => {
  const LayoutRoutes: Route[] = [];

  if (Routes) {
    Routes.filter((route: Route) => {
      let isBlank = false;
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        let RouteTag: any = PublicRoute;

        if (route.meta) {
          isBlank = route.meta.layout === 'blank';
          RouteTag = PublicRoute;
        }

        if (route.element) {
          const Wrapper: React.FC<{ children: React.ReactNode; route: Route }> = ({ children, route }) => (
            <Fragment {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{children}</RouteTag>
            </Fragment>
          );

          route.element = (
            <Wrapper route={route}>{route.element}</Wrapper>
          );
        }

        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

// getting layout and storing all route in an array 
const getRoutes = (): Route[] => {
  const defaultLayout: LayoutType = 'vertical';
  const layouts: LayoutType[] = ['vertical', 'blank'];

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
