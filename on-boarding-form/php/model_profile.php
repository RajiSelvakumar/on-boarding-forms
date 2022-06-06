<?php
// this header needs to set according to where your frontend is running
header("Access-Control-Allow-Methods: GET,POST,PUT,PATCH,DELETE");
header('Access-Control-Allow-Credentials: true');
header('Content-Type: plain/text');
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Methods,Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Authorization, X-Requested-With");

include_once("../php/db.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        dashboard($conn);
    }
function dashboard($conn){
try{
    $myObj = new stdClass();
    $myObj->fname = $_SESSION['fname'];
    $myObj->lname = $_SESSION['lname'];
    $myObj->email = $_SESSION['email'];
    $myObj->date = $_SESSION['date'];
    $myObj->contact = $_SESSION['contact'];
    $myObj->password = $_SESSION['password'];
    $myJSON = json_encode($myObj);
    echo $myJSON;
    $_SESSION['profileData'] = $myJSON;   
}catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}
}
?>