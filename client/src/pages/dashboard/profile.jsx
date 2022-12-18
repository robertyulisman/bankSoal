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
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
  Select,
  Option,
  DialogFooter,
  Button,
  Textarea,
} from "@material-tailwind/react";
import {
  Cog6ToothIcon,
  PencilIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { ProfileInfoCard } from "@/widgets/cards";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "@/Redux/actions/profileActions";
import {
  editAdmin,
  resetAdmin,
  updateProfileAdmin,
} from "@/Redux/actions/adminActions";
import { apiUrl } from "@/services/api";

export function Profile() {
  const { user } = useSelector((state) => state.profile);
  const { isSuccess, isError } = useSelector((state) => state.admin);
  const [image, setImage] = React.useState("");
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUserProfile(user?._id));
  }, []);

  React.useEffect(() => {
    if (isSuccess) {
      dispatch(getUserProfile(user?._id));
      dispatch(resetAdmin());
    }
    if (isError) {
      dispatch(resetAdmin());
    }
  }, [isSuccess]);

  const [form, setform] = React.useState({
    nama: "",
    email: "",
    password: "",
    mobile: "",
    profileInformation: "",
  });
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);

    setform({
      ...form,
      nama: user.nama,
      email: user.email,
      mobile: user.mobile,
      profileInformation: user.profileInformation,
    });
  };
  const handleChangeText = (e) => {
    const { name, value } = e.target;

    setform({
      ...form,
      [name]: value,
    });
  };

  const handleSubmitModal = () => {
    let data = new FormData();
    data.append("nama", form.nama);
    data.append("email", form.email);
    data.append("mobile", form.mobile);
    data.append("profileInformation", form.profileInformation);
    data.append("image", image);
    dispatch(updateProfileAdmin(user?._id, data));
    // console.log("form", form);
    console.log("image", image);
  };
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
                src={`${apiUrl}/${user?.image}`}
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
                  <PencilIcon
                    onClick={handleOpen}
                    className="h-4 w-4 cursor-pointer text-blue-gray-500"
                  />
                </Tooltip>
              }
            />
          </div>
        </CardBody>
      </Card>

      {/* modal here */}
      <Dialog open={open} handler={() => setOpen(!open)} size="md">
        <DialogHeader>Edit Profile</DialogHeader>

        <DialogBody divider>
          <div className="m-auto flex w-full flex-col gap-5 ">
            <Input
              label="Nama"
              size="lg"
              name="nama"
              value={form.nama}
              onChange={(e) => handleChangeText(e)}
            />
            <Input
              label="Email"
              size="lg"
              name="email"
              value={form.email}
              onChange={(e) => handleChangeText(e)}
            />

            <Input
              label="Mobile"
              size="lg"
              name="mobile"
              value={form.mobile}
              onChange={(e) => handleChangeText(e)}
            />
            <Textarea
              label="Profile Information"
              size="lg"
              name="profileInformation"
              value={form.profileInformation}
              onChange={(e) => handleChangeText(e)}
            />
            <input
              className="rounded-md border-[1px] border-gray-400 py-2 px-2 text-sm hover:cursor-pointer"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
        </DialogBody>

        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setOpen(!open)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmitModal}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default Profile;
