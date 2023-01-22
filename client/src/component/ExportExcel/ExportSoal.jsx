import { formatDate } from "@/utils/globalFunctions";
import { Button } from "@material-tailwind/react";
import React from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";

const ExportSoal = ({ data }) => {
  const tableRef = React.useRef(null);
  return (
    <>
      <div className="flex px-2 pt-2">
        <DownloadTableExcel
          filename="Bank Soal"
          sheet="soal"
          currentTableRef={tableRef.current}
        >
          <Button variant="gradient">Export Excel</Button>
        </DownloadTableExcel>
      </div>
      <table className="hidden" ref={tableRef}>
        <tbody>
          <tr>
            <th>ID File</th>
            <th>Nama File</th>
            <th>Kelas</th>
            <th>Pelajaran</th>
            <th>PIC</th>
            <th>Type</th>
            <th>Tanggal Dibuat</th>
            <th>Tanggal Penggunaan</th>
            <th>Tanggal Update</th>
          </tr>
          {data.map((item) => (
            <tr>
              <td>{item._id}</td>
              <td>{item.nama}</td>
              <td>{item.kelas}</td>
              <td>{item.pelajaran}</td>
              <td>{item.pic?.nama}</td>
              <td>{item.fileType}</td>
              <td>{formatDate(item.createdAt)}</td>
              <td>{formatDate(item.tanggalPenggunaan)}</td>
              <td>{formatDate(item.updatedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ExportSoal;
