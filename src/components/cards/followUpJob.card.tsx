import type { IJobWithId } from "@/stores/jobs.store";
import { dayDifference, formatDate } from "@/utils/helper";
import { NavLink } from "react-router";
import type { JobsWithDiff } from "@/pages/needFollowUp";
import FollowUpSheet from "../followUpSheet";

export default function FollowUpJobCard({ job ,showFollowUp=true}: { job: JobsWithDiff | IJobWithId,showFollowUp?:boolean}) {
  const lastFollowDateAgo = job.followedUpAt
    ? dayDifference(new Date(job.followedUpAt))
    : null;
  const appliedDateAgo = job.date_applied
    ? dayDifference(new Date(job.date_applied))
    : null;
    
  return (
    <article className="pt-2 px-4">
      <div className="flex justify-between items-start py-2 ">
        <div>
          <NavLink to={`/${job.id}`}><h2 className="font-semibold underline">{job.job_title}</h2></NavLink>
          <p aria-labelledby="company" className="text-secondary-foreground text-sm">{job.company_name}</p>
        </div>
        {lastFollowDateAgo && (
          <p className="text-secondary-foreground text-sm">{`last follow up ${Math.floor(lastFollowDateAgo)===0?"today":`${Math.floor(lastFollowDateAgo)} ago`}`}</p>
        )}
        {!lastFollowDateAgo && appliedDateAgo && (
          <p className="text-secondary-foreground text-sm">{`applied ${Math.floor(appliedDateAgo)===0?"today":`${Math.floor(appliedDateAgo)} ago`}`}</p>
        )}
      </div>
      <div className="flex justify-between items-end">
        <div>
            {/* {showFollowUp && <Button size={'xs'}><Icon iconName="Send" /><span>Follow Up</span></Button>} */}
            {showFollowUp && <FollowUpSheet jobId={job.id}/>}
      
        </div>
        <div>
            {job.followUpDate &&  <p className="text-secondary-foreground text-sm">{`Follow-up due ${formatDate(job.followUpDate)}`}</p>}
        </div>
      </div>

 
    </article>
  );
}
