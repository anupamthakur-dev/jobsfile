import { sideNavMenu } from "@/constant";
import type {
  JobStatus,
  SideNavJobRoute,
  SideNavMenu,
} from "@/types";
import { create } from "zustand";
import { useJobs } from "./jobs.store";
import { parseJobForNav } from "@/utils/helper";


function cloneNavs(): SideNavMenu[] {
  return structuredClone(sideNavMenu) as SideNavMenu[];
}

interface IJobNav{
    navs : SideNavMenu[];
    setNavs(navs: SideNavMenu[]): void;
    updateNav(title: string, patch: Partial<SideNavMenu>): void;
    updateNavItems(title: string, items: SideNavMenu["items"]): void;
    resetNavs(): void;
    syncFromJobs():void;
}
export const useJobNav = create<IJobNav>((set)=>{
  return {
    navs: [...sideNavMenu],
    setNavs(navs) {
      set({ navs });
    },
    updateNav(title, patch) {
      set((state) => ({
        navs: state.navs.map((nav) =>
          nav.title === title ? { ...nav, ...patch } : nav
        ),
      }));
    },
    updateNavItems(title, items) {
      set((state) => ({
        navs: state.navs.map((nav) =>
          nav.title === title ? { ...nav, items } : nav
        ),
      }));
    },
    resetNavs() {
      set({ navs: cloneNavs() });
    },
    syncFromJobs() {
        const jobs = useJobs.getState().jobs;
        const nonArchievedJobs = jobs.filter((j)=>!j.archived)
        const statusWiseNav = parseJobForNav(nonArchievedJobs);

          set((state)=>{
            const nextNavs: SideNavMenu[] = state.navs.map((nav) => {
              if (nav.title !== "All Application") return nav;
              if (!Array.isArray(nav.items)) return nav;

              const nextItems: SideNavJobRoute[] = (
                nav.items as SideNavJobRoute[]
              ).map((item) => {
                const statusKey =
                  item.title.toLowerCase() as JobStatus;
                const statusData = statusWiseNav.get(statusKey);

                if (!statusData) return item;

                return {
                  ...item,
                  items: [...statusData.items],
                };
              });

              return {
                ...nav,
                items: nextItems,
              };
            });

            return { navs: nextNavs };
          })
    },
  }
})

