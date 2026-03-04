import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { IJobType, JobStatus } from "@/types";
import { type IJobWithId } from "@/stores/jobs.store";

const JOB_TYPES = [
  { label: "Full Time", value: "full-time" },
  { label: "Part Time", value: "part-time" },
  { label: "Internship", value: "internship" },
  { label: "Contract", value: "contract" },
];

const JOB_STATUS = [
  { label: "Saved", value: "saved" },
  { label: "Applied", value: "applied" },
  { label: "Interview", value: "interview" },
  { label: "Offer", value: "offer" },
  { label: "Rejected", value: "rejected" },
];

export default function JobForm({
  handleChange,
  formStates,
  handleSubmit,
  handleSelectChange,
  loading,
  resetForm,
  submitLabel,
  submitProgressLabel,
  isReset=true
}: {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  formStates: IJobWithId;
  handleSubmit(e: React.FormEvent<HTMLFormElement>): void;
  handleSelectChange(name:string,value: JobStatus | IJobType): void;
  loading: boolean;
  resetForm?:()=>void;
  submitLabel:string;
  submitProgressLabel:string
  isReset?:boolean
}) {
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
            value={formStates.job_title}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label>Company Name</Label>
          <Input
            name="company_name"
            placeholder="JobsFile Inc."
            required
            value={formStates.company_name}
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
            value={formStates.job_description}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label>Applied on</Label>
          <Input
            type="date"
            name="date_applied"
            value={formStates.date_applied}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label>Application Link</Label>
          <Input
            name="application_link"
            value={formStates.application_link}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label>Job Type</Label>

          <Select
           key={formStates.id}
            value={formStates.job_type}
            onValueChange={(value: IJobType) => {
              handleSelectChange("job_type",value);
            }}
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
            value={formStates.recruiter_email}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label>Status</Label>
          <Select
          key={formStates.id}
            value={formStates.status}
            onValueChange={(value: JobStatus) => {
              handleSelectChange("status",value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {JOB_STATUS.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
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
            value={formStates.notes || ""}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label>Follow up on</Label>
          <Input
            type="date"
            name="followUpDate"
            value={formStates.followUpDate || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Sticky bottom bar */}
      <div className="border-t bg-background px-4 py-3 flex justify-end gap-3">
       {isReset && resetForm && <Button type="reset" variant="outline" onClick={resetForm}>
          Reset
        </Button>}
        <Button type="submit" disabled={loading}>
          {loading ? submitProgressLabel : submitLabel}
        </Button>
      </div>
    </form>
  );
}
