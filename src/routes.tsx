import lz from "./utils/lazy-route-wrapper";
import GenericErrorPage from "./pages/error-pages/GenericError.page";
import RootLayout from "./components/layouts/RootLayout";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import NavHeader from "./components/nav-header/NavHeader";

const routes = [
  {
    path: "",
    element: <RootLayout header={<NavHeader />} />,
    errorElement: <GenericErrorPage />,
    children: [
      {
        index: true,
        lazy: lz(() => import("./pages/home/Home.page")),
      },
      {
        path: "interview-setup/:interviewId",
        lazy: lz(
          () => import("./pages/interview-vestibulum/InterviewVestibulum.page")
        ),
      },
      {
        path: "interview/:interviewId",
        lazy: lz(() => import("./pages/interview/Interview.page")),
      },
      {
        path: "interview-after/:interviewId",
        lazy: lz(() => import("./pages/interview-after/InterviewAfter.page")),
      },
    ],
  },
];

export default routes;

export const rootRouter = createBrowserRouter(
  routes as unknown as RouteObject[],
  { basename: import.meta.env.BASE_URL }
  // { basename: "/digai-frontend-hiring-challenge/" }
);
