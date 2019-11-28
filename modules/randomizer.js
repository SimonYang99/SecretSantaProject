function randomizeNames(sender, reciever){
    return new Promise((resolve, reject) => {
        let completeList = [];
        for(let i = sender.length-1; i >= 0; i--){
            let randNum = Math.floor(Math.random() * reciever.length);
            if(sender[i].name != reciever[randNum].name){
                completeList.push({
                    sender: sender[i].name, 
                    senderEmail: sender[i].email, 
                    reciever: reciever[randNum].name
                });
                reciever.splice(randNum, 1);
            }
            else{
                i += 1;
            }
        }
       resolve(completeList);
    });
}

module.exports = {
    randomizeNames
};