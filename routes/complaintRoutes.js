const multer = require('multer');
const { v4: uuidv4 } = require("uuid");
var express = require("express");
var router = express.Router();
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, "public/media");
  },                    
  filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const sanitizedOriginalname = file.originalname.replace(/[^a-zA-Z0-9\-_.]/g, ''); // Remove spaces and special characters
  
      if (ext) {
        cb(null, file.fieldname + "-" + uuidv4() + Number(Date.now()).toString() + "-" + sanitizedOriginalname.replace(ext, '') + ext);
      } 
      else if (req.body.post_type == 3) {
        cb(null, file.fieldname + "-" + uuidv4() + Number(Date.now()).toString() + "-" + sanitizedOriginalname + ".mp4");
      } 
      else {
        cb(null, file.fieldname + "-" + uuidv4() + Number(Date.now()) + "-" + sanitizedOriginalname.replace(ext, '') + ext);
      }
    },
    onError: function (err, next) {
      console.log('error', err);
      next(err);
    }
  });
  
  const upload = multer({ storage: storage });
  const auth = require("../middleware/auth");
  const controller = require("../controller/complaintController");

<<<<<<< HEAD
  router.post('/create_new_complaint', auth, upload.array("files", 30), controller.create_new_complaint);
  router.delete('/delete_all_complaints', controller.delete_all_complaints);
=======
  router.post('/create_new_complaint', auth, upload.single("files"), controller.create_new_complaint);
>>>>>>> b304468c097dad671073b6c7dcd2e82345d70827

  module.exports = router;
