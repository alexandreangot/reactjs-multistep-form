export const NavigationState = ({ steps, currentStepIndex }) => {
  return (
    <ol className="my-5 flex font-semibold text-gray-400">
      {steps.map((step, index) => (
        <NavigationItem
          key={index}
          number={index}
          title={step.title}
          isVisited={currentStepIndex >= index}
          isLast={index === steps.length - 1}
        />
      ))}
    </ol>
  );
};

const NavigationItem = ({ number, title, isVisited, isLast = false }) => {
  return (
    <li className={"flex items-center"}>
      <span
        className={
          "mr-2 rounded-full border-2 px-2 " +
          (isVisited && " border-blue-500 bg-blue-500 text-white")
        }
      >
        {number + 1}
      </span>
      <span className={"hidden md:inline-block"}>{title}</span>
      {!isLast && (
        <span className="m-5 w-16 border-b border-gray-300 sm:w-36" />
      )}
    </li>
  );
};
