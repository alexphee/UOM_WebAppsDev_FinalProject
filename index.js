//Service worker
if("serviceWorker" in navigator)
    {
    navigator.serviceWorker.register("sw.js").then(register=>
    {
    console.log("Service Worker Registered!");
    console.log(registration);

    }).catch(error => {
        console.log("Problem with Service Worker!");
        console.log(error);
    });
}


// username & pass και αποθήκευση
var tname = [document.getElementById('uName')];
var pw = document.getElementById('uPw');

function store() {
    localStorage.setItem('thename', uName.value);
    localStorage.setItem('pw', uPw.value);
}
//έλεγχος ορθότητας user & pass
function check() {

    var storedName = localStorage.getItem('thename');
    var storedPw = localStorage.getItem('pw');

    var usrName = document.getElementById('userName').value;
    var usrPw = document.getElementById('userPw').value;
    
    if (userName.value == storedName && userPw.value == storedPw) {
        alert('You are logged in ' + usrName);
        var nombre = document.getElementById('userName').value;
        localStorage.setItem("elNombre",nombre);
        window.open('index2.html',"_self");
    } else {
        alert('Access denied. Valid username and password is required.');
    }

}
