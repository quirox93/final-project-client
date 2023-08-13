const HeaderDash = () => {
  const fecha = new Date();
  return (
    <div className="w-full h-24 relative  bg-gray-100 p-8">
      <div className="text-black text-2xl font-bold">Welcome Héctor</div>
      <div className="text-lime-500 text-xs font-normal">
        {fecha.toUTCString()}
      </div>
    </div>
  );
};

export default HeaderDash;
