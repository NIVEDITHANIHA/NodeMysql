var nodemailer = require('nodemailer');

const emailSend = (req,res)=>{
  const{from , to , subject ,text, attachments} = req.body
  console.log(from , to , subject ,text, attachments);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nivedha.niha@gmail.com',
      pass: 'emzf kdxy gzyg atjl'
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
      console.log("error",error);
    } else {
      console.log('Email sent: ' + info.response);
      res.json(mailOptions)
    }
  });
}

module.exports = {emailSend}