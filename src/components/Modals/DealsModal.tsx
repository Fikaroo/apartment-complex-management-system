import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import DealsSubModal from "./DealsSubModal";
import { Formik, Field, Form, FormikHelpers } from "formik";
import useSWR from "swr";
import { CreateDeal } from "../../api";
import { Delete } from "../../api";
import { DealsGetAll } from "../../api";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  process: string;
  orderId:number

};
type Values = {
  description: string;
  statusId: string;
  orderTypeId: string;
  orderSourceId: string;
  priorityId: string;
  orderClassId: string;
  appUserId: string;
  actualDeadline: string;
  normativeDeadline: string;
};

const DealsModal: React.FC<Props> = ({ isOpen, closeModal,process,orderId }) => {
  const [isOpenSub, setIsOpenSub] = useState<boolean>(false);
  const { data, error, isLoading } = useSWR(
    "/api/OrderAdmin/GetAll",
   (key) => DealsGetAll.user(key,)
 );

  const closeModalSub = (): void => {
    setIsOpenSub(false);
  };

  const openModalSub = (): void => {
    setIsOpenSub(true);
  };

 
  const handleSubmit = async (values: Values) => {
    const parsedValues = {
      ...values,
      orderSourceId: parseInt(values.orderSourceId),
      orderTypeId: parseInt(values.orderTypeId),
      priorityId: parseInt(values.priorityId),
      statusId: parseInt(values.statusId),
      orderClassId: parseInt(values.orderClassId)
    };
    

    console.log(parsedValues, "valuesss");
    try {
      const response = await CreateDeal.user("/api/OrderAdmin/Create", parsedValues);
  
      if (response.statusCode === 201) {
        alert(response.message)
        closeModal();
   
   
        
      } else {
        
        console.log(response,"response")
        
        console.log("Invalid username or password");
      }
    } catch (error) {
      alert(error)
      console.log("An error occurred. Please try again later.");
    }
  
  };
const handleDelete=async()=>{
  try {
    const response = await Delete.user("/api/OrderAdmin/Delete", orderId);

    if (response.statusCode === 201) {
      alert(response.message)
      closeModal();
 
 
      
    } else {
      
      console.log(response,"response")
      
      
    }
  } catch (error) {
    alert(error)
    console.log("An error occurred. Please try again later.");
  }

}
  const options = [
    { id: 1, name: "Yanğinsöndürmə sistemləri" },
    { id: 2, name: "Su catdirilmasi" },
    { id: 3, name: "Avtomatik Qapi" },
    { id: 4, name: "Santexnik, istilik, kanalizasiya+" },
  ];
  const optionsSource = [
    { id: 1, name: "Şəxsi Ziyarət" },
    { id: 2, name: "Sosial Sebeke+" },
  ];
  const optionsPriority = [
    { id: 0, name: "Low" },
    { id: 1, name: "Normal+" },
    { id: 2, name: "High" },
    { id: 3, name: "Critical" },
  ];
  const optionsClass = [
    { id: 1, name: "Client" },
    { id: 2, name: "Planned+" },
  ];
  const optionsStatus = [
    { id: 0, name: "NewOrder+" },
    { id: 1, name: "Appointed" },
    { id: 2, name: "Inprogress" },
    { id: 3, name: "OnPause" },
    { id: 4, name: "OnConfirmation" },
    { id: 5, name: "Completed" },
    { id: 6, name: "Rejected" },
    { id: 7, name: "Returned" },
    { id: 8, name: "Cancelled" },
    { id: 9, name: "Closed" },
    { id: 10, name: "EnteredIncorrectly" },
  ];

  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[40em] p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="flex items-center justify-between font-bold font-inter text-16 leading-30 text-dark"
                  >
                    Sifarişə düzəliş et
                    <XCircleIcon
                      onClick={closeModal}
                      className="w-6 h-6 cursor-pointer fill-icon"
                    />
                  </Dialog.Title>
                  <Formik
                    initialValues={{
                      description: "",
                      statusId: "",
                      orderTypeId: "",
                      orderSourceId: "",
                      priorityId: "",
                      orderClassId:"",
                      appUserId: "",
                      actualDeadline: "",
                      normativeDeadline: "",
                    }}
                    onSubmit={handleSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <div className=" w-full flex items-center flex-row justify-between mt-5 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                            {" "}
                            <label
                              htmlFor="actualDeadline"
                              className="flex items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark"
                            >
                              Actual Deadline
                            </label>
                            <Field
                              type="date"
                              className="mt-3 w-full  rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none  font-medium text-md"
                              name="actualDeadline"
                              required
                            />
                          </div>
                          <div className="w-[48%]">
                            {" "}
                            <label
                              htmlFor="normativeDeadline"
                              className="flex items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark"
                            >
                              Normative Deadline
                            </label>
                            <Field
                              type="date"
                              className="mt-3 w-full  rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none  font-medium text-md"
                              name="normativeDeadline"
                              required
                            />
                          </div>
                        </div>

                        <div className=" w-full flex items-center flex-row justify-between mt-5 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                            <label
                              htmlFor="appUserId"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              İcraçı
                            </label>
                            <div className="flex items-center justify-between relative">
                              <Field
                                type="text"
                                className="mt-3 w-full rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                name="appUserId"
                                
                              />
                              <ChevronDownIcon
                                className="h-5 w-5 text-gray-400 absolute top-[50%] right-4 cursor-pointer"
                                onClick={openModalSub}
                              />
                            </div>
                          </div>
                          <div className="w-[48%]">
                            <label
                              htmlFor="orderTypeId"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              Order Type
                            </label>
                            <Field
                              as="select"
                              id="orderTypeId"
                              className="mt-3 w-full rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md hover:outline-none"
                              name="orderTypeId"
                              required
                            >
                              <option value="-1">Choose</option>
                              {options.map((item) => (
                                <option value={item.id}>{item.name}</option>
                              ))}
                            </Field>
                          </div>
                        </div>
                        <div className=" w-full flex items-center flex-row justify-between mt-5 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                            <label
                              htmlFor="orderSourceId"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              Order Source
                            </label>
                            <div className="flex items-center justify-between relative">
                              <Field
                                as="select"
                                className="mt-3 w-full rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md hover:outline-none"
                                id="orderSourceId"
                                name="orderSourceId"
                                required
                              >
                                <option value="-1">Choose</option>
                                {optionsSource.map((item) => (
                                  <option value={item.id}>{item.name}</option>
                                ))}
                              </Field>
                            </div>
                          </div>
                          <div className="w-[48%]">
                            <label
                              htmlFor="priorityId"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              Priorty
                            </label>
                            <Field
                              className="mt-3 w-full rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md hover:outline-none"
                              as="select"
                              id="priorityId"
                              name="priorityId"
                              required
                            >
                              <option value="-1">Choose</option>
                              {optionsPriority.map((item) => (
                                <option value={item.id}>{item.name}</option>
                              ))}
                            </Field>
                          </div>
                        </div>
                        <div className=" w-full flex items-center flex-row justify-between mt-5 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                            <label
                              htmlFor="orderClassId"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              Order Class
                            </label>
                            <div className="flex items-center justify-between relative">
                              <Field
                                className="mt-3 w-full rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md hover:outline-none"
                                as="select"
                                name="orderClassId"
                                id="orderClassId"
                                required
                              >
                                <option value="-1">Choose</option>
                                {optionsClass.map((item) => (
                                  <option value={item.id}>{item.name}</option>
                                ))}
                              </Field>
                            </div>
                          </div>
                          <div className="w-[48%]">
                            <label
                              htmlFor="statusId"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              Status
                            </label>

                            <Field
                              className="mt-3 w-full rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md hover:outline-none"
                              as="select"
                              name="statusId"
                              id="statusId"
                              required
                            >
                              <option value="-1">Choose</option>
                              {optionsStatus.map((item) => (
                                <option value={item.id}>{item.name}</option>
                              ))}
                            </Field>
                          </div>
                        </div>

                        <div className="w-full  flex items-end justify-between  mt-5 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                            <label
                              htmlFor="description"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              Description
                            </label>

                            <Field
                              className="mt-3 w-full min-h-[100px] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md hover:outline-none"
                              as="textarea"
                              name="description"
                              id="description"
                              required
                            ></Field>
                          </div>
                          
                         
                        </div>
                        <div className="flex w-full items-center justify-around mt-10 font-bold font-inter text-16 leading-30 text-dark">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center w-1/4 px-2 py-4 text-sm font-medium text-red-400 rounded-full outline font-inter"
                    onClick={handleDelete}
                      >
                        Delete
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center justify-center w-1/4 px-2 py-4 text-sm font-medium text-white border border-transparent rounded-full bg-primary hover:bg-primary-200 focus:outline-none"
                      >
                        Əlavə et
                      </button>
                         
                        </div>
                      </Form>
                    )}
                  </Formik>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <DealsSubModal isOpenSub={isOpenSub} closeModalSub={closeModalSub} />
    </div>
  );
};

export default DealsModal;
