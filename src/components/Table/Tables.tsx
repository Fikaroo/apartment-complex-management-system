import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import SosModal from "../Modals/SosModal";
import { Link } from "react-router-dom";
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
};

const Tables = ({
  headers,
  modal,
  openModal,
  data,
  setProcess,
  setOrderId,
}: PropsType) => {
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
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <Link to="/customers/1" className="flex items-center" />

                <Link to="/customers/detail/1" className="flex items-center">
                  <div className="flex-shrink-0 w-10 h-10">
                    <img
                      className="rounded-full"
                      src="/icons/exclamation.svg"
                      alt=""
                    />
                  </div>
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="ml-4">
                  <div className="text-sm font-medium leading-5 text-gray-900">
                    {item.actualDeadline}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                {item.normativeDeadline}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="text-sm leading-5 text-gray-900">
                  {item.description}
                </div>
              </td>

              <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                {item.orderClass.name}
              </td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                {item.orderSource.name}
              </td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                {item.orderType.name}
              </td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                {item.phoneNumber}
              </td>
              <td className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                <img
                  onClick={() => {
                    openModal();
                    setProcess("Edit");
                    setOrderId(item.id);
                  }}
                  className="ml-4 cursor-pointer"
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
