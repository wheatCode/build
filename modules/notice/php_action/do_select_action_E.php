<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/user_profile/php_action/user_profile_model.php';
    
    class do_select_action_E implements action_listener{
        public function actionPerformed(event_message $em) {
            $userId=$_SESSION['userid'];
            //SELECT notice.type, notice.case_profile_id, notice.message,notice.title, construction_project.name , household_profile.number,case_profile.start_datetime, repair_type.namech , repair_type.id FROM user_profile JOIN household_user ON household_user.user_profile_id=user_profile.id JOIN case_profile on household_user.id = case_profile.household_user_id JOIN notice on notice.case_profile_id=case_profile.id JOIN household_profile ON household_user.household_profile_id=household_profile.id JOIN construction_project ON household_profile.construction_project_id=construction_project.id JOIN repair_type ON case_profile.repair_type_id=repair_type.id WHERE construction_project.manage_id=4 AND notice.type = 'enew'
            $user_model=new user_profile_model();
            $something='repair_type.id,notice.type, notice.case_profile_id, notice.message,notice.title, construction_project.name , household_profile.number,case_profile.start_datetime ,repair_type.namech';
            $join='household_user ON household_user.user_profile_id=user_profile.id JOIN case_profile on household_user.id = case_profile.household_user_id JOIN notice on notice.case_profile_id=case_profile.id JOIN household_profile ON household_user.household_profile_id=household_profile.id JOIN construction_project ON household_profile.construction_project_id=construction_project.id JOIN repair_type ON case_profile.repair_type_id=repair_type.id ';
            $where="construction_project.manage_id= $userId AND notice.type = 'enew' order by case_profile.start_datetime desc";
            $allnotice = $user_model->get_user_profile_join($something,$join,$where);
            if($allnotice){
                $return_value['allnotice']=$allnotice;
                $return_value['status_code'] = 0;
            }
            else{
                 $return_value['status_code'] = -2;
                 $return_value['status_message'] = 'Execute $cases error';
                 $return_value['allnotice']=$allnotice;
            }
            
            
            // if($return_value['status_num'] != -2){
            //     // array_push($userData, $user, $household, $building);
            //     $return_value['status_code'] = 0;
            //     $return_value['status_message'] = 'Execute Success';
            //     // $return_value['userData'] = $userData;
            //     $return_value['data_set'] = $allResult;
            // }
            return json_encode($return_value);
        }
    }
?>