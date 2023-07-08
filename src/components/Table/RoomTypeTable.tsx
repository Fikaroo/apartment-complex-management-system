import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import SosModal from "../Modals/SosModal";
import { Link, useNavigate } from "react-router-dom";
export interface IHeaders {
  title?: string;
  id: number;
}

type PropsType = {
  headers: IHeaders[];
  modal: JSX.Element;
  openModal: () => void;
  data: any;
  setProcess: React.Dispatch<React.SetStateAction<string>>;
  setRoomTypeId: React.Dispatch<React.SetStateAction<number>>;
  setSelectedRow: React.Dispatch<React.SetStateAction<any>>;
};
const headers: IHeaders[] = [
    
    {
      id: 1,
      title: "Title",
    },
    {
      id: 2,
      title: "Edit",
    },
   
  ];
const Tables = ({
  headers,
  modal,
  openModal,
  data,
  setProcess,
  setRoomTypeId,
  setSelectedRow,
}: PropsType) => {
  const nav = useNavigate();

// const [tableId,setTableId]=useState<number>(0);
//   const handleTableRow = ({id}:any) => nav(`/control-panel/deals/${id}`);

  return (
    <div className="w-full mt-8 overflow-x-auto">
      <table className="table w-full mx-auto">
        <thead>
          <tr>
            {headers.map(({ id, title},index) => (
              <th
                key={id}
                className={`px-6 py-3 text-xs font-medium leading-4 tracking-wider ${
                  index === 0 ? 'text-left' : index === headers.length - 1 ? 'text-right' : ''
                } text-gray-500 uppercase border-b border-gray-200 bg-gray-50`}
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((item: any) => (
            <tr
              key={item.id}
              className="cursor-pointer  hover:bg-gray-200"
              // onClick={() => handleTableRow({ id: item.id })}
            >
            
          
              <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                {item.name
              }
              </td>
          
              <td
                className="px-6 py-4 text-sm font-medium leading-5 flex items-end justify-end text-right whitespace-no-wrap border-b border-gray-200"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  onClick={() => {
                    openModal();
                    setProcess("Edit");
                    setRoomTypeId(item.id);
                    setSelectedRow({
                      ...item,
                    });
                  }}
                  className="cursor-pointer"
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
