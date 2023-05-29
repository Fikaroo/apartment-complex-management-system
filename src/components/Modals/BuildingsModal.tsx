import React, { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { Formik, Field, Form } from "formik";
import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
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
      Image: values.image,
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
                        <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
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
                              className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md hover:outline-none"
                              name="vendorBuildingId"
                              required
                            >
                              <option value="-1">Choose</option>
                              {dataObjects?.data.map((item: any) => (
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
                              className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                              name="apartmentNo"
                              required
                            />
                          </div>
                        </div>

                        <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                            <label
                              htmlFor="entranceNo"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Entrance No
                            </label>
                            <div className="relative flex items-center justify-between">
                              <Field
                                type="text"
                                className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                name="entranceNo"
                              />
                            </div>
                          </div>
                          <div className="w-[48%]">
                            <label
                              htmlFor="area"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Area
                            </label>
                            <Field
                              type="number"
                              className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                              name="area"
                            />
                          </div>
                        </div>
                        <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                            <label
                              htmlFor="floorNo"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Floor No
                            </label>
                            <div className="relative flex items-center justify-between">
                              <Field
                                type="number"
                                className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                name="floorNo"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-around w-full mt-10 font-bold font-inter text-16 leading-30 text-dark">
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
                          dataObjects?.data.find(
                            (item: any) =>
                              item.name === selectedRow?.buildingName
                          )?.id || "",
                        apartmentNo: selectedRow?.apartmentNo || "",
                        entranceNo: selectedRow?.entranceNo || "",
                        area: selectedRow?.area || -1,
                        floorNo: selectedRow?.floorNo || -1,
                      }}
                      onSubmit={handleSubmit}
                    >
                      <Form>
                        <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
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
                              className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md hover:outline-none"
                              name="vendorBuildingId"
                              required
                            >
                              <option value="-1">Choose</option>
                              {dataObjects?.data.map((item: any) => (
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
                              className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                              name="apartmentNo"
                              required
                            />
                          </div>
                        </div>

                        <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                            <label
                              htmlFor="entranceNo"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Entrance No
                            </label>
                            <div className="relative flex items-center justify-between">
                              <Field
                                type="text"
                                className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                name="entranceNo"
                              />
                            </div>
                          </div>
                          <div className="w-[48%]">
                            <label
                              htmlFor="area"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Area
                            </label>
                            <Field
                              type="number"
                              className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                              name="area"
                            />
                          </div>
                        </div>
                        <div className="flex flex-row items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-[48%]">
                            <label
                              htmlFor="floorNo"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Floor No
                            </label>
                            <div className="relative flex items-center justify-between">
                              <Field
                                type="number"
                                className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                name="floorNo"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-around w-full mt-10 font-bold font-inter text-16 leading-30 text-dark">
                          <button
                            type="button"
                            className="inline-flex items-center justify-center w-1/4 px-2 py-4 text-sm font-medium text-red-400 rounded-full outline font-inter"
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

export default BuildingsModal;
