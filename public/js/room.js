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

function copyToClipboard(){
    var copyText = document.getElementById("invitelink");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
}
