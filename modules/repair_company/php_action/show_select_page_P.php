<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/case/php_action/case_model.php';
    require_once 'modules/repair_company/php_action/repair_company_model.php';
    
    class show_select_page_P implements action_listener{
        public function actionPerformed(event_message $em) {
             if(isset($_SESSION['useracc'])){
			    $user_id=$_SESSION['userid'];
		    }
            $case_model = new case_model();
            $repair_company_model= new repair_company_model();
            $repair_company_data=$repair_company_model->get_something_from_repair_company_profile("*","1");
            // $return_value['repair_company_profile_name']=$repair_company_data;
            
            $rctid=array();
            $repair_type_name=array();
            for( $l=0;$l<sizeof($repair_company_data);$l++){
                $repair_type_name=[];
                $li=$repair_company_model->get_something_from_repair_company_type("repair_type_id","repair_company_id=".$repair_company_data[$l]["id"]);
              for($t=0;$t<sizeof($li);$t++){
                $tr=$case_model->get_something_from_repair_type("namech","id=".$li[$t]['repair_type_id']);
                array_push($repair_type_name,$tr);
              }      
                $a=['company' => $repair_company_data[$l],$repair_type_name];
                array_push($rctid,$a);
            }
            //for($l=0;$l<sizeof($rctid))
            
            // $testtr=array();
            // for($t=0;$t<sizeof($rctid);$t++){
            //     for($r=0;$r<sizeof($rctid[$t]);$r++){
            //         array_push($repair_type_name,$tr);
            //     }
            // }
            $return_value['rctid']=$rctid;
            
            //$repair_type_data=$case_model->get_something_from_repair_type("namech","id=".$case_data[0]['repair_type_id']);
            //$return_value['repair_type_name'] = $repair_type_data[0][0];
            
            
            $return_value['status_code'] = 0;
            //$allcase="1";
            
            
            
            // $repair_type_id=array();
            // for($i=0;$i<sizeof($repair_company_data);$i++){
            //     $h = $repair_type_id->get_something_from_repair_company_type("repair_type_id","repair_company_id=".$repair_company_data[$i]["id"]);
            //     array_push($repair_type_id,$h[0]);
            // }
            
            
            // $repair_type_id[0][0] $repair_type_id[0][1] $repair_type_id[1][0]
            // if($allcase){
            //     $ds = $allcase;
            //     $return_value['status_code'] = 0;
            //     $return_value['status_message'] = 'Execute Success';
            //     $return_value['data_set'] = $ds;
            //     $return_value['sql'] = $sql;
            // }
            
            // else{
            //     $return_value['status_code'] = -1;
            //     $return_value['status_message'] = '沒有收到廠商資料';
            //     $return_value['sql'] = $sql;
            // }
            
            return json_encode($return_value);
        }        
    }
?>