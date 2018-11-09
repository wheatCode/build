<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
	require_once 'modules/case/php_action/case_model.php';
    
    class do_select_repairType_action_p implements action_listener{
        public function actionPerformed(event_message $em) {
            $data=[];
            $case = new case_model();

            $repairTypeAll = $case->get_something_from_repair_type('*','1');
            
            
            return json_encode($repairTypeAll);    
        }
    }
?>