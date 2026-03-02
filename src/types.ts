import type { KANBAN_COLUMNS } from "./constant";
export interface jobRoute{
    id:string,
    name:string,
    icon:string
}

export interface SideNavMenu {
    type:string;
    title:string,
    icon:string,
    items:SideNavMenu[] | SideNavJobRoute[] |null,
    route:string
}

export interface SideNavJobRoute {
    type:string;
    title:string,
    icon:string,
    items: jobRoute[]| null,
    route:string
}

export type IJobType = |"full-time"|"part-time"|"internship"|"contract";
export type JobStatus =
  | "saved"
  | "applied"
  | "interview"
  | "offer"
  | "rejected";


export interface IJob {
    company_name:string;
    job_title:string;
    job_description:string;
    application_link:string;
    recruiter_email:string;
    date_applied?:string;
    job_type: null | IJobType
}


export type ColumnKey = typeof KANBAN_COLUMNS[number]["key"];