<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/case/php_action/case_model.php';
    require_once 'modules/household/php_action/household_model.php';
    require_once 'modules/building/php_action/building_model.php';
    require_once 'modules/user_profile/php_action/user_profile_model.php';
    require_once 'modules/repair/php_action/repair_model.php';
    class show_search_result_E implements action_listener{
        public function actionPerformed(event_message $em) {
             if(isset($_SESSION['useracc'])){
			    $user_id=$_SESSION['userid'];
		    }
		    $post = $em->getPost();
		    $end=$post['end'];
            $case_model = new case_model();
            $household_model= new household_model();
            $building_model= new building_model();
            $user_model = new user_profile_model();
            $repair_model= new repair_model();//要先找到Repair_history profile的Reservtime
            
            
            if($end == "end"){
                $join_household="JOIN household_user ON case_profile.household_user_id=household_user.id JOIN household_profile ON household_user.household_profile_id = household_profile.id JOIN construction_project ON household_profile.construction_project_id = construction_project.id";
                $join_pf="JOIN household_user ON case_profile.household_user_id=household_user.id JOIN public_facilities ON household_user.public_facilities_id=public_facilities.id JOIN construction_project ON public_facilities.construction_project_id = construction_project.id";
                //公設SELECT case_profile.id,case_profile.end_datetime,construction_project.name FROM `case_profile` JOIN household_user ON case_profile.household_user_id=household_user.id JOIN public_facilities ON household_user.public_facilities_id=public_facilities.id JOIN construction_project ON public_facilities.construction_project_id = construction_project.id WHERE end_datetime is not NULL and construction_project.manage_id=4 order by end_datetime desc
                //戶SELECT * FROM `case_profile` JOIN household_user ON case_profile.household_user_id=household_user.id JOIN household_profile ON household_user.household_profile_id = household_profile.id JOIN construction_project ON household_profile.construction_project_id = construction_project.id WHERE end_datetime is not NULL and construction_project.manage_id=2 order by end_datetime desc
                $case_data=$case_model->get_something_from_case_profile_join("case_profile.id,case_profile.title,case_profile.end_datetime,construction_project.name",$join_household,"end_datetime is not NULL and construction_project.manage_id=$user_id order by end_datetime desc");
                $case_data2=$case_model->get_something_from_case_profile_join("case_profile.id,case_profile.title,case_profile.end_datetime,construction_project.name",$join_pf,"end_datetime is not NULL and construction_project.manage_id=$user_id order by end_datetime desc");
                
                for($i=0; $i<sizeof($case_data2);$i++){
                    array_push($case_data,$case_data2[$i]);
                }
                
                function sort_by_end_datetime($a, $b)
                {
                    if($a['end_datetime'] == $b['end_datetime']) return 0;
                    return ($a['end_datetime'] < $b['end_datetime']) ? 1 : -1;
                }
                usort($case_data, 'sort_by_end_datetime');
                if($case_data){
                    $return_value['status_code'] = 0;
                    $return_value['case_data'] = $case_data;
                    $return_value['pf_case_data']=$case_data2;
                }else{
                     $return_value['status_code'] = 1;
                     $return_value['status_message'] = "error";
                }
                
            }else if($end == "condition"){
                $household_num = $post['household_num'];
    		    $construction_project_id = $post['construction_project'];
    		    $end_datetime = $post['end_datetime'];
    		    $cus_name = $post['cus_name'];
    		    $where="";
    		    if($household_num!= null || $household_num !=''){
    		        if($where == ""){
    		            $where.=" household_profile.number='$household_num'";
    		        }else{
    		            $where.=" AND household_profile.number='$household_num'";
    		        }
    		    }
    		    if($construction_project_id){
    		        if($construction_project_id == "all"){
    		            
    		        }else{
        		        if($where == ""){
        		            $where.=" construction_project.id=$construction_project_id";
        		        }else{
        		            $where.=" AND construction_project.id=$construction_project_id";
        		        }
    		        }
    		    }
    		    if($end_datetime != null || $end_datetime != ''){
    		        if($where == ""){
    		            $where.=" case_profile.end_datetime LIKE '$end_datetime%' ";
    		        }else{
    		            $where.=" AND case_profile.end_datetime LIKE'$end_datetime%'";
    		        }
    		    }
    		    if($cus_name != null || $cus_name != ''){
    		        if($where == ""){
    		            $where.=" user_profile.name LIKE '%$cus_name%' AND construction_project.manage_id=$user_id";
    		        }else{
    		            $where.=" AND user_profile.name LIKE '%$cus_name%' AND construction_project.manage_id=$user_id";
    		        }
    		    }
    		    if($where == ""){
    		        $where .= " construction_project.manage_id=$user_id";
    		    }else{
    		        $where .= " AND construction_project.manage_id=$user_id";
    		    }
    		    $join_household="JOIN household_user ON case_profile.household_user_id=household_user.id JOIN household_profile ON household_user.household_profile_id = household_profile.id JOIN construction_project ON household_profile.construction_project_id = construction_project.id JOIN user_profile ON household_user.user_profile_id=user_profile.id";
                $join_pf="JOIN household_user ON case_profile.household_user_id=household_user.id JOIN public_facilities ON household_user.public_facilities_id=public_facilities.id JOIN construction_project ON public_facilities.construction_project_id = construction_project.id JOIN user_profile ON household_user.user_profile_id=user_profile.id";
    		    $case_data=$case_model->get_something_from_case_profile_join("case_profile.id,case_profile.title,case_profile.end_datetime,construction_project.name",$join_household," $where order by end_datetime desc");
                $case_data2=$case_model->get_something_from_case_profile_join("case_profile.id,case_profile.title,case_profile.end_datetime,construction_project.name",$join_pf," $where order by end_datetime desc");
                
                if($case_data2){
                    for($i=0; $i<sizeof($case_data2);$i++){
                        array_push($case_data,$case_data2[$i]);
                    }
                }
                
                if($case_data){
                    function sort_by_end_datetime($a, $b)
                    {
                        if($a['end_datetime'] == $b['end_datetime']) return 0;
                        return ($a['end_datetime'] < $b['end_datetime']) ? 1 : -1;
                    }
                    usort($case_data, 'sort_by_end_datetime');
                    //$return_value['$household_num,$construction_project,$end_datetime,$cus_name']=' 1 '.$household_num.' 2 '.$construction_project_id.' 3 '.$end_datetime.' 4 '.$cus_name;
                    //$return_value['$construction_project_id']=$construction_project_id;
                    $return_value['where'] =$where;
                    $return_value['status_code'] = 0;
                    $return_value['case_data'] = $case_data;
                    $return_value['pf_case_data']=$case_data2;
                }else{
                      
                     $return_value['status_code'] = 1;
                     $return_value['status_message'] = "查無資料";
                }
            }else{
                $return_value['status_message']="請指定類型 end or condition";
                $return_value['end']=$end;
            }
            
            
            return json_encode($return_value);
        }        
    }
?>