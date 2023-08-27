import { useContext } from "react";

import GlobalContext from "../context/GlobalProvider";

export const useGlobal = () => useContext(GlobalContext);
