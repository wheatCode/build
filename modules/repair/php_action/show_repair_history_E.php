<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/case/php_action/case_model.php';
    require_once 'modules/household/php_action/household_model.php';
    require_once 'modules/building/php_action/building_model.php';
    require_once 'modules/user_profile/php_action/user_profile_model.php';
    require_once 'modules/repair/php_action/repair_model.php';
    require_once 'modules/repair_company/php_action/repair_company_model.php';
    class show_repair_history_E implements action_listener{
        public function actionPerformed(event_message $em) {
    //          if(isset($_SESSION['useracc'])){
			 //   $user_id=$_SESSION['userid'];
		  //  }
		    $post = $em->getPost();
		    $case_id = $post['case_id'];
            $case_model = new case_model();
            $household_model= new household_model();
            $building_model= new building_model();
            $user_model = new user_profile_model();
            $repair_model= new repair_model();
            $repair_company_model=new repair_company_model();
            $check_finish=$case_model->get_something_from_case_profile("status","id=$case_id");
            $repair_history=$repair_model->get_something_from_repair_history("*","case_id=".$case_id." ORDER BY `repair_history_profile`.`reservetime` ASC");
            $repair_type=array();
            $repair_com=array();
            for($i=0;$i<sizeof($repair_history);$i++){
                $h = $repair_company_model->get_something_from_repair_company_profile("name","id=".$repair_history[$i]['repair_company_id']);
                array_push($repair_com,$h[0][0]);
            }
            $return_value["check_finish"]=$check_finish[0][0];
            $return_value['repair_history'] = $repair_history;
            $return_value['repair_com'] = $repair_com;
            $reservetime=$repair_model->check_reservetime($case_id);
            if($reservetime[0][0]!=null){
                $return_value['status_code'] = 0;
                $return_value['status_message'] = "已預約";
                $return_value["check_histroy_length"]="yes";
            }else{
                $return_value['status_code'] = 1;
                if(sizeof($repair_history)>1){
                    $return_value['status_message'] = "未預約已經報修過";
                    $return_value["check_histroy_length"]="yes";
                }
                else{
                    $return_value['status_message'] = "未預約未報修";
                    $return_value["check_histroy_length"]="no";
                }
            }
            //$case_data=$case_model->get_something_from_case_profile("*","id=$case_id");
            // if($case_data){
                // $return_value['case_data']=$case_data;
                // $return_value['status_code'] = 0;
                // $repair_type_data=$case_model->get_something_from_repair_type("namech","id=".$case_data[0]['repair_type_id']);
                // $return_value['repair_type_name'] = $repair_type_data[0][0];
                // //取得維修類型
                // $household_user_data=$household_model->get_something_from_household_user("*","id=".$case_data[0]['household_user_id']);
                // $return_value['warranty'] = $household_user_data[0]['warranty'];
                // //
                // $household_data=$household_model->get_something_from_household_profile("*","id=".$household_user_data[0]['household_profile_id']);
                // $return_value['household_data']=$household_data;
                // $user_data=$user_model->get_something_from_user_profile("name,phone","id=".$household_user_data[0]['user_profile_id']);
                // $return_value['user_data']=$user_data;
                // $construction_project=$building_model->get_something_from_construction_project("*",$household_data[0]['construction_project_id']);
                // $return_value['construction_project']=$construction_project[0]['name'];
                // $E_name=$user_model->get_something_from_user_profile("name","id=".$construction_project[0]['manage_id']);
                // $return_value['ename']=$E_name['data_set'][0][0];
                // $reservetime=$repair_model->check_reservetime($case_id);
                // $repair_history_id=$repair_model->get_last_repair_history_id($case_id);
            //     if($case_data[0]['status']=="finish"){
            //         $return_value['check_finish'] = 10;
            //         $return_value['status_message'] = "已完成的案件";
            //     }else if($case_data[0]['status']=="unfinish"){
            //         $return_value['check_finish'] = 11;
            //         if($reservetime[0][0]!=null){
            //             $return_value['status_message'] = "未完成的案件 已確認時間";
            //             $return_value['check_reserve']=1;
            //         }else{
            //             $return_value['status_message'] = "未完成的案件 待確認時間";
            //             $return_value['check_reserve']=0;
            //         }
            //     }else if($case_data[0]['status']=="new"){
            //         $return_value['check_finish'] = 12;
            //         if($reservetime[0][0]!=null){
            //             $return_value['status_message'] = "新案件 已確認時間";
            //             $return_value['check_reserve']=1;
            //         }else{
            //             $return_value['status_message'] = "新案件 待確認時間";
            //             $return_value['check_reserve']=0;
            //         }
            //     }
            // }else{
            //     $return_value['status_code'] = 100;
            //     $return_value['status_message'] = "沒有收到case_id";
            // }
            return json_encode($return_value);
        }        
    }
?>