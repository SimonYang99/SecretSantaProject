document.addEventListener('DOMContentLoaded', function(){
    document.getElementById("invitelink").value = window.location.href.replace("/host","/join");
});

function getTabledata(){
    return new Promise((resolve, reject) => {
        fetch(`/roomdata`, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(to_send)
        });
    });
}

function start(){
    return new Promise((resolve, reject) => {
        fetch('/start', {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({room: localStorage.getItem("roomstring")})
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                swal.fire({
                   icon: 'success',
                   title: 'Emails have been sent',
                   backdrop: false, 
                }).then(() => {
                    window.location = `/`;
                });
            });
    });
}

function copyToClipboard(){
    var copyText = document.getElementById("invitelink");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
}
