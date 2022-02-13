<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/user_profile/user_profile_api.php';
    //require_once  'modules/login/php_action/login_model.php';
    require_once 'modules/user_profile/php_action/user_profile_model.php';
    
    class do_logout_action_P implements action_listener{
        public function actionPerformed(event_message $em) {
            $post = $em->getPost();
            $userid=$_SESSION['userid'];
            $device_token_c = $post['device_token_c'];
            $device_token_e = $post['device_token_e'];
            $user_profile_model=new user_profile_model();
            if($device_token_c){
                $user_profile_model->update_notice_key_c("null",$userid);
            }
            if($device_token_e){
                $user_profile_model->update_notice_key_e("null",$userid);
            }
            $_SESSION['userid'] = null;
            $_SESSION['user'] = null;
            $_SESSION['useracc'] = null;
            $return_value['status_code']=0;
            return json_encode($return_value);
        }        
    }
?>