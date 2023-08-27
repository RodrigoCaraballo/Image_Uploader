import { useState } from "react"
import clipboardCopy from 'clipboard-copy';
import { toast } from 'react-toastify';
import Loading from "./Loading";

import { useGlobal } from "../hooks/useGlobal"
import '../styles/ShowImage.css'
import 'react-toastify/dist/ReactToastify.css'

const ShowImage = () => {
    const [loading, setLoading] = useState(true);
    const { imgUrl } = useGlobal()

    const handleImageLoad = () => {
        setTimeout(() => {
            setLoading(false);
        }, 3000)
    };

    const handleCopyClick = () => {
        clipboardCopy(imgUrl);
        toast.success('URL Copied', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    };

    return (
        <>
            <main className={`${(loading) && 'hidden'} container flex_column`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-check" width="60" height="60" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" fill="#219653" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                    <path d="M9 12l2 2l4 -4" />
                </svg>

                <h1>Upload successfully!</h1>

                <img
                    src={imgUrl}
                    alt="Image Uploaded"
                    onLoad={handleImageLoad}
                />

                <div id="copytext">
                    <input type="text" disabled value={imgUrl} />
                    <button
                        onClick={handleCopyClick}
                    >Copy Link</button>
                </div>
            </main>

            <Loading
                loading={loading}
            />
        </>
    )
}

export default ShowImage