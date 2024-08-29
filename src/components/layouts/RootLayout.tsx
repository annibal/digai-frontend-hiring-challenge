import { PropsWithChildren, ReactNode } from "react";
import { Outlet } from "react-router-dom";

export interface IRootLayoutProps extends PropsWithChildren {
  header?: ReactNode;
  footer?: ReactNode;
}

export default function RootLayout({
  children,
  header,
  footer,
}: IRootLayoutProps) {
  return (
    <>
      {header}
      <main className="text-gray-700 body-font container mx-auto px-3 sm:px-5 py-12">
        {children}
        <Outlet />
      </main>
      {footer}
    </>
  );
}
