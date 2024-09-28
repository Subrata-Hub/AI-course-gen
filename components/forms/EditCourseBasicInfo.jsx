/* eslint-disable object-shorthand */
"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { updateCourses } from "@/lib/actions/courses.action";
import { usePathname } from "next/navigation";

const EditCourseBasicInfo = ({ course, courseId }) => {
  const [name, setName] = useState(course?.courseOutput?.course_name || "");
  const [description, setDescription] = useState(
    course?.courseOutput?.description || ""
  );

  const pathName = usePathname();

  const onUpdateHandler = async () => {
    await updateCourses({
      courseId,
      updatedData: {
        courseOutput: {
          course_name: name,
          description: description,
          duration: course?.courseOutput?.duration,
          noOfChapters: course?.courseOutput?.noOfChapters,
          displayVideo: course?.courseOutput?.displayVideo,
          chapters: course?.courseOutput?.chapters,
        },
      },
      path: pathName,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* Use div or span instead of a button to avoid nesting */}
        <div className="inline-flex px-2">
          <HiOutlinePencilSquare />
        </div>
      </DialogTrigger>
      <DialogContent className="text-dark200_light800 border bg-light-900 dark:border-slate-700 dark:bg-dark-100">
        <DialogHeader>
          <DialogTitle className="text-[22px]">
            Edit Course Title & Description
          </DialogTitle>
          <DialogDescription>
            <div className="mt-4">
              <label>Course Title</label>
              <Input
                className="text-dark500_light500 mt-1 border-gray-200 text-[13.5px] dark:border-slate-800"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mt-3">
              <label>Description</label>
              <Textarea
                className="text-dark500_light500 mt-1 h-28 border-gray-200  text-[13.5px] dark:border-slate-800"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            {/* Use Button here without nesting in a DialogClose button */}
            <Button
              className="primary-gradient  min-h-[36px] rounded-xl px-6 py-4 !text-light-900"
              onClick={onUpdateHandler}
            >
              Update
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCourseBasicInfo;
