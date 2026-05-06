"use client";

export default function TaskCard({ title, date, status, priority, isDone }) {
  const priorityColors = {
    High: "text-[#ffb4ab]",
    Medium: "text-[#ffb778]",
    Low: "text-[#97cbff]",
  };

  return (
    <div className={`flex flex-col gap-2 p-4 -mx-4 rounded-xl hover:bg-[#161b33] transition-colors cursor-pointer group`}>
      <div className="flex items-center justify-between">
        <h3 className={`text-lg font-medium ${isDone ? 'line-through text-[#bfc7d3]' : 'text-white'}`}>
          {title}
        </h3>
        {isDone && <span className="material-symbols-outlined text-[#a0d0c8]">check_circle</span>}
      </div>
      
      {!isDone && (
        <>
          <div className="flex items-center gap-4 text-sm text-[#bfc7d3]">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">calendar_today</span>
              <span>{date}</span>
            </div>
            {status && (
              <div className="flex items-center gap-1">
                <span className={`material-symbols-outlined text-sm ${status === 'In Progress' ? 'animate-spin' : ''}`}>
                  {status === 'In Progress' ? 'progress_activity' : 'schedule'}
                </span>
                <span>{status}</span>
              </div>
            )}
          </div>
          <div className={`flex items-center gap-2 text-sm ${priorityColors[priority] || 'text-[#bfc7d3]'}`}>
            <span>●</span>
            <span>{priority}</span>
          </div>
        </>
      )}
    </div>
  );
}
