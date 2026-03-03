import type { TEMPLATE } from "./type";

export const FOLLOW_UP_TEMPLATES:Record<TEMPLATE,{subject:string;body:string}> = {
  general_follow: {
    subject: "Following up on my application",
    body: `Hi {{Name}},

I hope you’re doing well. I’m following up regarding my application for the {{Role}} position at {{Company}}.

I’m very interested in the opportunity and would be happy to share any additional information if needed.
Looking forward to hearing from you.

Best regards,
{{Your Name}}`,
  },
  after_interview: {
    subject: "Thank you and next steps",
    body: `
Hi {{Name}},

Thank you for taking the time to speak with me about the {{Role}} role. I enjoyed our conversation and learning more about the team at {{Company}}.

I’m writing to follow up and ask about the next steps in the process.
Looking forward to your update.

Best regards,
{{Your Name}}`,
  },
  checking_in: {
    subject: "Checking in",

    body: `Hi {{Name}},

I wanted to check in regarding my application for the {{Role}} position at {{Company}}.

I remain very interested in the role and would appreciate any update when convenient.

Thank you for your time.
Best regards,
{{Your Name}}`,
  },
  final_follow: {
    subject: "Final follow-up",

    body: `Hi {{Name}},

I’m reaching out one last time to follow up on my application for the {{Role}} role at {{Company}}.

I understand things can get busy, and I appreciate your time.
Thank you for considering my application.

Best regards,
{{Your Name}}`,
  },
} as const;
