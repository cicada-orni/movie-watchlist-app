function ErrorMessage({ error }) {
  return (
    <div className="text-red-400 bg-red-900/30 border border-red-500 px-4 py-3 rounded-md max-w-2xl mx-auto text-center">
      <span className="mr-2 text-lg">⛔</span>
      {error}
    </div>
  );
}

export default ErrorMessage;
