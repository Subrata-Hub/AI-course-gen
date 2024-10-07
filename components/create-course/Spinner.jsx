import React from "react";

const Spinner = ({ sized }) => {
  return (
    <div>
      <div
        className={`animate-spin rounded-full border-x-2 border-t-2 border-solid border-green-500 bg-gray-950 ${sized}`}
      ></div>
    </div>
  );
};

export default Spinner;
