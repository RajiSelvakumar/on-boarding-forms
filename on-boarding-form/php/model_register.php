<?php
// this header needs to set according to where your frontend is running
header("Access-Control-Allow-Methods: GET,POST,PUT,PATCH,DELETE");
header('Access-Control-Allow-Credentials: true');
header('Content-Type: plain/text');
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Methods,Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Authorization, X-Requested-With");

include_once("../php/db.php");
if ($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        registerUser($conn);
    }
function registerUser($conn){
    try{
      if(isset($_POST['fname']) && isset($_POST['lname']) && isset($_POST['email']) && isset($_POST['contact']) && isset($_POST['date']) && isset($_POST['password'])){
        $fname = trim($_POST['fname']);
        $lname = trim($_POST['lname']);
        $email = trim($_POST['email']);
        $contact = trim($_POST['contact']);
        $date = trim($_POST['date']);
        $password = trim($_POST['password']);
    
        $checkEmail = $conn->prepare("SELECT email FROM users WHERE email =?");
        $checkEmail->execute([$email]);
        if($checkEmail->rowCount() > 0){
            echo json_encode(['status' => 'error']);
        }else{
            $Query = $conn->prepare("INSERT INTO users (fname, lname, email, contact, date, password) VALUES(?,?,?,?,?,?)");
            $Query->execute([$fname,$lname,$email,$contact,$date,$password]);
            if($Query){
                echo json_encode(['status'=>'success']);
            }
        }
        
    }
     }catch (PDOException $e) {
        print "Error!: " . $e->getMessage() . "<br/>";
        die();
    }
        
}



?>