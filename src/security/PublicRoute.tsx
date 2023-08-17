import React, { Suspense, ReactNode } from 'react';

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  return <Suspense fallback={null}>{children}</Suspense>;
}

export default PublicRoute;
