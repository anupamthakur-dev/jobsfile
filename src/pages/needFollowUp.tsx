import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useJobs, type IJobWithId } from "@/stores/jobs.store";
import { dayDifference, isToday } from "@/utils/helper";
import { EmptyState } from "./JobDetails";
import FollowUpJobCard from "@/components/cards/followUpJob.card";
import { Separator } from "@/components/ui/separator";

interface ITABS<P = {}> {
  label: string;
  value: string;
  component: React.ComponentType<P>;
}
const TABS: ITABS<{ jobs: JobsWithDiff[]; followUpGap: number }>[] = [
  { label: "Today", value: "today", component: TodayFollowUps },
  { label: "Scheduled", value: "scheduled", component: UpcomingFollowUps },
];

const ACTIVITYTABS: ITABS<{ jobs: IJobWithId[] }>[] = [
  { label: "Sent Today", value: "sent_today", component: SentToday },
];

function AllTabsContent({
  tabs,
  jobs,
  followUpGap,
}: {
  tabs: ITABS<{ jobs: JobsWithDiff[]; followUpGap: number }>[];
  jobs: JobsWithDiff[];
  followUpGap: number;
}) {
  if (!Array.isArray(tabs) || !Array.isArray(jobs)) return;

  return (
    <>
      {tabs.map((tab) => {
        const { component: Component } = tab;
        return (
          <TabsContent key={tab.value} value={tab.value} className="py-2">
            <Component jobs={jobs} followUpGap={followUpGap} />
          </TabsContent>
        );
      })}
    </>
  );
}

function AllActivityTabsContent({
  tabs,
  jobs,
}: {
  tabs: ITABS<{ jobs: IJobWithId[] }>[];
  jobs: JobsWithDiff[];
}) {
  if (!Array.isArray(tabs) || !Array.isArray(jobs)) return;

  return (
    <>
      {tabs.map((tab) => {
        const { component: Component } = tab;
        return (
          <TabsContent key={tab.value} value={tab.value} className="py-2">
            <Component jobs={jobs} />
          </TabsContent>
        );
      })}
    </>
  );
}
export interface JobsWithDiff extends IJobWithId {
  diff: number;
}

export default function NeedFollowUp() {
  const followUpGap = 3;
  const jobs = useJobs((state) => state.jobs);
  const needFollowUps = jobs.map((job) => {
    let lastFollowUp = job.followedUpAt || job.date_applied;
    if (!lastFollowUp || job.archived) return null;
    const diff = Math.floor(dayDifference(new Date(lastFollowUp)));

    return { ...job, diff };
  });
  const filteredNeedFollowUps: JobsWithDiff[] = needFollowUps.filter(
    (job): job is JobsWithDiff => !!job,
  );

  return (
    <div className="mx-auto max-w-3xl  ">
      <Tabs
        defaultValue="today"
        className="h-full max-h-[calc(100vh-120px)]  overflow-y-auto"
      >
        <div className=" backdrop-blur-sm sticky top-0  px-4 py-2  border-b ">
          <TabsList variant="line" className="py-0">
            {TABS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
            {ACTIVITYTABS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <AllTabsContent
          tabs={TABS}
          jobs={filteredNeedFollowUps}
          followUpGap={followUpGap}
        />
        <AllActivityTabsContent
          tabs={ACTIVITYTABS}
          jobs={filteredNeedFollowUps}
        />
      </Tabs>
    </div>
  );
}

function TodayFollowUps({
  jobs,
  followUpGap,
}: {
  jobs: JobsWithDiff[];
  followUpGap: number;
}) {
  const todayFollowUps = jobs.filter((jobs) => jobs.diff >= followUpGap);

  if (todayFollowUps.length === 0)
    return (
      <EmptyState
        heading="No follow-ups today"
        title="You don’t have any follow-ups scheduled for today."
      />
    );

  return (
    <div>
      <h2 className="font-bold"> Time to nudge the needle.</h2>
      <p className="text-sm text-secondary-foreground max-w-xl">
        Follow-ups scheduled for today so nothing slips through the cracks or
        the calendar.
      </p>
      <ul>
        {todayFollowUps.map((j) => (
          <>
            <li className="my-2">
              <FollowUpJobCard key={j.id} job={j} />
            </li>
            <Separator />
          </>
        ))}
      </ul>
    </div>
  );
}

function UpcomingFollowUps({ jobs }: { jobs: JobsWithDiff[] }) {
  const scheduledFollowUps = jobs.filter((job) => !!job.followUpDate);

  if (scheduledFollowUps.length === 0)
    return (
      <EmptyState
        heading="No upcoming follow-ups"
        title="You’re all caught up. Nothing scheduled ahead."
      />
    );
  return (
    <div>
      <h2 className="font-bold">Never let an opportunity go stale.</h2>
      <p className="text-sm text-secondary-foreground max-w-xl">
        Scheduled check-ins for interviews, applications, and conversations you
        want to keep warm and moving forward.
      </p>
      <ul>
        {scheduledFollowUps.map((j) => (
          <>
            <li className="my-2 ">
              <FollowUpJobCard key={j.id} job={j} />
            </li>
            <Separator />
          </>
        ))}
      </ul>
    </div>
  );
}

function SentToday({ jobs }: { jobs: IJobWithId[] }) {
  const todayActivity = jobs.filter((job) => {
    if (!job.followedUpAt) return false;
    return isToday(job.followedUpAt);
  });

  if (todayActivity.length === 0)
    return (
      <EmptyState
        heading="No follow-ups sent today"
        title="All quiet so far. When you send a follow-up, it’ll land here and mark the day as productive."
      />
    );
  return (
    <div>
      <h2 className="font-bold">Sent Today</h2>
      <p className="text-sm text-secondary-foreground max-w-xl">
        Follow-ups you’ve already sent today. Consider these checked off,
        logged, and safely out of your mental RAM.
      </p>
      <ul>
        {todayActivity.map((j) => (
          <>
            <li className="my-2 ">
              <FollowUpJobCard key={j.id} job={j} showFollowUp={false} />
            </li>
            <Separator />
          </>
        ))}
      </ul>
    </div>
  );
}
