<?php
header("Access-Control-Allow-Origin: *"); //add this CORS header to enable any domain to send HTTP requests to these endpoints:
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");
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
    case 'DELETE':
        $user_id = $_GET["user_id"];
        $todo_id = $_GET["todo_id"];
        $sql = "DELETE FROM tbl_todos WHERE user_id = $user_id AND id = $todo_id";
        break;
}

// run SQL statement
$result = mysqli_query($con,$sql);

// die if SQL statement failed
if (!$result) {
    http_response_code(404);
    die(mysqli_error($con));
}

$con->close();