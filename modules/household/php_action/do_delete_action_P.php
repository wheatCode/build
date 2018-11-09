<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/household/php_action/household_model.php';
    
    
    class do_delete_action_P implements action_listener{
        public function actionPerformed(event_message $em) {
            $houseId= $_POST['houseId'];
        
            $household = new household_model();
            $data = $household->delete_household_profile($houseId);
            
            return json_encode($data);
        }
    }
?>