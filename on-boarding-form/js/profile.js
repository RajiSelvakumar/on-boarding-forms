let request = new XMLHttpRequest();
request.open("POST","./php/model_profile.php");
request.send();
request.onreadystatechange = function() {
   if(request.readyState === 4 && request.status === 200){
       myObj = JSON.parse(request.responseText);
       document.getElementById("hname").innerHTML = "Welcome"+" "+ myObj.fname;
       document.getElementById("fname").innerHTML = myObj.fname;
       document.getElementById("lname").innerHTML = myObj.lname;
       document.getElementById("email").innerHTML = myObj.email;
       document.getElementById("date").innerHTML = myObj.date;
       document.getElementById("contact").innerHTML = myObj.contact;
   }
}
