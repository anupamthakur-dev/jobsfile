import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"

import { initJobStoreBridge } from "./configs/bridgeJobNav"
import './App.css'
import MainLayout from "./components/MainLayout"
import { Outlet } from "react-router"
import { useEffect } from "react"
import { MvpNotice } from "./components/MvpNotice"

function App() {
  useEffect(()=>{
    const unsub = initJobStoreBridge()
    return unsub;
  },[])
  return (
    <>
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-h-screen">
    <MvpNotice/>
        <MainLayout>
        
          <Outlet/>
        </MainLayout>
      
      </SidebarInset>
    </SidebarProvider>
    </>
  )
}

export default App
