import {
  DndContext,
  DragOverlay,
  pointerWithin,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  type CollisionDetection,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";

import { useJobs } from "@/stores/jobs.store";
import DNDJobCard from "./card";
import Icon from "../Icon";
import type { ColumnKey} from "@/types";
import { useState } from "react";
import KanbanColumn from "./column";
import { KANBAN_COLUMNS } from "@/constant";
import CardJob from "../cards/JobCard";






export default function KanbanBoard() {
  const jobs = useJobs((s) => s.jobs);
  const updateJob = useJobs((s) => s.updateJob);
 
  const nonArchievedJobs = jobs.filter((job)=>!job.archived)

 

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const [collapsed, setCollapsed] = useState<Record<ColumnKey, boolean>>(
    () =>
      Object.fromEntries(
        KANBAN_COLUMNS.map((c) => [
          c.key,
          Boolean(c.defaultCollapsed),
        ])
      ) as Record<ColumnKey, boolean>
  );
  const [activeJobId, setActiveJobId] = useState<string | null>(null);

  const activeJob =
    nonArchievedJobs.find((job) => job.id === activeJobId) ?? null;

  const collisionDetectionStrategy: CollisionDetection =
    (args) => {
      const pointerIntersections = pointerWithin(args);
      if (pointerIntersections.length > 0) {
        return pointerIntersections;
      }

      return closestCorners(args);
    };

  function toggleColumn(key: ColumnKey) {
    setCollapsed((p) => ({ ...p, [key]: !p[key] }));
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveJobId(String(event.active.id));
  }

  function handleDragCancel() {
    setActiveJobId(null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveJobId(null);

    if (!over) return;

    const activeJob = nonArchievedJobs.find((j) => j.id === active.id);
    if (!activeJob) return;

    const overId = String(over.id);
    const overContainerId =
      over.data.current?.sortable?.containerId;

    let targetStatus: ColumnKey | undefined;

    if (KANBAN_COLUMNS.some((column) => column.key === overId)) {
      targetStatus = overId as ColumnKey;
    } else if (
      overContainerId &&
      KANBAN_COLUMNS.some(
        (column) => column.key === overContainerId
      )
    ) {
      targetStatus = overContainerId as ColumnKey;
    } else {
      const overJob = nonArchievedJobs.find((j) => j.id === overId);
      targetStatus = overJob?.status;
    }

    if (!targetStatus || activeJob.status === targetStatus) return;

    updateJob({ id: activeJob.id, status: targetStatus });
  }

   if(nonArchievedJobs.length ===0) return ;

  return (
    <section className="grid grid-rows-[auto_1fr] h-full   ">
      <h1 className="font-bold">All Jobs</h1>

    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 h-full ">
        {KANBAN_COLUMNS.map((column) => {
          const isCollapsed = collapsed[column.key];
          const columnJobs = nonArchievedJobs.filter(
            (j) => (j.status === column.key)
          );

          return (
            <KanbanColumn
              key={column.key}
              id={column.key}
              isCollapsed={isCollapsed}
              header={
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon iconName={column.icon} />
                    <h3 className="font-semibold">
                      {column.label}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      {columnJobs.length}
                    </Badge>

                    {column.collapsible && (
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                          toggleColumn(column.key)
                        }
                      >
                        {isCollapsed ? (
                          <ChevronRight className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              }
            >
              <SortableContext
                id={column.key}
                items={columnJobs.map((j) => j.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2 flex-1 ">
                  {columnJobs.map((job) => (
                    <DNDJobCard key={job.id} job={job} />
                  ))}
                </div>
              </SortableContext>
            </KanbanColumn>
          );
        })}
      </div>

      <DragOverlay>
        {activeJob ? (
          <CardJob job={activeJob} />
        ) : null}
      </DragOverlay>
    </DndContext>
       </section>
  );
}

