import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type IJobWithId } from "@/stores/jobs.store";
import Icon from "./Icon";
import { archieveJob, changeJobStatus, deleteJob, openEditForm, restoreJob } from "@/services/jobActions";



export function DropdownActionMenu({
  job,
  children,
}: {
  job: IJobWithId;
  children: React.ReactNode;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuGroup>
          
         {!job.archived && <DropdownMenuItem onClick={() => openEditForm(job.id)}>
            <Icon iconName="SquarePen" />
            Edit
          </DropdownMenuItem>
          }
          {job.archived ?<DropdownMenuItem
            onClick={() => restoreJob(job.id)}

          >
            <Icon iconName="ArchiveRestore" />
            Restore
          </DropdownMenuItem>:
          <DropdownMenuItem
            onClick={() => archieveJob(job.id)}
            disabled={job.archived}
          >
            <Icon iconName="Archive" />
            Archieve
          </DropdownMenuItem>
}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Move to</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  disabled={job.status === "saved"}
                  onClick={() => changeJobStatus(job.id, "saved")}
                >
                  Saved
                </DropdownMenuItem>
                
                <DropdownMenuItem
                  disabled={job.status === "applied"}
                  onClick={() => changeJobStatus(job.id, "applied")}
                >
                  Applied
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={job.status === "interview"}
                  onClick={() => changeJobStatus(job.id, "interview")}
                >
                  Interview
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={job.status === "offer"}
                  onClick={() => changeJobStatus(job.id, "offer")}
                >
                  Offer
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={job.status === "rejected"}
                  onClick={() => changeJobStatus(job.id, "rejected")}
                >
                  Rejected
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => deleteJob(job.id)}
          >
            <Icon iconName="Trash" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
