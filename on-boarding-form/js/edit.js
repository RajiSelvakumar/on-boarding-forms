let request = new XMLHttpRequest();
request.open("POST","./php/model_profile.php");
request.send();
request.onreadystatechange = function() {
   if(request.readyState === 4 && request.status === 200){
       myObj = JSON.parse(request.responseText);
       document.getElementById("form_fname").setAttribute('value',myObj.fname);
       document.getElementById("form_lname").setAttribute('value',myObj.lname);
       document.getElementById("form_email").setAttribute('value',myObj.email);
       document.getElementById("form_date").setAttribute('value',myObj.date);
       document.getElementById("form_contact").setAttribute('value',myObj.contact);
       document.getElementById("form_password").setAttribute('value',myObj.password);
   }
}


