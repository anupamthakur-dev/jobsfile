import CardJob from "@/components/card";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useJobs, type IJobWithId } from "@/stores/jobs.store";
import type { FollowUpBucket } from "@/types";
import { startOfDay, dayDifference, getFollowUpBucket } from "@/utils/helper";
import { EmptyState } from "./JobDetails";

interface ITABS {
  label: string;
  value: string;
}
const TABS: ITABS[] = [
  { label: "All", value: "all" },
  { label: "Today", value: "today" },
  { label: "Tommorrow", value: "tomorrow" },
  { label: "This Week", value: "this_week" },
  { label: "Later", value: "later" },
];

export default function NeedFollowUp() {
  const jobs = useJobs((state) => state.jobs);

  return (
    <div className="flex-1">
      <Tabs defaultValue="all" className="h-full max-h-[calc(100vh-120px)]  overflow-y-auto">
        <div className="bg-secondary/70 backdrop-blur-sm sticky top-0  px-4 py-2 rounded-lg border ">
        <TabsList
          className=""
        >
          {TABS.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
</div>  
<TabsContent value="all" className="py-2">
          {jobs.map((j) => (
            <CardJob key={j.id} job={j} />
          ))}
        </TabsContent>
        <AllTabsContent tabs={TABS} jobs={jobs} />

        
      </Tabs>
    </div>
  );
}

function AllTabsContent({ tabs, jobs }: { tabs: ITABS[]; jobs: IJobWithId[] }) {
  if (!Array.isArray(tabs) || !Array.isArray(jobs)) return;

  return (
    <>
      {tabs.map((tab) => {
        if(tab.value==="all") return;
        const job = jobs.filter((job) => {
          const lastFollowUp = job.date_applied || job.followUpDate;
          if (!lastFollowUp) return false;
          return getFollowUpBucket(lastFollowUp) === tab.value;
        });

        return (
          <TabsContent key={tab.value} value={tab.value} className="py-2">
            {job.length===0 && <EmptyState title={`No Job Follow ups for ${tab.label}`}/>}
            {job.length>0 && job.map((j) => (
              <CardJob key={j.id} job={j} />
            ))}
          </TabsContent>
        );
      })}
    </>
  );
}
