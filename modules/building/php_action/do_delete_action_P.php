<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/building/php_action/building_model.php';
    
    
    class do_delete_action_P implements action_listener{
        public function actionPerformed(event_message $em) {
            $constructorId= $_POST['constructorId'];
        
            $building_model = new building_model();
            $data = $building_model->delete_building($constructorId);
            
            return json_encode($data);
        }
    }
?>