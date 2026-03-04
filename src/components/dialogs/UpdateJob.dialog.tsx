import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import UpdateJobForm from "../form/updateJob.form";
import useDialogStore from "@/stores/dialogStore";

function UpdateJobDialog() {
  const {
    isUpdateJobDialog,
    closeUpdateJobDialog,
    targetJobId,
  } = useDialogStore();
  if (!targetJobId) return;
  return (
    <Dialog
      open={isUpdateJobDialog}
      onOpenChange={(v) => (v ? null : closeUpdateJobDialog())}
    >
      <DialogContent className="h-[calc(100vh-64px)]">
        <DialogHeader>
          <DialogTitle className="text-xl">Update Job</DialogTitle>
          <DialogDescription>
            Fill out the form below to update job.
          </DialogDescription>
        </DialogHeader>
        <UpdateJobForm jobId={targetJobId} />
      </DialogContent>
    </Dialog>
  );
}

export default UpdateJobDialog;
