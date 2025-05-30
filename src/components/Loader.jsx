export default function Loader({ label = "Loading movies..." }) {
  return (
    <div className="w-full flex flex-col items-center justify-center py-10 gap-3">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent" />
      <p className="text-gray-400 text-sm">{label}</p>
    </div>
  );
}
