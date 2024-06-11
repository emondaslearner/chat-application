import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Routes as metaData } from "../Router/routes";

import MainMenu from "./Components/MainMenu";
import themeConfig from "../configs/them.config";

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
  const navigate = useNavigate()

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

  
  // redirect root
  useEffect(() => {
    if(location.pathname === '/') {
      navigate(themeConfig.root)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-full">
      {(meta?.layout !== "blank" || meta?.layout === undefined) && meta && (
        <div className="w-full">
          {meta?.isMenu === true ? <MainMenu /> : null}
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default VerticalLayout;
