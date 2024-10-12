import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <>
      <div className="flex-between">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Skeleton className="size-[120px] rounded-full bg-slate-800 object-cover" />
          <div className="mt-3">
            <Skeleton className="h-6 w-[200px] bg-slate-800" />
            <Skeleton className="mt-2 h-5 w-[120px] bg-slate-800" />
            <Skeleton className="mt-2 h-4 w-[250px] bg-slate-800" />
          </div>
        </div>
        <Skeleton className="h-10 w-[150px] bg-slate-800" />
      </div>
      <div className="mt-6">
        <h2 className="text-dark200_light800 text-[21px] font-[500]">
          My AI Courses
        </h2>
        <div className="flex flex-wrap gap-2">
          {Array(6)
            .fill("")
            .map((item) => (
              <div
                key={item}
                className="mb-6 flex justify-center border p-2  shadow-sm dark:border-slate-800 "
              >
                <div className="w-[350px]">
                  <Skeleton className="h-[200px] w-full rounded-lg bg-slate-800 object-cover" />
                  <div className="p-2">
                    <div className="flex items-center justify-between gap-1">
                      <Skeleton className="h-6 w-full bg-slate-800" />
                    </div>

                    <Skeleton className="my-2 h-4 w-[60px] bg-slate-800" />

                    <div className="flex items-center justify-between">
                      <Skeleton className="h-7 w-[100px] bg-slate-800" />
                      <Skeleton className="h-7 w-[100px] bg-slate-800" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Loading;
