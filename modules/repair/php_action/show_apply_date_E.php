<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/case/php_action/case_model.php';
    require_once 'modules/household/php_action/household_model.php';
    require_once 'modules/building/php_action/building_model.php';
    require_once 'modules/user_profile/php_action/user_profile_model.php';
    require_once 'modules/repair/php_action/repair_model.php';
    class show_apply_date_E implements action_listener{
        public function actionPerformed(event_message $em) {
             if(isset($_SESSION['useracc'])){
			    $user_id=$_SESSION['userid'];
		    }
		    $post = $em->getPost();
		    $repair_history_id = $post['repair_history_id'];
            $case_model = new case_model();
            $household_model= new household_model();
            $building_model= new building_model();
            $user_model = new user_profile_model();
            $repair_model= new repair_model();//要先找到Repair_history profile的Reservtime
            $apply_date=$repair_model->get_something_from_applydate("start_Time,end_Time","repair_history_id=".$repair_history_id);
            if($apply_date){
                $return_value['status_code'] = 0;
                $return_value['apply_date'] =$apply_date;
             }else{
                 $return_value['status_code'] = 1;
                 $return_value['status_message'] ="客戶尚未預約時間";
                
             }
            
            return json_encode($return_value);
        }        
    }
?>