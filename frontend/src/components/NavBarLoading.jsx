
const Loading = () => {
  return (
    <div className="relative flex justify-center items-center">
      <div className="absolute animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-600" />
      <img
        src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
        className="rounded-full h-10 w-10"
      />
    </div>
  );
};

export default Loading;
