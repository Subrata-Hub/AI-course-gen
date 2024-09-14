import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Theme from "./Theme";

const Navbar = () => {
  return (
    <nav className="background-light900_dark200 flex-between fixed z-50 w-full  p-4 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/assets/images/logocircle.png"
          width={40}
          height={40}
          alt="coursegen"
        />
        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900">
          Course<span className="text-primary-500">Gen</span>
        </p>
      </Link>

      <div className="flex-between gap-5">
        <Theme />
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
      </div>
    </nav>
  );
};

export default Navbar;
