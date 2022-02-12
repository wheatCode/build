<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'include/php/PDO_mysql.php';
    require_once 'modules/household/php_action/household_model.php';
    require_once 'modules/repair/php_action/repair_model.php';
    require_once 'modules/case/php_action/case_model.php';
        
    class do_select_action implements action_listener{
        public function actionPerformed(event_message $em) {
            $repair_model=new repair_model();
		    $case_model= new case_model();
		    $household_model= new household_model();
            // $conn = PDO_mysql::getConnection();
            // $sql = "SELECT id,name,namech FROM `repair_type`";
            // $post = $em->getPost();
            // $stmt = $conn->prepare($sql);
            // $result = $stmt->execute();
            
            $warrarr=array();
            
            
            if(isset($_SESSION['useracc'])){
			    $userid=$_SESSION['userid'];
		    }
            $repair_type=$case_model->get_something_from_repair_type("id,name,namech","1");
            //SELECT id,household_profile_id FROM `household_user` WHERE household_profile_id is not null AND user_profile_id = 1
            $household=$household_model->get_something_from_household_user("id,household_profile_id,warranty","household_profile_id is not null AND user_profile_id = $userid");
            if(sizeof($household)>1){
                //SELECT household_user.id, construction_project.name FROM `household_user` JOIN household_profile ON household_user.household_profile_id=household_profile.id JOIN construction_project ON household_profile.construction_project_id=construction_project.id WHERE household_profile_id is not null AND user_profile_id = 1
                $join="household_profile ON household_user.household_profile_id=household_profile.id JOIN construction_project ON household_profile.construction_project_id=construction_project.id";
                $construction_project=$household_model->get_something_from_household_user_join("household_user.id, construction_project.name, household_user.warranty",$join,"household_profile_id is not null AND user_profile_id = $userid");
                $return_value['check_construction']="yes";
                $return_value['construction_data']=$construction_project;
                
                
                for($i=0;$i<sizeof($household);$i++){
                    array_push($warrarr,$construction_project[$i]);
                    
                }
                
                
                $return_value['warrantyall']=$warrarr;
                
            }else if(sizeof($household)==1){
                $return_value['check_construction']="no";
                $return_value['warranty']=$household[0]["warranty"];
                
            }else{
                $return_value['check_construction']="nonono";
                $return_value['warranty']="nowarranty";
            }
            
            if($repair_type){
                //$ds = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $return_value['status_code'] = 0;
                $return_value['status_message'] = 'Execute Success';
                $return_value['data_set']=$repair_type;
                $return_value['user_id']=$_SESSION['user'];
                
                
            }
            else{
                $return_value['status_code'] = -1; 
                $return_value['sql'] = $sql;
            }
            return json_encode($return_value);
        }        
    }
?>