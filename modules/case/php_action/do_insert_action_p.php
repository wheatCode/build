<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
	require_once 'modules/case/php_action/case_model.php';
	require_once 'modules/household/php_action/household_model.php';
	require_once 'modules/repair/php_action/repair_model.php';
    
    class do_insert_action_P implements action_listener{
        public function actionPerformed(event_message $em) {
            $data=[]; 
            $repairTypeId = $_POST['service'];
            $caseName = $_POST['caseName'];
            $title = $_POST['title'];
            $content = $_POST['content'];
            $startTime = $_POST['startTime'];
            $endTime = $_POST['endTime'];
            $applydateDate = $_POST['date'];
            $houseHoldUserId = $_POST['houseHoldUserId'];
            ini_set ( 'date.timezone' , 'Asia/Taipei' );
			date_default_timezone_set('Asia/Taipei');
		    $date=date("Y-m-d")." ".date("H:i:s");
            // $startTime = $startTime01." ".$startTime02;
            
            // $case = new case_model();
            //$data=[$repairTypeId,$caseName,$title,$content,$houseHoldUserId,$startTime,$endTime,$date];
            
            $repair_model=new repair_model();
		    $case_model= new case_model();
		    $household_model= new household_model();
		    
		    $case_model->insert_new_case($houseHoldUserId,$repairTypeId,$title,$content,$date,'null','null','null','null');
			$case_id=$case_model->get_case_id($houseHoldUserId,$date);
			$repair_model->insert_new_repair_history($case_id);
			$repair_history_id=$repair_model->get_something_from_repair_history("id","case_id=".$case_id);
			$repair_model->insert_new_applydate($repair_history_id[0][0],$applydateDate,$startTime,$endTime);
	
			$return_value['status_code'] = 0;
			$return_value['case_id'] = $case_id;
			//$return_value['repair_history_id'] = $repair_history_id;
			$return_value['$repair_history_id']=$repair_history_id;

            return json_encode($return_value);
        }
    }
?>