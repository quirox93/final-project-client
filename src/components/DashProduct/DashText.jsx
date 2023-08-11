export default function DashText(props) {
  return (
    <div className="w-16 h-14 px-2.5 bg-grey">
      <div className="text-center text-black text-2xl font-bold">
        {props.info}
      </div>
    </div>
  );
}
