<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/repair_company/php_action/repair_company_model.php';
    
    
    class do_delete_action_P implements action_listener{
        public function actionPerformed(event_message $em) {
            $companyId= $_POST['companyId'];
        
            $repair_company_model = new repair_company_model();
            $data = $repair_company_model->delete_repair_company($companyId);
            
            return json_encode($data);
        }
    }
?>