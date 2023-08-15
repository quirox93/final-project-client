/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";
export default function Product(props) {
  const router = useRouter();
  
  return (
    <div className="bg-white m-10 lg:w-3/12 md:w-1/3 flex items-center  p-2 rounded-2xl shadow-2xl">
      <div className="flex-1">
        <img
          className=" cursor-pointer"
          src={props.image}
          alt={props.name}
          width={200}
          height={200}
          onClick={() => router.push(`/product/${props.id}`)}
        />
      </div>
      <div className="text-black ml-5 flex-1 space-y-3">
        <h2
          className="text-lg font-bold cursor-pointer"
          onClick={() => router.push(`/product/${props.id}`)}
        >
          {props.name}{" "}
        </h2>
        <p>{props.description}</p>
        <p>
          Price: <span className="font-bold">${props.price}</span>
        </p>
        {props.stock === 0 ? (
          <span className="bg-black rounded-2xl text-white p-1">
            Out of Stock
          </span>
        ) : (
          <span className="bg-success-500 rounded-2xl text-white p-1">
            Available
          </span>
        )}
        <p>
          Stock:{" "}
          {props.stock === 0 ? (
            <span className="text-red">0</span>
          ) : (
            <span className="text-green">{props.stock}</span>
          )}
        </p>
        <button className="w-12 bg-primary rounded text-white py-2 px-4">
          +
        </button>
      </div>
    </div>
  );
}
