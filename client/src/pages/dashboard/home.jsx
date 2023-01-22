import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Select,
  Option,
  CardFooter,
} from "@material-tailwind/react";
import { ClockIcon } from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import { statisticsChartsData } from "@/data";

import {
  UserGroupIcon,
  NewspaperIcon,
  WalletIcon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { getAdmin } from "@/Redux/actions/adminActions";
import { getSoal } from "@/Redux/actions/soalAction";
import { getKelas } from "@/Redux/actions/kelasActions";
import { getPelajaran } from "@/Redux/actions/pelajaranAction";
import { getKategori } from "@/Redux/actions/kategoriAction";

export function Home() {
  const dispatch = useDispatch();
  const dataSoal = useSelector((state) => state.soal.data);
  const dataKelas = useSelector((state) => state.kelas.data);
  const dataPelajaran = useSelector((state) => state.pelajaran.data);
  const dataUser = useSelector((state) => state.admin.data);
  const dataKategori = useSelector((state) => state.kategori.data);

  const [kelas, setKelas] = React.useState([]);
  const [kelasFilter, setKelasFilter] = React.useState([]);
  const [pelajaran, setPelajaran] = React.useState([]);
  const [pelajaranFilter, setPelajaranFilter] = React.useState([]);
  const [kategori, setKategori] = React.useState([]);
  const [kategoriFilter, setKategoriFilter] = React.useState([]);
  console.log("dataSoal", dataSoal);

  React.useEffect(() => {
    dispatch(getSoal());
    dispatch(getKelas());
    dispatch(getPelajaran());
    dispatch(getKategori());
    dispatch(getAdmin());
  }, []);

  React.useEffect(() => {
    if (dataSoal.length > 0) {
      setKelas(dataSoal);
      setKelasFilter(dataSoal);
      setPelajaran(dataSoal);
      setPelajaranFilter(dataSoal);
      setKategori(dataSoal);
      setKategoriFilter(dataSoal);
    }
  }, [dataSoal]);

  const handleSelect = (value, key) => {
    switch (key) {
      case "kelas":
        const kelasValue = `${value.kelas} ${value.tingkatan}`;
        const filtered = kelasFilter.filter(
          (item) => item.kelas === kelasValue
        );
        setKelas(filtered);
        break;
      case "pelajaran":
        const pelajaranFiltered = pelajaranFilter.filter(
          (item) => item.pelajaran === value.nama
        );
        setPelajaran(pelajaranFiltered);
        break;
      case "kategori":
        const kategoriFiltered = kategoriFilter.filter(
          (item) => item.kategori === value.nama
        );
        setKategori(kategoriFiltered);
        break;

      default:
        break;
    }
    console.log("value", value);
    console.log("key", key);
  };
  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        <StatisticsCard
          key={"1"}
          value={dataSoal.length}
          title="Total soal"
          icon={React.createElement(NewspaperIcon, {
            className: "w-6 h-6 text-white",
          })}
        />
        <StatisticsCard
          key={"2"}
          value={dataKategori.length}
          title="Total Kategori"
          icon={React.createElement(WalletIcon, {
            className: "w-6 h-6 text-white",
          })}
          color="amber"
        />
        <StatisticsCard
          key={"3"}
          value={dataUser.length}
          title="Total User"
          icon={React.createElement(UserGroupIcon, {
            className: "w-6 h-6 text-white",
          })}
          color="red"
        />
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        <Card>
          <CardHeader variant="gradient" color="blue">
            <Typography className="p-4">Soal Berdasarkan Kelas</Typography>
          </CardHeader>
          <CardBody className="p-6">
            <div>
              <Select
                onChange={(value) => handleSelect(value, "kelas")}
                label="Filter Kelas"
              >
                {dataKelas.map((item) => (
                  <Option value={item}>
                    {item.kelas} {item.tingkatan}
                  </Option>
                ))}
              </Select>
            </div>
          </CardBody>
          <CardFooter>
            <div>
              {kelas.map((item) => (
                <div className="flex justify-between py-1">
                  <span>{item.nama}</span>
                  <span>{item.kelas}</span>
                </div>
              ))}
            </div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader variant="gradient" color="deep-orange">
            <Typography className="p-4">Soal Berdasarkan Pelajaran</Typography>
          </CardHeader>
          <CardBody className="p-6">
            <div>
              <Select
                onChange={(value) => handleSelect(value, "pelajaran")}
                label="Filter Pelajaran"
              >
                {dataPelajaran.map((item) => (
                  <Option value={item}>{item.nama}</Option>
                ))}
              </Select>
            </div>
          </CardBody>
          <CardFooter>
            <div>
              {pelajaran.map((item) => (
                <div className="flex justify-between py-1">
                  <span>{item.nama}</span>
                  <span>{item.pelajaran}</span>
                </div>
              ))}
            </div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader variant="gradient" color="red">
            <Typography className="p-4">Soal Berdasarkan Kategori</Typography>
          </CardHeader>
          <CardBody className="p-6">
            <div>
              <Select
                onChange={(value) => handleSelect(value, "kategori")}
                label="Filter Kategori"
              >
                {dataKategori.map((item) => (
                  <Option value={item}>{item.nama}</Option>
                ))}
              </Select>
            </div>
          </CardBody>
          <CardFooter>
            <div>
              {kategori.map((item) => (
                <div className="flex justify-between py-1">
                  <span>{item.nama}</span>
                  <span>{item.kategori}</span>
                </div>
              ))}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Home;
