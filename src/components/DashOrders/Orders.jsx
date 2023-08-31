import OrdersTable from "./OrdersTable";
import {formatOrders, order} from "./data"
import { getAllOrders } from "@/utils/api";

const loadOrders = async () => await getAllOrders();
const orders = formatOrders(order);

const columns = [
  { name: "Id", uid: "id", sortable: true },
  { name: "Name", uid: "name", sortable: true },
  { name: "Email", uid: "email"},
  { name: "Status", uid: "status", sortable: true },
  { name: "Last Order", uid: "time", sortable: true },
  { name: "Payment", uid: "payment"},
  {name: "Actions", uid: "actions"},
];

const INITIAL_VISIBLE_COLUMNS = ["name", "status", "actions"];
export const revalidate = 0;
export default async function Orders() {
  const statusOptions = [
  { name: "Pending", uid: "Pending" },
  { name: "Success", uid: "Success" },
  { name: "Failure", uid: "Failure" },
];
const statusColorMap = {
  Pending: "warning",
  Success: "success",
  Failure: "danger",
};
// const orders = await loadOrders();

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
