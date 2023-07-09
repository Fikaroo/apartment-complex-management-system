import React, { useState } from "react";
import AddBtn from "../../components/AddBtn";
import RoomTypeModal from "../../components/Modals/RoomTypeModal";
import Tables,{ IHeaders } from "../../components/Table/RoomTypeTable";
import { GetAll } from "../../api";
import useSWR from "swr";
import { useTranslation } from "react-i18next";
type Props = {};

const RoomType = (props: Props) => {
  let [isOpen, setIsOpen] = useState<boolean>(false);
  const [process, setProcess] = useState("");
  const [roomTypeId, setRoomTypeId] = useState<number>(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const closeModal = (): void => {
    setIsOpen(false);
  };
  const openModal = (): void => {
    setIsOpen(true);
  };
  const {i18n} = useTranslation();
  const { data, error, isLoading, mutate } = useSWR(
    `/api/VendorRoomType/GetAll?lng=${i18n.language}`,
    (key) => GetAll.user(key)
  );
  const headers: IHeaders[] = [
    
    {
      id: 1,
      title: "Title",
    },
    {
      id: 2,
      title: "Edit",
    },
   
  ];
  return (
    <React.Fragment>
     
      <div className="flex items-center justify-between">
        <p className="font-bold font-inter text-16 leading-30 text-dark"></p>{" "}
        <div className="flex items-center gap-4">
          <AddBtn
            openModal={openModal}
            modal={
              <RoomTypeModal
                isOpen={isOpen}
                closeModal={closeModal}
                process={process}
                mutate={mutate}
                deleteId={roomTypeId}
                selectedRow={selectedRow}
              />
            }
            setProcess={setProcess}
          />

      
        </div>
      </div>
      <Tables
      
      openModal={openModal}
      modal={
        <RoomTypeModal
        mutate={mutate}
          isOpen={isOpen}
          closeModal={closeModal}
          process={process}
          deleteId={roomTypeId}
          selectedRow={selectedRow}
         
        />
      }
      headers={headers}
      data={data}
      setProcess={setProcess}
      setRoomTypeId={setRoomTypeId}
      setSelectedRow={setSelectedRow}
     
    />
    </React.Fragment>
  );
};

export default RoomType;
