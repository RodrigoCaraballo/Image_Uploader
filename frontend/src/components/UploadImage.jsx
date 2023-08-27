import { useState } from 'react';
import axios from 'axios';

import Alert from './Alert';

import { useGlobal } from '../hooks/useGlobal';
import imageSvg from '../assets/image.svg';
import '../styles/UploadImage.css'

const UploadImage = () => {
  const { setDone, setImgUrl, alert, setAlert } = useGlobal();
  const [isOn, setIsOn] = useState(false);


  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsOn(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsOn(false);
  }

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOn(false);

    const { files } = e.dataTransfer;

    uploadImage(files);
  };

  const handleChangeFile = (e) => {
    e.preventDefault();
    const { files } = e.target

    uploadImage(files);
  }

  const uploadImage = async (files) => {

    if (!files?.length) {
      setAlert({
        msg: 'Please drag and drop again the file'
      })
      return
    }

    if (files.length > 1) {
      setAlert({
        msg: 'Please drag and drop only one file'
      })
      return
    }

    const extName = extensionName(files[0].name);

    if(!['jpeg', 'jpg', 'png'].includes(extName)) {
      setAlert({
        msg: 'Image format not supported, use .jpge, .jpg or .png'
      })
    }

    setDone(true);
    const formData = new FormData();
    formData.append('file', files[0]);

    try {
      const { data } = await axios.post('http://localhost:3000/', formData);

      setImgUrl(data.url);
    } catch (error) {
      setAlert({
        msg: 'Something went wrong, please try again'
      })
      setDone(false);
    }
  }

  const extensionName = (filename) => {
    const parts = filename.split('.');
    return parts[parts.length - 1];
  }

  const { msg } = alert;

  return (
    <main className='container'>
      <h1>Upload your image</h1>
      <p>File should be JPEG, PNG...</p>

      {msg && <Alert
        alert={alert}
      />}

      <div
        className='drop_container'
        id='dropper'
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <img src={imageSvg} alt="Drop Image" />
        {isOn ? <span>Leave the image to upload</span> : <span>Drag & Drop your image here</span>}
      </div>

      <span>Or</span>

      <input
        type="file"
        id='file'
        accept='image/*'
        onChange={e => handleChangeFile(e)}
      />
      <label
        htmlFor='file'
      >Choose a file</label>
    </main>
  )
}

export default UploadImage