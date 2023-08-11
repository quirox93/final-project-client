import DashButton from "./DashProduct/DashButton";
import DashText from "./DashProduct/DashText";

export default function DashProduct(props) {
  return (
    <div>

        <div className="w-56 h-14 px-2.5 left-0 top-[9px] absolute bg-zinc-300 justify-start items-center inline-flex">
          <img
            className="w-14 h-14 rounded-3xl"
            src="https://via.placeholder.com/60x60"
          />
          <div className="w-36 text-center text-slate-900 text-2xl font-bold">
            Charizard
          </div>
        </div>
        <DashText info={props.price} />
        <DashText info={props.stock} />
        <DashText info={props.date} />
        <div className="w-64 h-20 pl-1.5 pr-1 py-1 left-[800px] top-0 absolute bg-zinc-300 justify-center items-center gap-2.5 inline-flex">
          <DashButton type="DISABLE" color="grey" />
          <DashButton type="UPDATE" color="green" />
          <DashButton type="DELETE" color="red" />
        </div>
    </div>
  );
}
