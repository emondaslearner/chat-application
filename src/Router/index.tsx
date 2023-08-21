import React, { useEffect } from "react";

// import third party library
import { useLocation, useRoutes } from 'react-router-dom';

// import components
import { getRoutes } from "./routes";

interface RouterProps {}

const Router: React.FC<RouterProps> = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  // getting route and merging
  const allRoutes = getRoutes();
  const routes = useRoutes([...allRoutes]);

  return routes;
};

export default Router;
