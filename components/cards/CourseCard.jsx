"use client";
import Image from "next/image";
import React from "react";
import { HiEllipsisVertical, HiOutlineBookOpen } from "react-icons/hi2";

import Link from "next/link";
import { Badge } from "../ui/badge";
import DropdownOptions from "../shared/DropdownOptions";
import { deleteCouses } from "@/lib/actions/courses.action";
import { usePathname } from "next/navigation";

const CourseCard = ({ course, displayUser = false }) => {
  const pathName = usePathname();
  const handleOnDelete = async () => {
    await deleteCouses({
      courseId: course?._id,
      path: pathName,
    });
  };
  return (
    <div className="mt-4 cursor-pointer rounded-lg border p-2  shadow-sm dark:border-slate-800">
      <Link href={`/course/${course?._id}`}>
        <Image
          src={course?.courseBanner}
          width={300}
          height={200}
          className="h-[200px] w-full rounded-lg object-cover"
          alt="courseBanner"
        />
      </Link>
      <div className="p-2">
        <div className="flex items-center justify-between gap-1">
          <h2 className="text-dark200_light800 truncate text-[19px] font-semibold">
            {course?.courseOutput?.course_name}
          </h2>
          {!displayUser && (
            <DropdownOptions handleOnDelete={() => handleOnDelete()}>
              <HiEllipsisVertical className="text-dark500_light500 text-2xl" />
            </DropdownOptions>
          )}
        </div>

        <p className="my-2 text-sm text-gray-400 dark:text-blue-200 ">
          {course?.category}
        </p>
        <div className="flex items-center justify-between">
          <Badge className="background-light800_dark300 text-light400_light500 mt-2 flex  items-center gap-1 rounded-md  border-none px-4 py-2 text-sm">
            <HiOutlineBookOpen /> {course?.courseOutput?.noOfChapters} Chapters
          </Badge>

          <Badge className="background-light800_dark300 text-light400_light500 mt-2  flex items-center gap-1 rounded-md border-none px-4 py-2 text-sm">
            {course?.label}
          </Badge>
        </div>
        {displayUser && (
          <div className="mt-2 flex items-center gap-2">
            <Image
              src={course?.author?.userProfileImage}
              width={30}
              height={30}
              className="rounded-full"
              alt="profileImage"
            />
            <h2 className="text-dark200_light800 text-sm">
              {course?.author?.name || course?.author?.username}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
