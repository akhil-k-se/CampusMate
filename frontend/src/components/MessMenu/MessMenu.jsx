import axios from 'axios';
import React, { useEffect, useState } from 'react'

const UserMess = () => {

    const [imgUrl,setImgUrl] = useState('');
    const [desc,setDesc] = useState('');

    const handleShowMenu = async(e)=>{
        try{
            const response = await axios.get("http://localhost:3005/student/showMenu",{
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
            <img src={imgUrl} alt="The Menu Will be soon uploaded my Warden"
                className='h-[80vh] w-[80vw]'
            />
        </div>
    )
}

export default UserMess
