import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";

import LoginPage from "./pages/Auth/LoginPage";

//CLubs
import ClubDashboard from "./pages/Club/Clubs";
//event
import EventDashboard from "./pages/Event/Event";
//Table COnfig
import TableConfig from "./pages/Table/TableConfig";
// ----------------------------------------------------------------------
import MDashboard from "./pages/Menu/MDashboard";
export default function Router() {
  const routes = useRoutes([
    {
      path: "/",
      element: <LoginPage />,
      // index: true,
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/clubs" /> },
        { path: "clubs", element: <ClubDashboard /> },
        { path: "events", element: <EventDashboard /> },
        { path: "tableconfig", element: <TableConfig /> },
        { path: "reservations", element: <TableConfig /> },
        { path: "menu", element: <MDashboard /> },

      ],
    },
    // {
    //   path: "/eventdashboard",
    //   element: <DashboardLayout />,
    //   children: [
    //     { element: <Navigate to="/dashboard/app" /> },
    //     { path: "app", element: <DashboardAppPage /> },
    //     { path: "user", element: <UserPage /> },
    //     { path: "products", element: <ProductsPage /> },
    //     { path: "blog", element: <BlogPage /> },
    //   ],

    // },

    // {
    //   element: <SimpleLayout />,
    //   children: [
    //     { element: <Navigate to="/dashboard/app" />, index: true },
    //     { path: "404", element: <Page404 /> },
    //     { path: "*", element: <Navigate to="/404" /> },
    //   ],
    // },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
