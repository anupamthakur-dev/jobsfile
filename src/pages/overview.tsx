import KanbanBoard from "@/components/kanban/KanbanBoard";
import { useJobs } from "@/stores/jobs.store";

import addFileImage from "../assets/addJob.svg";
import { Button } from "@/components/ui/button";
import useDialogStore from "@/stores/dialogStore";

function Overview() {
  return (
    <>
      <NoJobHeroSection />
      <KanbanBoard />
    </>
  );
}
export default Overview;

function NoJobHeroSection() {
  const jobs = useJobs((state) => state.jobs);
  const openAddJobDialog = useDialogStore((state) => state.openAddJobDialog);
  const nonArchivedJobs = jobs.filter((job) => !job.archived);
  if (nonArchivedJobs.length > 0) return;
  return (
    <div className="flex-1 flex items-center justify-center px-4 h-full">
      <div className="max-w-md text-center space-y-4">
        <img
          src={addFileImage}
          alt="file add image"
          className="w-xs opacity-70 mx-auto"
        />
        <h1 className="text-2xl font-semibold tracking-tight">
          Track every job. Miss nothing.
        </h1>

        <p className="text-sm text-muted-foreground">
          Add jobs, track follow-ups, and keep your job hunt organized in one
          place.
        </p>

        <Button onClick={openAddJobDialog}>Add your first job</Button>
      </div>
    </div>
  );
}
