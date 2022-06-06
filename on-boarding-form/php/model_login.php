<?php
// this header needs to set according to where your frontend is running
header("Access-Control-Allow-Methods: GET,POST,PUT,PATCH,DELETE");
header('Access-Control-Allow-Credentials: true');
header('Content-Type: plain/text');
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Methods,Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Authorization, X-Requested-With");

include_once("../php/db.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        login($conn);
    }


function login($conn){
try{
    if(isset($_POST['email']) && isset($_POST['password'])){
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    $Query = $conn->prepare("SELECT * FROM users WHERE email =?");
    $Query->execute([$email]);
      if($Query->rowCount() > 0){
        $row = $Query->fetch(PDO::FETCH_OBJ);
        $email = $row->email;
        $dbpassword = $row->password;
        $fname = $row->fname;
        $lname = $row->lname;
        $date = $row->date;
        $contact = $row->contact;
        $id = $row->id;
        if($password === $dbpassword){
            $_SESSION['id'] = $id;
            $_SESSION['fname'] = $fname;
            $_SESSION['lname'] = $lname;
            $_SESSION['email'] = $email;
            $_SESSION['date'] = $date;
            $_SESSION['contact'] = $contact;
            $_SESSION['password'] = $password;
            echo json_encode(['status' => 'success']);
        }else {
            echo json_encode(['status' => 'passwordError', 'message' => 'Your password is wrong']);
        }
     }else {
        echo json_encode(['status' => 'emailError','message' => 'Your email is wrong']);
     }
    }
}catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}
}



?>