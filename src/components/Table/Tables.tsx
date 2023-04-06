import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import SosModal from '../Modals/SosModal';
export interface IHeaders {
  isStatus?: boolean;
  isAvatar?: boolean;
  title?: string;
  icon?: any;
  isAccess?: boolean;
  id: number;
}

type PropsType = {
  headers: IHeaders[];
};
const Tables = ({ headers }: PropsType) => {
  let [isOpen, setIsOpen] = useState<boolean>(false)
  function closeModal():void {
    setIsOpen(false)
  }

  function openModal():void {
    setIsOpen(true)
  }
  return (
    <div className="w-full mt-8 overflow-x-auto">
      <table className="table w-full table-auto">
        <thead>
          <tr>
            {headers.map(({ id, isAccess, isAvatar, icon, title }) => (
              <th
                key={id}
                className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
              >
                {isAccess || isAvatar ? icon : title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-10 h-10">
                  <img
                    className="rounded-full"
                    src="/icons/exclamation.svg"
                    alt=""
                  />
                </div>
              </div>
            </td>
            <td>
              <div className="ml-4">
                <div className="text-sm font-medium leading-5 text-gray-900">
                  31.03.2023
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <div className="text-sm leading-5 text-gray-900">Director</div>
            </td>
            <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
              A menzili
            </td>
            <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
              Menzil
            </td>
            <td className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
              <img onClick={openModal} className="ml-4 cursor-pointer" src="/icons/edit.svg" />
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <div className="flex items-center">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10">
                  <img
                    className="rounded-full"
                    src="/icons/checked.svg"
                    alt=""
                  />
                </div>
              </div>
            </td>
            <td>
              <div className="ml-4">
                <div className="text-sm font-medium leading-5 text-gray-900">
                  Bernard Lane
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <div className="text-sm leading-5 text-gray-900">Director</div>
            </td>
            <td className="px-6 py-4 text-sm text-gray-500 whitespace-no-wrap border-b border-gray-200">
              Active
            </td>
            <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
              Owner
            </td>
            <td className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
              <img className="ml-4 cursor-pointer" src="/icons/edit.svg" />
            </td>
          </tr>
        </tbody>
      </table>

      <SosModal isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
};

export default Tables;
