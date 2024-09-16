"use client";
import { categoryList } from "@/constants";
import { useUserInputContext } from "@/context/UserInputProvider";
import Image from "next/image";

const SelectCategory = () => {
  const { userCourseInput, setUserCourseInput } = useUserInputContext();

  const handleCategoryChange = (category) => {
    setUserCourseInput((prev) => ({
      ...prev,
      category,
    }));
  };

  return (
    <div className="px-10 md:px-20">
      <h2 className="text-light900_dark100 my-4 ">
        Select the Course Category
      </h2>
      <div className="grid grid-cols-3 gap-10 ">
        {categoryList.map((item, index) => (
          <div
            className={`flex cursor-pointer flex-col items-center rounded-xl border bg-light-900 p-4 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-950 hover:dark:bg-blue-950 ${
              userCourseInput?.category === item.name &&
              "border-primary-100 bg-slate-100 dark:bg-blue-950"
            }`}
            onClick={() => handleCategoryChange(item.name)}
            key={index}
          >
            <Image src={item.icon} width={50} height={50} alt="cateImg" />
            <h2 className="text-dark200_light800">{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectCategory;

// light-border-2
// border-primary bg-blue-50

// background-light900_dark300

// bg-stone-950
