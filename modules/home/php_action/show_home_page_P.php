<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/user_profile/user_profile_api.php';
    
    class show_home_page_P implements action_listener{
        public function actionPerformed(event_message $em) {
            if($_SESSION['user']!= null){
                // if($_SESSION['userid'] == 4){
                //     $return_value['status_code'] = 5;
                // }
                //else {
                    $return_value['status_code'] = 1;
                //}
            }else{
                $return_value['status_code'] = 0;
            }
            
            $return_value['user'] = $_SESSION['user'];
            $return_value['status_message'] = 'User has login';
            return json_encode($return_value);
        }
    }
?>