<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/household/php_action/household_model.php';
    require_once 'modules/building/php_action/building_model.php';
    require_once 'modules/user_profile/php_action/user_profile_model.php';
    
    class do_select_data_building_action_p implements action_listener{
        public function actionPerformed(event_message $em) {
          $data=[];
          $sum=[];
          $name=$_POST['name'];
          $phone=$_POST['phone'];
          $household = new household_model();
          $building = new building_model();
          $user = new user_profile_model();
          
          
         
        //   $repair = new repair_model();
          $userOne = $user->get_something_from_user_profile('*',"`name` ='".$name."' AND `phone` ='".$phone."'"); 
         
         if($userOne){
            $houseHoldUserAll= $household->get_something_from_household_user('*','user_profile_id ='.$userOne['data_set'][0]['id']);
            foreach($houseHoldUserAll as $key => $houseHoldUserOne){
                $houseHoldProfileOne = $household->get_something_from_household_profile('*','id ='.$houseHoldUserAll[$key]['household_profile_id']);
                $buildingOne = $building->get_something_from_construction_project('*',$houseHoldProfileOne[0]['construction_project_id']);
                $sum=[$houseHoldProfileOne,$buildingOne,$houseHoldUserOne];
                array_push($data,$sum);
            }
            return json_encode($data);
         }else{
            $data = 0; 
            return json_encode($data);
         }
        }
    }
?>