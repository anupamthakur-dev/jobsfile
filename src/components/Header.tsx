import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import logo from '@/assets/jobsFile_logo.svg'

import AddJobDialog from "./dialogs/AddJob.dialog"

export function Header() {
    const {open} = useSidebar()
	return (
		<header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-background/95 px-3 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:h-16 md:px-6">
            {!open &&  <div className={`${open?"w-0":'w-24'} transition-[width]`}>
        <img src={logo} alt="jobsFile's logo" className="w-full" />
        </div>}
			<SidebarTrigger className="-ml-1" />
			<div className="flex min-w-0 flex-1 items-center gap-3 ">
				<h1 className="truncate text-sm font-semibold md:text-base ">Jobs Dashboard</h1>
				<div className="ml-auto ">
					<AddJobDialog label="Add Job" variant={'default'}/>
				</div>
			</div>
		</header>
	)
}
