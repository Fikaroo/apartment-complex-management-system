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
    { username, password }: { username: string; password: string }
  ) => {
    const { data } = await instance.post(path, {
      userName: username,
      password: password,
    });
    return data;
  },
};
export const LoginApprove = {
  user: async (
    path: string,
    { username, smsCode }: { username: string; smsCode: string }
  ) => {
    const { data } = await instance.post(path, {
      userName: username,
      smsCode: smsCode,
    });
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
  user: async (
    path: string,
   
  ) => {
    const { data } = await admin.get(path);
    return data;
  },
};
export const CreateDeal = {
  user: async (
    path: string,
    {
  description,
  statusId,
  orderTypeId,
  orderSourceId,
  priorityId,
  orderClassId,
  appUserId,
  actualDeadline,
  normativeDeadline,
    }: {
      description: string;
      statusId: number;
      orderTypeId: number;
      orderSourceId: number;
      priorityId: number;
      orderClassId: number;
      appUserId: string;
      actualDeadline: string;
      normativeDeadline: string;
    }
  ) => {
    const { data } = await admin.post(path, {
      description: description,
      statusId: statusId,
      orderTypeId: orderTypeId,
      orderSourceId: orderSourceId,
      priorityId: priorityId,
      orderClassId:orderClassId,
      appUserId: appUserId,
      actualDeadline: actualDeadline,
      normativeDeadline: normativeDeadline
    });
    return data;
  },
};
export const Delete = {
  user: async (
    path: string,
   deleteId:number
  ) => {
    const { data } = await admin.delete(`${path}?Id=${deleteId}`);
    return data;
  },
};