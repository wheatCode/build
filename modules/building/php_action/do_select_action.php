<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/user_profile/php_action/user_profile_model.php';
    require_once 'modules/building/php_action/building_model.php';
    
    class do_select_action implements action_listener{
        public function actionPerformed(event_message $em) {
            if(isset($_SESSION['useracc'])){
			    $user_id=$_SESSION['userid'];
		    }
		    $post = $em->getPost();
            $user_profile_model = new user_profile_model();
            $building_model= new building_model();
            $building = $building_model->get_construction_project_data("*","1");
            
           
            $rctid=array();
            $repair_type_name=array();
            for( $l=0;$l<sizeof($building);$l++){
                $li=$user_profile_model->get_something_from_user_profile_p("name","id=".$building[$l]["manage_id"]);
                $key=$user_profile_model->get_something_from_user_profile_p("*","1");
                $a=['constructor' => $building[$l],$li,$key];
                array_push($rctid,$a);
            }
            if($building){
                //$ds = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $return_value['status_code'] = 0;
                $return_value['rctid']=$rctid;
            }
            
            else{
                $return_value['status_code'] = -1;
                $return_value['status_message'] = 'error';
                $return_value['sql'] = $sql;
            }
            
            return json_encode($return_value);
        }        
    }
?>