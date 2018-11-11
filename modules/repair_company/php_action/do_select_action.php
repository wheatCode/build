<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/case/php_action/case_model.php';
    require_once 'modules/household/php_action/household_model.php';
    
    class do_select_action implements action_listener{
        public function actionPerformed(event_message $em) {
            if(isset($_SESSION['useracc'])){
			    $user_id=$_SESSION['userid'];
		    }
		    $post = $em->getPost();
		    $cid = $post['cid'];
            $case_model = new case_model();
            $household_model= new household_model();
            $household_id=$household_model->get_something_from_household_user("household_user_id","user_profile_id =".$user_id);
            $case = $case_model->get_something_from_case_profile("*","case_profile.id=".$cid);
            
            if($case){
                //$ds = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $return_value['status_code'] = 0;
                $return_value['status_message'] = 'Execute Success';
                $return_value['data_set'] = $case;
                $return_value['sql'] = $sql;
            }
            
            else{
                $return_value['status_code'] = -1;
                $return_value['status_message'] = '最近沒有維修紀錄';
                $return_value['sql'] = $sql;
            }
            
            return json_encode($return_value);
        }        
    }
?>

