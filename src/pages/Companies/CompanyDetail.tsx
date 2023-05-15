import React,{useState} from "react";
import {OrderGetbyId} from "../../api";
import useSWR from 'swr'
import { useParams } from "react-router-dom";
import ObjectsModal from "../../components/Modals/ObjectsModal";
type Props = {};

const CompanyDetail = (props: Props) => {
  const { companyId } = useParams()
  const { data, error, isLoading } = useSWR(`/api/VendorCompany/GetById?id=${companyId}`,OrderGetbyId.user)
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
             
              <p className=" font-bold font-inter text-[26px] leading-30 text-dark uppercase">
              {data?.data?.companyName}
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
            Director Name
              </p>
              <p className="font-bold font-inter text-16 leading-30 text-dark">
                {data?.data.directorName}	
              </p>
            </div>
            <div className="w-1/2">
              <p className="font-inter text-[14px] leading-30 text-[#7E92A2]">
            Director Surname
              </p>
              <p className="font-bold font-inter text-16 leading-30 text-dark">
                {data?.data.directorSurname}	</p>
            </div>
          </div>
          <div className=" w-full flex items-center flex-row justify-between mt-5 p-5 font-bold font-inter text-16 leading-30 text-dark">
            <div className="w-1/2">
              <p className="font-inter text-[14px] leading-30 text-[#7E92A2]">
              Father Name
              </p>
              <p className="font-bold font-inter text-16 leading-30 text-dark">
                {data?.data.directorFatherName}	
              </p>
            </div>
            <div className="w-1/2">
              <p className="font-inter text-[14px] leading-30 text-[#7E92A2]">
              Phone
              </p>
              <p className="font-bold font-inter text-16 leading-30 text-dark">
                {data?.data.phonenumber}	
              </p>
            </div>
          </div>
          <div className=" w-full flex items-center flex-row justify-between mt-5 p-5 font-bold font-inter text-16 leading-30 text-dark">
            <div className="w-1/2">
              <p className="font-inter text-[14px] leading-30 text-[#7E92A2]">
          Email
              </p>
              <p className="font-bold font-inter text-16 leading-30 text-dark">
                {data?.data.email}	
              </p>
            </div>
            <div className="w-1/2">
              <p className="font-inter text-[14px] leading-30 text-[#7E92A2]">
            Logo
              </p>
              <p className="font-bold font-inter text-16 leading-30 text-dark">
                {data?.data.logo}	
              </p>
            </div>
          </div>
          <div className=" w-full flex items-center flex-row justify-between mt-5 p-5 font-bold font-inter text-16 leading-30 text-dark">
            <div className="w-1/2">
              <p className="font-inter text-[14px] leading-30 text-[#7E92A2]">
          Building Name
              </p>
              <p className="font-bold font-inter text-16 leading-30 text-dark">
                {data?.data.buildingName}	
              </p>
            </div>
            <div className="w-1/2">
              <p className="font-inter text-[14px] leading-30 text-[#7E92A2]">
           Company Name
              </p>
              <p className="font-bold font-inter text-16 leading-30 text-dark">
                {data?.data.companyName}	
              </p>
            </div>
          </div>

          <div className=" w-full flex items-center flex-row justify-between mt-5 p-5 font-bold font-inter text-16 leading-30 text-dark">
            <div className="w-1/2">
              <p className="font-inter text-[14px] leading-30 text-[#7E92A2]">
         Voen
              </p>
              <p className="font-bold font-inter text-16 leading-30 text-dark">
                {data?.data.voen}	
              </p>
            </div>
            <div className="w-1/2">
              <p className="font-inter text-[14px] leading-30 text-[#7E92A2]">
     Vin
              </p>
              <p className="font-bold font-inter text-16 leading-30 text-dark">
                {data?.data.vin}	
              </p>
            </div>
          </div>

         
        </div>

      </div>
     
    </React.Fragment>
  );
};

export default CompanyDetail;
