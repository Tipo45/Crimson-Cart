export default function SkeletonCard() {
  return (
    <div className="bg-tertiary border border-border rounded-xl overflow-hidden animate-pulse">
      <div className="h-64 bg-divider" />
      <div className="p-6 space-y-4">
        <div className="h-4 bg-divider rounded w-1/3" />
        <div className="h-6 bg-divider rounded w-2/3" />
        <div className="h-4 bg-divider rounded w-1/2" />
        <div className="h-10 bg-divider rounded w-full" />
      </div>
    </div>
  );
}