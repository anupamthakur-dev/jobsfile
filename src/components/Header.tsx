import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import logo from '@/assets/jobsFile_logo.svg'
import { Button } from "./ui/button";
import Icon from "./Icon";
import useDialogStore from "@/stores/dialogStore";

export function Header() {
    const {open} = useSidebar();
	const {openAddJobDialog} = useDialogStore();
	return (
		<header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-background/95 px-3 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:h-16 md:px-6">
            {!open &&  <div className={`${open?"w-0":'w-24'} transition-[width]`}>
        <img src={logo} alt="jobsFile's logo" className="w-full" />
        </div>}
			<SidebarTrigger className="-ml-1" />
			<div className="flex min-w-0 flex-1 items-center gap-3 ">
				<h1 className="truncate text-sm font-semibold md:text-base ">Jobs Dashboard</h1>
				<div className="ml-auto ">
					
					<Button onClick={openAddJobDialog}><Icon iconName="Plus"/> Add Job</Button>
				</div>
			</div>
		</header>
	)
}
