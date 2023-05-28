import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
  baseURL: baseUrl,
});

const admin = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-type": "application/json",
  },
});

const company = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-type": "multipart/form-data",
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

export const GetAll = {
  user: async (path: string) => {
    const { data } = await admin.get(path, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
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
    const { data } = await admin.post(path, arg, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    return data;
  },
};
export const Delete = {
  user: async (
    path: string,
    {
      arg,
    }: {
      arg: {
        deleteId: number;
      };
    }
  ) => {
    console.log(arg, "argg");
    const { data } = await admin.delete(`${path}?Id=${arg.deleteId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
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
        id: number;
      };
    }
  ) => {
    const { data } = await admin.put(path, arg, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    return data;
  },
};
export const OrderGetbyId = {
  user: async (path: string) => {
    const { data } = await admin.get(path, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    return data;
  },
};
export const EditUser = {
  user: async (
    path: string,
    {
      arg,
    }: {
      arg: {
        id: number;
        name: string;
        surname: string;
        patrionimyc: string;
        email: string;
        phoneNumber: string;
        propertyTypeId: number;
        customerStatusId: number;
        proportion: string;
      };
    }
  ) => {
    const { data } = await admin.put(path, arg, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    return data;
  },
};
export const EditObjects = {
  user: async (
    path: string,
    {
      arg,
    }: {
      arg: {
        id: number;
        title: string;
        address: string;
        regionId: number;
      };
    }
  ) => {
    const { data } = await admin.put(path, arg, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    return data;
  },
};
export const AddObjects = {
  user: async (
    path: string,
    {
      arg,
    }: {
      arg: {
        title: string;
        address: string;
        regionId: number;
      };
    }
  ) => {
    const { data } = await admin.post(path, arg, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    return data;
  },
};

export const CreateApartment = {
  user: async (
    path: string,
    {
      arg,
    }: {
      arg: {
        vendorBuildingId: number;
        apartmentNo: string;
        entranceNo: string;
        area: number;
        floorNo: number;
      };
    }
  ) => {
    const { data } = await admin.post(path, arg, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    return data;
  },
};

export const EditApartment = {
  user: async (
    path: string,
    {
      arg,
    }: {
      arg: {
        id: number;
        vendorBuildingId: number;
        apartmentNo: string;
        entranceNo: string;
        area: number;
        floorNo: number;
      };
    }
  ) => {
    const { data } = await admin.put(path, arg, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    return data;
  },
};
export const CreateCompany = {
  user: async (
    path: string,
    {
      arg,
    }: {
      arg: {
        directorName: string;
        directorSurname: string;
        directorFatherName: string;
        phonenumber: string;
        email: string;
        logo: string;
        objectId: number;
        companyName: string;
        voen: string;
        vin: string;
      };
    }
  ) => {
    const { data } = await company.post(path, arg, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    return data;
  },
};

export const EditCompany = {
  user: async (
    path: string,
    {
      arg,
    }: {
      arg: {
        id: number;
        directorName: string;
        directorSurname: string;
        directorFatherName: string;
        phonenumber: string;
        email: string;
        logo: string;
        objectId: number;
        companyName: string;
        voen: string;
        vin: string;
      };
    }
  ) => {
    const { data } = await admin.put(path, arg, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });
    return data;
  },
};
