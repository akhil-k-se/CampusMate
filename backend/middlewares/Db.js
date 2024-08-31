const mongoose=require('mongoose');

const url = 'mongodb+srv://AkashdeepSingla:akashdeep241103@cluster.wgrp8v7.mongodb.net/hostellers?retryWrites=true&w=majority&appName=Cluster';

const Dbconnect=async()=>
    {
        try{
            await mongoose.connect(url)
            console.log('Db connected');
        }
        catch(err)
        {
            console.log(err);
    
        }
    }
    
    module.exports=Dbconnect;