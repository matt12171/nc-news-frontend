import { createContext } from "react";
import { useState } from "react";

export const UsernameContext = createContext();

export const Username = (props) => {
  const [user, setUser] = useState("grumpy19");

  return (
    <UsernameContext.Provider value={{ user, setUser }}>
      {props.children}
    </UsernameContext.Provider>
  );
};
