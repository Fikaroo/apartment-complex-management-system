import { Fragment } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import { Formik, Field, Form, FormikHelpers } from "formik";
import useGetResponse from "../../hooks/useGetResponse";
import { Delete } from "../../api";
import { CreateRoomType } from "../../api";

import Swal from "sweetalert2";
type Props = {
  isOpen: boolean;
  closeModal: () => void;
  process: string;
  deleteId: number;
  selectedRow: any;
  mutate: any;
};

const RoomTypeModal = ({ isOpen, closeModal, process,mutate ,deleteId, selectedRow}: Props) => {
  const { t } = useTranslation();
  const handleSubmit = async(values: any) => { 
    console.log(values,"values");
    const requestBody = [
      { content: values.contentAz, language: "az" },
      { content: values.contentEn, language: "en" },
      { content: values.contentRu, language: "ru" },
    ];
    const res = await useGetResponse(
      CreateRoomType.user("/api/VendorRoomType/Create", {
        arg: requestBody,
      }),
      mutate,
      closeModal
    );
  };
  console.log(deleteId,"deleteId");
  const deleteObject = async (deleteId: any) => {
    const res = await useGetResponse(
      Delete.user("/api/VendorRoomType/Delete", {
        arg: { deleteId },
      }),
      mutate,
      closeModal
    );

    res;
  };

  const handleDelete = () => {
    Swal.fire({
      title: t("confirm"),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7066e0',
      cancelButtonColor: '#d33',
      confirmButtonText: t('yes'),
      cancelButtonText: t('cancel'),
    }).then((result) => {
      if (result.isConfirmed) {
        deleteObject(deleteId);
      }
    })
  };

  return (
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
                    {t("addRoomType")}
                    <XCircleIcon
                      onClick={closeModal}
                      className="w-6 h-6 cursor-pointer fill-icon"
                    />
                  </Dialog.Title>
                  <Formik
                    initialValues={{
                      contentAz: "",
                      contentEn: "",
                      contentRu:"",
                    }}
                    onSubmit={handleSubmit}
                  >
                    <Form>
                      <div className="flex flex-col items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                        <label
                          htmlFor="contentAz"
                          className="inline-flex items-start w-full justify-star"
                        >
                          {t("name")}
                        </label>
                        <div className="flex items-center justify-between w-full">
                         
                          <div className="w-[80%]">
                            <div className="relative flex items-center justify-between">
                              <Field
                                type="text"
                                className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                name="contentAz"
                                required
                              
                              />
                            </div>
                          </div>
                          <div className="w-[15%]">
                            <button className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md">
                              Az
                            </button>
                          </div>
                        </div>
                        
                      </div>
                      <div className="flex flex-col items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                        <label
                          htmlFor="contentEn"
                          className="inline-flex items-start w-full justify-star"
                        >
                          {t("name")}
                        </label>
                        <div className="flex items-center justify-between w-full">
                         
                          <div className="w-[80%]">
                            <div className="relative flex items-center justify-between">
                              <Field
                                type="text"
                                className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                name="contentEn"
                                required
                              
                              />
                            </div>
                          </div>
                          <div className="w-[15%]">
                            <button className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md">
                             En
                            </button>
                          </div>
                        </div>
                        
                      </div>
                      <div className="flex flex-col items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                        <label
                          htmlFor="contentRu"
                          className="inline-flex items-start w-full justify-star"
                        >
                          {t("name")}
                        </label>
                        <div className="flex items-center justify-between w-full">
                         
                          <div className="w-[80%]">
                            <div className="relative flex items-center justify-between">
                              <Field
                                type="text"
                                className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                name="contentRu"
                                required
                              
                              />
                            </div>
                          </div>
                          <div className="w-[15%]">
                            <button className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md">
                              Ru
                            </button>
                          </div>
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
                    {t("editRoomType")}
                    <XCircleIcon
                      onClick={closeModal}
                      className="w-6 h-6 cursor-pointer fill-icon"
                    />
                  </Dialog.Title>
                  <Formik
                    initialValues={{
                      contentAz: "",
                      contentEn: "",
                      contentRu:"",
                    }}
                    onSubmit={handleSubmit}
                  >
                    <Form>
                      <div className="flex flex-col items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                        <label
                          htmlFor="contentAz"
                          className="inline-flex items-start w-full justify-star"
                        >
                          {t("name")}
                        </label>
                        <div className="flex items-center justify-between w-full">
                         
                          <div className="w-[80%]">
                            <div className="relative flex items-center justify-between">
                              <Field
                                type="text"
                                className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                name="contentAz"
                                required
                              
                              />
                            </div>
                          </div>
                          <div className="w-[15%]">
                            <button className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md">
                              Az
                            </button>
                          </div>
                        </div>
                        
                      </div>
                      <div className="flex flex-col items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                        <label
                          htmlFor="contentEn"
                          className="inline-flex items-start w-full justify-star"
                        >
                          {t("name")}
                        </label>
                        <div className="flex items-center justify-between w-full">
                         
                          <div className="w-[80%]">
                            <div className="relative flex items-center justify-between">
                              <Field
                                type="text"
                                className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                name="contentEn"
                                required
                              
                              />
                            </div>
                          </div>
                          <div className="w-[15%]">
                            <button className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md">
                             En
                            </button>
                          </div>
                        </div>
                        
                      </div>
                      <div className="flex flex-col items-center justify-between w-full mt-5 font-bold font-inter text-16 leading-30 text-dark">
                        <label
                          htmlFor="contentRu"
                          className="inline-flex items-start w-full justify-star"
                        >
                          {t("name")}
                        </label>
                        <div className="flex items-center justify-between w-full">
                         
                          <div className="w-[80%]">
                            <div className="relative flex items-center justify-between">
                              <Field
                                type="text"
                                className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md"
                                name="contentRu"
                                required
                              
                              />
                            </div>
                          </div>
                          <div className="w-[15%]">
                            <button className="flex items-center justify-center w-full px-5 py-2 mt-3 font-medium border rounded-lg border-line bg-background focus:outline-none text-md">
                              Ru
                            </button>
                          </div>
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
  );
};

export default RoomTypeModal;
