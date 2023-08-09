"use client";

import { useState } from "react";

export default function DetailDashProduct() {
  const [input, setInput] = useState("Nombre desde DB");
  const handleOnChange = (e) => {
    setInput(e.target.value);
  };
  return (
    <div className="bg-yellow-400 block">
      Product Dash Detail
      <input className="text-black" onChange={handleOnChange} value={input}></input>
    </div>
  );
}
