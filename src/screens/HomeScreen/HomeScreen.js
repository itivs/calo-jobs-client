import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { createNewJob, getJobsList } from "../../api/apiMethods";
import Card from "../../components/Card/Card";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import Loader from "../../components/Loader/Loader";
import Spinner from "../../components/Spinner/Spinner";
import useApiData from "../../customHooks/useApisData";

export default function HomeScreen() {
  const queryClient = useQueryClient();

  const jobsList = useApiData(getJobsList, "jobsList");

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return await createNewJob();
    },
    onSuccess: (res) => {
      if (res.status === 201) {
        toast.success(res.data.message);
        queryClient.invalidateQueries(["jobsList"]);
      }
    },
    onError: (error) => {
      toast.error("Bad Request");
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
          <React.Fragment key={job.id}>
            <Card job={job} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
