import React from "react";

export default function ErrorComponent(props) {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <h3 className="text-danger mt-10 text-base-regular ">{props?.message}</h3>
    </div>
  );
}
