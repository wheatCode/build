<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/user_profile/user_profile_api.php';
    require_once 'modules/user_profile/php_action/user_profile_model.php';
    class show_home_page implements action_listener{
        public function actionPerformed(event_message $em) {
            
            
            $user_profile=new user_profile_model();
            $user=$_SESSION['userid'];
            $user_pf=$user_profile->get_something_from_user_profile_p("type","id=".$user);
            
            
            
            
            
            if($_SESSION['user']!= null){
                
                    $return_value['status_code'] = 1;
                    $return_value['pf']=$user_pf;
            
            }else{
                $return_value['status_code'] = 0;
            }
            
            $return_value['user'] = $_SESSION['user'];
            $return_value['status_message'] = 'User has login';
            return json_encode($return_value);
        }
    }
?>