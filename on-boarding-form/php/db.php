<?php
session_start();
try {
    $conn = new PDO('mysql:host=remotemysql.com;dbname=7MCjsuPWsg', "7MCjsuPWsg", "R0dA8fp0YX"); 
} catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}
?>