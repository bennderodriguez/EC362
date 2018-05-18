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

switch($command){
	case 'login':
		$adminLogin = validateString($_POST['adminLogin']);
		$adminPassword = validateString($_POST['adminPassword']);
		$query = "SELECT ID, NAME FROM admins WHERE BINARY LOGIN = '" . $adminLogin . "' AND BINARY PASSWORD = '" . $adminPassword . "'";
		if ($result = $mysqli->query($query)){
			if($result->num_rows > 0){
				$row = $result->fetch_assoc();
				$result->close();
				$arr["adminID"] = $row["ID"];
				$arr["adminName"] = $row["NAME"];
				echo json_encode($arr);
				$mysqli->close();
				exit();	
			}else{
				$arr["error"] = true;
				$arr["errorText"] = "The admin login does not exist";
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
	case 'search':
		// $candidateID == CANDIDATE LOGIN
		$candidateID = validateString($_POST['candidateID']);
		$query = "SELECT 
				users.ID AS USER_ID, 
				users.LOGIN AS USER_LOGIN,
				data.ID AS DATA_ID,
				data.TEST_ID AS DATA_TEST_ID,
				data.TIMESTAMP AS DATA_TIMESTAMP
				FROM data INNER JOIN users ON data.USER_ID = users.ID WHERE BINARY users.LOGIN = '" . $candidateID . "'";
		if ($result = $mysqli->query($query)){
			if($result->num_rows > 0){
				$html = '	
					<table id="tests_table">
						<tr>
							<th>#</th>
							<th>IEC</th>
							<th>FECHA</th>
							<th>HORA</th>
							<th>VER</th>
						</tr>';
				$index = 0;
				while($row = $result->fetch_assoc()){
					$arr["candidateID"] = $row["USER_LOGIN"];
					$date = explode(" ", $row["DATA_TIMESTAMP"]);
					$index++;
					$tr = ' 
						<tr>
							<td>' . $index . '</td>
							<td>' . $row["DATA_TEST_ID"] . '</td>
							<td>' . $date[0] . '</td>
							<td>' . $date[1] . '</td>
							<td><div class="tests_table_go_icon" data-id="' . $row["DATA_ID"] . '"></div></td>
						</tr>';
					$html .= $tr;
				}
				$html .= '</table>';
				$result->close();
				$arr["html"] = $html;
				echo json_encode($arr);
				$mysqli->close();
				exit();
			}else{
				$arr["error"] = true;
				$arr["errorText"] = "The candidate login does not exist";
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
	case 'update':
		$testID = validateString($_POST['testID']);
		$questionID = validateString($_POST['questionID']);
		$newValue = (validateString($_POST['newValue']) == 'true');
		$query = "SELECT DATA FROM data WHERE ID = '" . $testID . "'";
		$result = $mysqli->query($query);
		if (!$result){
			$arr["error"] = true;
			$arr["errorText"] = $mysqli->error;
			echo json_encode($arr);
			$mysqli->close();
			exit();
			break;			
		}
		if($result->num_rows < 1){
			$arr["error"] = true;
			$arr["errorText"] = $mysqli->error;
			echo json_encode($arr);
			$mysqli->close();
			exit();
			break;			
		}
		$row = $result->fetch_assoc();
		$result->close();
		$data = json_decode($row["DATA"], true);
		$data["Questions"][$questionID]["Correct"] = $newValue;
		$newData = validateString(json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
		$updateQuery = "UPDATE data SET DATA = '" . $newData . "' WHERE ID = '" . $testID . "'";
		if (!$mysqli->query($updateQuery)) {
			$arr["error"] = true;
			$arr["errorText"] = $mysqli->error;
			echo json_encode($arr);
			$mysqli->close();
			exit();
			break;
		}	
		// CONTINUE WITH COMMAND 'test' AS OUTPUT
		$command = 'test';
	case 'test':	
	case 'print':
	case 'download':
		$testID = validateString($_POST['testID']);
		$query = "SELECT
				users.LOGIN AS USER_LOGIN,
				data.ID AS DATA_ID,
				data.TEST_ID AS DATA_TEST_ID,
				data.TIMESTAMP AS DATA_TIMESTAMP,
				data.DATA AS DATA_DATA
				FROM data INNER JOIN users ON data.USER_ID = users.ID WHERE data.ID = '" . $testID . "'" ;
		if ($result = $mysqli->query($query)){
			if($result->num_rows > 0){
				$row = $result->fetch_assoc();
				$result->close();
				$data = json_decode($row["DATA_DATA"], true);
				$questionsCnt = count($data["Questions"]);
				$questiosnsCorrect = 0;
				$questionsValueTotal = 0;
				$questionsValueCorrect = 0;
				for($i = 0; $i < $questionsCnt; $i++){
					$question = $data["Questions"][$i];
					if($question["Type"] == "URL" && !$question["Valued"]) continue;
					$questionsValueTotal += $question["Value"];
					if($question["Correct"]){
						$questiosnsCorrect++;
						$questionsValueCorrect += $question["Value"];
					}
				}
				$date = explode(" ", $row["DATA_TIMESTAMP"]);
				$html = '
					<table id="test_header_table">
						<tr>
							<th>USUARIO</th>
							<th>IEC</th>
							<th>FECHA</th>
							<th>HORA</th>
							<th>REACTIVOS</th>
							<th>CORRECTOS</th>
							<th>PESO TOTAL</th>
							<th>PESO CORRECTOS</th>
						</tr>
						<tr>
							<td>' . $row["USER_LOGIN"] . '</td>
							<td>' . $row["DATA_TEST_ID"] . '</td>
							<td>' . $date[0] . '</td>
							<td>' . $date[1] . '</td>
							<td>' . $questionsCnt . '</td>
							<td>' . $questiosnsCorrect . '</td>
							<td>' . $questionsValueTotal . '</td>
							<td>' . $questionsValueCorrect . '</td>
						</tr>
					</table>
					<table id="test_table">
						<tr>
							<th>IDENTIFICADOR</th>
							<th>REACTIVO</th>
							<th>RESPONDIDO</th>
							<th>CORRECTO</th>
							<th>PESO</th>
							<th>OBSERVACIONES</th>
						</tr>';
				for($i = 0; $i < $questionsCnt; $i++){
					$question = $data["Questions"][$i];
					$answered = $question["Answered"] ? 'Sí' : 'No';
					$correct = $question["Correct"] ? 'Sí' : 'No';
					$feedback = ($question["Correct"] ? '' : $question["Feedback"]);
					$url = '';
					if($question["Type"] == 'URL'){
						$feedback = $question["Feedback"];				
						if($question["Answered"]){
							if(!$question["Hidden"]){
								$url = '<hr><p>Vínculo proporcionado por el candidato: <a href="' . $question["URL"] . '" target="_blank">' . $question["URL"] . '</a></p>';
							}
						}else{
							if(!$question["Hidden"]) $feedback = 'El candidato no proporcionó ningún vínculo';
						}
						if($question["Answered"] && $question["Valued"] && $command == 'test'){
							$correct = '
								<select data-question-id="' . $i . '">
								   <option value="false"' . ($question["Correct"] ? '' : ' selected="selected"') . '>No</option>
								   <option value="true"' . ($question["Correct"] ? ' selected="selected"' : '') . '>Sí</option>
								</select>';
						}
						if(!$question["Valued"]){
							if($question["Hidden"]) $answered = '';
							$correct = '';
						}
					}
					$tr = '
						<tr>
							<td>' . $question["ID"] . '</td>
							<td style="text-align:left;">' . $question["Text"] . $url . '</td>
							<td>' . $answered . '</td>
							<td>' . $correct . '</td>
							<td>' . $question["Value"] . '</td>
							<td>' . $feedback . '</td>
						</tr>';
					$html .= $tr;
				}
				$html .= '</table>';
				if($command == 'test'){
					$arr["testID"] = $row["DATA_ID"];
					$arr["html"] = $html;
					echo json_encode($arr);
					$mysqli->close();
					exit();	
					break;
				}
				$style = '<style type="text/css">
					table {
						margin-top: 20px;
						border-collapse: collapse;
						width: 100%; 
						font-family: Arial,Helvetica,sans-serif; 
						font-size: 12px;
					}
					table th, table td {
						border: 1px solid #000000; 
						padding: 10px; 
						text-align: center; 
						color:#000000;
					}
					table th {
						font-weight: bold; 
						background-color: #000000; 
						color: #fff;
					}
					tr:nth-child(odd) {
						background-color: #F1F1F1;
					}
					table hr {
						border: 0;
						border-top: solid 1px #000000;
					}
					button {
						width: 100%;
					}
					a:link, a:visited, a:hover,  a:active {
						color:#404040;
					}
					a:focus {
						outline: 0;
					}
				</style>';
				header('Content-type: text/html; charset=utf-8');
				if($command == 'print'){
					echo '<!doctype html>
						  <html>
						  	<head>
								<meta charset="utf-8">
								<title>Conocer</title>'
								.$style.
						   '</head>
							<body>
								<button style="margin-top: 10px;" onclick="javascript:window.print()">Imprimir</button>'
								. $html . 
							   '<button style="margin-top: 20px; margin-bottom: 10px;" onclick="javascript:window.print()">Imprimir</button>
							</body>
						  </html>';					
				}
				if($command == 'download'){
					header('Content-Disposition: attachment; filename=Conocer.html');
					header('Pragma: no-cache');
					header('Expires: 0');
					echo '<!doctype html>
						  <html>
						  	<head>
								<meta charset="utf-8">
								<title>Conocer</title>'
								.$style.
						   '</head>
							<body>' 
								. $html . 
						   '</body>
						  </html>';
				}
				$mysqli->close();
				exit();
				break;
			}
		}
		$arr["error"] = true;
		$arr["errorText"] = $mysqli->error;
		echo json_encode($arr);
		$mysqli->close();
		exit();
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

