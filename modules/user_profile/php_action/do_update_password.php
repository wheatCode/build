<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/user_profile/php_action/user_profile_model.php';
    require_once 'modules/user_profile/user_profile_api.php';
    //require_once 'include/php/PDO_mysql.php';
    
    class do_update_password implements action_listener{
        public function actionPerformed(event_message $em) {
            $user_model = new user_profile_model();
            if(isset($_SESSION['useracc'])){
			    $userid=$_SESSION['userid'];
		    }
            $post = $em->getPost();
            $password = $post['password'];
            $newpassword = $post['newpassword'];
            $user=$user_model->get_something_from_user_profile('id',"account='".$_SESSION['useracc']."' AND password='$password'");
            if($user['data_set'][0][0]!=null){ 
                    $return_value['status_code'] = 10;
                    $user_model->update_password($newpassword,$userid);
            }
            else{
                $return_value['status_code'] = 20;
                $return_value['user']=$user;
            }
            
            
            return json_encode($return_value);
        }
    
    }
    
?>
