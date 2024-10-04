"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { HiOutlineTrash } from "react-icons/hi2";

const DropdownOptions = ({ children, handleOnDelete }) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className="background-light800_dark400 text-dark300_light700 border dark:border-slate-800">
          <DropdownMenuItem onClick={() => handleOnDelete()}>
            <div className="flex cursor-pointer items-center gap-1">
              <HiOutlineTrash /> Delete
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownOptions;
