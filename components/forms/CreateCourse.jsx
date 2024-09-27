"use client";
import { StepperOptions } from "@/constants";
import { createCourses } from "@/lib/actions/courses.action";
import { generateCourseLayoutAI } from "@/lib/AiModel";
import { useEffect, useState } from "react";
import SelectCategory from "../create-course/SelectCategory";
import TopicDescription from "../create-course/TopicDescription";
import SelectOption from "../create-course/SelectOption";
import { Button } from "../ui/button";
import LoadingDialog from "../create-course/LoadingDialog";
import { useUserInputContext } from "@/context/UserInputProvider";
import { useRouter } from "next/navigation";
// import Courses from "@/database/courses.model";

const CreateCourse = ({ mongoUserId }) => {
  const { userCourseInput } = useUserInputContext();
  const [activeIndex, setActiveIndex] = useState(0);

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log(userCourseInput);
  }, [userCourseInput]);

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

  const generateCourseLayout = async () => {
    setLoading(true);
    const BASIC_PROMPT =
      "Generate a Course Tutorial on following Detail with field as Course Name, Description,Duration,noOfChapter,displayVideo Along with Chapter Name, About, Duration: ";
    const USER_INPUT_PROMPT = `Category: ${userCourseInput?.category}, Topic: ${userCourseInput?.topic}, Level: ${userCourseInput?.lavel}, Duration: ${userCourseInput?.duration}, no Of Chapters: ${userCourseInput?.noOfChapter}, in JSON format`;
    const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;
    console.log(FINAL_PROMPT);
    const result = await generateCourseLayoutAI.sendMessage(FINAL_PROMPT);
    console.log(result?.response.text());
    console.log(JSON.parse(result?.response.text()));

    saveCourseLayoutInDB(JSON.parse(result.response?.text()));
    // saveCourseLayoutInDB(JSON.parse(JSON.stringify(result?.response.text())));
  };

  const saveCourseLayoutInDB = async (courseLayout) => {
    try {
      const createdCourse = await createCourses({
        name: userCourseInput?.topic,
        label: userCourseInput?.lavel,
        category: userCourseInput?.category,
        courseOutput: courseLayout,
        author: JSON.parse(mongoUserId),
      });

      console.log("Created Course:", createdCourse);
      setLoading(false);
      // Check if the course has been created successfully and has an _id
      if (createdCourse && createdCourse._id) {
        // Redirect to the new course page using the course _id

        router.replace(`/create-course/${createdCourse._id}`);
      } else {
        console.error("Failed to get course ID after creation.");
      }
    } catch (error) {
      console.error("Error saving course layout:", error);
    }
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
              onClick={() => generateCourseLayout()}
            >
              Generate course Layout
            </Button>
          )}
        </div>
      </div>
      <LoadingDialog loading={loading} />
    </div>
  );
};

export default CreateCourse;
