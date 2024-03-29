import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";
import { RegisterUser } from "../../api";
type Props = {
  isOpen: boolean;
  closeModal: () => void;
};

const AddCustomerModal: React.FC<Props> = ({ isOpen, closeModal }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [patrionimyc, setFatherName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhone] = useState("");
const[roleName,SetRole]=useState("user")
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSurname(event.target.value);
  };

  const handleFatherNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFatherName(event.target.value);
  };

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };
  
 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await RegisterUser.user("/api/Account/RegisterUser", {
        name,
        surname,
        patrionimyc,
        userName,
        email,
        phoneNumber,
        roleName
      });
  
      if (response.statusCode === 201) {
        alert(response.message);
        closeModal()
     console.log(response,"response")
        
      } else {
        alert(response.message);
        console.log(response,"response")
        
        console.log("Invalid username or password");
      }
    } catch (error) {
      alert(error)
      console.log("An error occurred. Please try again later.");
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
                  <form action="" onSubmit={handleSubmit}>
                    <div className="flex items-center flex-row justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                      <div>
                        <label
                          htmlFor="solution"
                          className="inline-flex  justify-star items-center  w-1/2"
                        >
                          Ad
                        </label>
                        <input
                        onChange={handleNameChange}
                          type="text"
                          className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="solution"
                          className="inline-flex  justify-star items-center  w-1/2"
                        >
                          Soyad
                        </label>
                        <input
                       onChange={handleSurnameChange}
                          type="text"
                          className="mt-3 w-[95%]  rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none  font-medium text-md"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center flex-row justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                      <div>
                        <label
                          htmlFor="solution"
                          className="inline-flex  justify-star items-center  w-1/2"
                        >
                          Ata adi
                        </label>
                        <input
                        onChange={handleFatherNameChange}
                          type="text"
                          className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="solution"
                          className="inline-flex  justify-star items-center  w-1/2"
                        >
                          Istifadeci adi
                        </label>
                        <input
                     onChange={handleUserNameChange}   
                          type="text"
                          className="mt-3 w-[95%]  rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none  font-medium text-md"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center flex-row justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                      <div>
                        <label
                          htmlFor="solution"
                          className="inline-flex  justify-star items-center  w-1/2"
                        >
                          E-poçt
                        </label>
                        <input
                      onChange={handleEmailChange}

                          type="email"
                          className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="solution"
                          className="inline-flex  justify-star items-center  w-1/2"
                        >
                          Nömrə
                        </label>
                        <input
                        onChange={handlePhoneChange}
                          type="number"
                          className="mt-3 w-[95%]  rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none  font-medium text-md"
                          required
                        />
                      </div>
                    </div>
                    {/* <div className="flex items-center flex-col justify-between mt-10 font-bold font-inter text-16 leading-30 text-dark">
                      <label
                        htmlFor="solution"
                        className="inline-flex  justify-star items-center  w-full"
                      >
                        Nəqliyyat
                      </label>
                      <div className="flex flex-row justify-between items-center">
                        <input
                          type="text"
                          placeholder="10 - AA - 000"
                          className="mt-3 w-[25%]  rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none  font-medium text-sm placeholder-gray-400"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Rəng"
                          className="mt-3 w-[23%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none  font-medium text-sm placeholder-gray-400"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Marka"
                          className="mt-3 w-[23%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none  font-medium text-sm placeholder-gray-400"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Model"
                          className="mt-3 w-[23%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none  font-medium text-sm placeholder-gray-400"
                          required
                        />
                      </div>
                      <div className="flex flex-row justify-between items-center w-full mt-5">
                      <button
                        type="button"
                        className="flex items-center justify-center w-[15%] px-1 py-1 text-sm font-medium text-white border border-transparent rounded-full bg-primary hover:bg-primary-200 focus:outline-none"
                      >
                      Artır
                      </button>
                      </div>
                     

                    </div> */}

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
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default AddCustomerModal;
