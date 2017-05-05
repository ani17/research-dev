<?php

$date = $_GET['date'];
$level = $_GET['level'];
$source = $_GET['source'];

$booking_source_arr = array('1' => 'JdApp', '2' => 't.jd', '3' => 'IOSApp', 'web' => 'Web');

switch ($level) {

	/*
		Data Constructed as per 'High-charts Series Object' for Simplicity
	*/
	
	case 'Source':
		$source_wise = '{"2017-04-01":{"data":[{"name":"JdApp","y":22,"drilldown":true},{"name":"t.jd","y":99,"drilldown":true},{"name":"IOSApp","y":10,"drilldown":true},{"name":"Web","y":23,"drilldown":true}],"id":"Source","name":"Source","nxtlvl":"Movies","seldate":"2017-04-01"}}';
		
		echo $source_wise;

		break;
	
	case 'Movies':
		
		$movie_wise = '{"JdApp":{"data":[{"name":"Badrinath Ki Dulhania (Hindi Movie)","y":1,"drilldown":false},{"name":"Dora (2017 Film) (Tamil Movie)","y":1,"drilldown":false},{"name":"Katamarayudu (Telugu Movie)","y":1,"drilldown":false},{"name":"Kavan (Tamil Movie)","y":1,"drilldown":false},{"name":"Naam Shabana (Hindi Movie)","y":10,"drilldown":false},{"name":"Poorna (Hindi Movie)","y":1,"drilldown":false},{"name":"Raajakumara (Kannada Movie)","y":2,"drilldown":false},{"name":"Rogue (Telugu Movie)","y":2,"drilldown":false},{"name":"The Boss Baby (Animated 3D English Movie)","y":3,"drilldown":false}],"id":"Movies","name":"Movies","nxtlvl":"Movies"}}';

		echo $movie_wise;

		break;

	default:
		# code...
		break;
}
?>