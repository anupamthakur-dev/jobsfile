import { useJobs } from "@/stores/jobs.store";
import { EmptyState } from "./JobDetails";

import JobCard from "@/components/cards/JobCard";

export default function StarredPage() {
  const jobs = useJobs((state) => state.jobs);

  const starredJobs = jobs.filter((j) => j.starred && !j.archived);

  if (starredJobs.length === 0) return <EmptyState
  heading="Nothing starred yet"
  title="You haven’t marked any jobs as favorites."
/>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {starredJobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
