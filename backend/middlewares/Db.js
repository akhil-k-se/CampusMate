const mongoose=require('mongoose');

const url = 'mongodb+srv://aryan2003:aryan@cluster0.tojagvi.mongodb.net/campusmate?';

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