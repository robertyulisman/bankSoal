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
  Chip,
} from "@material-tailwind/react";
import {
  ArrowDownTrayIcon,
  TrashIcon,
  EyeIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";

import swal from "sweetalert";
import "moment/locale/id";
import {
  addSoal,
  changeStatus,
  deleteSoal,
  deleteSoalSelected,
  editSoal,
  getSoal,
  resetSoal,
} from "@/Redux/actions/soalAction";
import { getKelas } from "@/Redux/actions/kelasActions";
import { getPelajaran } from "@/Redux/actions/pelajaranAction";
import { getKategori } from "@/Redux/actions/kategoriAction";
import { ProfileInfoCard } from "@/widgets/cards";
import { apiUrl } from "@/services/api";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import DataTable from "react-data-table-component";
import { formatDate } from "@/utils/globalFunctions";
import ExportSoal from "@/component/ExportExcel/ExportSoal";

export function BankSoal() {
  const dispatch = useDispatch();
  const { isSuccess, isError } = useSelector((state) => state.soal);
  const tableRef = React.useRef(null);

  const [data, setData] = React.useState([]);
  const [dataFilter, setDataFilter] = React.useState([]);
  const { user } = useSelector((state) => state.auth);
  const dataSoal = useSelector((state) => state.soal.data);
  const dataKategori = useSelector((state) => state.kategori.data);
  const dataKelas = useSelector((state) => state.kelas.data);
  const dataPelajaran = useSelector((state) => state.pelajaran.data);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [typeModal, setTypeModal] = React.useState("add");
  const [idSelected, setIdSelected] = React.useState(null);
  const [docs, setDocs] = React.useState([]);
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
  const [search, setSearch] = React.useState("");
  const [deleteButton, setDeleteButon] = React.useState(false);
  const [deleteSelected, setDeleteSelected] = React.useState([]);

  React.useEffect(() => {
    setData(dataSoal);
    setDataFilter(dataSoal);
  }, []);

  React.useEffect(() => {
    dispatch(getSoal());

    dispatch(getKelas());
    dispatch(getPelajaran());
    dispatch(getKategori());
  }, []);

  React.useEffect(() => {
    if (isSuccess) {
      dispatch(getSoal());
      dispatch(resetSoal());
      setLoading(false);
    }
    if (isError) {
      dispatch(resetSoal());
      setLoading(false);
    }

    if (dataSoal) {
      setData(dataSoal);
      setDataFilter(dataSoal);
    }
  }, [isSuccess, isError, dataSoal]);

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
    const dataFile = [];
    dataFile.push({
      uri: `${apiUrl}/${item.file}`,
    });

    setDocs(dataFile);
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
    const re = /(?:\.([^.]+))?$/;
    const fileName = re.exec(file.name)[1];

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
    dataSoal.append("fileType", fileName);
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

  const handleDeleteSelected = () => {
    setLoading(true);
    let idSelected = [];
    deleteSelected.map((item) => idSelected.push(item._id));
    console.log("idSelected", idSelected);
    dispatch(deleteSoalSelected(idSelected));
  };

  const handleDownload = (item) => {
    let name = item;
    fetch(`http://localhost:5000/${name}`).then((response) => {
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

  const handleChangeStatus = (item) => {
    console.log("item", item);
    dispatch(changeStatus(item._id));
  };

  const columns = [
    {
      name: "NAMA",
      selector: (row) => row.nama,
      sortable: true,
      grow: 2,
    },
    {
      name: "KELAS",
      selector: (row) => row.kelas,
      sortable: true,
    },
    {
      name: "PELAJARAN",
      selector: (row) => row.pelajaran,
      sortable: true,
    },
    {
      name: "PIC",
      selector: (row) => row.pic?.nama,
      sortable: true,
    },

    {
      name: <div>TGL PENGGUNAAN</div>,
      selector: (row) => formatDate(row.tanggalPenggunaan),
      sortable: true,
    },
    {
      name: "Status",
      center: true,
      cell: (item) => (
        <Chip
          onClick={() => handleChangeStatus(item)}
          variant="gradient"
          color={item.statusDipakai === true ? "green" : "blue-gray"}
          value={
            item.statusDipakai === true ? "Sudah dipakai" : "Belum dipakai"
          }
          className="py-0.5 px-2 text-[11px] font-medium"
        />
      ),
    },

    {
      name: "ACTION",
      center: true,
      cell: (item) => (
        <Menu placement="left-start">
          <MenuHandler>
            <Button variant="gradient">...</Button>
          </MenuHandler>
          <MenuList>
            <div className="flex items-center gap-2">
              <PencilSquareIcon className="h-[20px] w-[20px]" />
              <MenuItem onClick={() => handleOpen("edit", item)}>Edit</MenuItem>
            </div>
            <div className="flex items-center gap-2">
              <EyeIcon className="h-[20px] w-[20px]" />
              <MenuItem onClick={() => handleView("view", item)}>View</MenuItem>
            </div>
            <div className="flex items-center gap-2">
              <ArrowDownTrayIcon className="h-[20px] w-[20px]" />
              <MenuItem onClick={() => handleDownload(item.file)}>
                Download
              </MenuItem>
            </div>
            <div className="flex items-center gap-2">
              <TrashIcon className="h-[20px] w-[20px]" />
              <MenuItem onClick={() => handleDelete(item._id)}>Delete</MenuItem>
            </div>
          </MenuList>
        </Menu>
      ),
    },
  ];

  const handleChangeRowChange = (e) => {
    setDeleteSelected(e.selectedRows);
    console.log("e", e);
    e.selectedCount === 0 ? setDeleteButon(false) : setDeleteButon(true);
  };
  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
      },
    },
    headCells: {
      style: {
        fontSize: "11px",
        fontWeight: "bold",
        color: "gray",
      },
    },
    cells: {
      style: {},
    },
  };

  const handleSearch = (v) => {
    console.log("v", v.target.value);
    setSearch(v.target.value);
    const filtered = dataFilter.filter(
      (item) =>
        item.nama.toUpperCase().indexOf(v.target.value.toUpperCase()) > -1
    );

    setData(filtered);
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader
          variant="gradient"
          color="blue"
          className="sticky top-0 z-[998] mb-8 flex items-center justify-between p-6"
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
          <div className="flex flex-col md:flex-row">
            <div className="flex w-full px-5 pt-2 lg:w-[25%]">
              <Input
                label="Search"
                onChange={(v) => handleSearch(v)}
                icon={<i className="fas fa-search" />}
              />
            </div>
            <div className="flex px-4 lg:px-0">
              {deleteButton && data.length > 0 ? (
                <div className="flex px-2 pt-2">
                  <Button
                    onClick={handleDeleteSelected}
                    color="red"
                    variant="gradient"
                  >
                    Delete Selected
                  </Button>
                </div>
              ) : null}
              <div>
                <ExportSoal data={data} />
              </div>
            </div>
          </div>

          <div className="p-5">
            <DataTable
              expandableRows
              columns={columns}
              expandableRowsComponent={(item) => {
                console.log("item expendeble xxxx", item.data);

                return (
                  <div>
                    <div className="m-2 grid grid-cols-5 gap-2 rounded-md bg-gray-300 p-4">
                      <div>
                        <span className="text-sm">Tanggal dibuat</span>
                        <p className="rounded-md bg-gray-100 py-1 px-2 text-[12px] text-black">
                          {formatDate(item.data.createdAt)}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm">Tanggal diupdate</span>
                        <p className="rounded-md bg-gray-100 py-1 px-2 text-[12px] text-black">
                          {formatDate(item.data.updateAt)}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm">Type File</span>
                        <p className="rounded-md bg-gray-100 py-1 px-2 text-[12px] text-black">
                          {item.data.fileType}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm">File</span>
                        <p className="rounded-md bg-gray-100 py-1 px-2 text-[12px] text-black">
                          {item.data?.file}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm">Kategori</span>
                        <p className="rounded-md bg-gray-100 py-1 px-2 text-[12px] text-black">
                          {item.data?.kategori}
                        </p>
                      </div>
                    </div>
                    <div className="m-2 grid grid-cols-5 gap-2 rounded-md bg-gray-300 p-4">
                      <div>
                        <span className="text-sm">Jml Fotocopy</span>
                        <p className="rounded-md bg-gray-100 py-1 px-2 text-[12px] text-black">
                          {item.data.jumlahFotocopy}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm">Jml Halaman</span>
                        <p className="rounded-md bg-gray-100 py-1 px-2 text-[12px] text-black">
                          {item.data.jumlahHalaman}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm">Jml Lembar</span>
                        <p className="rounded-md bg-gray-100 py-1 px-2 text-[12px] text-black">
                          {item.data.jumlahLembar}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm">Lampiran</span>
                        <p className="rounded-md bg-gray-100 py-1 px-2 text-[12px] text-black">
                          {item.data?.lampiran}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm">Status dipakai</span>
                        <p className="rounded-md bg-gray-100 py-1 px-2 text-[12px] text-black">
                          {item.data?.statusDipakai
                            ? "Sudah Dipakai"
                            : "Belum dipakai"}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }}
              data={data}
              progressPending={loading}
              selectableRows
              pagination
              defaultSortFieldId={1}
              onSelectedRowsChange={handleChangeRowChange}
              customStyles={customStyles}
              highlightOnHover
              sortIcon={<ArrowDownIcon />}
            />
          </div>
        </CardBody>
      </Card>

      {/* modal here */}
      <Dialog
        open={open}
        handler={() => setOpen(!open)}
        size={typeModal === "view" ? "xl" : "md"}
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
            <div className="m-auto flex flex-col gap-5 md:flex-row">
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
              <div className="mx-4 w-full rounded-md bg-blue-gray-300 p-2">
                <DocViewer
                  pluginRenderers={DocViewerRenderers}
                  initialActiveDocument={docs[1]}
                  documents={docs}
                />
              </div>
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
              <span className="-mt-4 ml-2 text-[12px] text-blue-600">
                Tanggal Akan digunakan File
              </span>
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
