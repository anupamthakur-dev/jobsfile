import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useJobs, type IJobWithId } from "@/stores/jobs.store";
import Icon from "../Icon";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import type { TEMPLATE } from "./type";
import { FOLLOW_UP_TEMPLATES } from "./templates";
import { addDays, fillEmailTemplate } from "@/utils/helper";
import { Separator } from "../ui/separator";

const EMAIL_TEMPLATES = [
  {
    label: "General follow up",
    value: "general_follow",
    description: "A polite check-in after applying or sharing your resume.",
  },
  {
    label: "After interview",
    value: "after_interview",
    description: "Thank them for the interview and ask about next steps.",
  },
  {
    label: "Checking in",
    value: "checking_in",
    description: "A gentle reminder when you haven’t heard back yet.",
  },
  {
    label: "Final follow up",
    value: "final_follow",
    description: "A last, respectful nudge before closing the loop.",
  },
];

export default function FollowUpSheet({ jobId }: { jobId: IJobWithId["id"] }) {
  const job = useJobs((state) => state.jobs.find((j) => j.id === jobId));
  const [selectedTemplate, setSelectedTemplate] =
    useState<TEMPLATE>("general_follow");

  if (!job) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button><Icon iconName="Send"/><span>Follow up</span></Button>
      </SheetTrigger>
      

      <SheetContent
        side="bottom"
        className="h-[95vh] max-h-[95vh] grid grid-cols-1 md:grid-cols-2 p-4"
      >
        <div className="">
          <SheetHeader className="space-y-1 ">
            <SheetTitle className="text-primary">Follow up</SheetTitle>
            <Separator/>
            <p className="flex items-center font-medium ">
              <span>{job.company_name}</span>
              <Icon iconName="Dot" className="mx-1 h-3 w-3" />
              <span>{job.job_title}</span>
            </p>

            <SheetDescription>
              Choose a template, send your follow-up, and mark it as done.
            </SheetDescription>
          </SheetHeader>

          {/* Body */}
          <div className="mt-6 space-y-6">
            {/* Template selector placeholder */}
            <div className="space-y-2">
              <p className=" font-medium">Email template</p>
              <div className="rounded-md p-3 ">
                <RadioGroup
                  value={selectedTemplate}
                  onValueChange={(value: TEMPLATE) => {
                    setSelectedTemplate(value);
                  }}
                >
                  {EMAIL_TEMPLATES.map((temp) => (
                    <div className="flex items-start gap-3">
                      <RadioGroupItem value={temp.value} id={temp.value} />
                      <div>
                        <Label htmlFor={temp.value}>{temp.label}</Label>
                        <p className="text-sm text-muted-foreground">
                          {temp.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full flex flex-col">
{/* Email preview */}
         <EmailPreview template={selectedTemplate} job={job}/>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function EmailPreview({
  template,
  job,
}: {
  template: TEMPLATE;
  job: IJobWithId;
}) {
  const email = FOLLOW_UP_TEMPLATES[template];
  
  const [subject, setSubject] = useState(() => fillEmailTemplate(email.subject,job));
  const [body, setBody] = useState(() => fillEmailTemplate(email.body,job));
  const updateJob = useJobs(state=>state.updateJob);

  function copyToClipboard(){
    navigator.clipboard.writeText(
  `Subject: ${subject}\n\n${body}`
);
  }

  function markAsFollowedUp(){
    const now = new Date();
    const nextFollowUpScheduled = addDays(now,7)
    updateJob({id:job.id,followedUpAt:now.toISOString(),followUpDate:nextFollowUpScheduled.toISOString()})
  }

 useEffect(() => {
  const nextSubject = fillEmailTemplate(email.subject, job);
  const nextBody = fillEmailTemplate(email.body, job);

  setSubject(nextSubject);
  setBody(nextBody);
}, [template, job, email.subject, email.body]);

 return (
  <div className="flex flex-1 flex-col space-y-3">
    <p className="text-sm font-medium text-muted-foreground">
      Message preview
    </p>

    <div className="flex flex-1 flex-col rounded-md border bg-background px-4 py-4 text-sm">
      {/* Subject */}
      <div className="flex items-center gap-2 border-b pb-3">
        <Label className="text-xs text-muted-foreground">
          Subject
        </Label>
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Email subject"
          className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
        />
      </div>

      {/* Body */}
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write your message here…"
        className="mt-3 flex-1 resize-none bg-transparent outline-none leading-relaxed placeholder:text-muted-foreground"
      />
    </div>

    {/* Footer actions */}
    <div className="flex justify-end gap-2 pt-2">
      <Button variant="secondary" onClick={copyToClipboard}>Copy email</Button>
      <Button onClick={markAsFollowedUp}>Mark as sent</Button>
    </div>
  </div>
);
}
