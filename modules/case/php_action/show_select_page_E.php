<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/case/php_action/case_model.php';
    require_once 'modules/household/php_action/household_model.php';
    require_once 'modules/building/php_action/building_model.php';
    require_once 'modules/repair/php_action/repair_model.php';
    class show_select_page_e implements action_listener{
        public function actionPerformed(event_message $em) {
             if(isset($_SESSION['useracc'])){
			    $user_id=$_SESSION['userid'];
		    }
		    //SELECT case_profile.status, construction_project.name,case_profile.id,case_profile.title,repair_type.namech,household_profile.number FROM `case_profile` JOIN household_user ON case_profile.household_user_id=household_user.id JOIN household_profile ON household_user.household_profile_id = household_profile.id JOIN construction_project ON household_profile.construction_project_id = construction_project.id JOIN repair_type on case_profile.repair_type_id=repair_type.id WHERE construction_project.manage_id=4 AND (case_profile.status ='new' OR case_profile.status='unfinish') order by case_profile.id DESC
            $case_model = new case_model();
            $household_model= new household_model();
            $building_model= new building_model();
            $repair_model= new repair_model();
            
            $where=" construction_project.manage_id= $user_id AND (case_profile.status ='new' OR case_profile.status='unfinish') order by case_profile.id DESC";
            $join='JOIN household_user ON case_profile.household_user_id=household_user.id JOIN household_profile ON household_user.household_profile_id = household_profile.id JOIN construction_project ON household_profile.construction_project_id = construction_project.id JOIN repair_type on case_profile.repair_type_id=repair_type.id';
            $something='construction_project.name,case_profile.id,case_profile.title,repair_type.namech,household_profile.number,case_profile.status';
            $j_case=$case_model->get_something_from_case_profile_join($something,$join,$where);
            for($a=0;$a<sizeof($j_case);$a++){
                $repair_history_id=$repair_model->get_last_repair_history_id($j_case[$a]["id"]);
                $repair_date=$repair_model->get_something_from_repair_history("reservetime","id=".$repair_history_id[0][0]);
                if($repair_date[0][0]){
                        $check_repair_datej[$a]["repair_date"]=$repair_date[0][0];
                        $check_repair_datej[$a]["check_repair_date"]="待維修";
                        // array_push($check_repair_date,"yes");
                    }else{
                        $check_repair_datej[$a]["repair_date"]="尚無";
                        $check_repair_datej[$a]["check_repair_date"]="待確認時間";
                        //array_push($check_repair_date,"no");
                    }
                
            }
            
            $building_id=$building_model->get_id_from_construction_project("id",$user_id);
            
            $building_name=$building_model->get_construction_project_data("name","manage_id = ".$user_id);
            
            $household_id = $household_model->get_something_from_household_profile("id","construction_project_id =".$building_id[0][0]);
            
            
            
            $household_user=array();
            $caseall=array();
            $casenew=array();
            $caseunfin=array();
            $check_repair_date=array();
            $h;$hi;
            
            $household_model= new household_model();
            
            
            
            for($i=0;$i<sizeof($household_id);$i++){
                $h = $household_model->get_something_from_household_user("id","household_profile_id = ".$household_id[$i]["id"]);
                array_push($household_user,$h[0][0]);
            }
            
            
            for($i=0;$i<sizeof($household_user);$i++){
                $hi=$case_model->get_something_from_case_profile("*","household_user_id=".$household_user[$i][0]." ORDER BY `start_datetime` DESC");
                
                if($hi!=null){
                array_push($caseall,$hi);}
                for($z=0;$z<sizeof($hi);$z++){
                    $repair_history_id=$repair_model->get_last_repair_history_id($hi[$z]["id"]);
                    $repair_date=$repair_model->get_something_from_repair_history("reservetime","id=".$repair_history_id[0][0]);
                    if($repair_date[0][0]){
                        $check_repair_date[$i][$z]["repair_date"]=$repair_date[0][0];
                        $check_repair_date[$i][$z]["check_repair_date"]="待維修";
                        // array_push($check_repair_date,"yes");
                    }else{
                        $check_repair_date[$i][$z]["repair_date"]="尚無";
                        $check_repair_date[$i][$z]["check_repair_date"]="待確認時間";
                        //array_push($check_repair_date,"no");
                    }
                }
            
            }
            
            
            for($i=0;$i<sizeof($household_user);$i++){
                $hi=$case_model->get_something_from_case_profile("*","`status` = 'new' and household_user_id=".$household_user[$i][0]." ORDER BY `start_datetime` DESC");
                array_push($casenew,$hi);
            }
            
            for($i=0;$i<sizeof($household_user);$i++){
                $hi=$case_model->get_something_from_case_profile("*","`status` = 'unfinish' and household_user_id=".$household_user[$i][0]);
                array_push($caseunfin,$hi);
            }
            
            
            // for($i=0;$i<sizeof($caseall);$i++){
            //     $repair_history_id=$repair_model->get_last_repair_history_id($caseall[0][$i]["id"]);
            //     $repair_date=$repair_model->get_something_from_repair_history("reservetime","id=".$repair_history_id[0][0]);
            //     array_push($check_repair_date,$repair_date[0][0]);
            // }
            
            
            $household_data = $household_model->get_something_from_household_profile("id,number","construction_project_id =".$building_id[0][0]);
            
            $reservetime=$repair_model->check_reservetime($case_id);
                
            if($caseall !=null){
                $ds = $caseall;
                $return_value['status_code'] = 0;
                $return_value['status_message'] = 'Execute Success';
                $return_value['data_set'] = $ds;
                $return_value['check_repair_date']=$check_repair_datej;
                $return_value['check_repair_datej']=$check_repair_datej;
                $return_value['buildingname'] = $building_name;
                $return_value['test']=$household_data;
                $return_value['j_case'] = $j_case;
            }
            
            else{
                $return_value['status_code'] = -1;
                $return_value['status_message'] = '最近沒有';
                $return_value['data_set'] = (sizeof($household_user));
                $return_value['sql'] = $sql;
                
            }
            
            return json_encode($return_value);
        }        
    }
?>