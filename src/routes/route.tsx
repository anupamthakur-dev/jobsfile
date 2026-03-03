import App from "@/App";
import ArchievedPage from "@/pages/archievedPage";
import JobDetails, { EmptyState } from "@/pages/JobDetails";
import NeedFollowUp from "@/pages/needFollowUp";
import Overview from "@/pages/overview";
import StarredPage from "@/pages/starredPage";

import { createBrowserRouter } from "react-router";

export const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: "follow-up",
        element: <NeedFollowUp />,
      },
      {
        path: "starred",
        element: <StarredPage />,
      },
      {
        path: "archieved",
        element: <ArchievedPage />,
      },
      {
        path: "/:jobId",
        element: <JobDetails />,
      },
      {
        path: "*",
        element: (
          <EmptyState
            heading="Page not found"
            title="Looks like you took a wrong turn."
          />
        ),
      },
    ],
  },
]);
