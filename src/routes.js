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
import RepresentativeDashboard from "./pages/Representative/RepresentativeDashboard";

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
        { path: "representative", element: <RepresentativeDashboard /> },
        { path: "menu", element: <MDashboard /> },

      ],
    },
  
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
