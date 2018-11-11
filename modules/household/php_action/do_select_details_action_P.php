<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/user_profile/php_action/user_profile_model.php';
    require_once 'modules/household/php_action/household_model.php';
    
    class do_select_details_action_P implements action_listener{
        public function actionPerformed(event_message $em) {
            if(isset($_SESSION['useracc'])){
			    $user_id=$_SESSION['userid'];
		    }
		    $post = $em->getPost();
		    $housepid=$post['housepid'];
            $user_profile_model = new user_profile_model();
            $household_model =new household_model();
            $houseuser=$household_model->get_something_from_household_user_P("*","household_profile_id=".$housepid);
            // $test=$user_profile_model->get_something_from_user_profile_p("*",'id=');
            $rctid=array();
            // for($c=0;$c<=sizeof($houseuser);$c++){
            //     $li=$user_profile_model->get_something_from_user_profile_p("*","id=".$houseuser[$c]['user_profile_id']);
            // }
             for( $l=0;$l<=sizeof($houseuser);$l++){
                $user_name=$user_profile_model->get_something_from_user_profile_p("*","id=".$houseuser[$l]["user_profile_id"]);
                
                // $a=['constructor_search' => $totle[$l],$user_name];
                // array_push($rctid,$a);
            }
            // var_dump($k);
            if($user_name){
                $return_value['status_code'] = 0;
                // $return_value['rctid']=$rctid;
                // $return_value['1']=$consid;
                $return_value['2']=$housepid;
                $return_value['3']=$user_name;
                $return_value['4']=$houseuser;
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