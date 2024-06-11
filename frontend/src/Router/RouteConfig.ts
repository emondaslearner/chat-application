import { ReactElement } from "react";
import { RouteProps } from "react-router-dom";

interface Meta {
    layout: string;
    publicRoute?: boolean;
    isMenu?: boolean
}

interface RouteConfig extends Omit<RouteProps, "meta"> {
    path: string;
    element: ReactElement;
    meta?: Meta;
}

export default RouteConfig;
