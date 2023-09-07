import Sidebar from "@/components/Sidebar";

const DashboardLayout = ({ children }) => {

  return (
    <div>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
