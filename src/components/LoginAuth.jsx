"use client";
import { useUser } from "@clerk/nextjs";

const LoginAuth = () => {
  const { user } = useUser();
  console.log(user);
  return (
    <>
      <h3>Soy tu login</h3>
      {
        <ol>
          <li> ID || {user.id}</li>
          <li> USER || {user.username}</li>
        </ol>
      }
    </>
  );
};

export default LoginAuth;

//esto es para probar hay que borrar esto junto con la carpeta test quee
//esta dentro de app
