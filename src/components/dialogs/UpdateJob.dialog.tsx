import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";

import type { IJobWithId } from "@/stores/jobs.store";
import Icon from "../Icon";
import UpdateJobForm from "../form/updateJob.form";

function UpdateJobDialog({label,variant,jobId,icon}:{label:string,variant:"link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined,jobId:IJobWithId['id'],icon:string}){

    return(
    <Dialog>
  <DialogTrigger asChild><Button variant={variant} ><Icon iconName={icon} /> <span>{label}</span></Button></DialogTrigger>
  
  <DialogContent  className="h-[calc(100vh-64px)]">
    <DialogHeader>
      <DialogTitle className="text-xl">Update Job</DialogTitle>
     <DialogDescription>
      Fill out the form below to update job.
    </DialogDescription>
    </DialogHeader>
   <UpdateJobForm jobId={jobId}/>
  </DialogContent>
</Dialog>
    )
}

export default UpdateJobDialog;