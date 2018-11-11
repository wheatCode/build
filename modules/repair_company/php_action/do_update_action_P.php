<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/repair_company/php_action/repair_company_model.php';

    
    class do_update_action_P implements action_listener{
        public function actionPerformed(event_message $em) {
            //  $data=[]; 
            $name = $_POST['name'];
            $contactor = $_POST['contactor'];
            $address = $_POST['address'];
            $phone = $_POST['phone'];
            $namech = $_POST['namech'];
            $companyID = $_POST['companyID'];
        
            $repair_company_model = new repair_company_model();
            $return_value = $repair_company_model->update_new_repair_company($name,$contactor,$address,$phone,$companyID);
            $return_value = $repair_company_model->update_new_repair_company_type($namech,$companyID);
            
			

            return json_encode($return_value);
        }        
    }
?>

