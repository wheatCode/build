<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/user_profile/php_action/user_profile_model.php';
    require_once 'modules/building/php_action/building_model.php';
    require_once 'modules/household/php_action/household_model.php';
    //require_once 'include/php/PDO_mysql.php';
    
    class show_update_page implements action_listener{
        public function actionPerformed(event_message $em) {
            $post = $em->getPost();
            if(isset($_SESSION['useracc'])){
			$userid=$_SESSION['userid'];
		    }
		    $user_model = new user_profile_model();
		    $building_model = new building_model();
		    $household_model= new household_model();
            $user_info = $user_model->get_something_from_user_profile("*","user_profile.id=".$userid);
            $household_id = $household_model->get_something_from_household_user("household_profile_id","user_profile_id =".$userid);
            $household_profile = $household_model->get_something_from_household_profile("construction_project_id,address","household_profile.id=".$household_id[0][0]);
            $construction_project_name = $building_model->get_something_from_construction_project("name",$household_profile[0]['construction_project_id']);
            $return_value['data_set']=$user_info['data_set'];
            $return_value['construction_project']=$construction_project_name[0][0];
            $return_value['address']=$household_profile[0]['address'];
            if($user_info['data_set'] != null){
                $return_value['status_code']=0;
                $return_value['status_message']="OK";
                // if($construction_project_name==null){
                //     $return_value['status_code']=1;
                //     $return_value['status_message']="construction_project_error";
                     $return_value['household_id']=$household_id;
                     $return_value['household_profile']=$household_profile;
                     $return_value['construction_project_name']=$construction_project_name;
                // }
            }else{
                $return_value['status_code']=2;
                $return_value['status_message']="shit happened";
                
            }
            return json_encode($return_value);
        }    
    }
    
?>

