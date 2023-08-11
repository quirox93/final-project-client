const Sidebar = () => {
  return (
    <div className="w-64 h-screen relative bg-borderDash">
      <div className="left-[32px] top-[208px] absolute flex-col justify-start items-start gap-10 inline-flex">
        <div className="w-24 justify-start items-center gap-6 inline-flex">
          <div className="w-6 h-6 relative" />
          <div className="text-sky-600 text-base font-normal">Home</div>
        </div>
        <div className="w-24 justify-start items-center gap-6 inline-flex">
          <div className="w-6 h-6 px-1 pt-px pb-0.5 justify-center items-center flex">
            <div className="w-3.5 h-5 relative"></div>
          </div>
          <div className="text-slate-400 text-base font-normal">Add Card</div>
        </div>
        <div className="w-24 justify-start items-center gap-6 inline-flex">
          <div className="w-6 h-6 relative" />
          <div className="text-slate-400 text-base font-normal">Statistics</div>
        </div>
      </div>
      <div className="left-[32px] top-[32px] absolute text-slate-900 text-2xl font-bold">
        Dashboard
      </div>
      <div className="left-[32px] top-[95px] absolute justify-start items-center gap-4 inline-flex">
        <img
          className="w-12 h-12 rounded-full"
          src="https://via.placeholder.com/52x52"
        />
        <div className="flex-col justify-start items-start inline-flex">
          <div className="text-slate-900 text-base font-normal">
            Héctor Gómez
          </div>
          <div className="text-lime-500 text-xs font-normal">
            camiloduquee@gmail.com
          </div>
        </div>
      </div>
      <div className="w-48 h-px left-[32px] top-[179px] absolute bg-slate-200" />
    </div>
  );
};

export default Sidebar;
