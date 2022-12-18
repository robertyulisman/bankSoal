import {
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { Profile } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import BankSoal from "./pages/dashboard/bankSoal";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    title: "Menu",
    layout: "dashboard",
    pages: [
      {
        icon: <UserGroupIcon {...icon} />,
        name: "bank soal",
        path: "/home",
        element: <BankSoal />,
      },
    ],
  },

  {
    title: "User",
    layout: "dashboard",
    pages: [
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
    ],
  },

  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
];

export default routes;
