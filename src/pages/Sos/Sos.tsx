import { Fragment,useState } from "react";
import Tables, { IHeaders } from "../../components/Table/Tables";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";

const Sos = () => {
  
  const headers: IHeaders[] = [
    {
      id: 1,
      isAccess: true,
      icon: <FunnelIcon className="w-5 h-5" />,
    },
    {
      id: 2,
      title: "Tarix",
    },
    {
      id: 3,
      title: "YK",
    },
    {
      id: 4,
      title: "Bina",
    },
    {
      id: 5,
      title: "Mənzil",
    },
    {
      id: 6,
      title: "Düzəlt",
    },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <p className="font-bold font-inter text-16 leading-30 text-dark">
          Ümumi: 23 bildiriş
        </p>
        <div className="flex gap-4">
          <div className="relative flex items-center">
            <input
              type="text"
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-full focus:outline-none focus:bg-white focus:border-purple-500"
              placeholder="Search"
            />
            <MagnifyingGlassIcon className="absolute w-5 h-5 right-5 stroke-icon" />
          </div>
          <div className="relative flex items-center justify-between gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full">
            <span>Filter</span>
            <FunnelIcon className="w-5 h-5 stroke-icon" />
          </div>
        </div>
      </div>
      <Tables headers={headers} />
    </div>
  );
};

export default Sos;
