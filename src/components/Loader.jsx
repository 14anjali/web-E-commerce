export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center
                    bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center gap-4">
        
        {/* Spinner */}
        <div
          className="w-12 h-12 border-4 border-gray-300 
                     border-t-blue-600 dark:border-gray-600 
                     dark:border-t-blue-400 rounded-full animate-spin"
        />

        {/* Text */}
        <p className="text-gray-600 dark:text-gray-300 font-medium">
          Loading...
        </p>
      </div>
    </div>
  );
}
