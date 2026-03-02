import type { IJobWithId } from "@/stores/jobs.store";
import type { JobStatus, SideNavJobRoute, SideNavMenu } from "@/types";
import { v4 as uuidV4 } from "uuid";


export function generateId():string{
 return uuidV4();
}

export function parseJobForNav(jobs: IJobWithId[]) {
  const jobNavs = new Map<
    JobStatus,
    { items: { id: string; name: string,icon:string }[] }
  >([
    ["saved", { items: [] }],
    ["applied", { items: [] }],
    ["interview", { items: [] }],
    ["rejected", { items: [] }],
    ["offer", { items: [] }],
  ]);

  jobs.forEach((job) => {
    const status = job.status;

    if (jobNavs.has(status)) {
      jobNavs.get(status)!.items.push({
        id: job.id,
        name: job.company_name, // or companyName / roleName as per your schema
        icon:'Dot'
      });
    }
  });

  return jobNavs;
}

export function isSideNavJobRouteArray(arr: any): arr is SideNavJobRoute[] {
  return Array.isArray(arr) && arr.every(item => 
    typeof item.id === 'string' && 
    typeof item.name === 'string'
  );
}
export function isSideNavMenuArray(arr: any): arr is SideNavMenu[] {
  return Array.isArray(arr) && arr.every(item => 
    typeof item.title === 'string' && 
    typeof item.route === 'string'
  );
}