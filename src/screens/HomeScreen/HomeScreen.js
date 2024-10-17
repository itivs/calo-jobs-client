import React from "react";
import useApiData from "../../customHooks/useApisData";
import { createNewJob, getJobsList } from "../../api/apiMethods";
import Loader from "../../components/Loader/Loader";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import moment from "moment";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Spinner from "../../components/Spinner/Spinner";

export default function HomeScreen() {
  const queryClient = useQueryClient();
  //   const getUserProfile = useApiData(
  //     getJobById,
  //     "jobsList",
  //     userData?.employeeId,
  //     userData?.employeeId
  //   );

  const jobsList = useApiData(getJobsList, "jobsList");

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return await createNewJob();
    },
    onSuccess: (res) => {
      console.log("🚀 ~ file: HomeScreen.js:27 ~ HomeScreen ~ res:", res);
      if (res.status === 201) {
        console.log(
          "🚀 ~ file: HomeScreen.js:29 ~ HomeScreen ~ res.status === 201:",
          res.status === 201
        );
        toast.success(res.data.message);
        queryClient.invalidateQueries(["jobsList"]);
      }
    },
    onError: (error) => {
      toast.error("Bad Request");

      // toast.error(err.message);
    },
  });

  const createJob = async () => {
    try {
      await mutate();
    } catch (error) {
      console.log(
        "🚀 ~ file: CreateRiskAssessment.js:453 ~ onSubmit ~ error:",
        error
      );
      toast.error(error?.response?.data.message);
    }
  };

  const listData = jobsList?.data;
  const isLoading = jobsList?.isLoading;
  const isError = jobsList?.isError;
  const error = jobsList?.error;

  if (isError && !isLoading) {
    return <ErrorComponent message={error.message} />;
  }

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Job Processing System</h1>
        <button
          onClick={createJob}
          disabled={isPending}
          className="p-3 flex items-center gap-4 border border-slate-500 text-slate-500 rounded-full"
        >
          {isPending && <Spinner />}Create New Job
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {listData?.map((job) => (
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
            <img
              className="w-96 h-80 mt-4"
              width={100}
              height={100}
              src={job?.result}
              alt="Awaiting ....."
            />
          </div>
        ))}
      </div>
    </div>
  );
}
