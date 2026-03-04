import { useJobs } from "@/stores/jobs.store";
import { EmptyState } from "./JobDetails";

import JobCard from "@/components/cards/JobCard";

export default function ArchievedPage() {
  const jobs = useJobs((state) => state.jobs);

  const archievedJobs = jobs.filter((j) => j.archived);

  if (archievedJobs.length === 0)
    return (
     <EmptyState
  heading="No archived jobs"
  title="Jobs you archive will appear here for reference."
/>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {archievedJobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
