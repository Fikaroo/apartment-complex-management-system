import React, { useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import DealsSubModal from "./DealsSubModal";
import { Formik, Field, Form, FormikHelpers } from "formik";
import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { CreateDeal } from "../../api";
import { Delete } from "../../api";
import { CreateBuilding } from "../../api";
import { GetAll } from "../../api";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  process: string;
  deleteId: number;
  selectedRow: any;
  mutate: any;
};
type Values = {
  image: any;
  name: string;
  regionId: string;
  street: string;
  buildingNo: string;
  securityPhone: string;
  floor: number;
  entrance: number;
  vendorObjectId: string;
};

const BuildingsModal: React.FC<Props> = ({
  isOpen,
  closeModal,
  process,
  deleteId,
  selectedRow,
  mutate,
}) => {
  const { trigger, data, error, isMutating } = useSWRMutation(
    "/api/VendorBuildings/Create",
    CreateBuilding.user
  );
  const {
    data: dataObjects,
    error: errorObjects,
    isLoading: isLoadingObjects,
  } = useSWR("/api/VendorObjects/GetAll", (key) => GetAll.user(key));
  console.log(dataObjects, "dataObjects");
  const {
    data: dataRegions,
    error: errorRegions,
    isLoading: isLoadingRegions,
  } = useSWR("/api/Region/GetAll", (key) => GetAll.user(key));

  useEffect(() => {
    if (data?.statusCode === 201) {
      alert(data.message);
      closeModal();
    } else if (data?.statusCode === 400) {
      console.log(error, "error");
    }
  }, [data]);

  const handleSubmit = async (values: Values) => {
    console.log(values, "values");

    const parsedValues = {
      ...values,
       image: values.image.substring(values.image.lastIndexOf('\\') + 1),
      regionId: parseInt(values.regionId),
      vendorObjectId: parseInt(values.vendorObjectId),

    };
    const { data, error } = await trigger(parsedValues);
    if (error) {
      console.log(error);
    } else {
      alert(data.message);
      closeModal();

    }
  };

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
                {process === "Add" ? (
                  <Dialog.Panel className="w-full max-w-[40em] p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className="flex items-center justify-between font-bold font-inter text-16 leading-30 text-dark"
                    >
                      Add Building
                      <XCircleIcon
                        onClick={closeModal}
                        className="w-6 h-6 cursor-pointer fill-icon"
                      />
                    </Dialog.Title>
                    <Formik
                      initialValues={{
                        image: "",
                        name: "",
                        regionId: "",
                        street: "",
                        buildingNo: "",
                        securityPhone: "",
                        floor: 0,
                        entrance: 0,
                        vendorObjectId: "",
                      }}
                      onSubmit={handleSubmit}
                    >
                      <Form>
                        <div className=" w-full flex items-center flex-row justify-between mt-5 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                            {" "}
                            <label
                              htmlFor="image"
                              className="flex items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark"
                            >
                              Image
                            </label>
                            <Field
                              type="file"
                              accept="image/*"
                              className="mt-3 w-full  rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none  font-medium text-md"
                              name="image"
                              required
                            />
                          </div>
                          <div className="w-[48%]">
                            {" "}
                            <label
                              htmlFor="name"
                              className="flex items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark"
                            >
                              Name
                            </label>
                            <Field
                              type="text"
                              className="mt-3 w-full  rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none  font-medium text-md"
                              name="name"
                              required
                            />
                          </div>
                        </div>

                        <div className=" w-full flex items-center flex-row justify-between mt-5 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                            <label
                              htmlFor="regionId"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              RegionName
                            </label>
                            <div className="flex items-center justify-between relative">
                              <Field
                                as="select"
                                id="regionId"
                                className="mt-3 w-full rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                name="regionId"
                                required
                              >
                                <option value="-1">Choose</option>
                                {dataRegions?.data.map((item: any) => (
                                  <option value={item.id}>{item.name}</option>
                                ))}
                              </Field>
                            </div>
                          </div>
                          <div className="w-[48%]">
                            <label
                              htmlFor="street"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              Street
                            </label>
                            <Field
                              type="text"
                              className="mt-3 w-full rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md hover:outline-none"
                              name="street"
                              required
                            />
                          </div>
                        </div>
                        <div className=" w-full flex items-center flex-row justify-between mt-5 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                            <label
                              htmlFor="buildingNo"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              BuildingNo
                            </label>
                            <div className="flex items-center justify-between relative">
                              <Field
                                type="text"
                                className="mt-3 w-full rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md hover:outline-none"
                                name="buildingNo"
                                required
                              />
                            </div>
                          </div>
                          <div className="w-[48%]">
                            <label
                              htmlFor="securityPhone"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              Security Phone
                            </label>
                            <Field
                              className="mt-3 w-full rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md hover:outline-none"
                              type="text"
                              name="securityPhone"
                              required
                            />
                          </div>
                        </div>
                        <div className=" w-full flex items-center flex-row justify-between mt-5 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                            <label
                              htmlFor="floor"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              Floor
                            </label>
                            <div className="flex items-center justify-between relative">
                              <Field
                                className="mt-3 w-full rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md hover:outline-none"
                                type="number"
                                name="floor"
                                required
                              />
                            </div>
                          </div>
                          <div className="w-[48%]">
                            <label
                              htmlFor="entrance"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              Entrance
                            </label>

                            <Field
                              className="mt-3 w-full rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md hover:outline-none"
                              type="number"
                              name="entrance"
                              required
                            />
                          </div>
                        </div>

                        <div className="w-full  flex items-end justify-between  mt-5 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                            <label
                              htmlFor="vendorObjectId"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              Object Name
                            </label>

                            <Field
                              className="mt-3 w-full rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                              as="select"
                              name="vendorObjectId"
                              id="vendorObjectId"
                              required
                            >
                              <option value="-1">Choose</option>
                              {dataObjects?.data.map((item: any) => (
                                <option value={item.id}>{item.title}</option>
                              ))}
                            </Field>
                          </div>
                        </div>
                        <div className="flex w-full items-center justify-around mt-10 font-bold font-inter text-16 leading-30 text-dark">
                          <button
                            type="submit"
                            disabled={isMutating}
                            className="flex items-center justify-center w-1/4 px-2 py-4 text-sm font-medium text-white border border-transparent rounded-full bg-primary hover:bg-primary-200 focus:outline-none"
                          >
                            Əlavə et
                          </button>
                        </div>
                      </Form>
                    </Formik>
                  </Dialog.Panel>
                ) : // ) : process === "Edit" ? (
                //   <Dialog.Panel className="w-full max-w-[40em] p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                //     <Dialog.Title
                //       as="h3"
                //       className="flex items-center justify-between font-bold font-inter text-16 leading-30 text-dark"
                //     >
                //       Sifarişə düzəliş et
                //       <XCircleIcon
                //         onClick={closeModal}
                //         className="w-6 h-6 cursor-pointer fill-icon"
                //       />
                //     </Dialog.Title>
                //     <Formik
                //       initialValues={{
                //         description: selectedRow?.description || "",
                //         statusId: selectedRow?.statusId || "",
                //         orderTypeId: selectedRow?.orderTypeId || "",
                //         orderSourceId: selectedRow?.orderSourceId || "",
                //         priorityId: selectedRow?.priorityId || "",
                //         orderClassId: selectedRow?.orderClassId || "",
                //         appUserId: selectedRow?.appUserId || "",
                //         actualDeadline: selectedRow?.actualDeadline || "",
                //         normativeDeadline: selectedRow?.normativeDeadline || "",
                //       }}
                //       onSubmit={handleEdit}
                //     >
                //       <Form>
                //         <div className=" w-full flex items-center flex-row justify-between mt-5 font-bold font-inter text-16 leading-30 text-dark">
                //           <div className="w-[48%]">
                //             {" "}
                //             <label
                //               htmlFor="actualDeadline"
                //               className="flex items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark"
                //             >
                //               Actual Deadline
                //             </label>
                //             <Field
                //               type="date"
                //               className="mt-3 w-full  rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none  font-medium text-md"
                //               name="actualDeadline"
                //             />
                //           </div>
                //           <div className="w-[48%]">
                //             {" "}
                //             <label
                //               htmlFor="normativeDeadline"
                //               className="flex items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark"
                //             >
                //               Normative Deadline
                //             </label>
                //             <Field
                //               type="date"
                //               className="mt-3 w-full  rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none  font-medium text-md"
                //               name="normativeDeadline"
                //               required
                //             />
                //           </div>
                //         </div>

                //         <div className=" w-full flex items-center flex-row justify-between mt-5 font-bold font-inter text-16 leading-30 text-dark">
                //           <div className="w-[48%]">
                //             <label
                //               htmlFor="appUserId"
                //               className="inline-flex  justify-star items-center  w-1/2"
                //             >
                //               İcraçı
                //             </label>
                //             <div className="flex items-center justify-between relative">
                //               <Field
                //                 type="text"
                //                 className="mt-3 w-full rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                //                 name="appUserId"
                //               />
                //               <ChevronDownIcon
                //                 className="h-5 w-5 text-gray-400 absolute top-[50%] right-4 cursor-pointer"
                //                 onClick={openModalSub}
                //               />
                //             </div>
                //           </div>
                //           <div className="w-[48%]">
                //             <label
                //               htmlFor="orderTypeId"
                //               className="inline-flex  justify-star items-center  w-1/2"
                //             >
                //               Order Type
                //             </label>
                //             <Field
                //               as="select"
                //               id="orderTypeId"
                //               className="mt-3 w-full rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md hover:outline-none"
                //               name="orderTypeId"
                //               required
                //             >
                //               <option value="-1">Choose</option>
                //               {options.map((item) => (
                //                 <option value={item.id}>{item.name}</option>
                //               ))}
                //             </Field>
                //           </div>
                //         </div>
                //         <div className=" w-full flex items-center flex-row justify-between mt-5 font-bold font-inter text-16 leading-30 text-dark">
                //           <div className="w-[48%]">
                //             <label
                //               htmlFor="orderSourceId"
                //               className="inline-flex  justify-star items-center  w-1/2"
                //             >
                //               Order Source
                //             </label>
                //             <div className="flex items-center justify-between relative">
                //               <Field
                //                 as="select"
                //                 className="mt-3 w-full rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md hover:outline-none"
                //                 id="orderSourceId"
                //                 name="orderSourceId"
                //                 required
                //               >
                //                 <option value="-1">Choose</option>
                //                 {optionsSource.map((item) => (
                //                   <option value={item.id}>{item.name}</option>
                //                 ))}
                //               </Field>
                //             </div>
                //           </div>
                //           <div className="w-[48%]">
                //             <label
                //               htmlFor="priorityId"
                //               className="inline-flex  justify-star items-center  w-1/2"
                //             >
                //               Priorty
                //             </label>
                //             <Field
                //               className="mt-3 w-full rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md hover:outline-none"
                //               as="select"
                //               id="priorityId"
                //               name="priorityId"
                //               required
                //             >
                //               <option value="-1">Choose</option>
                //               {optionsPriority.map((item) => (
                //                 <option value={item.id}>{item.name}</option>
                //               ))}
                //             </Field>
                //           </div>
                //         </div>
                //         <div className=" w-full flex items-center flex-row justify-between mt-5 font-bold font-inter text-16 leading-30 text-dark">
                //           <div className="w-[48%]">
                //             <label
                //               htmlFor="orderClassId"
                //               className="inline-flex  justify-star items-center  w-1/2"
                //             >
                //               Order Class
                //             </label>
                //             <div className="flex items-center justify-between relative">
                //               <Field
                //                 className="mt-3 w-full rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md hover:outline-none"
                //                 as="select"
                //                 name="orderClassId"
                //                 id="orderClassId"
                //                 required
                //               >
                //                 <option value="-1">Choose</option>
                //                 {optionsClass.map((item) => (
                //                   <option value={item.id}>{item.name}</option>
                //                 ))}
                //               </Field>
                //             </div>
                //           </div>
                //           <div className="w-[48%]">
                //             <label
                //               htmlFor="statusId"
                //               className="inline-flex  justify-star items-center  w-1/2"
                //             >
                //               Status
                //             </label>

                //             <Field
                //               className="mt-3 w-full rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md hover:outline-none"
                //               as="select"
                //               name="statusId"
                //               id="statusId"
                //               required
                //             >
                //               <option value="-1">Choose</option>
                //               {optionsStatus.map((item) => (
                //                 <option value={item.id}>{item.name}</option>
                //               ))}
                //             </Field>
                //           </div>
                //         </div>

                //         <div className="w-full  flex items-end justify-between  mt-5 font-bold font-inter text-16 leading-30 text-dark">
                //           <div className="w-[48%]">
                //             <label
                //               htmlFor="description"
                //               className="inline-flex  justify-star items-center  w-1/2"
                //             >
                //               Description
                //             </label>

                //             <Field
                //               className="mt-3 w-full min-h-[100px] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md hover:outline-none"
                //               as="textarea"
                //               name="description"
                //               id="description"
                //               required
                //             ></Field>
                //           </div>
                //         </div>
                //         <div className="flex w-full items-center justify-around mt-10 font-bold font-inter text-16 leading-30 text-dark">
                //           <button
                //             type="button"
                //             className="inline-flex items-center justify-center w-1/4 px-2 py-4 text-sm font-medium text-red-400 rounded-full outline font-inter"
                //             onClick={handleDelete}
                //             disabled={isMutatingDelete}
                //           >
                //             Delete
                //           </button>
                //           <button
                //             type="submit"
                //             disabled={isMutatingEdit}
                //             className="flex items-center justify-center w-1/4 px-2 py-4 text-sm font-medium text-white border border-transparent rounded-full bg-primary hover:bg-primary-200 focus:outline-none"
                //           >
                //             Edit
                //           </button>
                //         </div>
                //       </Form>
                //     </Formik>
                //   </Dialog.Panel>
                null}
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default BuildingsModal;
