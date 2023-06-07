import React, { useState } from "react";
import { GetbyId } from "../../api";
import useSWR from "swr";
import { Tab } from "@headlessui/react";
import { useParams } from "react-router-dom";
import RentRooms from "../RentRooms/RentRooms";
type Props = {};

const VendorRoomDetail = (props: Props) => {
  const { vendorRoomId } = useParams();


  const { data, error, isLoading } = useSWR(
    `/api/VendorRooms/GetById?id=${vendorRoomId}`,
    GetbyId.user
  );
  console.log(data, "data");
  let [isOpen, setIsOpen] = useState<boolean>(false);
  const [process, setProcess] = useState("");
  const closeModal = (): void => {
    setIsOpen(false);
  };
  const openModal = (): void => {
    setIsOpen(true);
  };
  return (
    <React.Fragment>
      <Tab.Group>
        <Tab.List className=" w-1/2 flex justify-between space-x-1 rounded-xl p-1 mb-5">
        <Tab className={({selected})=>(
    "w-1/2 rounded-lg py-2.5 text-sm font-medium leading-5 text-primary ring-white ring-opacity-60 ring-offset-2 ring-offset-primary focus:outline-none focus:ring-2 " +
    (selected ? "bg-white shadow" : "text-blue-10")
  )}>
Vendor Room Detail
</Tab>
          <Tab className={({selected})=>(
    "w-1/2 rounded-lg py-2.5 text-sm font-medium leading-5 text-primary ring-white ring-opacity-60 ring-offset-2 ring-offset-primary focus:outline-none focus:ring-2 " +
    (selected ? "bg-white shadow" : "text-blue-10")
  )}>
  RentRoom
</Tab>
         
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div className="w-1/2 h-[200px] flex items-center justify-between p-5 bg-white">
              <div className="w-1/2">
                <div className="w-full mt-10">
                  <p className="font-inter text-16 leading-30 text-[#7E92A2] ">
                    {data?.data?.name}
                  </p>
                </div>
              </div>
              <div className="w-1/6 flex items-center justify-between">
                <div className="w-[50px] h-[50px] border-[1px] border-slate-300 rounded-full flex items-center justify-center">
                  <img
                    src="/icons/edit.svg"
                    alt=""
                    className="rounded-full w-[50px] h-[30px] p-1 cursor-pointer"
                    onClick={() => {
                      openModal();
                      setProcess("Edit");
                    }}
                  />
                </div>
                <div className="w-[50px] h-[50px] border-[1px] border-slate-300 rounded-full flex items-center justify-center">
                  <img
                    src="/icons/trashicon.svg"
                    alt=""
                    className="rounded-full w-[30px] h-[30px] p-1 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="w-1/2 flex items-center justify-between">
              <div className="w-2/3 h-[300px] pr-10 ">
                {" "}
                <div className=" w-full flex items-center flex-row justify-between mt-5 p-5">
                  <div className="w-1/2">
                    <p className="font-inter text-[14px] leading-30 text-[#7E92A2]">
                      Company Name
                    </p>
                    <p className="font-bold font-inter text-16 leading-30 text-dark">
                      {data?.data.companyName}
                    </p>
                  </div>
                  <div className="w-1/2">
                    <p className="font-inter text-[14px] leading-30 text-[#7E92A2]">
                      Available
                    </p>
                    <p className="font-bold font-inter text-16 leading-30 text-dark">
                      {data?.data.isRentAviable ? "Yes" : "No"}{" "}
                    </p>
                  </div>
                </div>
                <div className=" w-full flex items-center flex-row justify-between mt-5 p-5 font-bold font-inter text-16 leading-30 text-dark">
                  <div className="w-1/2">
                    <p className="font-inter text-[14px] leading-30 text-[#7E92A2]">
                      Region Name
                    </p>
                    <p className="font-bold font-inter text-16 leading-30 text-dark">
                      {data?.data.regionName}
                    </p>
                  </div>
                  <div className="w-1/2">
                    <p className="font-inter text-[14px] leading-30 text-[#7E92A2]">
                      Price
                    </p>
                    <p className="font-bold font-inter text-16 leading-30 text-dark">
                      {data?.data.rentPrice}
                    </p>
                  </div>
                </div>
                <div className=" w-full flex items-center flex-row justify-between mt-5 p-5 font-bold font-inter text-16 leading-30 text-dark">
                  <div className="w-1/2">
                    <p className="font-inter text-[14px] leading-30 text-[#7E92A2]">
                      Room Type
                    </p>
                    <p className="font-bold font-inter text-16 leading-30 text-dark">
                      {data?.data.roomTypeName}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel><RentRooms vendorRoomId={vendorRoomId} /></Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </React.Fragment>
  );
};

export default VendorRoomDetail;
