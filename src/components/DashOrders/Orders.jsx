import OrdersTable from "./OrdersTable";
import { formatOrders } from "./data";
import { getAllOrders } from "@/utils/api";

const loaderOrders = async () => await getAllOrders();

const columns = [
  { name: "Id", uid: "id" },
  { name: "Name", uid: "name", sortable: true },
  { name: "Status", uid: "status", sortable: true },
  { name: "Purchase Date", uid: "createdAt", sortable: true },
  { name: "Payment", uid: "statusMp", sortable: true },
  { name: "Total", uid: "total" },
  { name: "Actions", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "status",
  "statusMp",
  "createdAt",
  "actions",
];
export const revalidate = 0;
export default async function Orders() {
  const orders = formatOrders(await loaderOrders());

  const statusOptions = [
    { name: "Success", uid: "Success" },
    { name: "Sent", uid: "Sent" },
    { name: "Pending", uid: "Pending" },
    { name: "Canceled", uid: "Canceled" },
  ];
  const statusColorMap = {
    Success: "success",
    Sent: "primary",
    Pending: "warning",
    Canceled: "danger",
  };

  return (
    <div className="p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 overflow-auto rounded-large shadow-small max-w-ld ">
      {
        <OrdersTable
          orders={orders}
          columns={columns}
          statusOptions={statusOptions}
          statusColorMap={statusColorMap}
          INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
        />
      }
    </div>
  );
}
