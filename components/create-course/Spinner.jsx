import React from "react";

const Spinner = ({ sized }) => {
  return (
    <div
    // className={`fixed left-1/2 ${position} transform -translate-x-1/2 ${
    //   show ? "visible" : "invisible"
    // }`}
    >
      <div
        className={`animate-spin rounded-full border-x-2 border-t-2 border-solid border-indigo-900 ${sized}`}
      ></div>
    </div>
  );
};

export default Spinner;
