<?php
// this header needs to set according to where your frontend is running
header("Access-Control-Allow-Methods: GET,POST,PUT,PATCH,DELETE");
header('Access-Control-Allow-Credentials: true');
header('Content-Type: plain/text');
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Methods,Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Authorization, X-Requested-With");

include_once("../php/db.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        update($conn);
    }
function update($conn){
try{
    if(isset($_POST['fname']) && isset($_POST['lname']) && isset($_POST['email'])  && isset($_POST['date'])  && isset($_POST['contact']) && isset($_POST['password'])){
        $id = $_SESSION['id'];
        $fname = trim($_POST['fname']);
        $lname = trim($_POST['lname']);
        $email = trim($_POST['email']);
        $date =trim($_POST['date']);
        $contact = trim($_POST['contact']);
        $password = trim($_POST['password']);
    
    
        $pdoQuery = "UPDATE users SET fname=:fname, lname=:lname, email=:email, date=:date, contact=:contact, password=:password WHERE id=:id";
        $pdoQuery_run = $conn->prepare($pdoQuery);
        $pdoQuery_exec = $pdoQuery_run->execute(array(":fname"=>$fname, ":lname"=>$lname, ":email"=>$email, ":date"=>$date,":contact"=>$contact,":password"=>$password, ":id"=>$id));
        
        if($pdoQuery_exec){
            $_SESSION['id'] = $id;
            $_SESSION['fname'] = $fname;
            $_SESSION['lname'] = $lname;
            $_SESSION['email'] = $email;
            $_SESSION['date'] = $date;
            $_SESSION['contact'] = $contact;
            $_SESSION['password'] = $password;

            $myObj = new stdClass();
            $myObj->fname = $_SESSION['fname'];
            $myObj->lname = $_SESSION['lname'];
            $myObj->email = $_SESSION['email'];
            $myObj->date = $_SESSION['date'];
            $myObj->contact = $_SESSION['contact'];
            $myObj->password = $_SESSION['password'];
            $myJSON = json_encode($myObj);
            $_SESSION['profileData'] = $myJSON;  
            $_SESSION['create'] = "Updated Successfully";
            echo json_encode(['status' => 'success']);
        }else{
            echo json_encode(['status' => 'error', 'message' => 'Update failure']);
        }      
    }    
}catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}
}
?>