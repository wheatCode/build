<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/case/php_action/case_model.php';
    require_once 'modules/household/php_action/household_model.php';
    require_once 'modules/building/php_action/building_model.php';
    require_once 'modules/user_profile/php_action/user_profile_model.php';
    require_once 'modules/repair/php_action/repair_model.php';
    require_once 'modules/repair_company/php_action/repair_company_model.php';
    class show_repair_type_E implements action_listener{
        public function actionPerformed(event_message $em) {
		    $post = $em->getPost();
		    //$repair_type_id=$post['repair_type_id'];
            $case_model = new case_model();
            $household_model= new household_model();
            $building_model= new building_model();
            $user_model = new user_profile_model();
            $repair_model= new repair_model();
            $repair_company_model= new repair_company_model();
            
            $repair_type=$case_model->get_something_from_repair_type("id,namech","1");
            if($repair_type){
                $return_value['status_code'] = 0;
                $return_value['status_mussage'] = "有收到type";
                $return_value['repair_type'] = $repair_type;
                
            }else{
                $return_value['status_code'] = 1;
                $return_value['status_mussage'] = "沒有收到type";
            }
            $return_value['status_code'] = 0;
    
            return json_encode($return_value);
        }        
    }
?>