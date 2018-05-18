<?php

$host = "localhost";
$user = "root";
$password = "";
$database = "EVALU";

$mysqli = new mysqli($host, $user, $password, $database);
$mysqli->set_charset("utf8");

$arr = array("error" => false, "errorText" => "");

if ($mysqli->connect_errno) {
	$arr["error"] = true;
	$arr["errorText"] = $mysqli->connect_error;
	echo json_encode($arr);
	exit();
}

$command = $_POST['command'];

switch($command)
{
	case 'login':
		$userLogin = validateString($_POST['userLogin']);
		$query = "SELECT ID FROM users WHERE BINARY LOGIN = '".$userLogin."'";
		if ($result = $mysqli->query($query)){
			if($result->num_rows > 0){
				$row = $result->fetch_assoc();
				$result->close();
				$arr["userID"] = $row["ID"];
				echo json_encode($arr);
				$mysqli->close();
				exit();				
			}else{
				$arr["error"] = true;
				$arr["errorText"] = "The user login does not exist";
				echo json_encode($arr);
				$mysqli->close();
				exit();
			}
		}else{
			$arr["error"] = true;
			$arr["errorText"] = $mysqli->error;
			echo json_encode($arr);
			$mysqli->close();
			exit();
		}
		break;
	case 'save':		
		$query = "INSERT INTO data SET 
			USER_ID = '".validateString($_POST["userID"])."',
			TEST_ID = '".validateString($_POST["testID"])."',
			DATA = '".validateString($_POST["data"])."'";
		if ($mysqli->query($query)) {
			echo json_encode($arr);
			$mysqli->close();
			exit();
		}else{
			$arr["error"] = true;
			$arr["errorText"] = $mysqli->error;
			echo json_encode($arr);
			$mysqli->close();
			exit();
		}
		break;
	default:
		$arr["error"] = true;
		$arr["errorText"] = "Unexpected command: ".$command;
		echo json_encode($arr);
		$mysqli->close();
		exit();
}

function validateString($str){
	global $mysqli;
	return $mysqli->real_escape_string(trim($str));
}

?>