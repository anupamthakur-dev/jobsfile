import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import Icon from "../Icon";
import AddJobForm from "../form/AddJobForm";

function AddJobDialog({
  label,
  variant,
  icon,
}: {
  label: string;
  variant:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  icon: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={variant}>
          <Icon iconName={icon} /> <span>{label}</span>
        </Button>
      </DialogTrigger>

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
