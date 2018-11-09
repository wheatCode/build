<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/building/php_action/building_model.php';

    class do_insert_action implements action_listener{
        public function actionPerformed(event_message $em) {
            $constructionname = $_POST['constructionname'];
            $manage_id = $_POST['select_1'];
        
            $insert = new building_model();
            $data = $insert->insert_building($constructionname,$manage_id);
            
            return json_encode($data);
        }
    }
?>