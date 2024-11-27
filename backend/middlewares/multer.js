const multer = require('multer');

const storage = multer.diskStorage({
    filename : function(req,res,cb)
    {
        cb(null,file.originalname)
    }
}) ;

const upload = multer({storage:storage});

modules.export = upload;