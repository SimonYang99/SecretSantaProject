const nodemailer = require("nodemailer");

function mailList(arrayList){
    return new Promise(async (resolve) => {
        var promiseStack = [];
        for(let i in arrayList){
            await send_mail(arrayList[i]);
        }
    });
}

const transport = nodemailer.createTransport({
    service: "Outlook",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPASS,
    }
});

function send_mail(nameList){
    return new Promise ((resolve, reject) => {
        var mailOptions = {
            from: process.env.EMAIL,
            to: nameList.senderEmail,
            subject: 'Secret Santa',
            text: `Congratulations ${nameList.sender} you have to buy a present for ${nameList.reciever}!`
        };
        
        transport.sendMail(mailOptions, (error, info) => {
            if(error) {
                return console.log('Error while sending mail: ' + error); 
            }
            else {
                console.log('message sent: %s', info.messageId);
            }
            transport.close();
            resolve();
        });
    });
}

module.exports = {
    mailList
};

// mail("yangsiming1999@gmail.com", "John Cena");

