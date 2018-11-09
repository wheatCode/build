<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/user_profile/php_action/user_profile_model.php';
    //require_once 'include/php/PDO_mysql.php';
    
    class do_update_action implements action_listener{
        public function actionPerformed(event_message $em) {
            $post = $em->getPost();
            $name = $post['name'];
            $cp = $post['cp'];
            $address = $post['address'];
            $phonenum = $post['phonenum'];
            $acc= $post['email'];
            //$password = $post['password'];
            if(isset($_SESSION['useracc'])){
			    $userid=$_SESSION['userid'];
		    }
            $user_model = new user_profile_model();
            $email=$user_model->get_something_from_user_profile("account","user_profile.id !=".$userid." AND user_profile.account='".$acc."'");
            if($email == null){
                $return_value['status_code'] = 10;
                $return_value['test'] = $acc;
                $return_value['test1'] = $email;
                $user_model->update_user_other($name,$phonenum,$acc,$userid);
            }else{
                $return_value['status_code'] = 20;//有其他同名帳號
            }
            return json_encode($return_value);
        }
    }
    
?>
