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

const EditChapter = ({ course, index, courseId }) => {
  const [name, setName] = useState(
    course.courseOutput.chapters[index].chapter_name || ""
  );
  const [about, setAbout] = useState(
    course.courseOutput.chapters[index].about || ""
  );

  const pathName = usePathname();

  //   const onUpdateHandler = async () => {
  //     // Create a copy of the existing chapters array
  //     const updatedChapters = [...course.courseOutput.chapters];

  //     // Update the specific chapter at the given index
  //     updatedChapters[index] = {
  //       ...updatedChapters[index],
  //       chapter_name: name,
  //       about: about,
  //     };
  //     await updateCourses({
  //       courseId,
  //       updatedData: {
  //         courseOutput: {
  //           course_name: course?.courseOutput?.course_name,
  //           description: course?.courseOutput?.description,
  //           duration: course?.courseOutput?.duration,
  //           noOfChapters: course?.courseOutput?.noOfChapters,
  //           displayVideo: course?.courseOutput?.displayVideo,
  //           chapters: updatedChapters,
  //         },
  //       },
  //       path: pathName,
  //     });
  //   };

  const onUpdateHandler = async () => {
    try {
      // Create a copy of the existing chapters array
      const updatedChapters = [...course.courseOutput.chapters];

      // Update the specific chapter at the given index
      updatedChapters[index] = {
        ...updatedChapters[index],
        chapter_name: name,
        about: about,
      };

      await updateCourses({
        courseId,
        updatedData: {
          courseOutput: {
            course_name: course?.courseOutput?.course_name,
            description: course?.courseOutput?.description,
            duration: course?.courseOutput?.duration,
            noOfChapters: course?.courseOutput?.noOfChapters,
            displayVideo: course?.courseOutput?.displayVideo,
            chapters: updatedChapters,
          },
        },
        path: pathName,
      });
      console.log("Course updated successfully");
    } catch (error) {
      console.error("Failed to update course:", error); // Log the error
    }
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
            Edit Chapter & About
          </DialogTitle>
          <DialogDescription>
            <div className="mt-4">
              <label>Chapter Name</label>
              <Input
                className="text-dark500_light500 mt-1 border-gray-200 text-[13.5px] dark:border-slate-800"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mt-3">
              <label>About</label>
              <Textarea
                className="text-dark500_light500 mt-1 h-28 border-gray-200  text-[13.5px] dark:border-slate-800"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
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

export default EditChapter;
