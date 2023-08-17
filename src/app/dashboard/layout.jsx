import Sidebar from "@/components/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <div className="flex">
        <div className="flex-none">
          <Sidebar />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
