import {
  HiOutlineHome,
  HiOutlineSquare3Stack3D,
  HiOutlineShieldCheck,
  HiOutlinePower,
  HiMiniSquares2X2,
  HiLightBulb,
  HiClipboardDocumentCheck,
} from "react-icons/hi2";
export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];

export const dashboardMenu = [
  {
    id: 1,
    name: "Home",
    icon: <HiOutlineHome />,
    path: "/dashboard",
  },
  {
    id: 2,
    name: "Explore",
    icon: <HiOutlineSquare3Stack3D />,
    path: "/dashboard/explore",
  },
  {
    id: 3,
    name: "Upgrade",
    icon: <HiOutlineShieldCheck />,
    path: "/dashboard/upgrade",
  },
  {
    id: 4,
    name: "Logout",
    icon: <HiOutlinePower />,
    path: "/dashboard/logout",
  },
];

export const categoryList = [
  {
    id: 1,
    name: "Programing",
    icon: "/assets/images/programming.png",
    prompt: "",
  },
  {
    id: 2,
    name: "Business",
    icon: "/assets/images/business.png",
    prompt: "",
  },
  {
    id: 3,
    name: "Health",
    icon: "/assets/images/health.png",
    prompt: "",
  },
  {
    id: 4,
    name: "Marketing",
    icon: "/assets/images/marketing.png",
    prompt: "",
  },
  {
    id: 5,
    name: "Personal Development",
    icon: "/assets/images/personal-development.png",
    prompt: "",
  },
  {
    id: 6,
    name: "Academics",
    icon: "/assets/images/academics.png",
    prompt: "",
  },
];

export const StepperOptions = [
  {
    id: 1,
    name: "Category",
    icon: <HiMiniSquares2X2 />,
  },
  {
    id: 2,
    name: "Topic & Desc",
    icon: <HiLightBulb />,
  },
  {
    id: 3,
    name: "Options",
    icon: <HiClipboardDocumentCheck />,
  },
];
