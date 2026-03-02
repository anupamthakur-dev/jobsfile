
import { create } from "zustand"
import type { IJobWithId } from "./jobs.store";

export interface IJobFormState {
    value: IJobWithId
    update(data: Partial<IJobWithId>): void;
    reset():void
    initFormState(data:IJobWithId):void
}
const initialState: IJobWithId = {
    id:'',
    company_name: "",
    job_title: "",
    job_description: "",
    application_link: "",
    recruiter_email: "",
    date_applied: "",
    job_type:'full-time',
    applied:false,
    createdAt:'',
    starred:false,
    status:'applied',
    archived:false

};


export const useJobFormState = create<IJobFormState>((set) => {
    return {
        value: {...initialState},
        update(data) {
            set((state) => ({ value: { ...state.value, ...data } }))
        },
        reset(){set({value:{...initialState}})},
        initFormState(data) {
            set({value:{...data}})
        },
    }
})