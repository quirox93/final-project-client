import Sidebar from "@/components/Sidebar";
import HeaderDash from "@/components/HeaderDash";

const DashboardLayout = ({ children }) => {
  return (
    <div>
        <div className="flex">
        <div className="flex-none">
          <Sidebar />
        </div>
        <div className="flex-1 w-32">
          <HeaderDash />
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
