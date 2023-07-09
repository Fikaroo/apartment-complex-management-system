import { Fragment, useEffect, useState } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/solid";

import { Formik, Field, Form, useFormikContext } from "formik";
import useSWR from "swr";
import Multiselect from "multiselect-react-dropdown";
import useGetResponse from "../../hooks/useGetResponse";

import {
  CreateEmployees,
  Delete,
  DeleteEmployees,
  EditEmployees,
} from "../../api";
import { AddObjects } from "../../api";
import { EditObjects } from "../../api";
import { GetAll } from "../../api";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  process: string;
  deleteId: string;
  selectedRow: any;
  mutate: any;
};
interface BuildingObject {
  id: number;
  name: string;
}
interface Object {
  id: number;
  title: string;
}
export type EmployeeValues = {
  ProfileImage: any;
  Name: string;
  Surname: string;
  Patrionimyc: string;
  HasCompany: string | null;
  JobPosition: string;
  VendorCompanyId: number | null;
  VendorObjectsId: number[];
  VendorBuildingsId: any[];
  RoleId: string;
  Voen: string;
  Email: string;
  PhoneNumber: string;
  UserName: string;
};

const EmployeesModal = ({
  isOpen,
  closeModal,
  process,
  deleteId,
  selectedRow,
  mutate,
}: Props) => {
  console.log(selectedRow, "selectedRow");
  const [options, setOptions] = useState<Array<{ value: any; label: string }>>(
    []
  );
  const [optionsObject, setOptionsObject] = useState<
    Array<{ value: any; label: string }>
  >([]);

  const [selectedValues, setSelectedValues] = useState<
    { value: any; label: string }[]
  >([]);
  const [selectedObjectValues, setSelectedObjectValues] = useState<
    { value: any; label: string }[]
  >([]);
  const [removedOptions, setRemovedOptions] = useState<
    { value: any; label: string }[]
  >([]);
  const [removedObjectOptions, setRemovedObjectOptions] = useState<
    { value: any; label: string }[]
  >([]);
  const [selectedObjectsNumbers, setSelectedObjectsNumbers] = useState<
    number[]
  >([]);
  const {
    data: dataVendorCompany,
    error: errVendorCompany,
    isLoading: isLoadingVendorCompany,
  } = useSWR("/api/VendorCompany/GetAllByVendorId", (key) => GetAll.user(key));
  const [formData, setFormData] = useState({
    selectedObjectId: "",
  });
  const {
    data: dataVendorObjects,
    error: errVendorObjects,
    isLoading: isLoadingVendorObjects,
  } = useSWR("/api/VendorObjects/GetAll", (key) => GetAll.user(key));

  const {
    data: dataBuildingofObjects,
    error: errorBuildingofObject,
    isLoading: isLoadingBuildingofObject,
    mutate: mutateBuildingofObjects,
  } = useSWR(
    selectedObjectsNumbers.length > 0
      ? `/api/VendorBuildings/GetAllByObjectIds?objectIds=${selectedObjectsNumbers.join(
          "&objectIds="
        )}`
      : null,
    (key) => GetAll.user(key)
  );

  const handleSelectChange = (selectedList: any, selectedItem: any) => {
    const isAlreadySelected = selectedValues.some(
      (item) => item.value === selectedItem.value
    );
    if (!isAlreadySelected) {
      setSelectedValues([...selectedValues, selectedItem]);
    }
  };
  const handleObjectSelectChange = (selectedList: any, selectedItem: any) => {
    const isAlreadySelected = selectedObjectValues.some(
      (item) => item.value === selectedItem.value
    );
    if (!isAlreadySelected) {
      setSelectedObjectValues([...selectedObjectValues, selectedItem]);
    }

    console.log(selectedObjectValues, "selectedObjectValues");
  };

  useEffect(() => {
    if (selectedObjectValues.length > 0) {
      setSelectedObjectsNumbers(selectedObjectValues.map((item) => item.value));
    } else {
      setOptions([]);
      setSelectedValues([]);
    }
  }, [selectedObjectValues]);

  console.log(selectedObjectsNumbers, "selectedObjectsNumbers");

  const handleSelectRemove = (selectedList: any, removedItem: any) => {
    console.log(selectedList, "selectedList");
    setSelectedValues(selectedList);
    // const selectedValues = selectedList.filter((option: any) => option !== null && option !== undefined).map((option: any)=> option.id);
    setRemovedOptions((prevRemovedOptions) => [
      ...prevRemovedOptions,
      removedItem,
    ]);

    console.log(selectedValues, "selectedValues");
  };
  const handleObjectSelectRemove = (selectedList: any, removedItem: any) => {
    setSelectedObjectValues(selectedList);

    setRemovedObjectOptions((prevRemovedOptions) => [
      ...prevRemovedOptions,
      removedItem,
    ]);
  };

  useEffect(() => {
    if (dataBuildingofObjects && dataBuildingofObjects.data) {
      const extractedOptions: { value: any; label: string }[] =
        dataBuildingofObjects.data.map((item: BuildingObject) => ({
          label: item.name,
          value: item.id,
        }));
      setOptions(extractedOptions);
    }
  }, [dataBuildingofObjects]);

  useEffect(() => {
    if (dataVendorObjects && dataVendorObjects?.data) {
      const extractedOptions: { value: any; label: string }[] =
        dataVendorObjects?.data.map((item: Object) => ({
          label: item.title,
          value: item.id,
        }));
      setOptionsObject(extractedOptions);
    }
  }, [dataVendorObjects]);

  

  useEffect(() => {
    if (selectedRow) {
      const selectedObject = dataVendorObjects?.data?.find(
        (item: any) => item.title === selectedRow?.objectName
      );

      setFormData((prevFormData) => ({
        ...prevFormData,
        selectedObjectId: selectedObject?.id || "",
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        selectedObjectId: "",
      }));
    }
  }, [selectedRow]);

  const {
    data: dataVendorBuildingsId,
    error: errVendorBuildingsId,
    isLoading: isLoadingVendorBuildingsId,
  } = useSWR("/api/VendorBuildings/GetAll", (key) => GetAll.user(key));

  const {
    data: dataRoleAdmin,
    error: errRoleAdmin,
    isLoading: isLoadingRoleAdmin,
  } = useSWR("/api/Role/GetAll", (key) => GetAll.user(key));

  const [hasCompanyBoolean, setHasCompanyBoolean] = useState("false");

  const [selectedImage, setSelectedImage] = useState(null);
  const handleChange = (event: any) => {
    console.log(event.target.files[0], "event.target.files[0]");
    const file = event.target.files[0];
    setSelectedImage(file);
  };
  console.log(selectedImage, "selectedImage1");
  const handleSubmit = async (values: EmployeeValues) => {
    console.log(values, "values");

    const parsedValues = {
      ...values,
      VendorBuildingsId: selectedValues.map((item: any) => item.value),
      VendorObjectsId: selectedObjectValues.map((item: any) => item.value),
    };

    const formData = new FormData();
    formData.append("Name", parsedValues.Name);
    formData.append("Surname", parsedValues.Surname);
    formData.append("Patrionimyc", parsedValues.Patrionimyc);
    formData.append("UserName", parsedValues.UserName);
    formData.append(
      "HasCompany",
      JSON.stringify(Boolean(parsedValues.HasCompany))
    );
    formData.append("JobPosition", parsedValues.JobPosition);
    if (hasCompanyBoolean === "true") {
      formData.append("VendorCompanyId", String(parsedValues.VendorCompanyId));
    } else {
      formData.append("VendorCompanyId", "");
    }
    parsedValues.VendorBuildingsId.map((item) => {
      formData.append("VendorBuildingsId", String(item));
    });

    parsedValues.VendorObjectsId.map((item) => {
      formData.append("VendorObjectsId", String(item));
    });

    formData.append("RoleId", parsedValues.RoleId);
    formData.append("Voen", parsedValues.Voen);
    formData.append("Email", parsedValues.Email);
    formData.append("PhoneNumber", parsedValues.PhoneNumber);
    if (selectedImage !== null) {
      formData.append("ProfileImage", selectedImage);
    }
   

    const res = await useGetResponse(
      CreateEmployees.user("/api/Employees/Create", {
        arg: formData,
      }),
      mutate,
      closeModal
    );
  
  res;
  console.log(res,"res.statusCode");
    if (res.statusCode === 200 || res.statusCode === 201) {
      setSelectedImage(null);
      setOptionsObject([]);
      setSelectedObjectValues([]);
      setSelectedValues([]);
      setOptions([]);
      setSelectedImage(null);
    }
  };

  const handleEdit = async (values: EmployeeValues) => {
    const parsedValues = {
      ...values,
      VendorBuildingsId: selectedValues.map((item: any) => item.value),
      VendorObjectsId: selectedObjectValues.map((item: any) => item.value),
      Id: selectedRow.id,
    };
    const formData = new FormData();
    formData.append("Id", parsedValues.Id);
    formData.append("Name", parsedValues.Name);
    formData.append("Surname", parsedValues.Surname);
    formData.append("Patrionimyc", parsedValues.Patrionimyc);
    formData.append("UserName", parsedValues.UserName);
    formData.append(
      "HasCompany",
      JSON.stringify(Boolean(parsedValues.HasCompany))
    );
    formData.append("JobPosition", parsedValues.JobPosition);
    if (hasCompanyBoolean === "true") {
      formData.append("VendorCompanyId", String(parsedValues.VendorCompanyId));
    } else {
      formData.append("VendorCompanyId", "");
    }

    parsedValues.VendorBuildingsId.map((item) => {
      formData.append("VendorBuildingsId", String(item));
    });

    parsedValues.VendorObjectsId.map((item) => {
      formData.append("VendorObjectsId", String(item));
    });

    formData.append("RoleId", parsedValues.RoleId);
    formData.append("Voen", parsedValues.Voen);
    formData.append("Email", parsedValues.Email);
    formData.append("PhoneNumber", parsedValues.PhoneNumber);
    if (selectedImage !== null) {
      formData.append("ProfileImage", selectedImage);
    } else if (selectedRow.image) {
      console.log("else if");
      const response = await fetch(selectedRow.image);
      console.log(response, "response");
      const imageBlob = await response.blob();
      console.log(imageBlob, "imageBlob");
      formData.append("ProfileImage", imageBlob, "image.png");
    }
  

    const res = await useGetResponse(
      EditEmployees.user("/api/Employees/Update", {
        arg: formData,
      }),
      mutate,
      closeModal
    );

    res;
  };

  const deleteObject = async (deleteId: string) => {
    const res = await useGetResponse(
      Delete.user(`/api/Employees/Delete`, {
        arg: {
          deleteId,
        },
      }),
      mutate,
      closeModal
    );

    res;
  };

  const handleDelete = () => {
    deleteObject(deleteId);
  };

  const handleClose = () => {
    closeModal();

    setSelectedValues([]);
    setSelectedObjectValues([]);
    setOptions([]);
    setOptionsObject([]);
    setSelectedImage(null);
    setHasCompanyBoolean("false");
  };

  if (
    isLoadingVendorCompany &&
    isLoadingVendorObjects &&
    isLoadingVendorBuildingsId &&
    isLoadingRoleAdmin
  )
    <div>Loading...</div>;

  if (
    errVendorCompany &&
    errVendorObjects &&
    errVendorBuildingsId &&
    errRoleAdmin
  )
    <div>Err</div>;

  const vendorCompanyIds = dataVendorCompany?.data?.map(
    ({ id, companyName }: { id: number; companyName: string }) => ({
      id,
      companyName,
    })
  );

  const vendorObjectsIds = dataVendorObjects?.data?.map(
    ({ id, title }: { id: number; title: string }) => ({
      id,
      title,
    })
  );

  const vendorBuildingsIds = dataVendorBuildingsId?.data?.map(
    ({ id }: { id: number }) => ({
      id,
    })
  );

  const roleAdminIds = dataRoleAdmin?.data?.map(
    ({ id, name }: { id: string; name: string }) => ({
      id,
      name,
    })
  );
  {
    console.log(vendorObjectsIds);
  }

  console.log(selectedRow);
  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleClose}>
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
                  <Dialog.Panel className="w-full h-[80vh] max-w-xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl overflow-y-auto">
                    <Dialog.Title
                      as="h3"
                      className="flex items-center justify-between font-bold font-inter text-16 leading-30 text-dark"
                    >
                      Add Employee
                      <XCircleIcon
                        onClick={handleClose}
                        className="w-6 h-6 cursor-pointer fill-icon"
                      />
                    </Dialog.Title>
                    <Formik
                      initialValues={{
                        ProfileImage: null,
                        Name: "",
                        Surname: "",
                        UserName: "",
                        Patrionimyc: "",
                        HasCompany: null,
                        JobPosition: "",
                        VendorCompanyId: null,
                        VendorObjectsId: [],
                        VendorBuildingsId: [],
                        RoleId: "",
                        Voen: "",
                        Email: "",
                        PhoneNumber: "",
                        
                      }}
                      onSubmit={handleSubmit}
                    >
                      {(formikProps) => (
                        <Form action="">
                          <div className="grid items-center justify-between grid-cols-2 gap-4 mt-10 font-bold font-inter text-16 leading-30 text-dark">
                            <div>
                              <label
                                htmlFor="Name"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Name
                              </label>
                              <Field
                                name="Name"
                                id="Name"
                                type="text"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="Surname"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Surname
                              </label>
                              <Field
                                name="Surname"
                                id="Surname"
                                type="text"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="Patrionimyc"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Patrionimyc
                              </label>
                              <Field
                                name="Patrionimyc"
                                id="Patrionimyc"
                                type="text"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="UserName"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Username
                              </label>
                              <Field
                                name="UserName"
                                id="UserName"
                                type="text"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>

                        

                            <div>
                              <label
                                htmlFor="Email"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Email
                              </label>
                              <Field
                                name="Email"
                                id="Email"
                                type="email"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="JobPosition"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Job Position
                              </label>
                              <Field
                                name="JobPosition"
                                id="JobPosition"
                                type="text"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="Voen"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Voen
                              </label>
                              <Field
                                name="Voen"
                                id="Voen"
                                type="text"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="PhoneNumber"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Phone Number
                              </label>
                              <Field
                                name="PhoneNumber"
                                id="PhoneNumber"
                                type="text"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="VendorObjectsId"
                                className="inline-flex items-center "
                              >
                                Vendor Objects
                              </label>
                              {/* <Field
                                as="select"
                                name="VendorObjectsId"
                                id="VendorObjectsId"
                                onChange={handleObjectChange}
                                value={formData.selectedObjectId}
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              >
                                <option value="" selected disabled>
                                  Choose
                                </option>
                                {vendorObjectsIds?.map(
                                  ({
                                    id,
                                    title,
                                  }: {
                                    id: number;
                                    title: string;
                                  }) => (
                                    <option key={id} value={id}>
                                      {title}
                                    </option>
                                  )
                                )}
                              </Field> */}
                              <Multiselect
                                options={optionsObject}
                                // isObject={false}
                                onSelect={handleObjectSelectChange}
                                onRemove={handleObjectSelectRemove}
                                displayValue="label"
                                closeIcon="cancel"
                                placeholder="Select Options"
                                selectedValues={selectedObjectValues}
                                className="multiSelectContainer mt-3 rounded-lg  focus:outline-none font-medium text-md"
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="vendorBuildingsId"
                                className="inline-flex items-center "
                              >
                                Vendor Building
                              </label>

                              <Multiselect
                                options={options}
                                // isObject={false}
                                onSelect={handleSelectChange}
                                onRemove={handleSelectRemove}
                                displayValue="label"
                                closeIcon="cancel"
                                placeholder="Select Options"
                                selectedValues={selectedValues}
                                className="multiSelectContainer mt-3 rounded-lg  focus:outline-none font-medium text-md"
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="RoleId"
                                className="inline-flex items-center "
                              >
                                Role Name
                              </label>
                              <Field
                                as="select"
                                name="RoleId"
                                id="RoleId"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                // required
                              >
                                <option value="" selected disabled>
                                  Choose
                                </option>
                                {roleAdminIds?.map(
                                  ({
                                    id,
                                    name,
                                  }: {
                                    id: string;
                                    name: string;
                                  }) => (
                                    <option key={id} value={id}>
                                      {name}
                                    </option>
                                  )
                                )}
                              </Field>
                            </div>
                            <div>
                              <label
                                htmlFor="HasCompany"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Has Company
                              </label>
                              <Field
                                name="HasCompany"
                                id="HasCompany"
                                as="select"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                onChange={(
                                  e: React.ChangeEvent<HTMLSelectElement>
                                ) => {
                                  setHasCompanyBoolean(e.target.value);
                                  formikProps.setFieldValue(
                                    "HasCompany",
                                    e.target.value
                                  );
                                  if (e.target.value === "true") {
                                    // Reset the values of building, company, and object fields
                                    formikProps.setFieldValue(
                                      "VendorCompanyId",
                                      null
                                    );
                                  }
                                }}
                                required
                              >
                                <option value="" selected disabled>
                                  Select
                                </option>
                                <option value={"true"}>true</option>
                                <option value={"false"}>false</option>
                              </Field>
                            </div>
                            {hasCompanyBoolean === "true" ? (
                              <div>
                                <label
                                  htmlFor="VendorCompanyId"
                                  className="inline-flex items-center "
                                >
                                  Vendor Company
                                </label>
                                <Field
                                  as="select"
                                  name="VendorCompanyId"
                                  id="VendorCompanyId"
                                  className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"

                                  // required
                                >
                                  <option value="" selected disabled>
                                    Choose
                                  </option>
                                  {vendorCompanyIds?.map(
                                    ({
                                      id,
                                      companyName,
                                    }: {
                                      id: number;
                                      companyName: string;
                                    }) => (
                                      <option key={id} value={id}>
                                        {companyName}
                                      </option>
                                    )
                                  )}
                                </Field>
                              </div>
                            ) : null}
                            <div>
                              <label
                                htmlFor="ProfileImage"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                ProfileImage
                              </label>

                              <input
                                type="file"
                                id="ProfileImage"
                                name="ProfileImage"
                                accept="ProfileImage/*"
                                onChange={handleChange}
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>
                            <div className="w-[48%] flex items-center justify-center">
                              <div className="w-[140px] h-[100px] rounded-lg  object-cover object-center">
                                {selectedImage && (
                                  <img
                                    src={URL.createObjectURL(selectedImage)}
                                    alt="Selected Image"
                                    className="object-contain w-full h-full "
                                  />
                                )}
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
                      )}
                    </Formik>
                  </Dialog.Panel>
                ) : process === "Edit" ? (
                  <Dialog.Panel className="w-full max-w-xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className="flex items-center justify-between font-bold font-inter text-16 leading-30 text-dark"
                    >
                      Edit Employee
                      <XCircleIcon
                        onClick={closeModal}
                        className="w-6 h-6 cursor-pointer fill-icon"
                      />
                    </Dialog.Title>
                    <Formik
                      initialValues={
                     {
                      ProfileImage: null,
                      Name:selectedRow?.name || "",
                      Surname:selectedRow?.surname || "",
                      UserName:selectedRow?.username || "",
                      Patrionimyc:selectedRow?.patrionimyc || "",
                      HasCompany:selectedRow?.hasCompany || null,
                      JobPosition:selectedRow.jobPosition || "",
                      VendorCompanyId: null,
                      VendorObjectsId: [],
                      VendorBuildingsId: [],
                      RoleId: dataRoleAdmin?.data?.find(
                        (item:any) => item.name === selectedRow?.roleName
                      )?.id || "",
                      Voen:selectedRow?.voen || "",
                      Email:selectedRow?.email || "",
                      PhoneNumber:selectedRow?.phoneNumber || "",
                     
                        }
                      }
                      onSubmit={handleEdit}
                    >
                      {(formikProps) => (
                        <Form action="">
                          <div className="grid items-center justify-between grid-cols-2 gap-4 mt-10 font-bold font-inter text-16 leading-30 text-dark">
                            <div>
                              <label
                                htmlFor="Name"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Name
                              </label>
                              <Field
                                name="Name"
                                id="Name"
                                type="text"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="Surname"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Surname
                              </label>
                              <Field
                                name="Surname"
                                id="Surname"
                                type="text"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="Patrionimyc"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Patrionimyc
                              </label>
                              <Field
                                name="Patrionimyc"
                                id="Patrionimyc"
                                type="text"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="UserName"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Username
                              </label>
                              <Field
                                name="UserName"
                                id="UserName"
                                type="text"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>

                        
                            <div>
                              <label
                                htmlFor="Email"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Email
                              </label>
                              <Field
                                name="Email"
                                id="Email"
                                type="email"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="JobPosition"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Job Position
                              </label>
                              <Field
                                name="JobPosition"
                                id="JobPosition"
                                type="text"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="Voen"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Voen
                              </label>
                              <Field
                                name="Voen"
                                id="Voen"
                                type="text"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="PhoneNumber"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Phone Number
                              </label>
                              <Field
                                name="PhoneNumber"
                                id="PhoneNumber"
                                type="text"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="VendorObjectsId"
                                className="inline-flex items-center "
                              >
                                Vendor Objects
                              </label>

                              <Multiselect
                                options={optionsObject}
                                // isObject={false}
                                onSelect={handleObjectSelectChange}
                                onRemove={handleObjectSelectRemove}
                                displayValue="label"
                                closeIcon="cancel"
                                placeholder="Select Options"
                                selectedValues={selectedObjectValues}
                                className="multiSelectContainer mt-3 rounded-lg  focus:outline-none font-medium text-md"
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="vendorBuildingsId"
                                className="inline-flex items-center "
                              >
                                Vendor Building
                              </label>

                              <Multiselect
                                options={options}
                                // isObject={false}
                                onSelect={handleSelectChange}
                                onRemove={handleSelectRemove}
                                displayValue="label"
                                closeIcon="cancel"
                                placeholder="Select Options"
                                selectedValues={selectedValues}
                                className="multiSelectContainer mt-3 rounded-lg  focus:outline-none font-medium text-md"
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="RoleId"
                                className="inline-flex items-center "
                              >
                                Role Name
                              </label>
                              <Field
                                as="select"
                                name="RoleId"
                                id="RoleId"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                // required
                              >
                                <option value="" selected disabled>
                                  Choose
                                </option>
                                {roleAdminIds?.map(
                                  ({
                                    id,
                                    name,
                                  }: {
                                    id: string;
                                    name: string;
                                  }) => (
                                    <option key={id} value={id}>
                                      {name}
                                    </option>
                                  )
                                )}
                              </Field>
                            </div>
                            <div>
                              <label
                                htmlFor="HasCompany"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                Has Company
                              </label>
                              <Field
                                name="HasCompany"
                                id="HasCompany"
                                as="select"
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                onChange={(
                                  e: React.ChangeEvent<HTMLSelectElement>
                                ) => {
                                  setHasCompanyBoolean(e.target.value);
                                  formikProps.setFieldValue(
                                    "HasCompany",
                                    e.target.value
                                  );
                                  if (e.target.value === "true") {
                                    // Reset the values of building, company, and object fields
                                    formikProps.setFieldValue(
                                      "VendorCompanyId",
                                      null
                                    );
                                  }
                                }}
                                required
                              >
                                <option value="" selected disabled>
                                  Select
                                </option>
                                <option value={"true"}>true</option>
                                <option value={"false"}>false</option>
                              </Field>
                            </div>
                            {hasCompanyBoolean === "true" ? (
                              <div>
                                <label
                                  htmlFor="VendorCompanyId"
                                  className="inline-flex items-center "
                                >
                                  Vendor Company
                                </label>
                                <Field
                                  as="select"
                                  name="VendorCompanyId"
                                  id="VendorCompanyId"
                                  className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"

                                  // required
                                >
                                  <option value="" selected disabled>
                                    Choose
                                  </option>
                                  {vendorCompanyIds?.map(
                                    ({
                                      id,
                                      companyName,
                                    }: {
                                      id: number;
                                      companyName: string;
                                    }) => (
                                      <option key={id} value={id}>
                                        {companyName}
                                      </option>
                                    )
                                  )}
                                </Field>
                              </div>
                            ) : null}
                            <div>
                              <label
                                htmlFor="ProfileImage"
                                className="inline-flex items-center w-1/2 justify-star"
                              >
                                ProfileImage
                              </label>

                              <input
                                type="file"
                                id="ProfileImage"
                                name="ProfileImage"
                                accept="ProfileImage/*"
                                onChange={handleChange}
                                className="mt-3 w-[95%] rounded-lg border-line border flex justify-center items-center px-5 py-2 bg-background focus:outline-none font-medium text-md"
                                required
                              />
                            </div>
                            <div className="w-[48%] flex items-center justify-center">
                              <div className="w-[140px] h-[100px] rounded-lg  object-cover object-center">
                              {selectedImage && selectedImage ? (
                                  <img
                                    src={URL.createObjectURL(selectedImage)}
                                    alt="Selected Image"
                                    className="object-contain w-full h-full "
                                  />
                                ): <img
                                className="w-full h-full"
                                src={selectedRow.image}
                                alt=""
                              />}
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
                      )}
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

export default EmployeesModal;
