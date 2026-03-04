

export function ArchievedNotice({archievedDate,handleRestore}:{archievedDate:string,handleRestore:()=>void}) {
 
  return (
    <div className="sticky top-0 z-50 w-full border-b bg-primary/60 backdrop-blur relative my-2">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2 text-xs text-foreground">
        <div className="flex items-center gap-2 ">
          <span className="font-medium text-foreground">
            Archieved job
          </span>
          <span>•</span>
          <span>
           This job was archived on {archievedDate}. <span className="underline cursor-pointer font-semibold" onClick={handleRestore}>Restore job</span>
          </span>
        </div>

      </div>
    </div>
  );
}