<?php
//phpinfo();die;
//ini_set('display_errors',1);
$srch = $_GET['srch'];
$type = $_GET['type'];
$data = $_GET['data'];

if(!empty($type))
{
	print_r(json_decode($data,true));die;
}
else
{

	if(!empty($srch))
	{
		$sql_condition = " WHERE first_name LIKE '%".$srch."%'";
	}

	$con = mysql_connect('localhost','root','connect@123');
	mysql_select_db('tutorial');

	$sql = "SELECT * FROM people ".$sql_condition." LIMIT 10";
	$rs = mysql_query($sql);
	while ($row = mysql_fetch_assoc($rs)) {
		$data_arr['results'][] = $row;
	}

}

echo json_encode($data_arr);

?>