<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/household/php_action/household_model.php';
    require_once 'modules/building/php_action/building_model.php';
    require_once 'modules/case/php_action/case_model.php'; 
    require_once 'modules/repair/php_action/repair_model.php'; 
    require_once 'modules/notice/php_action/notice_model.php';
    require_once 'modules/user_profile/php_action/user_profile_model.php';
    
    class do_select_action implements action_listener{
        public function actionPerformed(event_message $em) {
            $sum=[];
            $allArray=[];
            $userId=$_SESSION['userid'];
            //$conn = PDO_mysql::getConnection();
            //SELECT user_profile.account, notice.id, notice.type, notice.case_profile_id, notice.message,notice.title FROM user_profile JOIN household_user ON household_user.user_profile_id=user_profile.id JOIN case_profile on household_user.id = case_profile.household_user_id JOIN notice on notice.case_profile_id=case_profile.id
            $houseHold = new household_model();
            $case = new case_model();
            $building = new building_model();
            $repair = new repair_model();
            $notice_model = new notice_model();
            $user_model=new user_profile_model();
            $something='notice.id, notice.type, notice.case_profile_id, notice.message,notice.title,case_profile.start_datetime';
            $join='household_user ON household_user.user_profile_id=user_profile.id JOIN case_profile on household_user.id = case_profile.household_user_id JOIN notice on notice.case_profile_id=case_profile.id';
            $where='user_profile.id='.$userId ." and notice.type != 'enew' order by notice.id desc";

            $allnotice = $user_model->get_user_profile_join($something,$join,$where);
            $return_value['allnotice']=$allnotice;
            $return_value['user']=$userId;
            
            
            
            
            // $houseHoldUserAll=$houseHold->get_something_from_household_user("*","`user_profile_id` = ".$userId);
            // foreach($houseHoldUserAll as $key => $houseHoldUserOne){
            //     $houserHoldProfileOne = $houseHold -> get_something_from_household_profile("*","`id` = ".$houseHoldUserAll[$key]['household_profile_id']);
            //     $constructionProjectOne = $building -> get_something_from_construction_project('*',$houserHoldProfile['construction_project_id']);
            //     $caseAll = $case->get_something_from_case_profile('*','`household_user_id` = '.$houseHoldUserAll[$key]['id'].' AND `status` = "finish"');
            //     if($caseAll){
            //         foreach($caseAll as $key => $caseOne){
            //             $repairOne = $repair->get_something_from_repair_history('*','`case_id` = '.$caseAll[$key]['id'].' ORDER BY `id` DESC LIMIT 1');
            //             $sum=['$houseHoldUserOne'=>$houseHoldUserOne,'$houserHoldProfileOne'=>$houserHoldProfileOne,'$constructionProjectOne'=>$constructionProjectOne,'$caseOne'=>$caseOne,'$repairOne'=>$repairOne];
            //             array_push($allArray,$sum);
            //         }
            //     }else{
            //         // $sum=['$repairAll'=>0];
            //         // array_push($allArray,$sum);
            //     }
            // }
            

            
            
            return json_encode($return_value);
            
        }
    }
?>