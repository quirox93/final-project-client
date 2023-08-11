export default function DashButton(props) {
console.log({props})
  return (
    <button>
        <div className={`h-20 bg-${props.color} flex-col justify-center items-center inline-flex`}>
        <div className="h-16 pl-1 pr-px pt-px pb-0.5 justify-center items-center inline-flex">
          <div className="w-20 self-stretch flex-col justify-start items-center gap-2 inline-flex">
            <div className="w-6 h-6 p-0.5 justify-center items-center inline-flex">
              <div className="w-5 h-5 relative">
              </div>
            </div>
            <div className="text-white text-lg font-normal">{props.type}</div>
          </div>
        </div>
      </div>
    </button>
)
}