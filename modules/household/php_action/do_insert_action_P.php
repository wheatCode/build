<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/household/php_action/household_model.php';

    class do_insert_action_P implements action_listener{
        public function actionPerformed(event_message $em) {
            $construction_project_id = $_POST['constid'];
            $number = $_POST['number'];
            $address = $_POST['address'];
            $floor = $_POST['floor'];
            $insert = new household_model();
            $data = $insert->insert_household_profile($construction_project_id,$number,$address,$floor);
            
            return json_encode($data);
        }
    }
?>