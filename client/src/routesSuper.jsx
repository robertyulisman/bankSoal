import {
  HomeIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  UserGroupIcon,
  BriefcaseIcon,
  BookOpenIcon,
  QueueListIcon,
  ServerStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Admin } from "@/pages/dashboard";
import { SignIn } from "@/pages/auth";
import Kelas from "./pages/dashboard/kelas";
import Pelajaran from "./pages/dashboard/pelajaran";
import Kategori from "./pages/dashboard/kategori";
import BankSoal from "./pages/dashboard/bankSoal";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routesSuper = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
    ],
  },

  {
    title: "Menu",
    layout: "dashboard",
    pages: [
      {
        icon: <BriefcaseIcon {...icon} />,
        name: "kelas",
        path: "/kelas",
        element: <Kelas />,
      },
      {
        icon: <BookOpenIcon {...icon} />,
        name: "pelajaran",
        path: "/pelajaran",
        element: <Pelajaran />,
      },
      {
        icon: <QueueListIcon {...icon} />,
        name: "kategori",
        path: "/kategori",
        element: <Kategori />,
      },
      {
        icon: <ServerStackIcon {...icon} />,
        name: "bank soal",
        path: "/bank_soal",
        element: <BankSoal />,
      },
    ],
  },
  {
    title: "User",
    layout: "dashboard",
    pages: [
      {
        icon: <UserGroupIcon {...icon} />,
        name: "admin",
        path: "/admin",
        element: <Admin />,
      },
    ],
  },
  {
    title: "Setting",
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

export default routesSuper;
