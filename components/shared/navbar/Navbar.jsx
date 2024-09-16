"use client";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Theme from "./Theme";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { user } = useUser();
  return (
    <nav className="background-light900_dark200 flex-between fixed z-50 w-full  p-4 shadow-light-300 dark:shadow-none sm:px-8">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/assets/images/logocircle.png"
          width={52}
          height={52}
          alt="coursegen"
        />
        <p className="h2-bold font-spaceGrotesk text-[26px] text-dark-100 dark:text-light-900">
          Course <span className="text-primary-500">Gen</span>
        </p>
      </Link>

      <div className="flex-between gap-5">
        <Theme />
        {!user ? (
          <Link href="/dashboard">
            <Button className="primary-gradient min-h-[36px] px-4 py-3 !text-light-900">
              Get Started
            </Button>
          </Link>
        ) : (
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10",
                },
                variables: {
                  colorPrimary: "#ff7000",
                },
              }}
            />
          </SignedIn>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
