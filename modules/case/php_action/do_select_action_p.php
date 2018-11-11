<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/user_profile/php_action/user_profile_model.php';
	require_once 'modules/case/php_action/case_model.php';
	require_once 'modules/household/php_action/household_model.php';
    require_once 'modules/building/php_action/building_model.php';
    require_once 'modules/repair/php_action/repair_model.php';
    
    class do_select_action_p implements action_listener{
        public function actionPerformed(event_message $em) {
            $data=[];
            $case = new case_model();
            $houseHold = new household_model(); 
            $userProfile = new user_profile_model();
            $building = new building_model();
            $repair=new repair_model();
            $where;
            
            $allcase= $case->get_p_case();
            if($allcase){
                $return_value['allcase']=$allcase;
                
            }else{
                $return_value['allcase']="目前沒有案件";
            }
            
            $buildingdata=$building->get_construction_project_data("id,name","1");
            
            
            $repairdata=$case->get_something_from_repair_type("id,namech","1");
            $return_value['repairdata']=$repairdata;
            $return_value['building']=$buildingdata;
            // $caseAll = $case->get_something_from_case_profile('*','1 ORDER BY id DESC');
            // $buildingAll = $building->get_construction_project_data('*','1');
            // $repairTypeAll = $case->get_something_from_repair_type('*','1');
            // foreach($caseAll as $key => $caseOne){
            //     $repairType = $case->get_something_from_repair_type('*','id ='.$caseOne['repair_type_id']);
            //     $houseHoldUserOne = $houseHold->get_something_from_household_user('*','id ='.$caseOne['household_user_id']);
            //     $userOne = $userProfile->get_something_from_user_profile('*','id ='.$houseHoldUserOne[0]['user_profile_id']);
            //     if($userOne['data_set'][0]['type'] === 'user'){
            //         $houseHoldProfileOne = $houseHold->get_something_from_household_profile('*','id ='.$houseHoldUserOne[0]['household_profile_id']);
            //         $where = $houseHoldProfileOne[0]['construction_project_id'];
            //     }else{
            //         $houseHoldPublicFacilitiesOne = $houseHold->get_something_from_public_facilities('*','id ='.$houseHoldUserOne[0]['public_facilities_id']);
            //         $where = $houseHoldPublicFacilitiesOne[0]['construction_project_id'];
            //     }
            //     $buildingOne = $building->get_something_from_construction_project('*',$where);
            //     $sum=['case' => $caseOne,'repairType' => $repairType,'houseHold' => ['houseHoldUser' => $houseHoldUserOne,'houseHoldProfile' => $houseHoldProfileOne],'building' => $buildingOne,'user' => $userOne,'buildingAll' => $buildingAll,'repairTypeAll' => $repairTypeAll];
            //     array_push($data,$sum);
            // }
            
            
            
            
            
            
            
            
            //$return_value['build'] = $buildingOne;
            
            //return json_encode($allcase);
            return json_encode($return_value); 
        }
    }
?>