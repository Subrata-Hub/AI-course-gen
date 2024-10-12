import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <>
      <div>
        <h2 className="text-[26px] font-bold text-dark-100 dark:text-light-900">
          Explore more Project
        </h2>
        <p className="text-light400_light500 text-sm">
          Explore more project build with AI by other users
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
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

                  <div className="mt-2 flex items-center gap-2">
                    <Skeleton className="size-[40px] rounded-full bg-slate-800" />
                    <Skeleton className="h-5 w-[100px] bg-slate-800" />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Loading;
