<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/user_profile/php_action/user_profile_model.php';
    require_once 'modules/building/php_action/building_model.php';
    require_once 'modules/household/php_action/household_model.php';
    
    class do_select_action implements action_listener{
        public function actionPerformed(event_message $em) {
            if(isset($_SESSION['useracc'])){
			    $user_id=$_SESSION['userid'];
		    }
		    $post = $em->getPost();
		    $consid=$_POST['constructorid'];
		    $workid=$_POST['workerid'];
		    $workname=$_POST['workername'];
		    $where = $consid;
            $user_profile_model = new user_profile_model();
            $building_model= new building_model();
            $household_model =new household_model();
            $building = $building_model->get_construction_project_data("*",$where);
            // $worker= $user_profile_model->get_something_from_user_profile_p("name","id=".$workid);
           
            $rctid=array();
            // $repair_type_name=array();
            for( $l=0;$l<sizeof($building);$l++){
                $li=$household_model->get_something_from_household_profile_P("*","construction_project_id=".$consid);
                // for($k=0;$k<sizeof($li);$k++){
                //     $kd = $household_model->get_something_from_household_user_P("*","household_profile_id=".$li[$k]['id']);
                // }
                
                $a=['HOUSEHOLD' => $li];
                // array_push($rctid,$a);
            }
            if($building){
                //$ds = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $return_value['status_code'] = 0;
                // $return_value['rctid']=$rctid;
                // $return_value['1']=$consid;
                // $return_value['2']=$workid;
                // $return_value['3']=$kd;
                $return_value['4']=$li;
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