"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-[#0F2248] text-white">
          <div className="text-center space-y-4 p-4">
            <h2 className="text-2xl font-bold">Something went wrong!</h2>
            <p className="text-gray-300">Critical error encountered.</p>
            <button
              onClick={() => reset()}
              className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
