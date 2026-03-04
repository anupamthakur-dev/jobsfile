import * as React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useJobs, type IJobWithId } from "@/stores/jobs.store";
import { NavLink } from "react-router";
import { dayDifference } from "@/utils/helper";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Icon from "../Icon";

import { DropdownActionMenu } from "../DropdownActionMenu";
import TooltipWrapper from "../TooltipWrapper";


type JobCardProps = React.ComponentPropsWithoutRef<typeof Card> & {
  job: IJobWithId;
};

function markAsImportant(id: IJobWithId["id"]) {
  const job = useJobs.getState().getJob(id);
  if (!job) return;
  useJobs.getState().updateJob({ id, starred: !job.starred });
}

const JobCard = React.forwardRef<React.ElementRef<typeof Card>, JobCardProps>(
  function JobCard({ job, className, ...props }, ref) {
    const createdDayAgo = dayDifference(new Date(job.createdAt));
    const followUpDate = job.followUpDate
      ? new Date(job.followUpDate).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
        })
      : null;
    return (
      <Card ref={ref} className={`py-3 ${className ?? ""}`} {...props}>
        <CardContent className="px-4">
          <div>
            <div className="flex items-center justify-between gap-1 pb-1">
              <Badge variant={"secondary"}>{job.job_type}</Badge>
              <div className="flex items-center gap-1">
                <TooltipWrapper tip="Mark as important">
                  <Button
                    variant={"secondary"}
                    size={"xs"}
                    onClick={() => markAsImportant(job.id)}
                  >
                    <Icon
                      iconName="Star"
                      fill={job.starred ? "#FACC15" : "transparent"}
                      stroke={job.starred ? "#d1a700" : "#000"}
                      className={`star-icon ${job.starred ? "star-animate" : ""}`}
                    />
                  </Button>
                </TooltipWrapper>
                <DropdownActionMenu job={job}>
                  <Button variant={"secondary"} size={"xs"}>
                    <Icon iconName="EllipsisVertical" />
                  </Button>
                </DropdownActionMenu>
              </div>
            </div>
            <h2 className="underline font-bold text-lg text-ellipsis whitespace-nowrap overflow-hidden ">
              {" "}
              <NavLink to={`/${job.id}`}>{job.job_title}</NavLink>
            </h2>
          </div>
          <div className="flex gap-2 items-end">
            <p className="font-semibold">{job.company_name}</p>
            <span className="text-sm text-muted-foreground">{`${Math.floor(createdDayAgo) === 0 ? "today" : `${Math.floor(createdDayAgo)} ago`}`}</span>
          </div>
          <CardFooter className="px-0 my-2">
            {followUpDate && (
              <TooltipWrapper tip={`Follow-up scheduled for ${followUpDate}`}>
                <div className="flex items-center gap-1 text-xs cursor-default">
                  <Icon
                    iconName="CalendarCheck"
                    className="text-primary"
                    size={18}
                  />
                  <span className="font-semibold">{followUpDate}</span>
                </div>
              </TooltipWrapper>
            )}
          </CardFooter>
        </CardContent>
      </Card>
    );
  },
);

export default JobCard;

