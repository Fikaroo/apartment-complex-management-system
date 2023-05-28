import { Dialog, Transition } from "@headlessui/react";
import React, { useEffect } from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { Delete } from "../../api";
import { AddObjects } from "../../api";
import { EditObjects } from "../../api";
type Props = {
  isOpen: boolean;
  closeModal: () => void;
  process: string;
  deleteId: number;
  selectedRow: any;
  mutate: any;
};
type Values = {
  title: string;
  address: string;
  regionId: string;
};
const ObjectsModal: React.FC<Props> = ({
  isOpen,
  closeModal,
  process,
  deleteId,
  selectedRow,
  mutate,
}) => {
  const regions = [
    {
      regionId: "1",
      regionName: "Baki",
    },
  ];

  const mutateData = async () => {
    const { data, error } = await fetch("/api/VendorObjects/GetAll").then(
      (res) => res.json()
    );
    if (error) {
      console.log(error);
    } else {
      mutate("/api/VendorObjects/GetAll/", data, false);
    }
  };
  console.log(selectedRow, "selectedRowUser");

  const {
    trigger: triggerEdit,
    data: dataEdit,
    error: errorEdit,
    isMutating: isMutatingEdit,
  } = useSWRMutation("/api/VendorObjects/Update", EditObjects.user);

  const { trigger, data, error, isMutating } = useSWRMutation(
    "/api/VendorObjects/Create",
    AddObjects.user
  );

  const {
    trigger: triggerDelete,
    data: dataDelete,
    error: errorDelete,
    isMutating: isMutatingDelete,
  } = useSWRMutation("/api/VendorObjects/Delete", Delete.user);

  useEffect(() => {
    if (dataEdit?.statusCode === 201) {
      alert(dataEdit.message);
      closeModal();
    } else if (dataEdit?.statusCode === 400) {
      console.log(errorEdit, "error");
    }
  }, [dataEdit]);

  useEffect(() => {
    if (data?.statusCode === 201) {
      closeModal();
    } else if (data?.statusCode === 400) {
      console.log(error, "error");
    }
  }, [data]);

  useEffect(() => {
    if (dataDelete?.statusCode === 201) {
      alert(dataDelete.message);
      closeModal();
    } else if (dataDelete?.statusCode === 400) {
      console.log(errorDelete, "error");
    }
  }, [dataDelete]);

  const handleSubmit = async (values: Values) => {
    console.log(values, "values");
    const parsedValues = {
      ...values,
      regionId: parseInt(values.regionId),
    };
    const { data, error } = await trigger(parsedValues);

    if (error) {
      console.log(error);
    } else {
      console.log(data, "createdata");
      closeModal();
      mutateData();
      mutate();
    }
  };

  const handleEdit = async (values: Values) => {
    console.log(values, "valuesedit");

    const parsedValues = {
      ...values,
      regionId: parseInt(values.regionId),
      id: selectedRow.id,
    };
    const { data, error } = await triggerEdit(parsedValues);
    if (error) {
      console.log(error);
    } else {
      closeModal();
      mutateData();
    }
  };

  const handleDelete = async () => {
    const { data, error } = await triggerDelete({ deleteId });
    if (error) {
      console.log(error);
    } else {
      alert(data.message);
      closeModal();
      mutateData();
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
                  <Dialog.Panel className="w-full max-w-xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className="flex items-center justify-between font-bold font-inter text-16 leading-30 text-dark"
                    >
                      Object əlavə et
                      <XCircleIcon
                        onClick={closeModal}
                        className="w-6 h-6 cursor-pointer fill-icon"
                      />
                    </Dialog.Title>
                    <Formik
                      initialValues={{
                        title: "",
                        address: "",
                        regionId: "",
                      }}
                      onSubmit={handleSubmit}
                    >
                      <Form action="">
                        <div className="flex flex-row items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                          <div>
                            <label
                              htmlFor="title"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Title
                            </label>
                            <Field
                              name="title"
                              type="text"
                              className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="address"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Adress
                            </label>
                            <Field
                              name="address"
                              type="text"
                              className="mt-3 w-[95%]  rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none  font-medium text-md"
                              required
                            />
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
                              {regions.map((item) => (
                                <option value={item.regionId}>
                                  {item.regionName}
                                </option>
                              ))}
                            </Field>
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
                  <Dialog.Panel className="w-full max-w-xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className="flex items-center justify-between font-bold font-inter text-16 leading-30 text-dark"
                    >
                      Objects Edit
                      <XCircleIcon
                        onClick={closeModal}
                        className="w-6 h-6 cursor-pointer fill-icon"
                      />
                    </Dialog.Title>
                    <Formik
                      initialValues={{
                        title: selectedRow?.title || "",
                        address: selectedRow?.address || "",
                        regionId:
                          regions.find(
                            (item) =>
                              item.regionName === selectedRow?.regionName
                          )?.regionId || "",
                      }}
                      onSubmit={handleEdit}
                    >
                      <Form action="">
                        <div className="flex flex-row items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                          <div>
                            <label
                              htmlFor="title"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Title
                            </label>
                            <Field
                              name="title"
                              type="text"
                              className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="address"
                              className="inline-flex items-center w-1/2 justify-star"
                            >
                              Adress
                            </label>
                            <Field
                              name="address"
                              type="text"
                              className="mt-3 w-[95%]  rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none  font-medium text-md"
                              required
                            />
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
                              {regions.map((item) => (
                                <option value={item.regionId}>
                                  {item.regionName}
                                </option>
                              ))}
                            </Field>
                          </div>
                        </div>
                        <div className="flex items-center justify-around w-full mt-10 font-bold font-inter text-16 leading-30 text-dark">
                          <button
                            type="button"
                            className="inline-flex items-center justify-center w-1/4 px-2 py-4 text-sm font-medium text-red-400 rounded-full outline font-inter"
                            onClick={handleDelete}
                            disabled={isMutatingDelete}
                          >
                            Delete
                          </button>
                          <button
                            type="submit"
                            disabled={isMutatingEdit}
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

export default ObjectsModal;
