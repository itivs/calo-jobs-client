import moment from "moment";
import React from "react";
import { isImageURL } from "../../utils/utils";

export default function Card(props) {
  const { job } = props;
  console.log("🚀 ~ file: Card.js:7 ~ Card ~ job:", job);
  return (
    <div className="flex flex-col w-full bg-slate-500 p-3 rounded-lg">
      <div className="flex justify-between items-center border-b">
        <p className="capitalize text-green-400 text-small-medium mt-3 mb-6">
          Status:
          <span
            className={`text-xs mx-3 px-2 py-1 rounded-full border w-fit text-white`}
          >
            {job?.status || "----------"}
          </span>
        </p>
        <p className="capitalize text-green-400 text-small-medium mt-3 mb-6">
          Created At:
          <span className={`text-xs px-2 py-1 w-fit text-white`}>
            {moment(job?.createdAt).format("DD MMM YYYY")}
          </span>
        </p>
      </div>
      {job?.status === "resolved" ? (
        <img
          className="w-96 h-80 mt-4"
          width={100}
          height={100}
          src={job?.result}
          alt="Awaiting ....."
        />
      ) : null}
    </div>
  );
}
