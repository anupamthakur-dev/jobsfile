import { X } from "lucide-react";
import { useState } from "react";

export function MvpNotice() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-primary/60 backdrop-blur relative">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-2 ">
          <span className="font-medium text-foreground">
            MVP in progress
          </span>
          <span>•</span>
          <span>
            JobsFile is actively evolving. UI and features may change as the
            product improves day by day.
          </span>
        </div>

        <button
          onClick={() => setVisible(false)}
          className="rounded-sm p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground absolute top-[50%] -translate-y-[50%] left-[calc(100%-5%)] "
          aria-label="Dismiss notice"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}