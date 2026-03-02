import type { JobStatus, SideNavJobRoute, SideNavMenu } from "./types";


const jobStatusNav:SideNavJobRoute[]=[
    
     { 
        type:"job-routes",
        title:"Saved",
        icon:"Bookmark",
        items:[],
        route:'/job/saved'
    },
    {
         type:"job-routes",
        title:"Applied",
        icon:"FileCheck",
        items:[],
        route:'/job/applied'
    },
    {
         type:"job-routes",
        title:"Offer",
        icon:"MailOpen",
        items:[],
        route:'/job/applied'
    },
     {
        type:"job-routes",
        title:"Interview",
        icon:"MessagesSquare",
        items:[],
        route:'/job/interview'
    },
     {
        type:"job-routes",
        title:"Rejected",
        icon:"MessagesSquare",
        items:[],
        route:'/job/rejected'
    },
]

export const sideNavMenu:SideNavMenu[] = [
    { 
        type:"page-routes",
        title:"All Application",
        icon:"File",
        items:[...jobStatusNav],
        route:'/'
    },
    {
        type:"page-routes",
        title:"Needs Follow up",
        icon:"BellRing",
        items:null,
        route:'/follow-up'
    },
    {
        type:"page-routes",
        title:"Starred",
        icon:"Star",
        items:null,
        route:'/starred'
    },
    {
        type:"page-routes",
        title:"Archieved",
        icon:"Package",
        items:null,
        route:'/archieved'
    }
]



export const KANBAN_COLUMNS: { icon:string,key: JobStatus; label: string;collapsible?:boolean;defaultCollapsed?: boolean,}[] = [
  { key: "saved", label: "Saved",icon:"Bookmark", },
  { key: "applied", label: "Applied" ,icon:"FileCheck"},
  { key: "interview", label: "Interview",icon:"MessagesSquare" },
  { key: "offer", label: "Offer",icon:"MailOpen" },
   {
    key: "rejected",
    label: "Rejected",
    collapsible: true,
    defaultCollapsed: true,
    icon:"CircleX"
  },
];

export const dummyJobs = [{
            id:"123-stadium",
            company_name:"Stadium",
            job_title:"Frontend Developer",
            application_link:"",
            date_applied:"20-2-2026",
            recruiter_email:"recruiter@gmail.com",
            job_description:"want a fresher to engage with our team",
            job_type:'full-time',
            starred:true,
            applied:true,
            createdAt:'3/1/2026',
            status:"applied"
        },
    {
            id:"177-stadium",
            company_name:"Stadium",
            job_title:"Frontend Developer",
            application_link:"",
            date_applied:"20-2-2026",
            recruiter_email:"recruiter@gmail.com",
            job_description:"want a fresher to engage with our team",
            job_type:'full-time',
            starred:true,
            applied:true,
            createdAt:'3/1/2026',
            status:"applied"
        },
    {
            id:"809-stadium",
            company_name:"Stadium",
            job_title:"Frontend Developer",
            application_link:"",
            date_applied:"20-2-2026",
            recruiter_email:"recruiter@gmail.com",
            job_description:"want a fresher to engage with our team",
            job_type:'full-time',
            starred:true,
            applied:true,
            createdAt:'3/1/2026',
            status:"applied"
        },
    {
            id:"203-stadium",
            company_name:"Stadium",
            job_title:"Frontend Developer",
            application_link:"",
            date_applied:"20-2-2026",
            recruiter_email:"recruiter@gmail.com",
            job_description:"want a fresher to engage with our team",
            job_type:'full-time',
            starred:true,
            applied:true,
            createdAt:'3/1/2026',
            status:"applied"
        },
    {
            id:"100-stadium",
            company_name:"Stadium",
            job_title:"Frontend Developer",
            application_link:"",
            date_applied:"20-2-2026",
            recruiter_email:"recruiter@gmail.com",
            job_description:"want a fresher to engage with our team",
            job_type:'full-time',
            starred:true,
            applied:true,
            createdAt:'3/1/2026',
            status:"applied"
        },
    {
            id:"321-stadium",
            company_name:"Stadium",
            job_title:"Frontend Developer",
            application_link:"",
            date_applied:"20-2-2026",
            recruiter_email:"recruiter@gmail.com",
            job_description:"want a fresher to engage with our team",
            job_type:'full-time',
            starred:true,
            applied:true,
            createdAt:'3/1/2026',
            status:"applied"
        },
    {
            id:"456-stadium",
            company_name:"Stadium",
            job_title:"Frontend Developer",
            application_link:"",
            date_applied:"20-2-2026",
            recruiter_email:"recruiter@gmail.com",
            job_description:"want a fresher to engage with our team",
            job_type:'full-time',
            starred:true,
            applied:true,
            createdAt:'3/1/2026',
            status:"applied"
        },
    {
            id:"908-stadium",
            company_name:"Stadium",
            job_title:"Frontend Developer",
            application_link:"",
            date_applied:"20-2-2026",
            recruiter_email:"recruiter@gmail.com",
            job_description:"want a fresher to engage with our team",
            job_type:'full-time',
            starred:true,
            applied:true,
            createdAt:'3/1/2026',
            status:"applied"
        }]