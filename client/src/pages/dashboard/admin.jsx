import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Tooltip,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Input,
  Select,
  Option,
  Chip,
  Avatar,
} from "@material-tailwind/react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  addAdmin,
  deleteAdmin,
  editAdmin,
  getAdmin,
  resetAdmin,
} from "@/Redux/actions/adminActions";
import swal from "sweetalert";
import { apiUrl } from "@/services/api";

export function Admin() {
  const dispatch = useDispatch();
  const { data, isSuccess, isError } = useSelector((state) => state.admin);

  const [open, setOpen] = React.useState(false);
  const [typeModal, setTypeModal] = React.useState("add");
  const [idSelected, setIdSelected] = React.useState(null);
  const [form, setform] = React.useState({
    nama: "",
    email: "",
    password: "",
    mobile: "",
    type: "",
  });

  React.useEffect(() => {
    dispatch(getAdmin());
  }, []);

  React.useEffect(() => {
    if (isSuccess) {
      dispatch(getAdmin());
      dispatch(resetAdmin());
    }
    if (isError) {
      dispatch(getAdmin());
      dispatch(resetAdmin());
    }
  }, [isSuccess, isError]);

  const handleOpen = (type, item) => {
    setTypeModal(type);
    setOpen(!open);

    if (item !== undefined) {
      setform({
        ...form,
        nama: item.nama,
        email: item.email,
        mobile: item.mobile,
      });
      setIdSelected(item._id);
    } else {
      setform({
        ...form,
        nama: "",
        email: "",
        mobile: "",
        password: "",
        type: "",
      });
    }
  };
  const handleChangeText = (e) => {
    const { name, value } = e.target;

    setform({
      ...form,
      [name]: value,
    });
  };
  const handleChangeSelect = (value) => {
    setform({
      ...form,
      type: value,
    });
  };

  const handleSubmitModal = () => {
    if (typeModal === "add") {
      dispatch(addAdmin(form));
    } else {
      dispatch(editAdmin(idSelected, form));
    }
    console.log("form", form);
  };

  const handleDelete = (_id) => {
    swal({
      title: "Delete User",
      text: "Want to Delete this User ? this will deleted permanently.",
      icon: "warning",
      dangerMode: true,
      buttons: {
        cancel: true,
        confirm: {
          visible: true,
          text: "Delete",
        },
      },
    }).then((value) => {
      value == !null && dispatch(deleteAdmin(_id));
    });
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-8 flex items-center justify-between p-6"
        >
          <Typography variant="h6" color="white">
            Tabel User Admin
          </Typography>
          <Tooltip content="Add">
            <IconButton
              onClick={() => handleOpen("add")}
              variant="text"
              color="blue-gray"
            >
              <PlusCircleIcon className="h-8 w-8 text-white" />
            </IconButton>
          </Tooltip>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "no",
                  "image",
                  "name",
                  "email",
                  "mobile",
                  "type",
                  "action",
                ].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, key) => {
                const className = `py-3 px-5 ${
                  key === data.length - 1 ? "" : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr
                    className="duration-200 ease-in-out hover:cursor-pointer hover:bg-[#f5f5f5]"
                    key={item._id}
                  >
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {key + 1}
                      </Typography>
                    </td>
                    <td className={className}>
                      <div className="h-[70px] w-[70px]">
                        <Avatar
                          src={`/${item?.image}`}
                          alt={item?.nama}
                          size="xl"
                          className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                        />
                      </div>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                      >
                        {item.nama}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                      >
                        {item.email}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                      >
                        {item.mobile}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Chip
                        variant="gradient"
                        color={
                          item.type === "super admin"
                            ? "green"
                            : item.type === "admin"
                            ? "blue"
                            : "blue-gray"
                        }
                        value={item.type}
                        className="py-0.5 px-2 text-[11px] font-medium"
                      />
                    </td>

                    <td className={className}>
                      <div className="flex gap-2">
                        <Typography
                          onClick={() => handleOpen("edit", item)}
                          as="a"
                          href="#"
                          className="rounded-md px-3 py-1 text-xs font-semibold text-blue-gray-600 duration-300 ease-in-out hover:bg-blue-600 hover:text-white"
                        >
                          Edit
                        </Typography>
                        <Typography
                          onClick={() => handleDelete(item._id)}
                          as="a"
                          href="#"
                          className="rounded-md px-3 py-1 text-xs font-semibold text-blue-gray-600 duration-300 ease-in-out hover:bg-red-600 hover:text-white"
                        >
                          Delete
                        </Typography>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>

      {/* modal here */}
      <Dialog open={open} handler={() => setOpen(!open)} size="md">
        <DialogHeader>
          {typeModal === "add" ? "Add New" : "Edit"} Data
        </DialogHeader>

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
            {typeModal === "add" && (
              <>
                <Input
                  label="Password"
                  size="lg"
                  name="password"
                  value={form.password}
                  onChange={(e) => handleChangeText(e)}
                />
                <Select
                  label="User Type"
                  size="lg"
                  onChange={(value) => handleChangeSelect(value)}
                >
                  <Option value="super admin">Super Admin</Option>
                  <Option value="admin">Admin</Option>
                  <Option value="user">User</Option>
                </Select>
              </>
            )}
            <Input
              label="Mobile"
              size="lg"
              name="mobile"
              value={form.mobile}
              onChange={(e) => handleChangeText(e)}
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
    </div>
  );
}

export default Admin;
