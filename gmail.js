var nodemailer = require('nodemailer');

const emailSend = (req,res)=>{
  const{from , to , subject ,text, attachments} = req.body
  console.log(from , to , subject ,text, attachments);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nivedha.niha@gmail.com',
      pass: 'password'
      
    }
  });
  
  var mailOptions = {
    from: req.body.from,
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text,
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      res.status(500).json({
        success :true,
        message :"Email sending Failed",
        data:mailOptions
      })
      console.log("error",error);
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({
        success :true,
        message :"Email has been send Succesfully",
        data:mailOptions
      })
    }
  });
}

module.exports = {emailSend}