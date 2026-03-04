import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,

} from "@/components/ui/dialog";

import AddJobForm from "../form/AddJobForm";
import useDialogStore from "@/stores/dialogStore";

function AddJobDialog() {
  const {isAddJobDialog,closeAddJobDialog,openAddJobDialog} = useDialogStore()
  return (
    <Dialog open={isAddJobDialog} onOpenChange={(v)=>v?openAddJobDialog():closeAddJobDialog()}>
      

      <DialogContent className="h-[calc(100vh-64px)]">
        <DialogHeader>
          <DialogTitle className="text-xl">Add New Job</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new job listing.
          </DialogDescription>
        </DialogHeader>
        <AddJobForm />
      </DialogContent>
    </Dialog>

  );
}

export default AddJobDialog;
