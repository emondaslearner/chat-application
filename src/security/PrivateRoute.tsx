import React, { Suspense, ReactNode } from 'react';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  return <Suspense fallback={null}>{children}</Suspense>;
}

export default PrivateRoute;
