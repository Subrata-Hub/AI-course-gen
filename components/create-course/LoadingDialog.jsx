import React from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

const LoadingDialog = ({ loading }) => {
  return (
    <AlertDialog open={loading} className="border-none">
      <AlertDialogContent className="bg-light-900  dark:bg-dark-100">
        <AlertDialogHeader>
          <VisuallyHidden>
            <AlertDialogTitle>Title of the Dialog</AlertDialogTitle>
          </VisuallyHidden>

          <div className="flex flex-col items-center bg-light-900   dark:bg-dark-100">
            <Image
              src={"/assets/images/update.gif"}
              width={150}
              height={150}
              alt="loader"
            />
            <AlertDialogDescription className="text-dark200_light800 mt-4">
              <span>Please wait.. AI Working on your Course</span>
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LoadingDialog;
