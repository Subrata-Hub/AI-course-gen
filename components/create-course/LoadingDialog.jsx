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
    <AlertDialog open={loading}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <VisuallyHidden>
            <AlertDialogTitle>Title of the Dialog</AlertDialogTitle>
          </VisuallyHidden>
          <AlertDialogDescription>
            <div className="flex flex-col items-center py-10">
              <Image
                src={"/loading.gif"}
                width={100}
                height={100}
                alt="loder"
              />
              <h2>Please wait.. AI Working on your Course</h2>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LoadingDialog;
