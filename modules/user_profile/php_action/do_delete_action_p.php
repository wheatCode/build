<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/user_profile/php_action/user_profile_model.php';

    class do_delete_action_p implements action_listener{
        public function actionPerformed(event_message $em) {
            $userId = $_POST['userId'];
        
            $user = new user_profile_model();
            $data = $user->delete_user_profile($userId);
            
            return json_encode($data);
        }
    }
?>