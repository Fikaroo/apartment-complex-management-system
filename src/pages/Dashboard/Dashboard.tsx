import { PencilIcon } from "@heroicons/react/24/outline";
import {
  BriefcaseIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";

const Dashboard = () => {
  const fakeNewsData = [
    {
      title: "Xəbər başlığı",
      date: "15 Dek, 09:00",
      seen: "500 baxış",
    },
    {
      title: "Xəbər başlığı",
      date: "15 Dek, 09:00",
      seen: "500 baxış",
    },
    {
      title: "Xəbər başlığı",
      date: "15 Dek, 09:00",
      seen: "500 baxış",
    },
  ];

  const fakeOrder = [
    {
      title: "Usta xidməti",
      fullname: "Nurlan Garash",
      status: "icrada",
      time: "30 Dek, 09:00",
    },
    {
      title: "Usta xidməti",
      fullname: "Rustam Aziziov",
      status: "baxılır",
      time: "30 Dek, 08:00",
    },
    {
      title: "Usta xidməti",
      fullname: "Kanan İdayatov",
      status: "tamamlandı",
      time: "28 Dek, 09:00",
    },
    {
      title: "Usta xidməti",
      fullname: "Nihad Rasulzada",
      status: "tamamlandı",
      time: "17 Dek, 09:00",
    },
  ];

  return (
    <div className="relative flex gap-6 p-6 bg-transparent">
      <div className="flex w-4/6 gap-6">
        <div className="w-full max-w-xs space-y-6 ">
          <div className="bg-primary h-[400px] text-sm rounded-xl p-6 flex flex-col gap-6 relative overflow-hidden">
            <div className="flex justify-between">
              <h2 className="text-lg font-bold text-white">ABC MTK</h2>
              <p className="w-2.5 h-2.5 bg-white rounded-full"></p>
            </div>

            <div className="flex gap-3">
              <div className="rounded-full w-11 h-11 bg-backgroundSecond"></div>

              <div className="space-y-1">
                <p className="font-bold text-white">ABC YK</p>
                <p className="text-gray-50">Babək prospekti, 123</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-gray-50">Appointment Date</p>
              <p className="font-bold text-white">Nov 18 2021, 17:00</p>
            </div>

            <div className="space-y-2">
              <p className="text-gray-50">Room Area</p>
              <p className="font-bold text-white uppercase">
                100 m <sup>2</sup>
              </p>
            </div>

            <div className=" flex items-center justify-center w-[300px] h-[300px] absolute top-2/4 left-1/4 bg-gradient-to-b from-white/25 to-white/0 rounded-full ">
              <button className="flex items-center justify-center px-10 py-3 mb-4 mr-4 font-medium bg-white rounded-full w-fit text-dark">
                Aktiv et
              </button>
            </div>
          </div>
          <div className="w-full space-y-6">
            <StatusBox type="USER" />
            <StatusBox type="ORDER" />
          </div>
        </div>
        <div className="w-full space-y-6">
          <div className="w-full h-[400px] bg-white p-6 border rounded-xl border-line">
            <div className="flex justify-between">
              <h2>Sonuncu sifarişlər</h2>
              <span className="text-primary">Hamsina bax</span>
            </div>

            <div className="flex flex-col justify-between h-full mt-6 pb-14">
              {fakeOrder.map(({ title, fullname, status, time }) => (
                <div className="flex w-full gap-4">
                  <div className="rounded-full w-11 h-11 bg-icon"></div>
                  <div className="flex-1">
                    <p className="font-bold">{title}</p>
                    <p className="text-sm text-icon">{fullname}</p>
                  </div>
                  <div className="flex flex-col text-sm">
                    <p className="font-bold text-end">{status}</p>
                    <p className="text-sm text-icon">{time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-[343px]  bg-white border divide-y divide-icon/25 rounded-xl border-line">
            <div className="flex items-center justify-between p-6">
              <h2 className="font-bold">İcazə verilmişlər</h2>
              <span className="px-5 py-2.5 rounded-full bg-primary/10 text-primary">
                Hamsina bax
              </span>
            </div>

            <div></div>
          </div>
        </div>
      </div>
      <div className="w-2/6 p-6 rounded-xl bg-backgroundSecond">
        <div className="grid gap-4">
          <div className="flex w-full gap-4">
            <div className="rounded-full w-11 h-11 bg-icon"></div>
            <div className="flex-1">
              <p>Nurlan Garash</p>
              <p>orgnu@icloud.com</p>
            </div>
            <PencilIcon className="w-5" />
          </div>
          <div className="flex w-full gap-4">
            <div className="rounded-full w-11 h-11 bg-icon"></div>
            <div className="flex-1">
              <p>Kanan Idayatov</p>
              <p>kanan@gmail.com</p>
            </div>
            <PencilIcon className="w-5" />
          </div>
          <div className="flex w-full gap-4">
            <div className="rounded-full w-11 h-11 bg-icon"></div>
            <div className="flex-1">
              <p>Rustam Azizov</p>
              <p>rustam@gmail.com</p>
            </div>
            <PencilIcon className="w-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusBox = ({ type }: { type: "USER" | "ORDER" }) => {
  const getDetail = () => {
    switch (type) {
      case "USER":
        return {
          title: "Sakinlər",
          count: 178,
          icon: <UsersIcon className="w-8 h-8 fill-success" />,
        };

      case "ORDER":
        return {
          title: "Sifarişlər",
          count: 136,
          icon: <BriefcaseIcon className="w-8 h-8 fill-error" />,
        };

      default:
        return {
          title: "",
          count: 0,
          icon: "",
        };
    }
  };

  const { title, count, icon } = getDetail();

  return (
    <div className="w-full h-40 max-w-sm bg-white border rounded-xl border-line">
      <div className="flex justify-between h-full p-6 py-10">
        <div className="flex flex-col justify-between">
          <p className="text-lg font-medium">{title}</p>
          <span className="text-5xl font-semibold">{count}</span>
        </div>
        <div
          className={`p-6 my-auto rounded-full bg-gradient-to-b ${
            type === "USER"
              ? "from-success via-success/5 to-success/5"
              : "from-error via-error/5 to-error/5"
          } `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
