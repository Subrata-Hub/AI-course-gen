import React, { useEffect, useState } from "react";

const ProgressBar = ({
  value,
  color = "bg-gray-700",
  trackColor = "bg-gray-200 dark:bg-gray-700",
}) => {
  const [progress, setProgress] = useState(0);

  // Animate the progress bar to the desired value
  useEffect(() => {
    setProgress(value);
  }, [value]);

  return (
    <div className={`h-[10px] w-full ${trackColor} rounded-full`}>
      <div
        className={`${color} h-full rounded-full transition-all duration-700 ease-in-out`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
