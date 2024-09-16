"use client";
import SelectCategory from "@/components/create-course/SelectCategory";
import SelectOption from "@/components/create-course/SelectOption";
import TopicDescription from "@/components/create-course/TopicDescription";
import { Button } from "@/components/ui/button";
import { StepperOptions } from "@/constants";
import { useUserInputContext } from "@/context/UserInputProvider";
import React, { useState } from "react";

const CreateCourse = () => {
  const { userCourseInput } = useUserInputContext();
  const [activeIndex, setActiveIndex] = useState(0);
  // const [loading, setLoading] = useState(false);

  const checkStatus = () => {
    if (userCourseInput?.length === 0) {
      return true;
    }
    if (
      activeIndex === 0 &&
      (userCourseInput?.category?.length === 0 ||
        userCourseInput?.category === undefined)
    ) {
      return true;
    }

    if (
      activeIndex === 1 &&
      (userCourseInput?.topic?.length === 0 ||
        userCourseInput?.topic === undefined)
    ) {
      return true;
    } else if (
      activeIndex === 2 &&
      (userCourseInput?.lavel === undefined ||
        userCourseInput?.duration === undefined ||
        userCourseInput?.displayVideo === undefined ||
        userCourseInput?.noOfChapter === undefined)
    ) {
      return true;
    }
    return false;
  };
  return (
    <div>
      {/* steper */}
      <div className="flex flex-col items-center justify-center">
        <h2 className="h2-bold mt-8 text-blue-500">Create Course</h2>
        <div className="mt-10 flex">
          {StepperOptions.map((item, index) => (
            <div className="flex items-center" key={item.id}>
              <div className="flex w-[50px] flex-col items-center md:w-[100px]">
                <div
                  className={`rounded-full bg-gray-200 p-3 text-white ${
                    activeIndex >= index && "bg-purple-500"
                  }`}
                >
                  {item.icon}
                </div>
                <h2 className="text-dark200_light800 hidden md:block md:text-sm">
                  {item.name}
                </h2>
              </div>
              {index !== StepperOptions.length - 1 && (
                <div
                  className={`h-1 w-[50px] rounded-full bg-gray-300 md:w-[100px] lg:w-[170px] ${
                    activeIndex - 1 >= index && "bg-purple-500"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 px-10 md:px-20 lg:px-32">
        {activeIndex === 0 ? (
          <SelectCategory />
        ) : activeIndex === 1 ? (
          <TopicDescription />
        ) : (
          <SelectOption />
        )}
        <div className="mt-10 flex justify-between">
          {activeIndex > 0 && (
            <Button
              // disabled={activeIndex === 0}
              onClick={() => setActiveIndex(activeIndex - 1)}
              className="primary-gradient rounded-[8px] px-8 py-4 !text-light-900"
            >
              Previous
            </Button>
          )}
          {activeIndex < 2 && (
            <Button
              disabled={checkStatus()}
              onClick={() => setActiveIndex(activeIndex + 1)}
              className="primary-gradient rounded-[8px] px-8 py-4 !text-light-900"
            >
              Next
            </Button>
          )}

          {activeIndex === 2 && (
            <Button
              className="primary-gradient w-fit rounded-[8px] !text-light-900"
              disabled={checkStatus()}
              // onClick={() => GenerateCourseLayout()}
            >
              Generate course Layout
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
