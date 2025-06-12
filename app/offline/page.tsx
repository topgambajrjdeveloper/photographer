"use client"

export default function OfflinePage() {
  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="text-3xl font-bold mb-6">You're offline</h1>
      <p className="text-neutral-300 text-center max-w-md mb-8">
        It looks like you're currently offline. Please check your internet connection and try again.
      </p>
      <div className="w-24 h-24 rounded-full bg-neutral-700 flex items-center justify-center mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="1" y1="1" x2="23" y2="23"></line>
          <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path>
          <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path>
          <path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path>
          <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path>
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
          <line x1="12" y1="20" x2="12.01" y2="20"></line>
        </svg>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-md transition-colors"
      >
        Try Again
      </button>
    </div>
  )
}
