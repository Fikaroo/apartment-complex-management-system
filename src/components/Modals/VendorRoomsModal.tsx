import { Fragment } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/solid";

import { Formik, Field, Form } from "formik";
import useSWR from "swr";

import useGetResponse from "../../hooks/useGetResponse";

import { Delete } from "../../api";
import { AddVendorRooms } from "../../api";
import { EditVendorRoom } from "../../api";
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
  name: string;
  vendorCompanyId: string;
  regionId: string;
  vendorRoomTypeId: string;
  isRentAviable: string;
  rentPrice: number;
};

const VendorRoomsModal = ({
  isOpen,
  closeModal,
  process,
  deleteId,
  selectedRow,
  mutate,
}: Props) => {
  const {
    data: dataRegions,
    error: errorRegions,
    isLoading: isLoadingRegions,
  } = useSWR("/api/Region/GetAll", (key) => GetAll.user(key));
  const {
    data: dataCompany,
    error: errorCompany,
    isLoading: isLoadingCompany,
  } = useSWR("/api/VendorCompany/GetAllByVendorId", (key) => GetAll.user(key));
  console.log(selectedRow, "selectedRow");
  const roomType = [
    { vendorRoomTypeId: "1", roomTypeName: "Ofis" },
    { vendorRoomTypeId: "2", roomTypeName: "Kladofka" },
  ];
  const handleSubmit = async (values: Values) => {
    const parsedValues = {
      ...values,
      vendorCompanyId: parseInt(values.vendorCompanyId),
      regionId: parseInt(values.regionId),
      vendorRoomTypeId: parseInt(values.vendorRoomTypeId),
      isRentAviable: values.isRentAviable === "true",
    };
    console.log(values, "values");
    console.log(parsedValues, "parsedValues");
    const res = await useGetResponse(
      AddVendorRooms.user("/api/VendorRooms/Create", {
        arg: parsedValues,
      }),
      mutate,
      closeModal
    );

    alert(res);
  };

  const handleEdit = async (values: Values) => {
    console.log(values, "values");
    const parsedValues = {
      ...values,
      vendorCompanyId: parseInt(values.vendorCompanyId),
      regionId: parseInt(values.regionId),
      vendorRoomTypeId: parseInt(values.vendorRoomTypeId),
      isRentAviable: values.isRentAviable === "true",
      id: selectedRow.id,
    };

    const res = await useGetResponse(
      EditVendorRoom.user("/api/VendorRooms/Update", {
        arg: parsedValues,
      }),
      mutate,
      closeModal
    );

    alert(res);
  };

  const deleteObject = async (deleteId: any) => {
    const res = await useGetResponse(
      Delete.user("/api/VendorRooms/Delete", {
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
                  <Dialog.Panel className="w-full max-w-xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className="flex items-center justify-between font-bold font-inter text-16 leading-30 text-dark"
                    >
                      Vendor Room əlavə et
                      <XCircleIcon
                        onClick={closeModal}
                        className="w-6 h-6 cursor-pointer fill-icon"
                      />
                    </Dialog.Title>
                    <Formik
                      initialValues={{
                        name: "",
                        vendorCompanyId: "",
                        regionId: "",
                        vendorRoomTypeId: "",
                        isRentAviable: "",
                        rentPrice: 0,
                      }}
                      onSubmit={handleSubmit}
                    >
                      <Form action="">
                        <div className="flex flex-row items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-1/2">
                            <label
                              htmlFor="name"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Name
                            </label>
                            <Field
                              name="name"
                              type="text"
                              className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                              required
                            />
                          </div>
                          <div className="w-1/2">
                            <label
                              htmlFor="vendorCompanyId"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Company Name
                            </label>
                            <Field
                              as="select"
                              name="vendorCompanyId"
                              id="vendorCompanyId"
                              className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                              required
                            >
                              <option value="-1">Choose</option>
                              {dataCompany?.data.map((item: any) => (
                                <option value={item.id}>
                                  {item.companyName}
                                </option>
                              ))}
                            </Field>
                          </div>
                        </div>
                        <div className="flex flex-row items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-1/2">
                            <label
                              htmlFor="regionId"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Region
                            </label>
                            <Field
                              as="select"
                              name="regionId"
                              id="regionId"
                              className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                              required
                            >
                              <option value="-1">Choose</option>
                              {dataRegions?.data.map((item: any) => (
                                <option value={item.id}>{item.name}</option>
                              ))}
                            </Field>
                          </div>
                          <div className="w-1/2">
                            <label
                              htmlFor="rentPrice"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Rent Price
                            </label>
                            <Field
                              name="rentPrice"
                              type="number"
                              className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                              required
                            />
                          </div>
                        </div>
                        <div className="flex flex-row items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-1/2">
                            <label
                              htmlFor="vendorRoomTypeId"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Room Type
                            </label>
                            <Field
                              as="select"
                              name="vendorRoomTypeId"
                              id="vendorRoomTypeId"
                              className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                              required
                            >
                              <option value="-1">Choose</option>
                              {roomType.map((item: any) => (
                                <option value={item.vendorRoomTypeId}>
                                  {item.roomTypeName}
                                </option>
                              ))}
                            </Field>
                          </div>
                          <div className="w-1/2">
                            <label
                              htmlFor="isRentAviable"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Available
                            </label>
                            <Field
                              as="select"
                              name="isRentAviable"
                              id="isRentAviable"
                              className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                              required
                            >
                              <option value="-1">Choose</option>
                              <option value="true">Yes</option>
                              <option value="false">No</option>
                            </Field>
                          </div>
                        </div>

                        <div className="flex items-center justify-around w-full mt-10 font-bold font-inter text-16 leading-30 text-dark">
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
                      Vendor Rooms Edit
                      <XCircleIcon
                        onClick={closeModal}
                        className="w-6 h-6 cursor-pointer fill-icon"
                      />
                    </Dialog.Title>

                    <Formik
                      initialValues={{
                        name: selectedRow.name || "",
                        vendorCompanyId:
                          dataCompany?.data.find(
                            (item: any) =>
                              item.companyName === selectedRow?.companyName
                          )?.id || "",
                        regionId:
                          dataRegions?.data.find(
                            (item: any) => item.name === selectedRow?.regionName
                          )?.id || "",
                        vendorRoomTypeId:
                          roomType.find(
                            (item: any) =>
                              item.roomTypeName === selectedRow?.roomTypeName
                          )?.vendorRoomTypeId || "",
                        isRentAviable: selectedRow.isRentAviable
                          ? "true"
                          : "false",
                        rentPrice: selectedRow.rentPrice || 0,
                      }}
                      onSubmit={handleEdit}
                    >
                      <Form action="">
                        <div className="flex flex-row items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-1/2">
                            <label
                              htmlFor="name"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Name
                            </label>
                            <Field
                              name="name"
                              type="text"
                              className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                              required
                            />
                          </div>
                          <div className="w-1/2">
                            <label
                              htmlFor="vendorCompanyId"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Company Name
                            </label>
                            <Field
                              as="select"
                              name="vendorCompanyId"
                              id="vendorCompanyId"
                              className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                              required
                            >
                              <option value="-1">Choose</option>
                              {dataCompany?.data.map((item: any) => (
                                <option value={item.id}>
                                  {item.companyName}
                                </option>
                              ))}
                            </Field>
                          </div>
                        </div>
                        <div className="flex flex-row items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-1/2">
                            <label
                              htmlFor="regionId"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Region
                            </label>
                            <Field
                              as="select"
                              name="regionId"
                              id="regionId"
                              className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                              required
                            >
                              <option value="-1">Choose</option>
                              {dataRegions?.data.map((item: any) => (
                                <option value={item.id}>{item.name}</option>
                              ))}
                            </Field>
                          </div>
                          <div className="w-1/2">
                            <label
                              htmlFor="rentPrice"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Rent Price
                            </label>
                            <Field
                              name="rentPrice"
                              type="number"
                              className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                              required
                            />
                          </div>
                        </div>
                        <div className="flex flex-row items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                          <div className="w-1/2">
                            <label
                              htmlFor="vendorRoomTypeId"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Room Type
                            </label>
                            <Field
                              as="select"
                              name="vendorRoomTypeId"
                              id="vendorRoomTypeId"
                              className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                              required
                            >
                              <option value="-1">Choose</option>
                              {roomType.map((item: any) => (
                                <option value={item.vendorRoomTypeId}>
                                  {item.roomTypeName}
                                </option>
                              ))}
                            </Field>
                          </div>
                          <div className="w-1/2">
                            <label
                              htmlFor="isRentAviable"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Available
                            </label>
                            <Field
                              as="select"
                              name="isRentAviable"
                              id="isRentAviable"
                              className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                              required
                            >
                              <option value="-1">Choose</option>
                              <option value="true">Yes</option>
                              <option value="false">No</option>
                            </Field>
                          </div>
                        </div>

                        <div className="flex items-center justify-around w-full mt-10 font-bold font-inter text-16 leading-30 text-dark">
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

export default VendorRoomsModal;
