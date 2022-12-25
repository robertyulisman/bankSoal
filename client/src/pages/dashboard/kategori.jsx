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
} from "@material-tailwind/react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import moment from "moment";
import "moment/locale/id";
import {
  addKategori,
  deleteKategori,
  editKategori,
  getKategori,
  resetKategori,
} from "@/Redux/actions/kategoriAction";
import { formatDate } from "@/utils/globalFunctions";

export function Kategori() {
  const dispatch = useDispatch();
  const { data, isSuccess, isError } = useSelector((state) => state.kategori);

  const [open, setOpen] = React.useState(false);
  const [typeModal, setTypeModal] = React.useState("add");
  const [idSelected, setIdSelected] = React.useState(null);
  const [form, setform] = React.useState({
    nama: "",
  });

  React.useEffect(() => {
    dispatch(getKategori());
  }, []);

  React.useEffect(() => {
    if (isSuccess) {
      dispatch(getKategori());
      dispatch(resetKategori());
    }
    if (isError) {
      dispatch(resetKategori());
    }
  }, [isSuccess, isError]);

  const handleOpen = (type, item) => {
    setTypeModal(type);
    setOpen(!open);

    if (item !== undefined) {
      setform({
        ...form,
        nama: item.nama,
      });
      setIdSelected(item._id);
    } else {
      setform({
        ...form,
        nama: "",
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

  const handleSubmitModal = () => {
    if (typeModal === "add") {
      dispatch(addKategori(form));
    } else {
      dispatch(editKategori(idSelected, form));
    }
    console.log("form", form);
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
      value == !null && dispatch(deleteKategori(_id));
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
            Tabel Kategori
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
                  "nama",
                  "Tanggal dibuat",
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
                        {item.nama}
                      </Typography>
                    </td>

                    <td className={className}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                      >
                        {formatDate(item.createdAt)}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                      >
                        {formatDate(item.updatedAt)}
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
              label="Kategori"
              size="lg"
              name="nama"
              value={form.nama}
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

export default Kategori;
