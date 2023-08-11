"use_client";

export default function DashButton(props) {
  return (
    <button
      className={`bg-${props.color} text-${props.color}-foreground text-sm font-bold flex place-items-center p-2`}
    >
      {props.type}
    </button>
  );
}
