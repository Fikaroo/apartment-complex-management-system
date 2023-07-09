import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Dispatch, SetStateAction } from 'react';
import {
  CheckIcon,
  ChevronUpDownIcon,
  ChevronDownIcon,
} from "@heroicons/react/20/solid";


type orderType = {
  transportOf: { value: number; label: string }[];
  setSelected: Dispatch<
    SetStateAction<{
      value: number;
      label: string;
    }>
  >;
  selected: { value: number; label: string };
};

const OrderDate = ({ transportOf, setSelected, selected }: orderType) => {
 const handleChange= (e: any) => {
  const selectedValue = transportOf.find(item => item.value === e) || transportOf[0];
  setSelected(selectedValue);
 }
 console.log(transportOf[2], "transportOf2");
  console.log(selected, "selected");
  return (
    <div className="w-72">
      <Listbox value={selected.value} onChange={handleChange}>
        <div className="relative mt-1">
          <Listbox.Button className="relative  w-full  px-4 py-2.5 gap-2 transition-all bg-white border border-gray-300 rounded-full cursor-default pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible: focus:border-primary text-sm">
            <span className="block truncate text-[16px]">{selected.label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-2xl bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {transportOf.map((item: any) => (
                console.log(item, "item"),
                <Listbox.Option
                  key={item.value}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-primary text-white" : "text-gray-900"
                    }`
                  }
                  value={item.value}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {item.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 border-primary-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default OrderDate;
