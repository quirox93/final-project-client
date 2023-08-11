import DashProducts from "@/components/DashProducts";
import Sidebar from "@/components/Sidebar";
import HeaderDash from "@/components/HeaderDash";
import Filters from "@/components/Filters";

export default function Dashboard() {
  return (
    <div className="flex  max-w-full h-screen ">
      <div>
        <Sidebar />
      </div>
      <div className=" flex flex-col  bg-mainDash">
        <HeaderDash />
        <Filters />
        <div>
          <DashProducts />
        </div>
      </div>
    </div>
  );
}
