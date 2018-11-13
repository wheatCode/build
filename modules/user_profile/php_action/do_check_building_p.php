<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/case/php_action/case_model.php';
    require_once 'modules/household/php_action/household_model.php';
    require_once 'modules/building/php_action/building_model.php';
    require_once 'modules/user_profile/php_action/user_profile_model.php';
    require_once 'modules/repair/php_action/repair_model.php';
    require_once 'modules/repair_company/php_action/repair_company_model.php';
    class do_check_building_p implements action_listener{
        public function actionPerformed(event_message $em) {
             if(isset($_SESSION['useracc'])){
			    $user_id=$_SESSION['userid'];
		    }
		    $post = $em->getPost();
		    $building_id=$post['bid'];
            $case_model = new case_model();
            $household_model= new household_model();
            $building_model= new building_model();
            $user_model = new user_profile_model();
            $repair_model= new repair_model();
            $repair_company_model= new repair_company_model();
            $all_repair_company=array();
            $comall;
            $building;
            $household_profile;
            
            
            $household_profile=$household_model->get_something_from_household_profile("*","construction_project_id = ".$building_id);
            $return_value['bid'] = $building_id;
            $return_value['household_profile'] = $household_profile;
            return json_encode($return_value);
        }        
    }
?>