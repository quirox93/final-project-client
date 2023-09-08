import { getAllUsers } from "@/utils/api";
import UsersInfo from "../UsersTable/UsersInfo";

const loadUsers = async () => await getAllUsers();

const columns = [
  { name: "Name", uid: "name", sortable: true },
  { name: "Created", uid: "createdAt", sortable: true },
  { name: "Admin", uid: "role", sortable: false },
];

const INITIAL_VISIBLE_COLUMNS = ["name", "createdAt", "role"];
export const revalidate = 0;
export default async function UsersTable() {
  const statusOptions = [
    { name: "Admin", uid: true, prop: "isAdmin" },
    { name: "User", uid: false, prop: "User" },
  ];
  const users = await loadUsers();
  // console.log(users);

  return (
    <div className="p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 overflow-auto rounded-large shadow-small max-w-ld mt-5">
      {
        <UsersInfo
          defItems={users}
          columns={columns}
          statusOptions={statusOptions}
          INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
        />
      }
    </div>
  );
}
