<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/case/php_action/case_model.php';
    require_once 'modules/household/php_action/household_model.php';
    require_once 'modules/building/php_action/building_model.php';
    require_once 'modules/user_profile/php_action/user_profile_model.php';
    require_once 'modules/repair/php_action/repair_model.php';
    require_once 'modules/repair_company/php_action/repair_company_model.php';
    class show_insert_page_P implements action_listener{
        public function actionPerformed(event_message $em) {
             if(isset($_SESSION['useracc'])){
			    $user_id=$_SESSION['userid'];
		    }
		    $post = $em->getPost();
		    //$comid=$post['comid'];
            $case_model = new case_model();
            $household_model= new household_model();
            $building_model= new building_model();
            $user_model = new user_profile_model();
            $repair_model= new repair_model();
            $repair_company_model= new repair_company_model();
            $all_repair_company=array();
            $comall;
            $building;
            //$where="repair_company_id= $comid";
            //$comall=$repair_company_model->get_com_data($where);
            //SELECT repair_company_profile.name,repair_company_profile.contactor,repair_type.namech,repair_company_profile.id ,repair_company_profile.address,repair_company_profile.phone FROM `repair_company_profile` JOIN repair_company_type ON repair_company_profile.id=repair_company_type.repair_company_id JOIN repair_type ON repair_company_type.repair_type_id = repair_type.id  where repair_company_profile.id=1 GROUP by repair_company_profile.id,repair_type.namech
            $building=$building_model->get_construction_project_data("*",1);
            
            
            $return_value['building'] = $building;
            return json_encode($return_value);
        }        
    }
?>