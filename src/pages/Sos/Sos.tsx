import { Fragment } from "react";
import Tables, { IHeaders } from "../../components/Table/Tables";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";
import Input from "../../components/Input";
import Filter from "../../components/Filter";

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
      title: "D",
    },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <p className="font-bold font-inter text-16 leading-30 text-dark">
          Ümumi: 23 bildiriş
        </p>{" "}
        <div className="flex gap-4">
          <Input />
          <Filter />
        </div>
      </div>
      <Tables headers={headers} />
    </div>
  );
};

export default Sos;
