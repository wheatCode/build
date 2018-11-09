<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/building/php_action/building_model.php';
    require_once 'modules/user_profile/php_action/user_profile_model.php';
    

    class do_select_search_action_P implements action_listener{
        public function actionPerformed(event_message $em) {
            $selectconsid = $_POST['selectcons'];
            $selectnameid = $_POST['selectname'];
            
            if(isset($_SESSION['useracc'])){
			    $user_id=$_SESSION['userid'];
		    }
            $building_model = new building_model();
            $user_profile_model= new user_profile_model();
            
            
           if($selectnameid!="null"){
                $where .='manage_id='.$selectnameid;
                if($selectconsid!="null"){
                    $where .=' AND id='.$selectconsid;
                    
                }else{
                    
                }
            }else if($selectconsid!="null"){
                    $where .='id='.$selectconsid;
                    
            }
            else{
                $where.="1";
            }
            
            $where .=" ORDER BY manage_id DESC"; 
            
            
            
            
            $totle=$building_model->get_construction_project_data("*",$where);
            
            $rctid=array();
            for( $l=0;$l<sizeof($totle);$l++){
                $user_name=$user_profile_model->get_something_from_user_profile_p("*","id=".$totle[$l]["manage_id"]);
                
                $a=['constructor_search' => $totle[$l],$user_name];
                array_push($rctid,$a);
            }
            // $a=['constructor_search' => $totle,$user_name];
                
    
            // $return_value['rctid']=$rctid;
            // $return_value['test_1']=$where;
            // $return_value['test_5']=$totle;
            // $return_value['user_name']=$user_name;
            // $return_value['rctid']=$rctid;
            $return_value['rctid']=$rctid;
            
            
            $return_value['status_code'] = 0;
        
            return json_encode($return_value);
        }
    }
?>