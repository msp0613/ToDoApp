<?php
header("Access-Control-Allow-Origin: *"); //add this CORS header to enable any domain to send HTTP requests to these endpoints:
$host = "localhost";
$user = "root";
$password = "";
$dbname = "projecty";

$con = mysqli_connect($host, $user, $password,$dbname);

$method = $_SERVER['REQUEST_METHOD'];

if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}

switch ($method) {
    case 'POST':
        $token = $_POST["token"];
        $sql = "UPDATE tbl_signup SET token = null WHERE token = '$token'";
        break;
}


$result = mysqli_query($con,$sql);
$con->close();