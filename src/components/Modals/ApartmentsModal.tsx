import React, { useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { CreateApartment } from "../../api";
import { Delete } from "../../api";
import { GetAll } from "../../api";
import { EditApartment } from "../../api";
import useGetResponse from "../../hooks/useGetResponse";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  process: string;
  deleteId: number;
  selectedRow: any;
  mutate: any;
};
type Values = {
  vendorBuildingId: string;
  apartmentNo: string;
  entranceNo: string;
  area: number;
  floorNo: number;
};

const ApartmentsModal: React.FC<Props> = ({
  isOpen,
  closeModal,
  process,
  deleteId,
  selectedRow,
  mutate,
}) => {
  const {
    data: dataBuilding,
    error: errorBuilding,
    isLoading: isLoadingBuilding,
  } = useSWR("/api/VendorBuildings/GetAll", (key) => GetAll.user(key));

  const handleSubmit = async (values: Values) => {
    const parsedValues = {
      ...values,
      vendorBuildingId: parseInt(values.vendorBuildingId),
    };
    const res = await useGetResponse(
      CreateApartment.user("/api/VendorApartment/Create", {
        arg: parsedValues,
      }),
      mutate,
      closeModal
    );
    alert(res);
  };
  const handleEdit = async (values: Values) => {
    const parsedValues = {
      ...values,
      vendorBuildingId: parseInt(values.vendorBuildingId),
      id: selectedRow.id,
    };

    const res = await useGetResponse(
      EditApartment.user("/api/VendorApartment/Update", {
        arg: parsedValues,
      }),
      mutate,
      closeModal
    );

    alert(res);
  };

  const deleteObject = async (deleteId: any) => {
    const res = await useGetResponse(
      Delete.user("/api/VendorApartment/Delete", {
        arg: { deleteId },
      }),
      mutate,
      closeModal
    );

    alert(res);
  };

  const handleDelete = () => {
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
                  <Dialog.Panel className="w-full max-w-[40em] p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className="flex items-center justify-between font-bold font-inter text-16 leading-30 text-dark"
                    >
                      Add Apartment
                      <XCircleIcon
                        onClick={closeModal}
                        className="w-6 h-6 cursor-pointer fill-icon"
                      />
                    </Dialog.Title>
                    <Formik
                      initialValues={{
                        vendorBuildingId: "",
                        apartmentNo: "",
                        entranceNo: "",
                        area: -1,
                        floorNo: -1,
                      }}
                      onSubmit={handleSubmit}
                    >
                      <Form>
                        <div className=" w-full flex items-center flex-row justify-between mt-5 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                            {" "}
                            <label
                              htmlFor="vendorBuildingId"
                              className="flex items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark"
                            >
                              Building Name
                            </label>
                            <Field
                              as="select"
                              id="vendorBuildingId"
                              className="mt-3 w-full rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md hover:outline-none"
                              name="vendorBuildingId"
                              required
                            >
                              <option value="-1">Choose</option>
                              {dataBuilding?.data.map((item: any) => (
                                <option value={item.id}>{item.name}</option>
                              ))}
                            </Field>
                          </div>
                          <div className="w-[48%]">
                            {" "}
                            <label
                              htmlFor="apartmentNo"
                              className="flex items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark"
                            >
                              Apartment No
                            </label>
                            <Field
                              type="text"
                              className="mt-3 w-full  rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none  font-medium text-md"
                              name="apartmentNo"
                              required
                            />
                          </div>
                        </div>

                        <div className=" w-full flex items-center flex-row justify-between mt-5 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                            <label
                              htmlFor="entranceNo"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              Entrance No
                            </label>
                            <div className="flex items-center justify-between relative">
                              <Field
                                type="text"
                                className="mt-3 w-full rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                name="entranceNo"
                              />
                            </div>
                          </div>
                          <div className="w-[48%]">
                            <label
                              htmlFor="area"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              Area
                            </label>
                            <Field
                              type="number"
                              className="mt-3 w-full rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                              name="area"
                            />
                          </div>
                        </div>
                        <div className=" w-full flex items-center flex-row justify-between mt-5 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                            <label
                              htmlFor="floorNo"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              Floor No
                            </label>
                            <div className="flex items-center justify-between relative">
                              <Field
                                type="number"
                                className="mt-3 w-full rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                name="floorNo"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex w-full items-center justify-around mt-10 font-bold font-inter text-16 leading-30 text-dark">
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
                        vendorBuildingId:
                          dataBuilding?.data.find(
                            (item: any) =>
                              item.name === selectedRow?.buildingName
                          )?.id || "",
                        apartmentNo: selectedRow?.apartmentNo || "",
                        entranceNo: selectedRow?.entranceNo || "",
                        area: selectedRow?.area || -1,
                        floorNo: selectedRow?.floorNo || -1,
                      }}
                      onSubmit={handleEdit}
                    >
                      <Form>
                        <div className=" w-full flex items-center flex-row justify-between mt-5 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                            {" "}
                            <label
                              htmlFor="vendorBuildingId"
                              className="flex items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark"
                            >
                              Building Name
                            </label>
                            <Field
                              as="select"
                              id="vendorBuildingId"
                              className="mt-3 w-full rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md hover:outline-none"
                              name="vendorBuildingId"
                              required
                            >
                              <option value="-1">Choose</option>
                              {dataBuilding?.data.map((item: any) => (
                                <option value={item.id}>{item.name}</option>
                              ))}
                            </Field>
                          </div>
                          <div className="w-[48%]">
                            {" "}
                            <label
                              htmlFor="apartmentNo"
                              className="flex items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark"
                            >
                              Apartment No
                            </label>
                            <Field
                              type="text"
                              className="mt-3 w-full  rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none  font-medium text-md"
                              name="apartmentNo"
                              required
                            />
                          </div>
                        </div>

                        <div className=" w-full flex items-center flex-row justify-between mt-5 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                            <label
                              htmlFor="entranceNo"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              Entrance No
                            </label>
                            <div className="flex items-center justify-between relative">
                              <Field
                                type="text"
                                className="mt-3 w-full rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                name="entranceNo"
                              />
                            </div>
                          </div>
                          <div className="w-[48%]">
                            <label
                              htmlFor="area"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              Area
                            </label>
                            <Field
                              type="number"
                              className="mt-3 w-full rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                              name="area"
                            />
                          </div>
                        </div>
                        <div className=" w-full flex items-center flex-row justify-between mt-5 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                            <label
                              htmlFor="floorNo"
                              className="inline-flex  justify-star items-center  w-1/2"
                            >
                              Floor No
                            </label>
                            <div className="flex items-center justify-between relative">
                              <Field
                                type="number"
                                className="mt-3 w-full rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                name="floorNo"
                              />
                            </div>
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

export default ApartmentsModal;
