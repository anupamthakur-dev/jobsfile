import { useState } from "react";

import { useJobFormState } from "@/stores/JobformState.store";
import { useJobs, type IJobWithId } from "@/stores/jobs.store";
import { generateId } from "@/utils/helper";
import JobForm from "./Job.form";
import type { IJobType, JobStatus } from "@/types";

function createNewJob(form: IJobWithId): IJobWithId {
  const now = new Date().toISOString();

  return {
    id: generateId(),

    company_name: form.company_name,
    job_title: form.job_title,
    job_description: form.job_description,
    application_link: form.application_link || "",
    recruiter_email: form.recruiter_email || "",
    job_type: form.job_type || "full-time",

    applied: true,
    starred: false,
    status: form.status || "applied",

    date_applied: form.date_applied || now,
    notes: form.notes || "",
    followUpDate: form.followUpDate || undefined,

    createdAt: now,
    updatedAt: undefined,
    archived:false
  };
}

export default function AddJobForm() {
  const [loading, setLoading] = useState(false);
  const FormState = useJobFormState((state) => state.value);
  const addJob = useJobs((state) => state.addJob);

  const updateState = useJobFormState((state) => state.update);
  const resetState = useJobFormState((state) => state.reset);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    let newJob = createNewJob(FormState);

    addJob(newJob);
    setLoading(false);
    resetState();
  }
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    updateState({ [name]: value });
  }

  function handleSelectChange(name:string,value:JobStatus|IJobType):void{
   updateState({ [name]: value });
  }

  return (
    <JobForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      loading={loading}
      handleSelectChange={handleSelectChange}
      resetForm={resetState}
      formStates={FormState}
      submitLabel="Post Job"
      submitProgressLabel="Posting..."
    />
  );
}
