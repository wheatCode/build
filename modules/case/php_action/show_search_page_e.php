<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/case/php_action/case_model.php';
    require_once 'modules/household/php_action/household_model.php';
    require_once 'modules/building/php_action/building_model.php';
    class show_search_page_E implements action_listener{
        public function actionPerformed(event_message $em) {
             if(isset($_SESSION['useracc'])){
			    $user_id=$_SESSION['userid'];
		    }
            $case_model = new case_model();
            $household_model= new household_model();
            $building_model= new building_model();
            $building = $building_model->get_construction_project_data("*","manage_id=$user_id");
            //$construction_project=$building_model->get_something_from_construction_project("*",$household_data[0]['construction_project_id']);
            $return_value['construction_project']=$building;
            $return_value['status_code'] = 0;
            $return_value['status_message'] = 'Execute Success';
            
            return json_encode($return_value);
        }        
    }
?>