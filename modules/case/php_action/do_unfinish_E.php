<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/case/php_action/case_model.php';
    require_once 'modules/household/php_action/household_model.php';
    require_once 'modules/building/php_action/building_model.php';
    require_once 'modules/user_profile/php_action/user_profile_model.php';
    require_once 'modules/repair/php_action/repair_model.php';
    require_once 'modules/notice/php_action/notice_model.php';
    class do_unfinish_E implements action_listener{
        public function actionPerformed(event_message $em) {
    //          if(isset($_SESSION['useracc'])){
			 //   $user_id=$_SESSION['userid'];
		  //  }
		    $post = $em->getPost();
		    $case_id = $post['case_id'];
		    $new_time = $post['new_time'];
		    $new_content = $post['new_content'];
		    $type=$post['type'];
		    $pdf=$post['pdf'];
            $case_model = new case_model();
            $household_model= new household_model();
            $building_model= new building_model();
            $user_model = new user_profile_model();
            $repair_model= new repair_model();
            $notice_model=new notice_model();
            $return_value['status_code'] = 0;
            $return_value['pdf']=$pdf;
            $repair_history_id=$repair_model->get_last_repair_history_id($case_id);
            // $return_value['test'] = "content ".$new_time." time".$new_content;
            // $return_value['repair_id'] =$repair_history_id;
            // $return_value['case_id']=$case_id;
            $return_value['type']=$type;




            
            $repair_model->update_repair_history("repair_content = '$new_content', work_time = '$new_time'","id=".$repair_history_id[0][0]);
            ini_set ( 'date.timezone' , 'Asia/Taipei' );
			date_default_timezone_set('Asia/Taipei');
		    $date=date("Y-m-d")." ".date("H:i:s");
		    $date2=date("m/d")." ".date("H:i");
            if($type=="finish"){
                $case_model->update_case_profile("`status` = 'finish',`end_datetime` = '$date'","id=$case_id");
                //$data = base64_decode($pdf);
                //pdf=base64 string
                $data = $pdf;
                $pdf = str_replace('data:image/png;base64,', '', $pdf);
                $pdf = str_replace(' ', '+', $pdf);
                $fileData = base64_decode($pdf);
                //saving
                $fileName = $case_id.'.png';
                file_put_contents("/home/ubuntu/workspace/sign/".$fileName, $fileData);  
                $notice_model->insert_new_notice('finish',$case_id,'請幫我們做個評分，謝謝!','您的維修已完成'.' '.$date2);
                
            }else if($type =="unfinish")
            {
                $repair_model->insert_new_repair_history($case_id);
            }else if($type =="cancel")
            {
                $case_model->update_case_profile("`status` = 'cancel'","id=$case_id");
                $notice_model->insert_new_notice('cancel',$case_id,'您報修的案件已取消','案件取消通知'.' '.$date2);
            }
           
            return json_encode($return_value);
        }        
    }
?>