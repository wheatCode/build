<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/user_profile/php_action/user_profile_model.php';

    class do_update_action_p implements action_listener{
        public function actionPerformed(event_message $em) {
            $name = $_POST['user'];
            $account = $_POST['account'];
            $password = $_POST['password'];
            $phone = $_POST['phone'];
            $type = $_POST['userCharacter'];
            $userId = $_POST['userId'];
        
            $user = new user_profile_model();
            $data = $user->update_user_info($name,$phone,$account,$password,$type,$userId);
            
            return json_encode($data);
        }
    }
?>