import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { IJobWithId } from "@/stores/jobs.store";
import JobCard from "../cards/JobCard";

function DNDJobCard({ job }: { job: IJobWithId }) {
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
    <JobCard
      job={job}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`cursor-grab ${isDragging ? "opacity-50" : ""}`}
    />
  );
}
export default DNDJobCard;
