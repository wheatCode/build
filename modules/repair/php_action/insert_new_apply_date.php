<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/case/php_action/case_model.php';
    require_once 'modules/household/php_action/household_model.php';
    require_once 'modules/building/php_action/building_model.php';
    require_once 'modules/user_profile/php_action/user_profile_model.php';
    require_once 'modules/repair/php_action/repair_model.php';
    class insert_new_apply_date implements action_listener{
        public function actionPerformed(event_message $em) {
    //          if(isset($_SESSION['useracc'])){
			 //   $user_id=$_SESSION['userid'];
		  //  }
		    $post = $em->getPost();
		    $input_starttime1_1 = $post['input_starttime1-1'];
            $input_starttime1_2 = $post['input_starttime1-2'];
            $input_starttime2_1 = $post['input_starttime2-1'];
            $input_starttime2_2 = $post['input_starttime2-2'];
            $input_starttime3_1 = $post['input_starttime3-1'];
            $input_starttime3_2 = $post['input_starttime3-2'];
            $month1 = $post['date1'];
            $month2 = $post['date2'];
            $month3 = $post['date3'];
            $case_id = $post['case_id'];
            $case_model = new case_model();
            $household_model= new household_model();
            $building_model= new building_model();
            $user_model = new user_profile_model();
            $repair_model= new repair_model();//要先找到Repair_history profile的Reservtime
            $repair_history_id=$repair_model->get_last_repair_history_id($case_id);
			$repair_model->insert_new_applydate($repair_history_id[0][0],$month1,$input_starttime1_1,$input_starttime1_2);
			if($input_starttime2_1 != null && $input_starttime2_2 != null){
				$repair_model->insert_new_applydate($repair_history_id[0][0],$month2,$input_starttime2_1,$input_starttime2_2);
			}
			if($input_starttime3_1 != null && $input_starttime3_2 != null){
				$repair_model->insert_new_applydate($repair_history_id[0][0],$month3,$input_starttime3_1,$input_starttime3_2);
			}
			
            if($case_id){
                if($repair_history_id){
                    $return_value['status_code'] = 0;
                }else{
                    $return_value['status_code'] = 1;
                    $return_value['status_message']="找尋repair_history_id出錯";
                }
            }else{
                    $return_value['status_code'] = 1;
                    $return_value['status_message']="未收到case_id";
                }
            return json_encode($return_value);
        }        
    }
?>