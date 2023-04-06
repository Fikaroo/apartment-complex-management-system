import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

type Props = {
    isOpen:boolean,
    closeModal:()=>void

}

const SosModal:React.FC<Props> = ({isOpen,closeModal}) => {
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="font-bold font-inter text-16 leading-30 text-dark flex justify-between items-center"
                  >
               Düzəliş et
               <button
                      type="button"
                      className="inline-flex justify-center rounded-full border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none"
                      onClick={closeModal}
                    >
                     x
                    </button>
                  </Dialog.Title>
                  <div className="mt-10 font-bold font-inter text-16 leading-30 text-dark flex justify-between items-center">
  Həll olundu?
  <label htmlFor="solution" className="inline-flex items-center cursor-pointer w-[26px] h-[26px] rounded-6 border-2 border-gray ">
    <input id="solution" type="checkbox" className="form-checkbox  h-6 w-6 text-green-500 transition duration-150 ease-in-out" />
  </label>
</div>

<div className="mt-10 font-bold font-inter text-16 leading-30 text-dark flex justify-between items-center">
    Məlumat
</div>
<div className="mt-5 w-full h-[80px] rounded-lg border-gray-100 border-2 flex justify-center items-center px-5 bg-slate-100">
Lorem ipsum dolor sit amet consectetur adisipisicing elit
</div>


<div className="mt-10 font-bold font-inter text-16 leading-30 text-dark flex justify-around items-center">
<button
                      type="button"
                      className="inline-flex justify-center  text-sm font-inter font-medium text-red-400 focus:outline-none"
                     
                    >
                     Sil
                    </button>
                    <button
                      type="button"
                      className="flex justify-center items-center w-1/2 h-[60px] rounded-full border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-200 focus:outline-none"
                     
                    >
                     Saxla
                    </button>
</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
export default SosModal