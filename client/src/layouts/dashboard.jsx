import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import { Sidenav, DashboardNavbar, Configurator } from "@/widgets/layout";
import routes from "@/routes";
import routesSuper from "@/routesSuper";
import routesUser from "@/routesUser";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "@/Redux/actions/profileActions";

export function Dashboard() {
  const navigation = useNavigate();
  const dispatchRedux = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  React.useEffect(() => {
    dispatchRedux(getUserProfile(user?._id));
  }, []);

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigation("/");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="flex h-[100vh] items-center justify-center">
        <p>not Authenticated</p>
      </div>
    );
  }

  switch (user.type) {
    case "super admin":
      return (
        <div className="min-h-screen bg-blue-gray-50/50">
          <Sidenav
            routes={routesSuper}
            brandImg={
              sidenavType === "dark"
                ? "/img/logo-ct.png"
                : "/img/logo-ct-dark.png"
            }
          />

          <div className="p-4 xl:ml-80">
            <DashboardNavbar />
            <Configurator />
            <IconButton
              size="lg"
              color="white"
              className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
              ripple={false}
              onClick={() => setOpenConfigurator(dispatch, true)}
            >
              <Cog6ToothIcon className="h-5 w-5" />
            </IconButton>
            <Routes>
              {routesSuper.map(
                ({ layout, pages }) =>
                  layout === "dashboard" &&
                  pages.map(({ path, element }) => (
                    <Route exact path={path} element={element} />
                  ))
              )}
            </Routes>
          </div>
        </div>
      );
    case "admin":
      return (
        <div className="min-h-screen bg-blue-gray-50/50">
          <Sidenav
            routes={routes}
            brandImg={
              sidenavType === "dark"
                ? "/img/logo-ct.png"
                : "/img/logo-ct-dark.png"
            }
          />
          <div className="p-4 xl:ml-80">
            <DashboardNavbar />
            <Configurator />
            <IconButton
              size="lg"
              color="white"
              className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
              ripple={false}
              onClick={() => setOpenConfigurator(dispatch, true)}
            >
              <Cog6ToothIcon className="h-5 w-5" />
            </IconButton>
            <Routes>
              {routes.map(
                ({ layout, pages }) =>
                  layout === "dashboard" &&
                  pages.map(({ path, element }) => (
                    <Route exact path={path} element={element} />
                  ))
              )}
            </Routes>
          </div>
        </div>
      );

    default:
      return (
        <div className="min-h-screen bg-blue-gray-50/50">
          <Sidenav
            routes={routesUser}
            brandImg={
              sidenavType === "dark"
                ? "/img/logo-ct.png"
                : "/img/logo-ct-dark.png"
            }
          />

          <div className="p-4 xl:ml-80">
            <DashboardNavbar />
            <Configurator />
            <IconButton
              size="lg"
              color="white"
              className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
              ripple={false}
              onClick={() => setOpenConfigurator(dispatch, true)}
            >
              <Cog6ToothIcon className="h-5 w-5" />
            </IconButton>
            <Routes>
              {routesUser.map(
                ({ layout, pages }) =>
                  layout === "dashboard" &&
                  pages.map(({ path, element }) => (
                    <Route exact path={path} element={element} />
                  ))
              )}
            </Routes>
          </div>
        </div>
      );
  }
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
