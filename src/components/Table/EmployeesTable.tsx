import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import SosModal from "../Modals/SosModal";
import { Link, useNavigate } from "react-router-dom";
export interface IHeaders {
  isStatus?: boolean;
  isAvatar?: boolean;
  title?: string;
  icon?: any;
  isAccess?: boolean;
  id: number;
}

type PropsType = {
  headers: IHeaders[];
  modal: JSX.Element;
  openModal: () => void;
  data: any;
  setProcess: React.Dispatch<React.SetStateAction<string>>;
  setOrderId: React.Dispatch<React.SetStateAction<number>>;
  setSelectedRow: React.Dispatch<React.SetStateAction<any>>;
};

const Tables = ({
  headers,
  modal,
  openModal,
  data,
  setProcess,
  setOrderId,
  setSelectedRow,
}: PropsType) => {
  const nav = useNavigate();

  const userStatus = [
    { id: 1, name: "Landlord" },
    { id: 2, name: "Resident" },
    { id: 3, name: "Tenant" },
    { id: 4, name: "Family member" },
    { id: 5, name: "Child" },
  ];
  const propertyType = [
    { id: 1, name: "Apartment" },
    { id: 2, name: "Office" },
  ];
  const atHome = [
    { id: 0, name: "NoSelect" },
    { id: 1, name: "Yes" },
    { id: 2, name: "No" },
  ];

  const handleTableRow = ({ id }: any) => nav(`${id}`);

  return (
    <div className="w-full mt-8 overflow-x-auto">
      <table className="table w-full table-auto">
        <thead>
          <tr>
            {headers.map(({ id, icon, isAccess, isAvatar, title }) => (
              <th
                key={id}
                className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
              >
                {isAccess || isAvatar ? icon : title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((item: any) => (
            <tr
              key={item.id}
              className="cursor-pointer hover:bg-gray-200"
              onClick={() => handleTableRow({ id: item.id })}
            >
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="flex items-center flex-shrink-0 w-10 h-10">
                  <img
                    className="rounded-full"
                    src="/icons/exclamation.svg"
                    alt=""
                  />
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="ml-4">
                  <div className="text-sm font-medium leading-5 text-gray-900">
                    {item.fullName}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                {item.jobPosition}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="text-sm leading-5 text-gray-900">
                  {item.phoneNumber}
                </div>
              </td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                {item.companyName}
              </td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                {item.roleName}
              </td>

              {/* <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                {
                  optionsStatus.find((option) => option.id === item.statusId)
                    ?.name
                }
              </td> */}

              <td
                className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  onClick={() => {
                    openModal();
                    setProcess("Edit");
                    setOrderId(item.id);
                    setSelectedRow({
                      ...item,
                      createdDate: new Date(item.createdDate)
                        .toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                        .split("/")
                        .reverse()
                        .join("-"),
                    });
                  }}
                  className="absolute z-50 ml-4 cursor-pointer"
                  src="/icons/edit.svg"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modal}
    </div>
  );
};

export default Tables;