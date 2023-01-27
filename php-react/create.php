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
        $user_id = $_POST["user_id"];
        $title = $_POST["title"];
        $description = $_POST["description"];
        $sql = "insert into tbl_todos (user_id, title, description) values ('$user_id', '$title', '$description')";
        break;
}

// run SQL statement
$result = mysqli_query($con,$sql);

// die if SQL statement failed
if (!$result) {
    http_response_code(404);
    die(mysqli_error($con));
}

if ($method == 'POST') {
    echo json_encode($result);
} else {
    echo mysqli_affected_rows($con);
}

$con->close();