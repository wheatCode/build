<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/case/php_action/case_model.php';
    require_once 'modules/household/php_action/household_model.php';
    require_once 'modules/building/php_action/building_model.php';
    require_once 'modules/user_profile/php_action/user_profile_model.php';
    require_once 'modules/repair/php_action/repair_model.php';
    class show_case_page_E implements action_listener{
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
            $repair_model= new repair_model();//要先找到Repair_history profile的Reservtime
            $case_data=$case_model->get_something_from_case_profile("*","id=$case_id");
            if($case_data){
                $return_value['case_data']=$case_data;
                $return_value['status_code'] = 0;
                $repair_type_data=$case_model->get_something_from_repair_type("namech","id=".$case_data[0]['repair_type_id']);
                $return_value['repair_type_name'] = $repair_type_data[0][0];
                //取得維修類型
                $household_user_data=$household_model->get_something_from_household_user("*","id=".$case_data[0]['household_user_id']);
                $return_value['warranty'] = $household_user_data[0]['warranty'];
                //保固
                
                if(file_exists("/home/ubuntu/workspace/case_img/".$case_id.".jpeg")){
                    $filedata=file_get_contents("/home/ubuntu/workspace/case_img/".$case_id.".jpeg");
                    $img=base64_encode($filedata);
                    $img="data:image/jpeg;base64,".$img;
                    $return_value['case_img'] = $img;
                    }
                
                if($household_user_data[0]['public_facilities_id'] != null){//公設報修
                    $return_value['ifpf']="yes";
                    $pf_data=$household_model->get_something_from_public_facilities("*","id=".$household_user_data[0]['public_facilities_id']);
                    $return_value['pf_data']=$pf_data;
                    //公設位置等
                    $user_data=$user_model->get_something_from_user_profile("name,phone","id=".$household_user_data[0]['user_profile_id']);
                    $return_value['user_data']=$user_data;
                    //使用者名稱 電話
                    $construction_project=$building_model->get_something_from_construction_project("*",$pf_data[0]['construction_project_id']);
                    $return_value['construction_project']=$construction_project[0]['name'];
                    
                    
                }else if($household_user_data[0]['household_profile_id'] != null){//一班報修
                    $return_value['ifpf']="no";
                    $household_data=$household_model->get_something_from_household_profile("*","id=".$household_user_data[0]['household_profile_id']);
                    $return_value['household_data']=$household_data;
                    //戶號地址
                    $user_data=$user_model->get_something_from_user_profile("name,phone","id=".$household_user_data[0]['user_profile_id']);
                    $return_value['user_data']=$user_data;
                    //使用者名稱 電話
                    $construction_project=$building_model->get_something_from_construction_project("*",$household_data[0]['construction_project_id']);
                    $return_value['construction_project']=$construction_project[0]['name'];
                }else{
                    $return_value['ifpf']="資料庫有誤";
                    //資料庫有誤
                }
                //建案
                $E_name=$user_model->get_something_from_user_profile("name","id=".$construction_project[0]['manage_id']);
                $return_value['ename']=$E_name['data_set'][0][0];
                //主任
                $reservetime=$repair_model->check_reservetime($case_id);
                $repair_history_id=$repair_model->get_last_repair_history_id($case_id);
                $return_value['rph_id']=$repair_history_id[0][0];
                //維修歷程ID
                $apply_date=$repair_model->get_something_from_applydate("start_Time,end_Time","repair_history_id=".$repair_history_id[0][0]);
                if($case_data[0]['status']=="finish"){
                    
                    
                    
                    if(file_exists("/home/ubuntu/workspace/sign/".$case_id.".png")){
                    $filedata=file_get_contents("/home/ubuntu/workspace/sign/".$case_id.".png");
                    $sign=base64_encode($filedata);
                    $sign="data:image/png;base64,".$sign;
                    $return_value['sign_img'] = $sign;
                    }
                    $return_value['check_finish'] = 10;
                    $return_value['status_message'] = "已完成的案件";
                }else if($case_data[0]['status']=="unfinish"){
                    $return_value['check_finish'] = 11;
                    if($reservetime[0][0]!=null){
                        $return_value['status_message'] = "未完成的案件 已確認時間";
                        $return_value['check_reserve']=1;
                    }else{
                        $return_value['status_message'] = "未完成的案件 待確認時間";
                        $return_value['check_reserve']=0;
                        if($apply_date!= null){
                            $return_value['check_apply']="yes";
                        }else{
                            $return_value['check_apply']="no";
                        }
                    }
                }else if($case_data[0]['status']=="new"){
                    $return_value['check_finish'] = 12;
                    if($reservetime[0][0]!=null){
                        $return_value['status_message'] = "新案件 已確認時間";
                        $return_value['check_reserve']=1;
                    }else{
                        $return_value['status_message'] = "新案件 待確認時間";
                        $return_value['check_reserve']=0;
                        if($apply_date!= null){
                            $return_value['check_apply']="yes";
                        }else{
                            $return_value['check_apply']="no";
                        }
                    }
                }
            }else{
                $return_value['status_code'] = 100;
                $return_value['status_message'] = "沒有收到case_id";
            }
            return json_encode($return_value);
        }        
    }
?>