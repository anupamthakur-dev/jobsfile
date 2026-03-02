
import type { IJob, JobStatus } from "@/types";
import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";

export interface IJobWithId extends IJob {
  id: string;

  starred: boolean;
  applied: boolean;

  status: JobStatus;

  createdAt: string; // when job was added
  updatedAt?: string; // last edit

  // tracking & notes
  notes?: string;
  followUpDate?: string;
}

interface Jobs {
  jobs: IJobWithId[];
  addJob(data: IJobWithId): void;
  removeJob(id: IJobWithId["id"]): void;
  updateJob(data: Partial<IJobWithId>): void;
  getJob(id: IJobWithId["id"]): IJobWithId | undefined;
}

export const useJobs = create<Jobs>()(
  persist(
    subscribeWithSelector((set, get) => ({
      jobs: [],

      addJob(data) {
        set((state) => ({
          jobs: [...state.jobs, data],
        }));
      },

      removeJob(id) {
        set((state) => ({
          jobs: state.jobs.filter((job) => job.id !== id),
        }));
      },

      updateJob(data) {
        set((state) => ({
          jobs: state.jobs.map((job) =>
            job.id === data.id ? { ...job, ...data } : job,
          ),
        }));
      },

      getJob(id) {
        return get().jobs.find((job) => job.id === id);
      },
    })),
    {
      name: "jobs-storage", // localStorage key
      version: 1,

      // optional but recommended
      migrate: (persistedState) => {
        return persistedState as Jobs;
      },
    },
  ),
);
