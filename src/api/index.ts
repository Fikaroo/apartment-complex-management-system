import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
  baseURL: baseUrl,
});
const admin = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("user-token")}`,

    "Content-type": "application/json",
  },
});
export const LoginApi = {
  user: async (
    path: string,
    { arg }: { arg: { username: string; password: string } }
  ) => {
    const { data } = await instance.post(path, arg);

    return data;
  },
};
export const LoginApprove = {
  user: async (
    path: string,
    { arg }: { arg: { username: string; smsCode: string } }
  ) => {
    const { data } = await instance.post(path, arg);
    return data;
  },
};
export const RegisterUser = {
  user: async (
    path: string,
    {
      name,
      surname,
      patrionimyc,
      userName,
      email,
      phoneNumber,
      roleName,
    }: {
      name: string;
      surname: string;
      patrionimyc: string;
      userName: string;
      email: string;
      phoneNumber: string;
      roleName: string;
    }
  ) => {
    const { data } = await admin.post(path, {
      name: name,
      surname: surname,
      patrionimyc: patrionimyc,
      userName: userName,
      email: email,
      phoneNumber: phoneNumber,
      roleName: roleName,
    });
    return data;
  },
};

export const DealsGetAll = {
  user: async (path: string) => {
    const { data } = await admin.get(path);
    return data;
  },
};
export const CreateDeal = {
  user: async (
    path: string,
    {
      arg,
    }: {
      arg: {
        orderSourceId: number;
        orderTypeId: number;
        priorityId: number;
        statusId: number;
        orderClassId: number;
        description: string;
        appUserId: string;
        actualDeadline: string;
        normativeDeadline: string;
      };
    }
  ) => {
    const { data } = await admin.post(path, arg);
    return data;
  },
};
export const Delete = {
  user: async (path: string,
    {
      arg,
    }: {
      arg: {
        deleteId: number;
      };
    }) => {
      console.log(arg,"argg");
    const { data } = await admin.delete(`${path}?Id=${arg.deleteId}`);
    return data;
  },
};

export const EditDeal = {
  user: async (
    path: string,
    {
      arg,
    }: {
      arg: {
        orderSourceId: number;
        orderTypeId: number;
        priorityId: number;
        statusId: number;
        orderClassId: number;
        description: string;
        appUserId: string;
        actualDeadline: string;
        normativeDeadline: string;
        id:number
      };
    }
  ) => {
    const { data } = await admin.put(path, arg);
    return data;
  },
};