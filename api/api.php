<?php

header("Content-Type:application/json");
include('model/model.php');

if (isset($_GET['service']) && $_GET['service']!="") { //checking Service
	include('config/db.php');
	$service = $_GET['service'];
    if($service == "location"){ // getting location
        $result = mysqli_query( $con,"SELECT * FROM `location`  ORDER BY `location`.`loc_id` ASC ");
            if(mysqli_num_rows($result)>0){
                $obj =  Array();
                while($row = mysqli_fetch_array($result)){
                    $data =  new Data();
                    $data->loc_id = $row['loc_id'];
                    $data->loc_name = $row['loc_nm'];
                    array_push($obj,$data);
                
            }
            echo json_encode($obj);
                mysqli_close($con);
                }else{
                    msg(200, "No Records Found");
                }    
    } else if( $service =="assets" && $_GET['loc_id']!=""){ // getting assets
        $aloc_id = $_GET['loc_id'];
        $result = mysqli_query( $con,"SELECT * FROM `asset` WHERE ast_locid = ".$aloc_id." ORDER BY `asset`.`ast_id` ASC");
        if(mysqli_num_rows($result)>0){
            $obj =  Array();
            while($row = mysqli_fetch_array($result)){
                $data =  new AssetData();
                $data->asset_id = $row['ast_id'];
                $data->asset_name = $row['ast_nm'];
                $data->asset_stat = $row['ast_stat'];
                array_push($obj,$data);
            
        }
        echo json_encode($obj);
            mysqli_close($con);
            }else{
                msg(200, "No Records Found");
            }  


    }
    else if( $service =="assetval" && $_GET['ast_id']!=""){ //Getting asset data
        $ast_id = $_GET['ast_id'];
        $result = mysqli_query( $con,"SELECT * FROM `astval` inner JOIN asset on astval.av_astid=asset.ast_id  WHERE av_astid = ".$ast_id."");
        if(mysqli_num_rows($result)>0){
            $obj =  Array();
            while($row = mysqli_fetch_array($result)){
                $data =  new AssetValData();
                $data->temp = $row['av_tmp'];
                $data->vibration = $row['av_vib'];
                $data->power = $row['av_pow'];
                $data->rpm = $row['av_rpm'];
                $data->asset_name = $row['ast_nm'];
                array_push($obj,$data);
            
        }
        echo json_encode($obj);
            mysqli_close($con);
            }else{
                msg(200, "No Records Found");
            }  


    }else if( $service =="valchange" && $_GET['ast_id']!="" && $_GET['evnt']!="" && $_GET['val']!=""){ // updating asset data
        $ast_id = $_GET['ast_id'];
        $evnt = $_GET['evnt'];
        $val = $_GET['val'];
        


        if($evnt == "temp"){
            $result = mysqli_query( $con,"UPDATE `astval` SET `av_tmp`=".$val." WHERE av_astid = ".$ast_id."");
        }
        else if($evnt == "vibration"){
            $result = mysqli_query( $con,"UPDATE `astval` SET `av_vib`=".$val." WHERE av_astid = ".$ast_id."");}
        else if($evnt == "power"){
            $result = mysqli_query( $con,"UPDATE `astval` SET `av_pow`=".$val." WHERE av_astid = ".$ast_id."");}
        else if($evnt == "rpm"){
            $result = mysqli_query( $con,"UPDATE `astval` SET `av_rpm`=".$val." WHERE av_astid = ".$ast_id."");}
        else{
            msg(108, "Invalid Event");
        }
        if($result){
            msg(200, "Success");}

        


    }else if($service=="statChange" && $_GET["locid"]!=""){ // Status change for asset and location
        $locid = $_GET["locid"];
        $query = mysqli_query($con,"SELECT av_tmp,av_pow,av_vib,av_rpm,ast_id FROM `astval` inner join asset on asset.ast_id=astval.av_astid INNER JOIN location on location.loc_id=asset.ast_locid WHERE location.loc_id=".$locid."");
        $stat = array();
        $assetStat =array();
        while($fet = mysqli_fetch_array($query)){
            $temp = $fet['av_tmp'];
            $power = $fet['av_pow'];
            $vibration = $fet['av_vib'];
            $rpm = $fet['av_rpm'];
            $stat[] = $temp;
            $stat[] = $power;
            $stat[] = $vibration;
            $stat[] = $rpm;  
            $assetStat[] = $temp;
            $assetStat[] = $power;
            $assetStat[] = $vibration;
            $assetStat[] = $rpm;
            $assetid = $fet['ast_id'];
            $asmin= min($assetStat);
            $aquery = mysqli_query( $con,"UPDATE `asset` SET `ast_stat`=".$asmin." WHERE ast_id = ".$assetid."");
            $assetStat = array();

        }

        // echo(min($stat));
        $min = min($stat);
        $data = array("stat"=>$min,"locid"=>$locid);
        $query = mysqli_query($con,"UPDATE `location` SET `loc_stat`=".$min." WHERE `loc_id`=".$locid."");
        if($query){
            msg(200, $data);
        }
        else{
            msg(108, "Invalid Event");
        }


    }else if( $service =="assetsingle" && $_GET['ast_id']!=""){ //getting single asset 
        $ast_id = $_GET['ast_id'];
        $result = mysqli_query( $con,"SELECT * FROM `asset` WHERE ast_id = ".$ast_id." ORDER BY `asset`.`ast_id` ASC");
        if(mysqli_num_rows($result)>0){
            $obj =  Array();
            while($row = mysqli_fetch_array($result)){
                $data =  new AssetData();
                $data->asset_id = $row['ast_id'];
                $data->asset_name = $row['ast_nm'];
                $data->asset_stat = $row['ast_stat'];
                array_push($obj,$data);
            
        }
        echo json_encode($obj);
            mysqli_close($con);
            }else{
                msg(200, "No Records Found");
            }  


    }
    

    else {
        msg(108, "Invalid Service"); // wrong service name entered
    }

}else{
	msg( 400,"Invalid Request"); // bad gateway
	}

// Showing status code and responses
function msg($errorcode,$errorresponse){
	$response['status'] = $errorcode;
	$response['response'] = $errorresponse;
	
	$json_response = json_encode($response);
	echo $json_response;
}
?>