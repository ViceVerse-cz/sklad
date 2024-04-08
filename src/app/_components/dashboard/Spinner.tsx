export const Spinner = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center">
      <img src="/spinner.svg" alt="Loading spinner" className="h-16 w-16" />
    </div>
  );
};
