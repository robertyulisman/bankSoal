import React from "react";
import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Tooltip,
} from "@material-tailwind/react";
import {
  Cog6ToothIcon,
  PencilIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { ProfileInfoCard } from "@/widgets/cards";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "@/Redux/actions/profileActions";

export function Profile() {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUserProfile(user?._id));
  }, []);
  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src="/img/bruce-mars.jpeg"
                alt={user?.nama}
                size="xl"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  {user?.nama}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  {user?.jabatan}
                </Typography>
              </div>
            </div>
            <div className="w-96">
              <Tabs value="app">
                <TabsHeader>
                  <Tab value="app">
                    <UserCircleIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    User
                  </Tab>

                  <Tab value="settings">
                    <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    Settings
                  </Tab>
                </TabsHeader>
              </Tabs>
            </div>
          </div>
          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
            <ProfileInfoCard
              title="Profile Information"
              description={user?.profileInformation}
              details={{
                name: user?.nama,
                mobile: user?.mobile,
                email: user?.email,
                // location: "USA",
                social: (
                  <div className="flex items-center gap-4">
                    <i className="fa-brands fa-facebook text-blue-700" />
                    <i className="fa-brands fa-twitter text-blue-400" />
                    <i className="fa-brands fa-instagram text-purple-500" />
                  </div>
                ),
              }}
              action={
                <Tooltip content="Edit Profile">
                  <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                </Tooltip>
              }
            />
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
