<?php
	require_once 'include/php/event_message.php';
	require_once 'include/php/action_listener.php';
	require_once 'include/php/PDO_mysql.php';
	require_once 'modules/case/php_action/case_model.php';
	require_once 'modules/household/php_action/household_model.php';
	require_once 'modules/repair/php_action/repair_model.php';
	require_once 'modules/notice/php_action/notice_model.php';
	class do_repair_action implements action_listener{
		public function actionPerformed(event_message $em)
		{
			$post = $em->getPost();
            $input_starttime1_1 = $post['input_starttime1-1'];
            $input_starttime1_2 = $post['input_starttime1-2'];
            $input_starttime2_1 = $post['input_starttime2-1'];
            $input_starttime2_2 = $post['input_starttime2-2'];
            $input_starttime3_1 = $post['input_starttime3-1'];
            $input_starttime3_2 = $post['input_starttime3-2'];
            $month1 = $post['date1'];
            $month2 = $post['date2'];
            $month3 = $post['date3'];
            $case_content = $post['case_content'];
            $case_title=$post['case_title'];
            $repair_type_id=$post['class'];
            $household_user=$post['construction_num'];
            $img=$post['inimg'];
            if(isset($_SESSION['useracc'])){
			    $userid=$_SESSION['userid'];
		    }
		    $repair_model=new repair_model();
		    $case_model= new case_model();
		    $household_model= new household_model();
		    $notice_model=new notice_model();
		    ini_set ( 'date.timezone' , 'Asia/Taipei' );
			date_default_timezone_set('Asia/Taipei');
		    $date=date("Y-m-d")." ".date("H:i:s");
			if($household_user!="no"){
				//$household_user_id = $household_model->get_something_from_household_user("household_profile_id","user_profile_id =".$userid);
		    	$case_model->insert_new_case($household_user,$repair_type_id,$case_title, $case_content,$date);//insert_new_case($household_user_id,$repair_type_id,$title, $content,$start_datetime)
				$case_id=$case_model->get_case_id($household_user,$date);
				// $household_id=get_something_from_household_user('household_profile_id','id='.$household_user);
				// get_something_from_household_profile('construction_project_id','id='.$household_id[0][0]);
				$notice_model->insert_new_notice('enew',$case_id,'','新案件通知');
				
			}else{
				$household_user_id = $household_model->get_something_from_household_user("household_profile_id","user_profile_id =".$userid);
		    	$case_model->insert_new_case($household_user_id[0][0],$repair_type_id,$case_title, $case_content,$date);//insert_new_case($household_user_id,$repair_type_id,$title, $content,$start_datetime)
				$case_id=$case_model->get_case_id($household_user_id[0][0],$date);
				$notice_model->insert_new_notice('enew',$case_id,'','新案件通知');
				
			}
		    // $household_user_id = $household_model->get_something_from_household_user("household_profile_id","user_profile_id =".$userid);
		    // $case_model->insert_new_case($household_user_id[0][0],$repair_type_id,$case_title, $case_content,$date);//insert_new_case($household_user_id,$repair_type_id,$title, $content,$start_datetime)
			//$case_id=$case_model->get_case_id($household_user_id[0][0],$date);
			$repair_model->insert_new_repair_history($case_id);
			//$repair_history_id=$repair_model->get_something_from_repair_history("id","case_id=".$case_id);
			$repair_history_id=$repair_model->get_last_repair_history_id($case_id);
			$repair_model->insert_new_applydate($repair_history_id[0][0],$month1,$input_starttime1_1,$input_starttime1_2);
			if($input_starttime2_1 != null && $input_starttime2_2 != null){
				$repair_model->insert_new_applydate($repair_history_id[0][0],$month2,$input_starttime2_1,$input_starttime2_2);
			}
			if($input_starttime3_1 != null && $input_starttime3_2 != null){
				$repair_model->insert_new_applydate($repair_history_id[0][0],$month3,$input_starttime3_1,$input_starttime3_2);
			}
			
			
			if($img){
				$img = str_replace('data:image/jpeg;base64,', '', $img);
				$img = str_replace(' ', '+', $img);
				$data = base64_decode($img);
				$fileName = $case_id.'.jpeg';
				file_put_contents("/home/ubuntu/workspace/case_img/".$fileName, $data);
			}
			$return_value['$household_user']=$household_user;
			$return_value['status_code'] = 0;
			$return_value['case_id'] = $case_id;
			$return_value['img'] = 'inimg'.$img;
			
			$return_value['$stime']=$input_starttime1_1;
			$return_value['$month1']=$month1;
            return json_encode($return_value);
		}
	}
	//
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//
//
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
//               佛祖保佑         永无BUG
//
//
//


?> 