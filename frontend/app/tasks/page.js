import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import TaskCard from "@/components/TaskCard";

export const metadata = {
  title: "Tasks - Slotify",
  description: "Manage your tasks and schedule with Slotify.",
};

const tasks = [
  { title: "Review and approve final banners and social copy.", date: "Oct 24", status: "In Progress", priority: "Medium", isDone: false },
  { title: "Update Onboarding Flow", date: "Oct 26", status: "Scheduled", priority: "High", isDone: false, section: "TO DO 1" },
  { title: "Weekly Sync Prep", date: "Oct 28", status: "Scheduled", priority: "Low", isDone: false },
  { title: "Draft Release Notes v2.1", date: "Oct 20", status: "Done", priority: "Low", isDone: true, section: "DONE 1" },
];

export default function TasksPage() {
  return (
    <div className="flex min-h-screen bg-[#0b1026] text-white font-sans antialiased">
      <Sidebar />

      <main className="flex-1 flex flex-col min-h-screen md:ml-64 relative h-screen overflow-y-auto custom-scrollbar">
        <Header title="Tasks" />

        <div className="p-8 max-w-4xl w-full mx-auto flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#bfc7d3]">search</span>
              <input 
                type="text" 
                placeholder="Search tasks..." 
                className="w-full bg-[#161b33] border border-[#2d3656] rounded-full py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#97cbff] shadow-inner"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
              <button className="px-5 py-2 rounded-full border border-[#2d3656] flex items-center gap-2 text-sm bg-[#212946] whitespace-nowrap">
                <span className="material-symbols-outlined text-sm">filter_list</span> Filter
              </button>
              <button className="px-5 py-2 rounded-full bg-[#1197e8] text-white text-sm font-bold whitespace-nowrap shadow-lg">All</button>
              <button className="px-5 py-2 rounded-full border border-[#2d3656] text-[#bfc7d3] text-sm hover:bg-[#212946] whitespace-nowrap">In Progress</button>
              <button className="px-5 py-2 rounded-full border border-[#2d3656] text-[#bfc7d3] text-sm hover:bg-[#212946] whitespace-nowrap">High Priority</button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {tasks.map((task, idx) => (
              <div key={task.title}>
                {task.section && (
                  <h2 className="text-xs font-bold tracking-[0.2em] text-[#bfc7d3] mt-8 mb-4 uppercase">
                    {task.section}
                  </h2>
                )}
                <TaskCard {...task} />
                {idx < tasks.length - 1 && !tasks[idx+1].section && <hr className="border-[#2d3656] my-2 opacity-50" />}
              </div>
            ))}
          </div>
        </div>
      </main>
      <MobileNav />
    </div>
  );
}
