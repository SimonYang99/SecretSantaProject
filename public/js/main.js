function hostEnter(){
    enterInfo(true).then(res => {
        setTimeout(function(){
            window.location.href = `room/host/${res}`;
        }, 2000);
    }).catch((err) => {
        swal.fire({
            icon: 'error',
            title: 'Bad Username/Email'
        });
    });
}

function enterInfo(host){
    return new Promise((resolve, reject) => {
        swal.mixin({
            input: 'text',
            backdrop: false,
            confirmButtonText: 'Next',
            showCancelButton: true,
            progressSteps: ['1', '2']
        }).queue([
            {
                title: 'Name'
            },
            {
                title: 'Email'
            }
        ]).then((result) => {
            if(!result.dismiss){
                if(checkEmail(result.value[1])){
                    send_data('host', {name: result.value[0], email: result.value[1]}).then(res => {
                        console.log(res);
                        populateStorage(result.value[0], result.value[1], host, res.room);
                        resolve(res.room);
                    })
                    .catch((err) => {
                        reject();
                    });
                }
                else{
                    reject();
                }
            }
        });
    });
}

function checkEmail(email){
    if(email.search("@") != -1){
        return true;
    }
    else{
        return false;
    }
}

function send_data(link, to_send){
    return new Promise((resolve, reject) => {
        fetch(`/${link}`, {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify(to_send)
        }).then(response => response.json())
            .then(data => {
                if(data.status == "OK"){
                    console.log(data);
                    resolve(data);
                }
                else{
                    reject();
                }
            });
    });
}

function populateStorage(name, email, host, roomstring){
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("host", host);
    localStorage.setItem("roomstring", roomstring);
}