import useDialogStore from "@/stores/dialogStore";
import { useJobs, type IJobWithId } from "@/stores/jobs.store";
import type { JobStatus } from "@/types";

export function changeJobStatus(id: IJobWithId["id"], status: JobStatus) {
  const job = useJobs.getState().getJob(id);
  if (!job) return;
  useJobs.getState().updateJob({ id, status });
}

export function openEditForm(id: IJobWithId["id"]) {
  useDialogStore.getState().openUpdateJobDialog(id);
}

export function archieveJob(id: IJobWithId["id"]) {
  const now = new Date();
  useJobs
    .getState()
    .updateJob({ id, archived: true, archivedAt: now.toISOString() });
}

export function restoreJob(id:IJobWithId['id']){
    const now = new Date();
  useJobs
    .getState()
    .updateJob({ id, archived: false, archivedAt:undefined ,updatedAt:now.toISOString() });
}

export function deleteJob(id: IJobWithId["id"]) {
  useDialogStore.getState().openAlertDialog(id);
}

export function starAJob(id:IJobWithId['id']){
    useJobs.getState().updateJob({id,starred:true})
}
