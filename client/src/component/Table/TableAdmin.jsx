import { PlusCircleIcon } from "@heroicons/react/24/solid";
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import React from "react";

export const TableAdminSuper = ({
  onClickEdit,
  onclickDelete,
  onClickAdd,
  data,
  type,
}) => {
  return (
    <Card>
      <CardHeader
        variant="gradient"
        color="blue"
        className="mb-8 flex items-center justify-between p-6"
      >
        <Typography variant="h6" color="white">
          Tabel {type}
        </Typography>
        <Tooltip content="Add">
          <IconButton
            onClick={() => onClickAdd()}
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
              {["no", "image", "name", "email", "mobile", "type", "action"].map(
                (el) => (
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
                )
              )}
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
                        onClick={() => onClickEdit(item)}
                        as="a"
                        href="#"
                        className="rounded-md px-3 py-1 text-xs font-semibold text-blue-gray-600 duration-300 ease-in-out hover:bg-blue-600 hover:text-white"
                      >
                        Edit
                      </Typography>
                      <Typography
                        onClick={() => onclickDelete(item)}
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
  );
};
