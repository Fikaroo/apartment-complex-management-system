import React from "react";
import Tables from '../../../components/Table/Tables'
import {
MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
const Sos:React.FC = () => {
const headers:string[]=['Tarix','YK','Bina','Mənzil','D']

  return (
    <React.Fragment>
      <div className="flex flex-row w-full p-10">
        <div className="basis-3/4">
          <p className="font-inter font-bold text-16 leading-30 text-dark">
            Ümumi: 23 bildiriş
          </p>
        </div>
        <div className="basis-1/4 flex flex-row">
          <div className=" basis-1/2 relative flex flex-row items-center">
            <input
              type="text"
              className="px-3 py-2 bg-white border border-gray-300 rounded-3xl pl-12 focus:outline-none focus:bg-white focus:border-purple-500"
              placeholder="Search"
            />
           <MagnifyingGlassIcon className="w-5 h-5 absolute right-5 "/>
          </div>
          <div className="basis-1/2 relative flex flex-row items-start px-3 py-2 bg-white border border-gray-300 rounded-3xl pl-12 ml-3">
            <img
              src="/icons/filter.svg"
              alt="Search Icon"
              className="absolute right-3 top-2"
            />
          </div>
        </div>
      </div>

<Tables headers={headers}/>
    
    </React.Fragment>
  );
};

export default Sos;
