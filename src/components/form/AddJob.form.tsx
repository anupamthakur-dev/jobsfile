"use client";

import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useJobFormState } from "@/stores/JobformState.store";
import type {  IJobType, JobStatus } from "@/types";
import { useJobs, type IJobWithId } from "@/stores/jobs.store";
import { generateId } from "@/utils/helper";

const JOB_TYPES = [
  { label: "Full Time", value: "full-time" },
  { label: "Part Time", value: "part-time" },
  { label: "Internship", value: "internship" },
  { label: "Contract", value: "contract" },
];
export default function AddJobForm() {
  const [loading, setLoading] = useState(false)
  const FormState = useJobFormState((state) => state.value)
  const addJob = useJobs((state) => state.addJob)
  const updateState = useJobFormState((state) => state.update)
  const resetState = useJobFormState((state) => state.reset)

  function createNewJob(
  form: typeof FormState
): IJobWithId {
  const now = new Date().toISOString()

  return {
    id: generateId(),

    // core job info
    company_name: form.company_name,
    job_title: form.job_title,
    job_description: form.job_description,
    application_link: form.application_link || "",
    recruiter_email: form.recruiter_email || "",
    job_type: form.job_type ?? null,

    // tracking
    applied: true,
    starred: false,
    status: "applied",

    date_applied: form.date_applied || now,
    notes: form.notes || "",
    followUpDate: form.followUpDate || undefined,

    // metadata
    createdAt: now,
    updatedAt: undefined,
  }
}

function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault()
  setLoading(true)

  const newJob = createNewJob(FormState)

  addJob(newJob)
  setLoading(false)
  resetState()
}
  function handleChange(
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) {
  const { name, value } = e.target
  updateState({ [name]: value })
}

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full flex-col overflow-hidden"
    >
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-1 space-y-5 py-4">
        <div className="space-y-2">
          <Label>Job Title</Label>
          <Input
            name="job_title"
            placeholder="Frontend Developer"
            required
            value={FormState.job_title}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label>Company Name</Label>
          <Input
            name="company_name"
            placeholder="JobsFile Inc."
            required
            value={FormState.company_name}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label>Job Description</Label>
          <Textarea
            name="job_description"
            rows={4}
             className="resize-none overflow-y-auto max-h-[10rem]"
            required
            value={FormState.job_description}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label>Applied on</Label>
          <Input
            type="date"
            name="date_applied"
            value={FormState.date_applied}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label>Application Link</Label>
          <Input
            name="application_link"
            value={FormState.application_link}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label>Job Type</Label>
          <Select
            value={FormState.job_type || ""}
            onValueChange={(value: IJobType) =>
              updateState({ job_type: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select job type" />
            </SelectTrigger>
            <SelectContent>
              {JOB_TYPES.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Recruiter Email</Label>
          <Input
            name="recruiter_email"
            placeholder="hr@gmail.com"
            value={FormState.recruiter_email}
            onChange={handleChange}
          />
        </div>
         <div className="space-y-2">
  <Label>Status</Label>
  <Select
    value={FormState.status || "applied"}
    onValueChange={(value:JobStatus) => updateState({ status: value })}
  >
    <SelectTrigger>
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="saved">Saved</SelectItem>
      <SelectItem value="applied">Applied</SelectItem>
      <SelectItem value="interview">Interview</SelectItem>
      <SelectItem value="rejected">Rejected</SelectItem>
    </SelectContent>
  </Select>
</div>
      <div className="space-y-2">
  <Label>Notes</Label>
  <Textarea
    name="notes"
    rows={3}
    className="resize-none overflow-y-auto max-h-[8rem]"
    placeholder="Interview feedback, reminders…"
    value={FormState.notes || ""}
    onChange={handleChange}
  />
</div>
<div className="space-y-2">
  <Label>Follow up on</Label>
  <Input
    type="date"
    name="followUpDate"
    value={FormState.followUpDate || ""}
    onChange={handleChange}
  />
</div>
      </div>
     

      {/* Sticky bottom bar */}
      <div className="border-t bg-background px-4 py-3 flex justify-end gap-3">
        <Button type="reset" variant="outline" onClick={resetState}>
          Reset
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Posting…" : "Post Job"}
        </Button>
      </div>
    </form>
  )
}