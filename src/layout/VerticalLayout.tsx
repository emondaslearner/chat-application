import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Routes as metaData } from "../Router/routes";

import MainMenu from "./Components/MainMenu";

interface RouteMeta {
  layout?: string;
  isMenu?: boolean;
  meta?: object;
  path?: string;
}

interface Route {
  path: string;
  element: React.ReactNode;
  children?: Route[];
  meta?: RouteMeta;
}

interface VerticalLayoutProps {}

const VerticalLayout: React.FC<VerticalLayoutProps> = () => {
  const location = useLocation();

  const [meta, setMeta] = useState<RouteMeta | undefined | null>(null);

  const handleSetMeta = () => {
    const foundMeta = metaData.find(
      (item: Route) => location.pathname === item?.path
    )?.meta;
    setMeta(foundMeta);
  };

  useEffect(() => {
    handleSetMeta();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div>
      {/* checking layout have or not */}
      {(meta?.layout === undefined) && meta && (
        <div>
          {meta?.isMenu === true ? <MainMenu /> : null}
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default VerticalLayout;
