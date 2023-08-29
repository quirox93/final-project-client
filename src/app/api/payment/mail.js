import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "manst94@gmail.com",
        pass:"",
    }
});

const mailOptions = {
    from: "manst94@gmail.com",
    to: "manst94@gmail.com",
    subject:"testeo nodemailer",
    text:"Aca tenes un mail",
}

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log (error);
    }else {
        console.log("correo enviado:"+info.response);
    }
})