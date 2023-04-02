const Dashboard = () => {
  return (
    <div className="relative flex gap-6 p-6 bg-transparent">
      <div className="flex w-4/6 gap-6 ">
        <div className="grid w-full max-w-xs gap-6">
          <div className="bg-primary h-[400px] rounded-xl"></div>
          <div className="w-full p-6 border rounded-xl border-line">
            <div className="flex justify-between">
              <h2>Sonuncu sifarişlər</h2>
              <span>Hamsina bax</span>
            </div>
          </div>
        </div>
        <div className="grid w-full h-full gap-6">
          <div className="w-full h-[400px] p-6 border rounded-xl border-line">
            <div className="flex justify-between">
              <h2>Sonuncu sifarişlər</h2>
              <span>Hamsina bax</span>
            </div>
          </div>
          <div className="w-full p-6 border rounded-xl border-line">
            <div className="flex justify-between">
              <h2>Sonuncu sifarişlər</h2>
              <span>Hamsina bax</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-2/6 rounded-xl bg-backgroundSecond"></div>
    </div>
  );
};

export default Dashboard;
