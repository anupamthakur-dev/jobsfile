import { useParams } from "react-router";
import { useJobs, type IJobWithId } from "@/stores/jobs.store";
import Icon from "@/components/Icon";
import UpdateJobDialog from "@/components/dialogs/UpdateJob.dialog";
import { Button } from "@/components/ui/button";
import { AlertDialogDestructive } from "@/components/dialogs/confirm.dialog";

function JobDetails() {
  const { jobId } = useParams<{ jobId: string }>();
  const { getJob } = useJobs();
  const { updateJob } = useJobs();
  const {removeJob} = useJobs();

 

  if (!jobId) {
    return <EmptyState title="Not Found" />;
  }

  const job = getJob(jobId);

  if (!job) {
    return <EmptyState title="Job not found" />;
  }

  function starJob(id: IJobWithId["id"]) {
    if (!job) return;
    updateJob({ id, starred: !job.starred });
  }

   function handleRemove(){
    if(!job) return;
    removeJob(job.id)
  }
 
  function archieveJob(id: IJobWithId["id"]){
     if(!id) return;
     const now = new Date()
     updateJob({id,archived:true,archivedAt:now.toISOString()})
  }
  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:py-10">
      {/* Header */}
      <header className=" border-b pb-4 ">
        <div className=" flex items-center justify-end gap-2">
          <UpdateJobDialog
            variant={"secondary"}
            label="Edit"
            jobId={job.id}
            icon="SquarePen"
          />
          <Button variant={"secondary"} onClick={()=>archieveJob(job.id)} disabled={job.archived}><Icon iconName="Package" size={18}/> <span className="text-sm">Archieve</span></Button>
      
          <AlertDialogDestructive onConfirm={handleRemove} />
        </div>
        <div>
          <div className="flex items-center gap-4 ">
            <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
              {job.job_title}
            </h1>
            <button className="cursor-pointer" onClick={() => starJob(job.id)}>
              <Icon
                iconName="Star"
                fill={job.starred ? "#FACC15" : "transparent"}
                stroke={job.starred ? "#d1a700" : "#000"}
                className={`star-icon ${job.starred ? "star-animate" : ""}`}
              />
            </button>
          </div>
          <p className="text-sm text-muted-foreground">{job.company_name}</p>
        </div>
        
      </header>

      {/* Meta */}
      <section className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
        <Badge label={job.status} />
        {job.job_type && <Badge label={job.job_type} />}
        {job.applied && <Badge label="Applied" />}
        {job.starred && <Badge label="Starred" />}
      </section>

      {/* Description */}
      <section className="mt-6 space-y-2">
        <h2 className="text-sm font-medium">Description</h2>
        <p className="text-sm leading-relaxed whitespace-pre-line text-muted-foreground">
          {job.job_description}
        </p>
      </section>

      {/* Notes */}
      {job.notes && (
        <section className="mt-6 space-y-2">
          <h2 className="text-sm font-medium">Notes</h2>
          <p className="text-sm leading-relaxed whitespace-pre-line text-muted-foreground">
            {job.notes}
          </p>
        </section>
      )}

      {/* Footer actions */}
      <footer className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t pt-4">
        <div className="text-xs text-muted-foreground space-y-1">
          <div>Added: {formatDate(job.createdAt)}</div>
          {job.updatedAt && <div>Updated: {formatDate(job.updatedAt)}</div>}
        </div>

        {job.application_link && (
          <a
            href={job.application_link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted transition"
          >
            Open Application
          </a>
        )}
      </footer>
    </div>
  );
}

function Badge({ label }: { label: string }) {
  return <span className="rounded-md border px-2 py-1 text-xs">{label}</span>;
}

export function EmptyState({ title }: { title: string }) {
  return (
    <div className="flex h-[60vh] items-center justify-center text-sm text-muted-foreground">
      {title}
    </div>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}
export default JobDetails;
