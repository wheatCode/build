<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/user_profile/php_action/user_profile_model.php';

    class do_insert_action_p implements action_listener{
        public function actionPerformed(event_message $em) {
            $name = $_POST['name'];
            $account = $_POST['account'];
            $password = $_POST['password'];
            $phone = $_POST['phone'];
            $type = $_POST['type'];
        
            $user = new user_profile_model();
            $data = $user->insert_user_profile($account,$password,$name,$phone,$type);
            $user_profile_id=$user->get_last_insert();
            $user->insert_notice_key($user_profile_id);
            return json_encode($data);
        }
    }
?>