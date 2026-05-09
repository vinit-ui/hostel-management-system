function ErrorMessage({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">

      {/* Error icon */}
      <div className="text-5xl">⚠️</div>

      {/* Message */}
      <p className="text-gray-600 text-sm">{message}</p>

      {/* Retry button */}
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
        >
          Try Again
        </button>
      )}

    </div>
  )
}

export default ErrorMessage
