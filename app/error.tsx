"use client";

import { useEffect } from "react";
import { Container } from "./components/shared/Container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error caught:", error);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    console.error("Error digest:", error.digest);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-20">
      <Container>
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Something went wrong!
          </h2>
          <p className="text-gray-300 text-lg">
            We encountered an error while loading this content. This might be
            due to a connection issue or a temporary glitch.
          </p>
          <div className="pt-4">
            <button
              onClick={() => reset()}
              className="relative overflow-hidden bg-[linear-gradient(90deg,var(--darkBlue,#1E448F)_0%,#4C9DFE_100%)] inline-flex 
                h-11 sm:h-12 md:h-[53px] lg:h-14
                px-6 sm:px-8 md:px-10
                py-2.5 justify-center items-center 
                gap-2.5 md:gap-[15px] lg:gap-4 
                rounded-[28px] md:rounded-[33px]
                cursor-pointer text-white font-medium hover:opacity-90 transition-opacity"
            >
              Try again
            </button>
          </div>
          {process.env.NODE_ENV === "development" && (
            <div className="mt-8 p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-left overflow-auto max-h-60">
              <p className="text-red-400 font-mono text-sm whitespace-pre-wrap">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-gray-500 font-mono text-xs mt-2">
                  Digest: {error.digest}
                </p>
              )}
            </div>
          )}
          {/* Temporarily show error in production for debugging */}
          {process.env.NODE_ENV === "production" && (
            <div className="mt-8 p-4 bg-yellow-900/20 border border-yellow-500/50 rounded-lg text-left overflow-auto max-h-60">
              <p className="text-yellow-400 font-mono text-sm whitespace-pre-wrap">
                Debug: {error.message || "No error message"}
              </p>
              {error.digest && (
                <p className="text-gray-500 font-mono text-xs mt-2">
                  Digest: {error.digest}
                </p>
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
