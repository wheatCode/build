<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/case/php_action/case_model.php';
    require_once 'modules/household/php_action/household_model.php';
    require_once 'modules/repair/php_action/repair_model.php';
    
    class do_select_action implements action_listener{
        public function actionPerformed(event_message $em) {
            if(isset($_SESSION['useracc'])){
			    $user_id=$_SESSION['userid'];
		    }
		    $post = $em->getPost();
		    $cid = $post['cid'];
            $case_model = new case_model();
            $household_model= new household_model();
            $repair_model=new repair_model();
            //$household_model->get_something_from_household_user("household_user_id","user_profile_id =".$user_id);
            $case = $case_model->get_something_from_case_profile("*","case_profile.id=".$cid);
            $repair_history_id=$repair_model->get_last_repair_history_id($cid);
            //最後一筆維修歷程
            $repair_date=$repair_model->get_something_from_repair_history("reservetime","id=".$repair_history_id[0][0]);
            $apply_date=$repair_model->get_something_from_applydate("start_Time,end_Time","repair_history_id=".$repair_history_id[0][0]);
            
            if($apply_date!= null){
                            $return_value['check_apply']="yes";
                        }else{
                            $return_value['check_apply']="no";
                        }
            //檢查維修歷程中客戶有沒有給預約時間
            if($repair_date[0][0] != null){
                            $return_value['check_repair_date']="yes";
                            $return_value['repair_date']=$repair_date;
                        }else{
                            $return_value['check_repair_date']="no";
                        }
        
            if($case){
                $return_value['status_code'] = 0;
                $return_value['status_message'] = 'Execute Success';
                $return_value['data_set'] = $case;
            }
            
            else{
                $return_value['status_code'] = -1;
                $return_value['status_message'] = '最近沒有維修紀錄';
            }
            
            return json_encode($return_value);
        }        
    }

//SELECT * FROM `case_profile` A JOIN `notice` B ON B.case_profile_id=A.id JOIN household_user C ON A.household_user_id=C.id JOIN user_profile D ON C.user_profile_id=D.id WHERE D.id=$user_id
//SELECT * FROM `case_profile` A JOIN `repair_type` B ON A.repair_type_id=B.id


//
?>

