<?php 
	$text = $_REQUEST['text'];
	$name = $_REQUEST['name'];
	$company = $_REQUEST['company'];

	$wrapText = "$".$text."K \nName: ".$name."\nCompany: ".$company;

	$to  = "<arlessserj@gmail.com>"; 
	$to .= "<sergei.nklnk@gmail.com>"; 

	// $to  = "<alex@vodxs.com>"; 
	// $to .= "<scott@vodxs.com>"; 

	mail($to, "My Subject", $wrapText); 
?>