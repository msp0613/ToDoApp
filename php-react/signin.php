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
        $email = $_POST["email"];
        $password = $_POST["password"];
        $sql = "SELECT * FROM tbl_signup WHERE email = '$email' AND password = '$password'";
        break;
}


$result = mysqli_query($con,$sql);

if(mysqli_num_rows($result) === 0){
    http_response_code(403);
    echo json_encode(["error" => "User not exist!"]);
}
else{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $token = '';
    for ($i = 0; $i < 20; $i++) {
        $token .= $characters[rand(0, $charactersLength - 1)];
    }

    $row = mysqli_fetch_assoc($result);

    $sql = "UPDATE tbl_signup SET token = '{$token}' WHERE id = ${row['id']}";
    mysqli_query($con, $sql);
    echo json_encode([
        'user_id' => $row['id'],
        'token' => $token
    ]);
}
$con->close();