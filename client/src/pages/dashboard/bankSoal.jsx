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
  MenuHandler,
  MenuList,
  MenuItem,
  Menu,
} from "@material-tailwind/react";
import {
  ArrowDownTrayIcon,
  TrashIcon,
  EyeIcon,
  PencilSquareIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";

import swal from "sweetalert";
import moment from "moment";
import "moment/locale/id";
import {
  addSoal,
  deleteSoal,
  editSoal,
  getSoal,
  resetSoal,
} from "@/Redux/actions/soalAction";
import { getKelas } from "@/Redux/actions/kelasActions";
import { getPelajaran } from "@/Redux/actions/pelajaranAction";
import { getKategori } from "@/Redux/actions/kategoriAction";
import { ProfileInfoCard } from "@/widgets/cards";
import axios from "axios";
import { apiUrl } from "@/services/api";

export function BankSoal() {
  const dispatch = useDispatch();
  const { isSuccess, isError } = useSelector((state) => state.soal);
  const { user } = useSelector((state) => state.auth);
  const dataKategori = useSelector((state) => state.kategori.data);
  const dataKelas = useSelector((state) => state.kelas.data);
  const dataPelajaran = useSelector((state) => state.pelajaran.data);

  const [open, setOpen] = React.useState(false);
  const [typeModal, setTypeModal] = React.useState("add");
  const [idSelected, setIdSelected] = React.useState(null);
  const [form, setform] = React.useState({
    nama: "",
    kelas: "",
    pelajaran: "",
    kategori: "",
    lampiran: "",
    jumlahHalaman: "",
    jumlahLembar: "",
    jumlahFotocopy: "",
    tanggalPenggunaan: "",
    file: "",
  });
  const [file, setFile] = React.useState("");

  const [data, setData] = React.useState([]);
  // pagination
  const [page, setPage] = React.useState(1);
  const [currPage, setCurrPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(10);
  const [pages, setPages] = React.useState([]);
  const getPages = (totalData) => {
    let data = totalData / totalPage;

    if (totalData % totalPage !== 0) {
      console.log("oke");
      data = Math.floor(data) + 1;
    } else {
      data = Math.floor(data) + 1;
    }

    const dataPages = [];

    for (let index = 0; index < data; index++) {
      dataPages.push({ page: index + 1 });
    }
    setPages(dataPages);
    // console.log("dataPages", dataPages);
  };

  const getDataSoal = async () => {
    console.log("currPage", currPage);
    const { data } = await axios.get(
      `/api/bank_soal?page=${currPage}&perPage=${totalPage}`
    );

    setData(data.data);

    setTimeout(() => {
      getPages(data.total_data);
    }, 300);
  };
  const handleChangeTotalPage = (value) => {
    console.log("value", value);

    setTotalPage(value);
    setCurrPage(1);
  };

  React.useEffect(() => {
    dispatch(getSoal());

    dispatch(getKelas());
    dispatch(getPelajaran());
    dispatch(getKategori());
  }, []);

  React.useEffect(() => {
    if (currPage || totalPage) {
      getDataSoal();
    }
  }, [currPage, totalPage]);

  React.useEffect(() => {
    if (isSuccess) {
      dispatch(getSoal());
      dispatch(resetSoal());
    }
    if (isError) {
      dispatch(resetSoal());
    }
  }, [isSuccess, isError]);

  const handleOpen = (type, item) => {
    setTypeModal(type);
    setOpen(!open);

    if (item !== undefined) {
      setform({
        ...form,
        nama: item.nama,
        kelas: item.kelas,
        pelajaran: item.pelajaran,
        kategori: item.kategori,
        lampiran: item.lampiran,
        jumlahHalaman: item.jumlahHalaman,
        jumlahLembar: item.jumlahLembar,
        jumlahFotocopy: item.jumlahFotocopy,
        tanggalPenggunaan: item.tanggalPenggunaan,
        file: item.file,
      });
      setIdSelected(item._id);
    } else {
      setform({
        ...form,
        nama: "",
        kelas: "",
        pelajaran: "",
        kategori: "",
        lampiran: "",
        jumlahHalaman: "",
        jumlahLembar: "",
        jumlahFotocopy: "",
        tanggalPenggunaan: "",
        file: "",
      });
      setFile("");
    }
  };
  const handleView = (type, item) => {
    setTypeModal(type);
    setOpen(!open);
    setform({
      ...form,
      nama: item.nama,
      kelas: item.kelas,
      pelajaran: item.pelajaran,
      kategori: item.kategori,
      lampiran: item.lampiran,
      jumlahHalaman: item.jumlahHalaman,
      jumlahLembar: item.jumlahLembar,
      jumlahFotocopy: item.jumlahFotocopy,
      tanggalPenggunaan: item.tanggalPenggunaan,
      file: item.file,
    });
    setIdSelected(item._id);
  };
  const handleChangeText = (e) => {
    const { name, value } = e.target;

    setform({
      ...form,
      [name]: value,
    });
  };

  const handleChangeSelect = (value, name) => {
    setform({
      ...form,
      [name]: value,
    });
  };

  const handleSubmitModal = () => {
    let dataSoal = new FormData();
    dataSoal.append("nama", form.nama);
    dataSoal.append("kelas", form.kelas);
    dataSoal.append("pelajaran", form.pelajaran);
    dataSoal.append("kategori", form.kategori);
    dataSoal.append("lampiran", form.lampiran);
    dataSoal.append("jumlahHalaman", form.jumlahHalaman);
    dataSoal.append("jumlahLembar", form.jumlahLembar);
    dataSoal.append("jumlahFotocopy", form.jumlahFotocopy);
    dataSoal.append("tanggalPenggunaan", form.tanggalPenggunaan);
    dataSoal.append("file", file);
    if (typeModal === "add") {
      dispatch(addSoal(user._id, dataSoal));
    } else {
      dispatch(editSoal(idSelected, dataSoal));
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
      value == !null && dispatch(deleteSoal(_id));
    });
  };

  const handleDownload = (item) => {
    let name = item;
    fetch(`/${name}`).then((response) => {
      // fetch(`http://localhost:5000/asset/html/${data.path}`).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = name;
        a.click();
      });
    });
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader
          variant="gradient"
          color="blue"
          className="sticky top-0 z-[999] mb-8 flex items-center justify-between p-6"
        >
          <Typography variant="h6" color="white">
            Tabel Bank Soal
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
          <div className="mr-4 mb-4 mt-2 flex justify-end gap-2">
            {pages.map((pg, i) => (
              <>
                {i === 0 && (
                  <span
                    onClick={() => currPage > 1 && setCurrPage(currPage - 1)}
                    className={`rounded-md bg-gray-200 py-2 px-4 text-sm duration-300 ease-in-out ${
                      currPage === 1
                        ? "hover:cursor-not-allowed"
                        : "hover:cursor-pointer hover:bg-blue-500 hover:text-white"
                    }`}
                  >
                    Prev
                  </span>
                )}
                {i < 5 && (
                  <span
                    onClick={() => setCurrPage(pg.page)}
                    key={i}
                    className={`rounded-md py-2  px-4 text-sm duration-300 ease-in-out hover:cursor-pointer hover:bg-blue-500 hover:text-white ${
                      currPage === pg.page
                        ? " bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {pg.page}
                  </span>
                )}
                {i === 6 && (
                  <span
                    className={`rounded-md bg-gray-200  py-2 px-4 text-sm duration-300 ease-in-out `}
                  >
                    ...
                  </span>
                )}

                {i + 1 === pages.length && (
                  <>
                    {pages.length > 5 && (
                      <span
                        onClick={() => setCurrPage(pg.page)}
                        // key={i}
                        className={`rounded-md py-2 px-4 text-sm duration-300 ease-in-out hover:cursor-pointer hover:bg-blue-500 hover:text-white ${
                          currPage === pg.page
                            ? " bg-blue-500 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        {pages.length}
                      </span>
                    )}

                    <span
                      onClick={() =>
                        currPage < pages.length && setCurrPage(currPage + 1)
                      }
                      className={`rounded-md bg-gray-200 py-2 px-4 text-sm duration-300 ease-in-out ${
                        currPage >= pages.length
                          ? "hover:cursor-not-allowed"
                          : "hover:cursor-pointer hover:bg-blue-500 hover:text-white"
                      }`}
                    >
                      Next
                    </span>
                  </>
                )}
              </>
            ))}
            {/* </div> */}

            <div className="mr-[100px] hidden w-[100px] md:flex">
              <Select
                defaultValue={totalPage}
                value={totalPage}
                onChange={(value) => handleChangeTotalPage(value)}
                label="Per Page"
              >
                <Option value={10}>10</Option>
                <Option value={25}>25</Option>
                <Option value={50}>50</Option>
                <Option value={100}>100</Option>
              </Select>
            </div>
          </div>
          <table className="relative  w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "no",
                  "nama",
                  "kelas",
                  "pelajaran",
                  "kategori",
                  "PIC",
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
                const className = `py-3 px-5  ${
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
                        {item.kelas}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                      >
                        {item.pelajaran}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                      >
                        {item.kategori}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                      >
                        {item?.pic?.nama || "-"}
                      </Typography>
                    </td>

                    <td className={className}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                      >
                        {moment(item.createdAt).fromNow()}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                      >
                        {moment(item.updatedAt).fromNow()}
                      </Typography>
                    </td>

                    <td className={className}>
                      <Menu placement="bottom-start">
                        <MenuHandler>
                          <Button variant="gradient">...</Button>
                        </MenuHandler>
                        <MenuList>
                          <div className="flex items-center gap-2">
                            <PencilSquareIcon className="h-[20px] w-[20px]" />
                            <MenuItem onClick={() => handleOpen("edit", item)}>
                              Edit
                            </MenuItem>
                          </div>
                          <div className="flex items-center gap-2">
                            <EyeIcon className="h-[20px] w-[20px]" />
                            <MenuItem onClick={() => handleView("view", item)}>
                              View
                            </MenuItem>
                          </div>
                          <div className="flex items-center gap-2">
                            <ArrowDownTrayIcon className="h-[20px] w-[20px]" />
                            <MenuItem onClick={() => handleDownload(item.file)}>
                              Download
                            </MenuItem>
                          </div>
                          <div className="flex items-center gap-2">
                            <TrashIcon className="h-[20px] w-[20px]" />
                            <MenuItem onClick={() => handleDelete(item._id)}>
                              Delete
                            </MenuItem>
                          </div>
                        </MenuList>
                      </Menu>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>

      {/* modal here */}
      <Dialog
        open={open}
        handler={() => setOpen(!open)}
        size={typeModal === "view" ? "lg" : "md"}
      >
        <DialogHeader>
          {typeModal === "add"
            ? "Add New"
            : typeModal === "view"
            ? "Detail"
            : "Edit"}{" "}
          Data
        </DialogHeader>

        <DialogBody
          className="max-h-[70vh] overflow-scroll scrollbar-hide"
          divider
        >
          {typeModal === "view" ? (
            <div className="m-auto flex">
              <ProfileInfoCard
                title="Detail Information"
                details={{
                  Nama: form?.nama,
                  Kelas: form?.kelas,
                  Pelajaran: form?.pelajaran,
                  "Kategori Soal": form?.kategori,
                  Lampiran: form?.lampiran,
                  "Jumlah Halaman": form?.jumlahHalaman,
                  "Jumlah Lembar": form?.jumlahLembar,
                  "Jumlah Fotocopy": form?.jumlahFotocopy,
                  "Tanggal Penggunaan": form?.tanggalPenggunaan,
                  File: form?.file,
                }}
              />
            </div>
          ) : (
            <div className="m-auto flex  w-full flex-col gap-5 ">
              <Input
                label="Nama"
                size="lg"
                name="nama"
                value={form.nama}
                onChange={(e) => handleChangeText(e)}
              />
              <Select
                label="Kelas"
                size="lg"
                onChange={(value) => handleChangeSelect(value, "kelas")}
                defaultValue={form.kelas}
              >
                {dataKelas.map((item) => (
                  <Option value={`${item.kelas} ${item.tingkatan}`}>
                    {item.kelas} {item.tingkatan}
                  </Option>
                ))}
              </Select>
              <Select
                label="Pelajaran"
                size="lg"
                onChange={(value) => handleChangeSelect(value, "pelajaran")}
              >
                {dataPelajaran.map((item) => (
                  <Option value={item.nama}>{item.nama}</Option>
                ))}
              </Select>
              <Select
                label="Kategori"
                size="lg"
                onChange={(value) => handleChangeSelect(value, "kategori")}
              >
                {dataKategori.map((item) => (
                  <Option value={item.nama}>{item.nama}</Option>
                ))}
              </Select>
              <Select
                label="Lampiran"
                size="lg"
                onChange={(value) => handleChangeSelect(value, "lampiran")}
              >
                <Option value="Soal">Soal</Option>
                <Option value="Jawaban">Jawaban</Option>
                <Option value="Soal dan Jawaban">Soal dan Jawaban</Option>
              </Select>
              <Input
                label="Jumlah Halaman"
                size="lg"
                name="jumlahHalaman"
                value={form.jumlahHalaman}
                onChange={(e) => handleChangeText(e)}
              />
              <Input
                label="Jumlah Lembar"
                size="lg"
                name="jumlahLembar"
                value={form.jumlahLembar}
                onChange={(e) => handleChangeText(e)}
              />
              <Input
                label="Jumlah Fotocopy"
                size="lg"
                name="jumlahFotocopy"
                value={form.jumlahFotocopy}
                onChange={(e) => handleChangeText(e)}
              />
              <input
                className="rounded-md border-[1px] border-gray-400 py-3 px-2 text-sm  outline-none focus:border-[2px] focus:border-blue-500  "
                type="date"
                name="tanggalPenggunaan"
                value={form.tanggalPenggunaan}
                onChange={(e) => handleChangeText(e)}
              />
              <input
                className="rounded-md border-[1px] border-gray-400 py-2 px-2 text-sm hover:cursor-pointer"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          )}
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
          {typeModal === "view" ? (
            <div className="flex gap-1">
              <Button
                variant="gradient"
                color="green"
                onClick={() => setOpen(!open)}
              >
                <span>Oke</span>
              </Button>
              <Button
                variant="gradient"
                color="blue"
                onClick={() => handleDownload(form.file)}
              >
                <span>Download</span>
              </Button>
            </div>
          ) : (
            <Button
              variant="gradient"
              color="green"
              onClick={handleSubmitModal}
            >
              <span>Confirm</span>
            </Button>
          )}
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default BankSoal;
