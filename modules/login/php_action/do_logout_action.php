<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/user_profile/user_profile_api.php';
    //require_once  'modules/login/php_action/login_model.php';
    
    class do_logout_action implements action_listener{
        public function actionPerformed(event_message $em) {
            $post = $em->getPost();
            $_SESSION['userid'] = null;
            $_SESSION['user'] = null;
            $_SESSION['useracc'] = null;
            $return_value['status_code']=0;
            return json_encode($return_value);
        }        
    }
?>