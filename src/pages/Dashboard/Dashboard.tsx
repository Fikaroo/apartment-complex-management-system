import { PencilIcon } from "@heroicons/react/24/outline";
import { UserGroupIcon, UsersIcon } from "@heroicons/react/24/solid";

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
  return (
    <div className="relative flex gap-6 p-6 bg-transparent">
      <div className="flex w-4/6 gap-6 ">
        <div className="grid w-full max-w-xs gap-6">
          <div className="bg-primary h-[400px] rounded-xl"></div>
          <div className="grid w-full gap-4 ">
            <StatusBox />
            <StatusBox />
          </div>
        </div>
        <div className="grid w-full gap-6">
          <div className="w-full h-[400px] p-6 border rounded-xl border-line">
            <div className="flex justify-between">
              <h2>Sonuncu sifarişlər</h2>
              <span>Hamsina bax</span>
            </div>

            <div className="grid gap-4 mt-6">
              <div className="flex w-full gap-4">
                <div className="rounded-full w-11 h-11 bg-icon"></div>
                <div className="flex-1">
                  <p>Usta xidməti</p>
                  <p>Nurlan Garash</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-end">icrada</p>
                  <p>30 Dek, 09:00</p>
                </div>
              </div>
              <div className="flex w-full gap-4">
                <div className="rounded-full w-11 h-11 bg-icon"></div>
                <div className="flex-1">
                  <p>Usta xidməti</p>
                  <p>Nurlan Garash</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-end">icrada</p>
                  <p>30 Dek, 09:00</p>
                </div>
              </div>
              <div className="flex w-full gap-4">
                <div className="rounded-full w-11 h-11 bg-icon"></div>
                <div className="flex-1">
                  <p>Usta xidməti</p>
                  <p>Nurlan Garash</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-end">icrada</p>
                  <p>30 Dek, 09:00</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-full p-6 bg-white border rounded-xl border-line">
            <div className="flex justify-between">
              <h2>İcazə verilmişlər</h2>
              <span>Hamsina bax</span>
            </div>
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

const StatusBox = () => (
  <div className="w-full h-40 max-w-sm bg-white border rounded-xl border-line">
    <div className="flex justify-between h-full p-6">
      <div className="flex flex-col justify-between">
        <p className="text-lg font-medium">Sakinlər</p>
        <span className="text-5xl font-semibold">178</span>
      </div>
      <div className="p-6 my-auto rounded-full bg-gradient-to-b from-success via-success/25 to-white">
        <UsersIcon className="w-8 h-8 fill-success" />
      </div>
    </div>
  </div>
);

export default Dashboard;
