const Loading = () => {
  return (
    <>
      <div className="h-[80vh] flex justify-center items-center">
        <div className="absolute animate-spin rounded-full h-28 w-28 border-t-4 border-b-4 border-blue-600" />
        <img
          src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
          className="rounded-full h-28 w-28"
        />
      </div>
    </>
  );
};

export default Loading;
