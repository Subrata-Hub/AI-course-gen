/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CourseCard from "../cards/CourseCard";
import { Button } from "../ui/button";
import Link from "next/link";

const UserCourses = ({ courses }) => {
  return (
    <div className="mt-6">
      <h2 className="text-dark200_light800 text-[21px] font-[500]">
        My AI Courses
      </h2>

      {courses.length === 0 ? (
        <div className=" flex h-[60vh] flex-col items-center justify-center text-center">
          {/* <h1>You have not created any courses yet</h1> */}
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            No Courses Yet? Start
            <span className="sm:block">Creating your First,</span>
            <span className="sm:block"> AI-Powered Course Today! </span>
          </h1>
          <Link href={"/create-course"} className="mt-8">
            <Button className="primary-gradient mt-4 min-h-[36px] p-3 !text-light-900">
              + Create AI Course
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {courses && courses.length > 0
            ? courses.map((course, index) => (
                <CourseCard course={course} key={index} />
              ))
            : [1, 2, 3, 4, 5, 6].map((item, index) => (
                <div
                  key={index}
                  className="mt-5 h-[250px] w-full animate-pulse rounded-lg bg-slate-300"
                ></div>
              ))}
        </div>
      )}
    </div>
  );
};

export default UserCourses;

// import React from "react";
// import CourseCard from "../cards/CourseCard";
// import { Button } from "../ui/button";
// import Link from "next/link";

// const UserCourses = ({ courses }) => {
//   return (
//     <div className="mt-5">
//       <h2 className="text-dark200_light800 text-[21px] font-[500]">
//         My AI Courses
//       </h2>

//       <div className="grid grid-cols-2 gap-5 md:grid-cols-2 lg:grid-cols-3">
//         {courses.length === 0 ? (
//           <div className=" flex h-[60vh] flex-col items-center justify-center text-center">
//             <h1>You have not created any courses yet</h1>
//             <Link href={"/create-course"}>
//               <Button className="primary-gradient mt-4 min-h-[36px] p-3 !text-light-900">
//                 + Create AI Course
//               </Button>
//             </Link>
//           </div>
//         ) : courses.length > 0 ? (
//           courses.map((course, index) => (
//             <CourseCard course={course} key={index} />
//           ))
//         ) : (
//           [1, 2, 3, 4, 5, 6].map((item, index) => (
//             <div
//               key={index}
//               className="mt-5 h-[250px] w-full animate-pulse rounded-lg bg-slate-300"
//             ></div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserCourses;
