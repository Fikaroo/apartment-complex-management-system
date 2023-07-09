// import { toast } from "react-toastify";

// const useGetResponse = async (api: any, mutate: any, closeModal: any) => {
//   try {
//     const { statusCode, message } = await api;

//     if (statusCode === 201 || statusCode === 200) {
//       closeModal();
//       mutate();
//       return toast.success(message?.[0]);
//     } else if (statusCode === 400 || statusCode === 404) {
//       return toast.error(message?.[0]);
//     }
//   } catch (error) {
//     console.log(error);
//     return toast.error("Server Error");
//   }
// };

// export default useGetResponse;

import { toast } from "react-toastify";

interface ResponseData {
  statusCode: number;
  message: string | undefined;
}

const useGetResponse = async (api: any, mutate: any, closeModal: any): Promise<ResponseData> => {
  try {
    const { statusCode, message } = await api;

    if (statusCode === 201 || statusCode === 200) {
      closeModal();
      mutate();
      toast.success(message?.[0]);
    } else if (statusCode === 400 || statusCode === 404) {
      toast.error(message?.[0]);
    }

    return { statusCode, message };
  } catch (error) {
    console.log(error);
    toast.error("Server Error");
    return { statusCode: 500, message: "Server Error" };
  }
};

export default useGetResponse;
