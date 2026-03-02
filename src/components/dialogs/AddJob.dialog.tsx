import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import AddJobForm from "../form/AddJob.form";

function AddJobDialog({label,variant}:{label:string,variant:"link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined}){

    return(
    <Dialog>
  <DialogTrigger asChild><Button variant={variant} >{label}</Button></DialogTrigger>
  
  <DialogContent  className="h-[calc(100vh-64px)]">
    <DialogHeader>
      <DialogTitle className="text-xl">Add New Job</DialogTitle>
     <DialogDescription>
      Fill out the form below to create a new job listing.
    </DialogDescription>
    </DialogHeader>
    <AddJobForm/>
  </DialogContent>
</Dialog>
    )
}

export default AddJobDialog;