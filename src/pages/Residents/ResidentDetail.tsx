import React,{useState} from "react";
import {GetbyId} from "../../api";
import useSWR from 'swr'
import { useParams } from "react-router-dom";
import ObjectsModal from "../../components/Modals/ObjectsModal";
type Props = {};

const ResidentDetail = (props: Props) => {
  const { residentId } = useParams()

  const { data, error, isLoading } = useSWR(`/api/VendorResident/GetById?id=${residentId}`,GetbyId.user)
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
    
    <div className="w-1/2 h-[200px] flex items-center justify-between p-5 bg-white">
    <div className="w-1/2">
        
        <div className="w-full mt-10">
           
            <p className="font-inter text-16 leading-30 text-[#7E92A2] ">
            {data?.result?.data?.name}
            </p>
          </div>
          <div className="w-full mt-10">
           
           <p className="font-inter text-16 leading-30 text-[#7E92A2] ">
           {data?.result?.data?.surname}
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
            Father Name
            </p>
            <p className="font-bold font-inter text-16 leading-30 text-dark">
              {data?.result?.data.fatherName}	
            </p>
          </div>
          <div className="w-1/2">
            <p className="font-inter text-[14px] leading-30 text-[#7E92A2]">
            Phonenumber
            </p>
            <p className="font-bold font-inter text-16 leading-30 text-dark">
              {data?.result?.data.phonenumber}	</p>
          </div>
        </div>
        <div className=" w-full flex items-center flex-row justify-between mt-5 p-5 font-bold font-inter text-16 leading-30 text-dark">
          <div className="w-1/2">
            <p className="font-inter text-[14px] leading-30 text-[#7E92A2]">
            Email
            </p>
            <p className="font-bold font-inter text-16 leading-30 text-dark">
              {data?.result?.data.email}	
            </p>
          </div>
          <div className="w-1/2">
            <p className="font-inter text-[14px] leading-30 text-[#7E92A2]">
            Company Name
            </p>
            <p className="font-bold font-inter text-16 leading-30 text-dark">
              {data?.result?.data.companyName}	
            </p>
          </div>
        </div>
       
       
      </div>

    </div>
   
  </React.Fragment>
  );
};

export default ResidentDetail;
