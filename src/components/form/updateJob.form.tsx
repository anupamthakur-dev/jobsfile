import { useEffect, useState } from "react";

import { useJobFormState } from "@/stores/JobformState.store";
import type { IJobType, JobStatus } from "@/types";
import { useJobs, type IJobWithId } from "@/stores/jobs.store";

import JobForm from "./Job.form";

export default function UpdateJobForm({ jobId }: { jobId: IJobWithId["id"] }) {
  const [loading, setLoading] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const FormState = useJobFormState((state) => state.value);
  const job = useJobs((state) => state.jobs.find((j) => j.id === jobId));
  const initFormState = useJobFormState((state) => state.initFormState);

  const updateJob = useJobs((state) => state.updateJob);
  const updateState = useJobFormState((state) => state.update);
  const resetState = useJobFormState((state) => state.reset);

  function createUpdateJob(form: typeof FormState): IJobWithId {
    const now = new Date().toISOString();

    return {
      id: form.id,

      // core job info
      company_name: form.company_name,
      job_title: form.job_title,
      job_description: form.job_description,
      application_link: form.application_link,
      recruiter_email: form.recruiter_email,
      job_type: form.job_type,

      // tracking
      applied: form.applied,
      starred: form.starred,
      status: form.status,

      date_applied: form.date_applied,
      notes: form.notes,
      followUpDate: form.followUpDate,

      // metadata
      createdAt: form.createdAt,
      updatedAt: now,
      archived:false
    };
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    let newJob = createUpdateJob(FormState);
    updateJob(newJob);
    setLoading(false);
  }
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    updateState({ [name]: value });
  }

  function handleSelectChange(name: string, value: JobStatus | IJobType): void {
    updateState({ [name]: value });
  }

  useEffect(() => {
    if (job) {
      initFormState(job);
      setIsHydrated(true);
    } else {
      resetState();
    }

    return () => {
      if (isHydrated) setIsHydrated(false);
      resetState();
    };
  }, [jobId, job, initFormState, resetState]);

  if (!isHydrated) return <div>loading...</div>;

  return (
    <JobForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleSelectChange={handleSelectChange}
      loading={loading}
      submitLabel="Update Job"
      submitProgressLabel="Updating..."
      formStates={FormState}
      resetForm={resetState}
    />
  );
}
