import React,{useState,useEffect} from "react";
import {GetbyId} from "../../api";
import useSWR, { KeyedMutator } from "swr";
import {
    AddVendorRooms,
    CreateTransport,
    Delete,
    GetAll,
    IVendorRoomArgs,
    UpdateTransport,
  } from "../../api";
import { useParams } from "react-router-dom";
import Tabs, { ITabs } from "../../components/Tabs";
import {
  PencilIcon,
  PlusCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { ITransportArgs } from "../Employees/EmployeesDetail";
import { useFormik } from "formik";
import useSWRMutation from "swr/mutation";
type Props = {};

const UserDetail = (props: Props) => {

  const [tabs] = useState<ITabs[]>([
    {
      id: 1,
      name: "User Detail",
      component: <TabOne />,
    },
    { id: 2, name: "Transport", component: <TransportTab /> },

    { id: 3, name: "Obyektler", component: <></> },
  ]);
 
  return (
    <React.Fragment>
     <Tabs tabs={tabs} />
  
   
  </React.Fragment>
  );
};

export default UserDetail;

const TabOne = () => {
    const { userId } = useParams()
    const { data, error, isLoading } = useSWR(`/api/VendorResident/GetById?id=${userId}`,GetbyId.user)
    let [isOpen, setIsOpen] = useState<boolean>(false);
    const [process, setProcess] = useState("");
    const closeModal = (): void => {
      setIsOpen(false);
    };
    const openModal = (): void => {
      setIsOpen(true);
    };
    return(
      <>
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

    </div></>
    )
}
const TransportTab = () => {
    const { companyId } = useParams();
    const [addTransport, setAddTransport] = useState(false);
  
    const {
      data: transportData,
      isLoading: transportIsLoading,
      error: transportError,
      mutate,
    } = useSWR<{ data: ITransportArgs[] }>(
      companyId ? `api/Transport/GetByCompanyId/${companyId}` : null,
      GetAll.user,
      { revalidateIfStale: true }
    );
  
    const { trigger } = useSWRMutation(
      `api/Transport/CreateForCompany`,
      CreateTransport.user
    );
  
    const formik = useFormik({
      initialValues: { id: 0, brand: "", color: "", serialNumber: "" },
      onSubmit: ({ id: CompanyId, ...arg }) => {
        setAddTransport(false);
        trigger({ vendorCompanyId: companyId, ...arg });
        mutate();
      },
    });
  
    const handleAddTransport = () => setAddTransport(!addTransport);
  
    return (
      <div className="w-full">
        <div className="relative flex items-center justify-center">
          <h2 className="flex-1 text-2xl font-bold text-center">Transport</h2>
          <span className="cursor-pointer" onClick={handleAddTransport}>
            <PlusCircleIcon className="absolute right-0 w-8 h-8 -translate-y-1/2 top-1/2" />
          </span>
        </div>
        {addTransport && (
          <form
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-3 gap-4 p-4 mt-4 ml-2 mr-4 bg-white border border-dashed rounded shadow place-items-center border-primary"
          >
            <input
              id="brand"
              name="brand"
              type="text"
              placeholder="Brand"
              onChange={formik.handleChange}
              value={formik.values.brand}
              className="w-full px-2 py-1 font-semibold border rounded focus:outline-primary text-dark "
            ></input>
            <input
              id="color"
              name="color"
              type="text"
              placeholder="Color"
              onChange={formik.handleChange}
              value={formik.values.color}
              className="w-full px-2 py-1 font-semibold border rounded focus:outline-primary text-dark "
            ></input>
            <input
              id="serialNumber"
              name="serialNumber"
              type="text"
              placeholder="Serial Number"
              onChange={formik.handleChange}
              value={formik.values.serialNumber}
              className="w-full px-2 py-1 font-semibold border rounded focus:outline-primary text-dark "
            ></input>
            <button
              type="submit"
              className="w-full col-span-1 col-start-2 px-10 py-1 font-semibold text-white rounded bg-primary"
            >
              Save
            </button>
          </form>
        )}
        {transportIsLoading ? (
          <div className="grid grid-cols-3 gap-4 p-4 mt-4 bg-white border border-dashed rounded shadow place-items-center border-primary">
            <h3 className="w-full h-8 text-xl font-semibold text-dark animate-pulse bg-slate-200"></h3>
            <p className="w-full h-8 font-semibold text text-dark animate-pulse bg-slate-200"></p>
            <p className="w-full h-8 font-semibold text-icon animate-pulse bg-slate-200"></p>
          </div>
        ) : transportError ? (
          <div>error</div>
        ) : (
          <TransportCard data={transportData} mutate={mutate} />
        )}
      </div>
    );
  };
  
  const TransportCard = ({
    data,
    mutate,
  }: {
    data: { data: ITransportArgs[] } | undefined;
    mutate: KeyedMutator<{
      data: ITransportArgs[];
    }>;
  }) => {
    return (
      <div className="grid max-h-[800px] gap-4 py-4 px-2 overflow-auto">
        {data?.data?.map((item) => (
          <TransportItem key={item?.id} mutate={mutate} {...item} />
        ))}
      </div>
    );
  };
  
  const TransportItem = ({
    id,
    brand,
    color,
    serialNumber,
    mutate,
  }: ITransportArgs & {
    mutate: KeyedMutator<{
      data: ITransportArgs[];
    }>;
  }) => {
    const { companyId } = useParams();
  
    const {
      trigger,
      data: updateTransportData,
      error: updatetransportError,
      isMutating,
    } = useSWRMutation("/api/Transport/Update", UpdateTransport.user);
  
    const formik = useFormik({
      initialValues: {
        id: id,
        brand: brand,
        color: color,
        serialNumber: serialNumber,
      },
      onSubmit: ({ id, ...arg }) => {
        trigger({ id: id, ...arg });
        mutate();
        setEdit(false);
      },
    });
  
    const { data: deleteTransportData, trigger: deleteTransportTrigger } =
      useSWRMutation(`api/Transport/Delete`, Delete.user);
  
    const [isEdit, setEdit] = useState(false);
    const handleEdit = () => setEdit(!isEdit);
  
    useEffect(() => {
      console.log(deleteTransportData);
    }, []);
    return (
      <form
        key={id}
        onSubmit={formik.handleSubmit}
        className="relative grid grid-cols-3 gap-4 p-4 bg-white border border-dashed rounded shadow place-items-center border-primary"
      >
        {isEdit ? (
          <>
            <input
              id="brand"
              name="brand"
              type="text"
              placeholder="Brand"
              onChange={formik.handleChange}
              value={formik.values.brand || brand}
              required
              className="w-full px-2 py-1 font-semibold border rounded focus:outline-primary text-dark "
            ></input>
            <input
              id="color"
              name="color"
              type="text"
              placeholder="Color"
              onChange={formik.handleChange}
              value={formik.values.color || color}
              className="w-full px-2 py-1 font-semibold border rounded focus:outline-primary text-dark "
              required
            ></input>
            <input
              id="serialNumber"
              name="serialNumber"
              type="text"
              placeholder="Serial Number"
              onChange={formik.handleChange}
              value={formik.values.serialNumber || serialNumber}
              className="w-full px-2 py-1 font-semibold border rounded focus:outline-primary text-dark "
              required
            ></input>
            <button
              type="button"
              onClick={() => {
                deleteTransportTrigger({ deleteId: companyId });
                setEdit(false);
              }}
              className="w-full col-span-1 col-start-1 px-10 py-1 font-semibold text-white bg-red-500 rounded"
            >
              Delete
            </button>
            <button
              type="submit"
              className="w-full col-span-1 px-10 py-1 font-semibold text-white rounded bg-primary"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <h3 className="text-xl font-semibold text-dark">{brand}</h3>
            <p className="font-semibold text text-dark">{color}</p>
            <p className="font-semibold text-icon">{serialNumber}</p>
          </>
        )}
        <p
          onClick={handleEdit}
          className={`absolute flex items-center justify-center w-6 h-6 rounded cursor-pointer right-4 ${
            isEdit && "bottom-4"
          } bg-slate-200`}
        >
          {isEdit ? (
            <XMarkIcon className="w-4 h-4" />
          ) : (
            <PencilIcon className="w-4 h-4" />
          )}
        </p>
      </form>
    );
  };