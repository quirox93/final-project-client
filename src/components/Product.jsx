/* eslint-disable @next/next/no-img-element */
export default function Product(props) {
  //cargar datos desde Props
  return (
    <div className="m-10 w-96 flex items-center  p-2 rounded-2xl shadow-lg">
      <div className="flex-1">
        <img src={props.image} alt={props.name} width={200} height={200} />
      </div>
      <div className="ml-5 flex-1 space-y-3">
        <h2 className="text-lg font-bold">{props.name}</h2>
        <p>{props.description}</p>
        <p>Price: <span className="text-green font-bold">${props.price}</span></p>
        {props.stock === 0 ? <span className="bg-black rounded-2xl text-white p-1">Out of Stock</span> : <span className="bg-green rounded-2xl text-white p-1">Available</span>}
        <p>Stock: {
          props.stock === 0 ? <span className="text-red">0</span>  : <span className="text-green">{props.stock}</span>
        }</p>
        <button className="w-12 bg-twitter-blue rounded text-white py-2 px-4">+</button>
      </div>
    </div>
  );
}
