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
} from "@material-tailwind/react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";

import swal from "sweetalert";
import {
  addKelas,
  deleteKelas,
  editKelas,
  getKelas,
  resetKelas,
} from "@/Redux/actions/kelasActions";
import moment from "moment";
import "moment/locale/id";

export function Kelas() {
  const dispatch = useDispatch();
  const { data, isSuccess, isError } = useSelector((state) => state.kelas);

  const [open, setOpen] = React.useState(false);
  const [typeModal, setTypeModal] = React.useState("add");
  const [idSelected, setIdSelected] = React.useState(null);
  const [form, setform] = React.useState({
    kelas: "",
    tingkatan: "",
  });

  React.useEffect(() => {
    dispatch(getKelas());
  }, []);

  React.useEffect(() => {
    if (isSuccess) {
      dispatch(getKelas());
      dispatch(resetKelas());
    }
    if (isError) {
      dispatch(resetKelas());
    }
  }, [isSuccess, isError]);

  const handleOpen = (type, item) => {
    setTypeModal(type);
    setOpen(!open);

    if (item !== undefined) {
      setform({
        ...form,
        kelas: item.kelas,
        tingkatan: item.tingkatan,
      });
      setIdSelected(item._id);
    } else {
      setform({
        ...form,
        kelas: "",
        tingkatan: "",
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
      tingkatan: value,
    });
  };

  const handleSubmitModal = () => {
    if (typeModal === "add") {
      dispatch(addKelas(form));
    } else {
      dispatch(editKelas(idSelected, form));
    }
  };

  const handleDelete = (_id) => {
    swal({
      title: "Delete Data",
      text: "Want to Delete this Item ? this will deleted permanently.",
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
      value == !null && dispatch(deleteKelas(_id));
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
            Tabel Kelas
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
                  "kelas",
                  "tingkatan",
                  "Tanggal Dibuat",
                  "Terakhir Update",
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
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                      >
                        {item.kelas}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                      >
                        {item.tingkatan}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                      >
                        {moment(item.createdAt).format("DD MMMM YYYY: HH mm")}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                      >
                        {moment(item.updatedAt).format("DD MMMM YYYY: HH mm")}
                      </Typography>
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
              label="Kelas"
              size="lg"
              name="kelas"
              value={form.kelas}
              onChange={(e) => handleChangeText(e)}
            />
            <Select
              label="Tingkatan"
              size="lg"
              onChange={(value) => handleChangeSelect(value)}
            >
              <Option value="SD">SD</Option>
              <Option value="SMP">SMP</Option>
              <Option value="SMA">SMA</Option>
            </Select>
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

export default Kelas;
