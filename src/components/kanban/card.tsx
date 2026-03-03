import {
  useSortable,
 
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent } from "../ui/card";
import type { IJobWithId } from "@/stores/jobs.store";
import { NavLink } from "react-router";

function JobCard({ job }: { job: IJobWithId }) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: job.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`cursor-grab ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <CardContent className="p-3">
        <NavLink to={`/${job.id}`}><p className="font-medium underline">{job.job_title}</p></NavLink>
        <p className="text-sm text-muted-foreground">
          {job.company_name}
        </p>
      </CardContent>
    </Card>
  );
}
export default JobCard;