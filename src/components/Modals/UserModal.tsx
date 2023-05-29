import { Dialog, Transition } from "@headlessui/react";
import React, { useEffect } from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";
import { RegisterUser } from "../../api";
import { Formik, Field, Form } from "formik";
import useSWR from "swr";
import useGetResponse from "../../hooks/useGetResponse";
import { GetAll } from "../../api";
import { EditUser } from "../../api";
import { Delete } from "../../api";
type Props = {
  isOpen: boolean;
  closeModal: () => void;
  process: string;
  deleteId: number;
  selectedRow: any;
  mutate: any;
};
type Values = {
  name: string;
  surname: string;
  patrionimyc: string;
  email: string;
  phoneNumber: string;
  propertyTypeId: string;
  customerStatusId: string;
  proportion: string;
};
const UserModal: React.FC<Props> = ({
  isOpen,
  closeModal,
  process,
  deleteId,
  selectedRow,
  mutate,
}) => {
  const {
    data: dataPropertyTypes,
    error: errorPropertyTypes,
    isLoading: isLoadingPropertyTypes,
  } = useSWR("/api/PropertyType/GetAll", (key) => GetAll.user(key));
  const {
    data: dataStatus,
    error: errorStatus,
    isLoading: isLoadingStatus,
  } = useSWR("/api/CustomerStatus/GetAll", (key) => GetAll.user(key));
  const handleSubmit = async (values: Values) => {
    const parsedValues = {
      ...values,
      propertyTypeId: parseInt(values.propertyTypeId),
      customerStatusId: parseInt(values.customerStatusId),
    };
    //   const res = await useGetResponse(
    //   RegisterUser.user("/api/AccountAdmin/RegisterUser", {
    //     arg: parsedValues,
    //   }),
    //   mutate,
    //   closeModal
    // );

    // alert(res);
  };
  const handleEdit = async (values: Values) => {
    const parsedValues = {
      ...values,
      propertyTypeId: parseInt(values.propertyTypeId),
      customerStatusId: parseInt(values.customerStatusId),
      id: selectedRow.id,
    };

    const res = await useGetResponse(
      EditUser.user("/api/Users/UpdateUserInfos", {
        arg: parsedValues,
      }),
      mutate,
      closeModal
    );

    alert(res);
  };
  const deleteObject = async (deleteId: any) => {
    const res = await useGetResponse(
      Delete.user("/api/Users/DeleteUser", {
        arg: { deleteId },
      }),
      mutate,
      closeModal
    );

    alert(res);
  };
  const handleDelete = async () => {
    deleteObject(deleteId);
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
                  <Dialog.Panel className="w-full max-w-xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className="flex items-center justify-between font-bold font-inter text-16 leading-30 text-dark"
                    >
                      Sakin əlavə et
                      <XCircleIcon
                        onClick={closeModal}
                        className="w-6 h-6 cursor-pointer fill-icon"
                      />
                    </Dialog.Title>
                    <Formik
                      initialValues={{
                        name: "",
                        surname: "",
                        patrionimyc: "",
                        email: "",
                        phoneNumber: "",
                        propertyTypeId: "",
                        customerStatusId: "",
                        proportion: "",
                      }}
                      onSubmit={handleSubmit}
                    >
                      <Form action="">
                        <div className="flex items-center flex-row justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                          <div>
                            <label
                              htmlFor="name"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              Ad
                            </label>
                            <Field
                              name="name"
                              type="text"
                              className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="surname"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              Soyad
                            </label>
                            <Field
                              name="surname"
                              type="text"
                              className="mt-3 w-[95%]  rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none  font-medium text-md"
                              required
                            />
                          </div>
                        </div>
                        <div className="flex items-center flex-row justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                          <div>
                            <label
                              htmlFor="patrionimyc"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              Ata adi
                            </label>
                            <Field
                              name="patrionimyc"
                              type="text"
                              className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="email"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              Email
                            </label>
                            <Field
                              name="email"
                              type="text"
                              className="mt-3 w-[95%]  rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none  font-medium text-md"
                              required
                            />
                          </div>
                        </div>
                        <div className="flex items-center flex-row justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                          <div>
                            <label
                              htmlFor="phoneNumber"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              Phone Number
                            </label>
                            <Field
                              name="phoneNumber"
                              type="email"
                              className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                              required
                            />
                          </div>
                          <div className="w-1/2">
                            <label
                              htmlFor="propertyTypeId"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              Property Type
                            </label>
                            <Field
                              as="select"
                              name="propertyTypeId"
                              Id="propertyTypeId"
                              className="mt-3 w-[95%]  rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none  font-medium text-md"
                              required
                            >
                              <option value="-1">Choose</option>
                              {dataPropertyTypes?.data.map((item:any) => (
                                <option value={item.id}>{item.name}</option>
                              ))}
                            </Field>
                          </div>
                        </div>
                        <div className="flex items-center flex-row justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                          <div>
                            <label
                              htmlFor="customerStatusId"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              Customer Status
                            </label>
                            <Field
                              as="select"
                              id="customerStatusId"
                              name="customerStatusId"
                              type="text"
                              className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                              required
                            >
                              <option value="-1">Choose</option>
                              {dataStatus?.data.map((item:any) => (
                                <option value={item.id}>{item.name}</option>
                              ))}
                            </Field>
                          </div>
                          <div>
                            <label
                              htmlFor="proportion"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              Proportion
                            </label>
                            <Field
                              name="proportion"
                              type="number"
                              className="mt-3 w-[95%]  rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none  font-medium text-md"
                              required
                            />
                          </div>
                        </div>

                        <div className="flex w-full items-center justify-end mt-10 font-bold font-inter text-16 leading-30 text-dark">
                          <button
                            type="button"
                            className="inline-flex items-center justify-center w-1/4 px-2 py-4 text-sm font-medium font-inter"
                            onClick={closeModal}
                          >
                            İmtina et
                          </button>
                          <button
                            type="submit"
                            className="flex items-center justify-center w-1/4 px-2 py-4 text-sm font-medium text-white border border-transparent rounded-full bg-primary hover:bg-primary-200 focus:outline-none"
                          >
                            Əlavə et
                          </button>
                        </div>
                      </Form>
                    </Formik>
                  </Dialog.Panel>
                ) : process === "Edit" ? (
                  <Dialog.Panel className="w-full max-w-xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className="flex items-center justify-between font-bold font-inter text-16 leading-30 text-dark"
                    >
                      Sakin əlavə et
                      <XCircleIcon
                        onClick={closeModal}
                        className="w-6 h-6 cursor-pointer fill-icon"
                      />
                    </Dialog.Title>
                    <Formik
                      initialValues={{
                        name: selectedRow?.name || "",
                        surname: selectedRow?.surname || "",
                        patrionimyc: selectedRow?.patrionimyc || "",
                        email: selectedRow?.email || "",
                        phoneNumber: selectedRow?.phoneNumber || "",
                        propertyTypeId:
                        dataPropertyTypes?.data.find(
                          (item: any) => item.name === selectedRow?.propertyTypeName
                        )?.id || "",
                        customerStatusId: dataStatus?.data.find(
                          (item: any) => item.name === selectedRow?.customerStatusName
                        )?.id || "",
                        proportion: selectedRow?.proportion || "",
                      }}
                      onSubmit={handleEdit}
                    >
                      <Form action="">
                        <div className="flex items-center flex-row justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                          <div>
                            <label
                              htmlFor="name"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              Ad
                            </label>
                            <Field
                              name="name"
                              type="text"
                              className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="surname"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              Soyad
                            </label>
                            <Field
                              name="surname"
                              type="text"
                              className="mt-3 w-[95%]  rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none  font-medium text-md"
                              required
                            />
                          </div>
                        </div>
                        <div className="flex items-center flex-row justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                          <div>
                            <label
                              htmlFor="patrionimyc"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              Ata adi
                            </label>
                            <Field
                              name="patrionimyc"
                              type="text"
                              className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="email"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              Email
                            </label>
                            <Field
                              name="email"
                              type="text"
                              className="mt-3 w-[95%]  rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none  font-medium text-md"
                              required
                            />
                          </div>
                        </div>
                        <div className="flex items-center flex-row justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                          <div>
                            <label
                              htmlFor="phoneNumber"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              Phone Number
                            </label>
                            <Field
                              name="phoneNumber"
                              type="text"
                              className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                              required
                            />
                          </div>
                          <div className="w-1/2">
                            <label
                              htmlFor="propertyTypeId"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              Property Type
                            </label>
                            <Field
                              as="select"
                              name="propertyTypeId"
                              Id="propertyTypeId"
                              className="mt-3 w-[95%]  rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none  font-medium text-md"
                              required
                            >
                              <option value="-1">Choose</option>
                              {dataPropertyTypes?.data.map((item:any) => (
                                <option value={item.id}>{item.name}</option>
                              ))}
                            </Field>
                          </div>
                        </div>
                        <div className="flex items-center flex-row justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-1/2">
                            <label
                              htmlFor="customerStatusId"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              Status
                            </label>
                            <Field
                              as="select"
                              id="customerStatusId"
                              name="customerStatusId"
                              type="text"
                              className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                              required
                            >
                              <option value="-1">Choose</option>
                              {dataStatus?.data.map((item:any) => (
                                <option value={item.id}>{item.name}</option>
                              ))}
                            </Field>
                          </div>
                          <div>
                            <label
                              htmlFor="proportion"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              Proportion
                            </label>
                            <Field
                              name="proportion"
                              type="text"
                              className="mt-3 w-[95%]  rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none  font-medium text-md"
                            />
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
                            className="flex items-center justify-center w-1/4 px-2 py-4 text-sm font-medium text-white border border-transparent rounded-full bg-primary hover:bg-primary-200 focus:outline-none"
                          >
                            Edit
                          </button>
                        </div>
                      </Form>
                    </Formik>
                  </Dialog.Panel>
                ) : null}
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default UserModal;
