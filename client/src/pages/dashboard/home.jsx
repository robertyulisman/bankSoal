import React from "react";
import { Typography } from "@material-tailwind/react";
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
  const dataUser = useSelector((state) => state.admin.data);
  const dataKategori = useSelector((state) => state.kategori.data);

  React.useEffect(() => {
    dispatch(getSoal());
    dispatch(getKelas());
    dispatch(getPelajaran());
    dispatch(getKategori());
    dispatch(getAdmin());
  }, []);
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
        />
        <StatisticsCard
          key={"3"}
          value={dataUser.length}
          title="Total User"
          icon={React.createElement(UserGroupIcon, {
            className: "w-6 h-6 text-white",
          })}
        />
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-inherit" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
