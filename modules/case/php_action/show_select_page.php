<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/case/php_action/case_model.php';
    require_once 'modules/household/php_action/household_model.php';
    class show_select_page implements action_listener{
        public function actionPerformed(event_message $em) {
             if(isset($_SESSION['useracc'])){
			    $user_id=$_SESSION['userid'];
		    }
            $case_model = new case_model();
            $household_model= new household_model();
            $household_id = $household_model->get_something_from_household_user("id","user_profile_id =".$user_id);
            $allcase = $case_model->get_something_from_case_profile("*","household_user_id=".$household_id[0][0]." ORDER BY `start_datetime` DESC");
            // $conn = PDO_mysql::getConnection();
            // $sql = "SELECT * FROM `case_profile` A WHERE A.household_user_id=$user_id";
            
            if($allcase){
                $ds = $allcase;
                $return_value['status_code'] = 0;
                $return_value['status_message'] = 'Execute Success';
                $return_value['data_set'] = $ds;
                //$return_value['sql'] = $sql;
            }
            
            else{
                $return_value['status_code'] = -1;
                $return_value['status_message'] = '最近沒有維修紀錄';
                //$return_value['sql'] = $sql;
                $return_value['$household_id']= $household_id;
            }
            
            return json_encode($return_value);
        }        
    }
?>