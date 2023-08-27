import { useGlobal } from './hooks/useGlobal';
import { ToastContainer } from 'react-toastify';

import UploadImage from './components/UploadImage';
import ShowImage from './components/ShowImage';

import './App.css'

function App() {
  const { done } = useGlobal();

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {(!done) && <UploadImage />}
      {(done) && <ShowImage />}
    </>
  )
}

export default App
