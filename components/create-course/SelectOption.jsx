import { useUserInputContext } from "@/context/UserInputProvider";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";

const SelectOption = () => {
  const { userCourseInput, setUserCourseInput } = useUserInputContext();

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };
  return (
    <div className="px-10 md:px-20 lg:px-44">
      <div className="grid grid-cols-2 gap-10">
        <div>
          <label className="text-dark400_light800 from-neutral-300 font-inter text-[12.6px] leading-[9px]">
            Difficulty Label
          </label>
          <Select
            onValueChange={(value) => handleInputChange("lavel", value)}
            defaultValue={userCourseInput?.lavel}
          >
            <SelectTrigger className="background-light900_dark300 light-border-2 dark:light-border text-dark300_light700 mt-0.5 h-[39px]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="text-dark300_light700  rounded border bg-light-900 dark:border-dark-400 dark:bg-dark-300 ">
              <SelectItem
                className="cursor-pointer focus:bg-light-800 dark:focus:bg-dark-400"
                value="Beginner"
              >
                Beginner
              </SelectItem>
              <SelectItem
                className="cursor-pointer focus:bg-light-800 dark:focus:bg-dark-400"
                value="Intermediate"
              >
                Intermediate
              </SelectItem>
              <SelectItem
                className="cursor-pointer focus:bg-light-800 dark:focus:bg-dark-400"
                value="Advance"
              >
                Advance
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-dark400_light800 font-inter text-[13px] leading-[9px]">
            Course Duration
          </label>
          <Select
            onValueChange={(value) => handleInputChange("duration", value)}
            defaultValue={userCourseInput?.duration}
          >
            <SelectTrigger className="background-light900_dark300 light-border-2 text-dark300_light700 dark:light-border mt-1 h-[39px]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="text-dark300_light700  rounded border  bg-light-900  dark:border-dark-400 dark:bg-dark-300 ">
              <SelectItem
                className="cursor-pointer focus:bg-light-800 dark:focus:bg-dark-400"
                value="1 Hours"
              >
                1 Hours
              </SelectItem>
              <SelectItem
                className="cursor-pointer focus:bg-light-800 dark:focus:bg-dark-400"
                value="2 Hours"
              >
                2 Hours
              </SelectItem>
              <SelectItem
                className="cursor-pointer focus:bg-light-800 dark:focus:bg-dark-400"
                value="More than 3 Hours"
              >
                More than 3 Hours
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-dark400_light800 font-inter text-[13px] leading-[9px]">
            Add Video
          </label>
          <Select
            onValueChange={(value) => handleInputChange("displayVideo", value)}
            defaultValue={userCourseInput?.displayVideo}
          >
            <SelectTrigger className="background-light900_dark300 light-border-2 text-dark300_light700 dark:light-border mt-1 h-[39px]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="text-dark300_light700 rounded border bg-light-900  dark:border-dark-400 dark:bg-dark-300 ">
              <SelectItem
                className="cursor-pointer text-left focus:bg-light-800 dark:focus:bg-dark-400"
                value="Yes"
              >
                Yes
              </SelectItem>
              <SelectItem
                className="cursor-pointer focus:bg-light-800 dark:focus:bg-dark-400"
                value="No"
              >
                No
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-dark400_light800 font-inter text-[13px] leading-[9px]">
            No off chapters
          </label>
          <Input
            type="number"
            onChange={(e) => handleInputChange("noOfChapter", e.target.value)}
            defaultValue={userCourseInput?.noOfChapter}
            className="background-light900_dark300 light-border-2 text-dark300_light700 dark:light-border mt-1 h-[38px]"
          />
        </div>
      </div>
    </div>
  );
};

export default SelectOption;
