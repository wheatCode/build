<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/case/php_action/case_model.php';
    require_once 'modules/repair_company/php_action/repair_company_model.php';
    

    class do_select_search_action_P implements action_listener{
        public function actionPerformed(event_message $em) {
            $post = $em->getPost();
            $selectName = $_POST['selectName'];
            $selectContactor = $_POST['selectContactor'];
            //$selectType = $_POST['selectType'];
            
            $repair_type_id=$post['repair_type_id'];
            
            
            if(isset($_SESSION['useracc'])){
			    $user_id=$_SESSION['userid'];
		    }
            $case_model = new case_model();
            $repair_company_model= new repair_company_model();
            
            
           if($selectName){
                $where .='repair_company_profile.name LIKE "%'.$selectName.'%"';
                if($selectContactor){
                    //$where .='repair_company_profile.contactor LIKE "%'.$selectContactor.'%"';
                    if($repair_type_id){
                         $where .=' AND repair_type_id = "'.$repair_type_id.'"';
                    }
                    
                }else{
                    $where .=' AND repair_company_profile.contactor LIKE "%'.$selectContactor.'%"';
                    if($repair_type_id){
                         $where .=' AND repair_type_id = "'.$repair_type_id.'"';
                    }
                }
            }else if($selectContactor !=""){
                    $where .='repair_company_profile.contactor LIKE "%'.$selectContactor.'%"';
                    if($repair_type_id){
                        $where .=' AND repair_type_id = "'.$repair_type_id.'"';
                    }
                    
            }
            else if($repair_type_id){
                    $where .='repair_type_id = "'.$repair_type_id.'"';
                    
            }
            else{
                $where="1";
            }
            
            $where .=" ORDER BY repair_company_profile.id DESC"; 
            
            
            
            
            $join="JOIN repair_company_type ON repair_company_profile.id=repair_company_type.repair_company_id JOIN repair_type ON repair_company_type.repair_type_id = repair_type.id";
            //$repair_company_data1=$repair_company_model->get_something_from_repair_company_join("repair_company_profile.id,repair_company_profile.name,repair_company_profile.contactor,repair_company_profile.address,repair_company_profile.phone,repair_company_type.repair_type_id,repair_company_type.repair_company_id,repair_type.name,repair_type.namech FROM `repair_company_profile`",$join,$where);
            $repair_company_data1=$repair_company_model->get_something_from_repair_company_join("*",$join,$where);
            
            
            $repair_company_data=$repair_company_model->get_something_from_repair_company_profile_P("*",$where);

//SELECT * FROM `repair_company_profile` JOIN repair_company_type ON repair_company_profile.id=repair_company_type.repair_company_id JOIN repair_type ON repair_company_type.repair_type_id = repair_type.id where name LIKE "%風城%" ORDER BY repair_company_profile.id DESC
//SELECT repair_company_profile.name,repair_company_profile.contactor,repair_type.namech,repair_company_profile.id FROM `repair_company_profile` JOIN repair_company_type ON repair_company_profile.id=repair_company_type.repair_company_id JOIN repair_type ON repair_company_type.repair_type_id = repair_type.id  where 1 GROUP by repair_company_profile.id,repair_type.namech

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
    
            $return_value['rctid']=$rctid;
            $return_value['data']=$repair_company_data1;
            $return_value['status_code'] = 0;
            $return_value['where']=$where;
            $return_value['con']=$selectContactor;
            return json_encode($return_value);
        }
    }
?>