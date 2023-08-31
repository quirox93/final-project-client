import { getAllUsers } from "@/utils/api";
import AdminProducts from "../AdminProducts/AdminProducts";

const loadUsers = async () => await getAllUsers();

const columns = [
  { name: "Email", uid: "id", sortable: false },
  { name: "First Name", uid: "firstName", sortable: true },
  { name: "Last Name", uid: "lastName", sortable: false },
];

const INITIAL_VISIBLE_COLUMNS = ["id", "firstName", "lastName"];
export const revalidate = 0;
export default async function UsersTable() {
  const statusOptions = [
    { name: "Active", uid: true, prop: "banned" },
    { name: "Paused", uid: false, prop: "banned" },
  ];
  const users = await loadUsers();
  // console.log(users);

  return (
    <div className="p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 overflow-auto rounded-large shadow-small max-w-ld ">
      {
        <AdminProducts
          mode={"user"}
          defItems={users}
          columns={columns}
          statusOptions={statusOptions}
          INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
        />
      }
    </div>
  );
}
