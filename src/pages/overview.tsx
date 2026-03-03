import KanbanBoard from "@/components/kanban/KanbanBoard";

function Overview() {
  return (
    <section className="grid grid-rows-[auto_1fr] h-full   ">
      <h1 className="font-bold">All Jobs</h1>

      <div className="">
        <KanbanBoard />
      </div>
    </section>
  );
}
export default Overview;
