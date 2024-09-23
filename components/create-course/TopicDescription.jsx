import { useUserInputContext } from "@/context/UserInputProvider";
import React from "react";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

const TopicDescription = () => {
  const { userCourseInput, setUserCourseInput } = useUserInputContext();

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };
  return (
    <div className="mx-10 lg:mx-40">
      <div className="mt-5">
        <label className="text-dark400_light800">
          Write the topic for which you want to generate a course (e.g., Python
          course, Yoga, etc):
        </label>
        <Input
          placeholder={"Topic"}
          className="background-light900_dark300 light-border-2 dark:light-border text-dark300_light700  placeholder mt-1.5  min-h-[56px] text-lg"
          defaultValue={userCourseInput?.topic}
          onChange={(e) => handleInputChange("topic", e.target.value)}
        />
      </div>
      <div className="mt-5">
        <label className="text-dark400_light800">
          Tell us more about your course, what you want to include in the
          course(Optional).
        </label>
        <Textarea
          placeholder="About your course"
          defaultValue={userCourseInput?.description}
          className="background-light900_dark300 light-border-2 text-dark300_light700 placeholder  mt-1.5 min-h-24  border text-lg"
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
      </div>
    </div>
  );
};

export default TopicDescription;

// no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border
// text-dark400_light500 background-light700_dark400 h-14 text-lg
