<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/case/php_action/case_model.php';
    require_once 'modules/household/php_action/household_model.php';
    require_once 'modules/repair/php_action/repair_model.php';
    
    class do_cancel_action implements action_listener{
        public function actionPerformed(event_message $em) {
            if(isset($_SESSION['useracc'])){
			    $user_id=$_SESSION['userid'];
		    }
		    $post = $em->getPost();
		    $cid = $post['cid'];
            $case_model = new case_model();
            $household_model= new household_model();
            $repair_model=new repair_model();
            
            $case_model->update_case_profile("`status` = 'cancel',`cancel` = 'user'",'case_profile . id ='.$cid);
            
            $return_value['status_code']=0;
            
            return json_encode($return_value);
        }        
    }

?>

