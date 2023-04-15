import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import DealsSubModal from "./DealsSubModal";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
};

const DealsModal: React.FC<Props> = ({ isOpen, closeModal }) => {

  let [isOpenSub, setIsOpenSub] = useState<boolean>(false);


  const closeModalSub = (): void => {
    setIsOpenSub(false);
  };
 
  const openModalSub = (): void => {
    setIsOpenSub(true);
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
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
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
                  <form>
                    <div className="flex items-center justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                      İcraya başlama tarixi
                    </div>
                    <input
                      type="date"
                      className="mt-3 w-full  rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none  font-medium text-md"
                      required
                    />

                    <div className=" w-full flex items-center flex-row justify-between mt-5 font-bold font-inter text-16 leading-30 text-dark">
                      <div>
                        <label
                          htmlFor="solution"
                          className="inline-flex  justify-star items-center  w-1/2"
                        >
                          İcraçı
                        </label>
                        <div className="flex items-center justify-between relative">
                          <input
                            type="text"
                            className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                            required
                          />
                          <ChevronDownIcon className="h-5 w-5 text-gray-400 absolute top-[50%] right-4 cursor-pointer"
                                    onClick={openModalSub}

                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="solution"
                          className="inline-flex  justify-star items-center  w-1/2"
                        >
                          Qiymət
                        </label>
                        <input
                          type="number"
                          className="mt-3 w-[95%]  rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none  font-medium text-md"
                          required
                        />
                      </div>
                    </div>

                    <div className="w-full  flex items-end justify-between  mt-5 font-bold font-inter text-16 leading-30 text-dark">
                      <div className="w-1/2">
                      <label
                        htmlFor="solution"
                        className="inline-flex  justify-star items-center  w-1/2"
                      >
                        Status
                      </label>
                   
                        <select
                          className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md hover:outline-none"
                          required
                        ></select>
               
                      </div>
                      <button
                        type="submit"
                        className="flex items-center justify-center w-1/3 px-2 py-4 text-sm font-medium text-white border border-transparent rounded-full bg-primary hover:bg-primary-200 focus:outline-none"
                      >
                        Saxla
                      </button>
                    </div>
              
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
<DealsSubModal isOpenSub={isOpenSub} closeModalSub={closeModalSub}/>
    </div>
  );
};

export default DealsModal;
