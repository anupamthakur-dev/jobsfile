import { create } from "zustand";
import type { IJobWithId } from "./jobs.store";

interface IDialogStore{
    isAddJobDialog:boolean;
    isUpdateJobDialog:boolean;
    isAlertDialog:boolean;
    targetJobId:IJobWithId['id']|null;
    openAddJobDialog():void;
    closeAddJobDialog():void;
    openUpdateJobDialog(id:IJobWithId['id']):void;
    closeUpdateJobDialog():void;
    openAlertDialog(id:IJobWithId['id']):void;
    closeAlertDialog():void;
}

const useDialogStore = create<IDialogStore>((set)=>{

    return{
     isAddJobDialog:false,
     isUpdateJobDialog:false,
     isAlertDialog:false,
     targetJobId:null,
     openAddJobDialog(){
        set({isAddJobDialog:true})
     },
     closeAddJobDialog(){set({isAddJobDialog:false})},
     openUpdateJobDialog(id){set({isUpdateJobDialog:true,targetJobId:id})},
     closeUpdateJobDialog(){set({isUpdateJobDialog:false,targetJobId:null})},
     openAlertDialog(id){set({isAlertDialog:true,targetJobId:id})},
    closeAlertDialog(){set({isAlertDialog:false,targetJobId:null})},
    }
})

export default useDialogStore;