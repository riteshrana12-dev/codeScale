const Pulse = ({ className }) => (
  <div className={`bg-white/[0.04] animate-pulse rounded-lg ${className}`} />
);

const DashboardSkeleton = () => (
  <div className="min-h-screen bg-[#060610] p-6 space-y-5">
    {/* header */}
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <Pulse className="h-3 w-24" />
        <Pulse className="h-7 w-48" />
      </div>
      <Pulse className="h-9 w-28 rounded-full" />
    </div>

    {/* top cards */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Pulse className="lg:col-span-2 h-52" />
      <div className="flex flex-col gap-4">
        <Pulse className="flex-1 h-32" />
        <Pulse className="h-24" />
      </div>
    </div>

    {/* middle row */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Pulse className="h-48" />
      <Pulse className="h-48" />
    </div>

    {/* bottom */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Pulse className="lg:col-span-2 h-56" />
      <Pulse className="h-56" />
    </div>
  </div>
);

export default DashboardSkeleton;
