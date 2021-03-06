var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/mail', (req, res) => {

  // Instantiate the SMTP server
  const smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'feihong.129@gmail.com',
      pass: 'harine27'
    }
  });

  // Specify what the email will look like
  const mailOpts = {
    from: 'harshaK3010@gmail.com',//replace with your email
    to: 'harshak3010@gmail.com',//replace with your email 
    subject:  `Message from contact form on ${req.body.fname}`,
    html:`<h1>Contact details</h1>
     <h2> name:${req.body.fname}</h2><br> 
     <h2> email:${req.body.email} </h2><br> 
     <h2> message:${req.body.comments} </h2><br>`
  }

  // Attempt to send the email
  smtpTrans.sendMail(mailOpts, (error, response) => {
    
    if (error) {
      console.log(error);
      res.render('error',{message:'Feedback Not sent'});
      // Show a page indicating failure
    }
    else {
      console.log("sent!");
      res.render('error',{message:'Feedback sent'});
    }
  });
});

module.exports = router;