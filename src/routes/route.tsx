import App from "@/App";
import JobDetails, { EmptyState } from "@/pages/JobDetails";
import NeedFollowUp from "@/pages/needFollowUp";
import Overview from "@/pages/overview";
import StarredPage from "@/pages/starredPage";

import { createBrowserRouter } from "react-router";

export const appRoutes = createBrowserRouter([
    {
        path:'/',
        element: <App/>,
        children:[
            {
                index:true,
                element:<Overview/>
            },
            {
                path:"follow-up",
                element:<NeedFollowUp/>
            },
            {
                path:"starred",
                element:<StarredPage/>
            },
            {
                path:"archieved",
                element:<div>this is archieved</div>
            },
            {
                path:"/:jobId",
                element:<JobDetails/>
            },
            {
                path:"*",
                element:<EmptyState title="Page not found" />
            }
        ]
    }
])