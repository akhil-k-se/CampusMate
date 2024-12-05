import axios from 'axios';
import React, { useEffect, useState } from 'react'

const UserMess = () => {

    const [imgUrl,setImgUrl] = useState('');
    const [desc,setDesc] = useState('');

    const handleShowMenu = async(e)=>{
        try{
            const response = await axios.get("https://hostel-sync-1.onrender.com/student/showMenu",{
                withCredentials:true
            });
            console.log(response.data)
            if(response.data.success)
            {
                setImgUrl(response.data.imageUrl);
                setDesc(response.data.description);
            }
        }
        catch(e)
        {
            const error = e.response?.data?.msg;
            alert(error);
        }
    }
    useEffect(()=>{
        if(!imgUrl && !desc)
        {
            handleShowMenu();
        }
    },[imgUrl,desc])

    return (
        <div className='flex flex-col gap-3 h-screen w-full relative items-center justify-center'>
        <p className='h-[100px]  text-[50px]'>{desc}</p>
            <img src={imgUrl} alt="Work in Progress"
                className='h-[80vh] w-[80vw]'
            />
        </div>
    )
}

export default UserMess
