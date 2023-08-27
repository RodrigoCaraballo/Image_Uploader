import { createContext, useMemo, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [done, setDone] = useState(false);
    const [imgUrl, setImgUrl] = useState('');
    const [alert, setAlert] = useState({});

    const values = useMemo(() => ({
        done,
        setDone,
        imgUrl,
        setImgUrl,
        alert,
        setAlert
    }), [done, imgUrl, alert])

    return (
        <GlobalContext.Provider value={values}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalContext;