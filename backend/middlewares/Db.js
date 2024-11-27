const mongoose=require('mongoose');

const url = 'mongodb+srv://akhilse2024:hotlineclasher123@cluster0.cigonb3.mongodb.net/HostelSync?retryWrites=true&w=majority&appName=Cluster0';

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