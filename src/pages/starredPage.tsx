import { useJobs } from "@/stores/jobs.store";
import { EmptyState } from "./JobDetails";
import CardJob from "@/components/card";

export default function StarredPage() {
  const jobs = useJobs((state) => state.jobs);

  const starredJobs = jobs.filter((j) => j.starred);

  if (starredJobs.length === 0) return <EmptyState title="No Starred Jobs" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {starredJobs.map((job) => (
        <CardJob key={job.id} job={job} />
      ))}
    </div>
  );
}
