const express=require ('express');
const mongoose=require('mongoose');

const app=express();

const url = 'mongodb+srv://Ananya:ananya123@cluster0.cccoiol.mongodb.net/backendtesting?retryWrites=true&w=majority&appName=Cluster0';

const Dbconnect=async()=>
    {
        try{
            const data=await mongoose.connect(url)
            console.log('Db connected');
        }
        catch(err)
        {
            console.log(err);
    
        }
    }
    
    module.exports=Dbconnect;