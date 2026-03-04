import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import logo from "@/assets/jobsFile_logo.svg";

import { useJobNav } from "@/stores/jobNav.store";
import { useEffect } from "react";
import { useJobs } from "@/stores/jobs.store";

import CollapsibleItems from "./CollapsibleItems";

export function AppSidebar() {
  const { open } = useSidebar();
  const jobs = useJobs((state) => state.jobs)
  const navs = useJobNav((state) => state.navs);
  const syncFromJobs = useJobNav((state) => state.syncFromJobs);

  useEffect(() => {
    syncFromJobs();
  }, [jobs, syncFromJobs]);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-16 border-b flex item-center py-3 ">
        <div
          className={` ${open ? "opacity-100" : "opacity-0"} w-24 h-auto  shrink-0`}
        >
          <img src={logo} alt="jobsFile's logo" className="w-fit" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {
            navs.map((nav)=> <CollapsibleItems nav={nav} key={nav.title}/>)
          }
        
         
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
