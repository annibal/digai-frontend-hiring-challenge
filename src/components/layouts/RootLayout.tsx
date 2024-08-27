import { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";

export interface IRootLayout extends PropsWithChildren {
  title?: string | null;
}

function RootLayout({ children }: IRootLayout) {
  return <div>
    <div>{children}</div>
    <div><Outlet /></div>
  </div>;
}

export default RootLayout;
