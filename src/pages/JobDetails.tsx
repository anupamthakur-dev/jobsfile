import { useParams } from "react-router"
import { useJobs } from "@/stores/jobs.store"
import { Button } from "@/components/ui/button"
import Icon from "@/components/Icon"
import AddJobDialog from "@/components/dialogs/AddJob.dialog"

function JobDetails() {
  const { jobId } = useParams<{ jobId: string }>()
  const { getJob } = useJobs();
  

  if (!jobId) {
    return <EmptyState title="Not Found" />
  }

  const job = getJob(jobId)

  if (!job) {
    return <EmptyState title="Job not found" />
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:py-10">
      {/* Header */}
      <header className="space-y-1 border-b pb-4 flex justify-between items-end">
        <div>
        <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
          {job.job_title}
        </h1>
        <p className="text-sm text-muted-foreground">
          {job.company_name}
        </p>
        </div>
        <div>
            {/* <Button variant={'secondary'}><Icon iconName="SquarePen" /><span>Edit</span></Button> */}
            <AddJobDialog variant={'secondary'} label="Edit" />
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
  )
}

function Badge({ label }: { label: string }) {
  return (
    <span className="rounded-md border px-2 py-1 text-xs">
      {label}
    </span>
  )
}

function EmptyState({ title }: { title: string }) {
  return (
    <div className="flex h-[60vh] items-center justify-center text-sm text-muted-foreground">
      {title}
    </div>
  )
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString()
}
export default JobDetails;