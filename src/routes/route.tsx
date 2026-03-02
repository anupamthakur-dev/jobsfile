import App from "@/App";
import JobDetails from "@/pages/JobDetails";
import Overview from "@/pages/overview";
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
                element:<div>this is follow up</div>
            },
            {
                path:"starred",
                element:<div>this is starred</div>
            },
            {
                path:"archieved",
                element:<div>this is archieved</div>
            },
            {
                path:"/:jobId",
                element:<JobDetails/>
            }
        ]
    }
])