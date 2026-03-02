import { useJobNav } from "@/stores/jobNav.store";
import { useJobs } from "@/stores/jobs.store";



export function initJobStoreBridge() {

  
  const unsub = useJobs.subscribe(
    (state) => state.jobs,
    () => {
       const sync = useJobNav.getState().syncFromJobs;
       sync()
    },
    { fireImmediately: true }
  );

  return unsub;
}
