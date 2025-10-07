export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="relative w-16 h-16">
        <div className="absolute w-full h-full border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute w-10 h-10 top-3 left-3 border-4 border-green-400 border-b-transparent rounded-full animate-spin-slow"></div>
      </div>
    </div>
  );
}
