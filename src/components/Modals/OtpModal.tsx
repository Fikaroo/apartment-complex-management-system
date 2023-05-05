import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { redirect, useNavigate } from "react-router-dom";
import { LoginApprove } from "../../api";
type Props = {
  isOpen: boolean;
  username: string;
  closeModal: () => void;
};

const OtpModal: React.FC<Props> = ({ isOpen, closeModal, username }) => {
  const nav = useNavigate();
  const [smsCode, setSmscode] = useState<string>();
  const handleSmscode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const newSmscode = smsCode + val; // concatenate the new digit with the existing smscode
    setSmscode(newSmscode);
    console.log(newSmscode, "smscode");
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await LoginApprove.user(
        "/api/Account/LoginApproveAdmin",
        {
          username,
          smsCode,
        }
      );

      if (response.statusCode === 201) {
        console.log(response, "response");
        localStorage.clear();
        localStorage.setItem("user-token", response.data.token);
        nav("/");
      } else {
        console.log(response.data.token, "response");

        console.log("Invalid username or password");
      }
    } catch (error) {
      console.log("An error occurred. Please try again later.");
    }
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
              <Dialog.Panel className="w-full bg-cover bg-center h-[90vh] backdrop-filter backdrop-blur-lg  p-6 overflow-hidden text-left align-middle transition-all transform  shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="w-[80%] flex items-center justify-end"
                >
                  <XCircleIcon
                    onClick={closeModal}
                    className="w-[60px] h-[60px] cursor-pointer fill-slate-50"
                  />
                </Dialog.Title>
                <div className="relative flex flex-col justify-center py-12 overflow-hidden">
                  <div className="relative w-full max-w-lg px-6 pt-10 mx-auto bg-white shadow-xl pb-9 rounded-2xl">
                    <div className="flex flex-col w-full max-w-md mx-auto space-y-16">
                      <div className="flex flex-col items-center justify-center space-y-2 text-center">
                        <div className="text-3xl font-semibold">
                          <p>Verification</p>
                        </div>
                      </div>

                      <div>
                        <form action="" method="post" onSubmit={handleSubmit}>
                          <div className="flex flex-col space-y-16">
                            <div className="flex flex-row items-center justify-between w-full mx-auto">
                              <div className="w-16 h-16 ">
                                <input
                                  onChange={handleSmscode}
                                  className="flex flex-col items-center justify-center w-full h-full px-5 text-lg text-center bg-white border border-gray-200 outline-none appearance-none rounded-xl focus:bg-gray-50 focus:ring-1 ring-primary hover:appearance-none"
                                  type="text"
                                />
                              </div>
                              <div className="w-16 h-16 ">
                                <input
                                  onChange={handleSmscode}
                                  className="flex flex-col items-center justify-center w-full h-full px-5 text-lg text-center bg-white border border-gray-200 outline-none appearance-none rounded-xl focus:bg-gray-50 focus:ring-1 ring-primary hover:appearance-none"
                                  type="text"
                                />
                              </div>
                              <div className="w-16 h-16 ">
                                <input
                                  onChange={handleSmscode}
                                  className="flex flex-col items-center justify-center w-full h-full px-5 text-lg text-center bg-white border border-gray-200 outline-none appearance-none rounded-xl focus:bg-gray-50 focus:ring-1 ring-primary"
                                  type="text"
                                />
                              </div>
                              <div className="w-16 h-16 ">
                                <input
                                  onChange={handleSmscode}
                                  className="flex flex-col items-center justify-center w-full h-full px-5 text-lg text-center bg-white border border-gray-200 outline-none appearance-none rounded-xl focus:bg-gray-50 focus:ring-1 ring-primary"
                                  type="text"
                                />
                              </div>
                              <div className="w-16 h-16 ">
                                <input
                                  onChange={handleSmscode}
                                  className="flex flex-col items-center justify-center w-full h-full px-5 text-lg text-center bg-white border border-gray-200 outline-none appearance-none rounded-xl focus:bg-gray-50 focus:ring-1 ring-primary"
                                  type="text"
                                />
                              </div>
                              <div className="w-16 h-16 ">
                                <input
                                  onChange={handleSmscode}
                                  className="flex flex-col items-center justify-center w-full h-full px-5 text-lg text-center bg-white border border-gray-200 outline-none appearance-none rounded-xl focus:bg-gray-50 focus:ring-1 ring-primary"
                                  type="text"
                                />
                              </div>
                            </div>

                            <div className="flex flex-col space-y-5">
                              <div>
                                <button className="flex flex-row items-center justify-center w-full py-5 text-sm text-center text-white border shadow-sm outline-none rounded-xl bg-border-none bg-primary">
                                  Verify Account
                                </button>
                              </div>

                              <div className="flex flex-row items-center justify-center space-x-1 text-sm font-medium text-center text-gray-500">
                                <p>Didn't recieve code?</p>{" "}
                                <a
                                  className="flex flex-row items-center text-blue-600"
                                  href="http://"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Resend
                                </a>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default OtpModal;
