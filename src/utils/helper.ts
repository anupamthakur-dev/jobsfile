import type { IJobWithId } from "@/stores/jobs.store";
import type { FollowUpBucket, JobStatus, SideNavJobRoute, SideNavMenu } from "@/types";
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

export function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function dayDifference(date: Date,) {
  const now = new Date()
  const diff = now.getTime() - date.getTime();
  return diff / (1000*60*60*24)
}
function addDays(date: Date, days: number) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

export function getFollowUpBucket(
  followUpDate?: string,
  followUpGap:number=3
): FollowUpBucket {
  
  if(!followUpDate) return "no_date";

  const today = startOfDay(new Date())
  const date = startOfDay(new Date(followUpDate))

  const followUpDay = addDays(date,followUpGap);
  
  const tomorrow = addDays(today, 1)
  const weekEnd = addDays(today, 7);

  
  

 
  if (followUpDay.getTime() === today.getTime()) return "today"
  if (followUpDay.getTime() === tomorrow.getTime()) return "tomorrow"
  if (followUpDay > tomorrow && followUpDay <= weekEnd) return "this_week"


  return "later"
}