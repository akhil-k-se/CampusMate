import axios from 'axios';
import React, { useState } from 'react'

const QRcode = () => {
    const enrollmentID = localStorage.getItem('enrollmentID');
    const [QRurl, setQRurl] = useState("null")
    const fetchQRCode = async () => {
        try {
          const response = await axios.get(`http://localhost:3005/get-qrcode/${enrollmentID}`);
          setQRurl(response.data);
          console.log(response.data);
        } catch (err) {
          console.error('Failed to fetch QR code:', err);
        }
      };
  return (
    <div className='h-screen w-full bg-red-500 flex flex-col items-center justify-center'>
    <button onClick={fetchQRCode}>CLick me</button>
    <img width={20} height={20} className='w-[200px] h-[200px]' src={QRurl}/>
    </div>
  )
}

export default QRcode
