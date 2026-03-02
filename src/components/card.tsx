
import { Card, CardContent } from "@/components/ui/card";
import type { IJobWithId } from "@/stores/jobs.store";

function CardJob({ job }: { job: IJobWithId }) {
  

  

  return (
    <Card
      
    >
      <CardContent className="p-3">
        <p className="font-medium">{job.job_title}</p>
        <p className="text-sm text-muted-foreground">
          {job.company_name}
        </p>
      </CardContent>
    </Card>
  );
}
export default CardJob;