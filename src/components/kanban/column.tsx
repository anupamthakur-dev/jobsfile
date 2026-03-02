import type { ColumnKey } from "@/types";
import { useDroppable } from "@dnd-kit/core";

function KanbanColumn({
  id,
  isCollapsed,
  header,
  children,
}: {
  id: ColumnKey;
  isCollapsed: boolean;
  header: React.ReactNode;
  children: React.ReactNode;
}) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="rounded-lg border bg-muted/30 p-3 "
    >
      {header}

      {!isCollapsed && (
        <div className="flex-1 min-h-0 max-h-[calc(100vh-220px)] overflow-y-auto  overflow-x-hidden hide-scrollBar">
          {children}
        </div>
      )}
    </div>
  );
}
export default KanbanColumn;