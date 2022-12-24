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
import { TableAdminSuper } from "@/component/Table/TableAdmin";

export function Admin() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
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
      {user.type === "super admin" && (
        <TableAdminSuper
          type="Super Admin"
          data={data.filter((item) => item.type === "super admin")}
          onClickAdd={() => handleOpen("add")}
          onClickEdit={(item) => handleOpen("edit", item)}
          onclickDelete={(item) => handleDelete(item._id)}
        />
      )}

      <div className="mt-5">
        <TableAdminSuper
          type="Admin"
          data={data.filter((item) => item.type === "admin")}
          onClickAdd={() => handleOpen("add")}
          onClickEdit={(item) => handleOpen("edit", item)}
          onclickDelete={(item) => handleDelete(item._id)}
        />
      </div>

      <div className="mt-5">
        <TableAdminSuper
          type="User"
          data={data.filter((item) => item.type === "user")}
          onClickAdd={() => handleOpen("add")}
          onClickEdit={(item) => handleOpen("edit", item)}
          onclickDelete={(item) => handleDelete(item._id)}
        />
      </div>

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

                {user.type === "super admin" ? (
                  <Select
                    label="User Type"
                    size="lg"
                    onChange={(value) => handleChangeSelect(value)}
                  >
                    <Option value="super admin">Super Admin</Option>

                    <Option value="admin">Admin</Option>
                    <Option value="user">User</Option>
                  </Select>
                ) : (
                  <Select
                    label="User Type"
                    size="lg"
                    onChange={(value) => handleChangeSelect(value)}
                  >
                    <Option value="admin">Admin</Option>
                    <Option value="user">User</Option>
                  </Select>
                )}
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
