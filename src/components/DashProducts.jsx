import DashProduct from "./DashProduct";

export default function DashProducts() {
  //cargar datos desde DB
  return (
    <div className="bg-green-400 block">
      <button>sort</button>
      <button>add product</button>
      <DashProduct />
      <DashProduct />
      <DashProduct />
    </div>
  );
}
