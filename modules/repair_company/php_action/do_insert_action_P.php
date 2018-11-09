<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/repair_company/php_action/repair_company_model.php';

    
    class do_insert_action_P implements action_listener{
        public function actionPerformed(event_message $em) {
            //  $data=[]; 
            $name = $_POST['name'];
            $contactor = $_POST['contactor'];
            $address = $_POST['address'];
            $phone = $_POST['phone'];
            $repair_type_id = $_POST['service'];
            $repair_type_id2 = $_POST['service2'];
            $repair_type_id3 = $_POST['service3'];
            

            // $service = $_POST['service'];
            
            // $case = new case_model();
            // $data=[$name,$address,$phone,$contactor,$service];
    
		  //  $case_model= new case_model();
		    $repair_company_model= new repair_company_model();
		    $repair_company_model->insert_new_repair_company($name,$contactor,$address,$phone);
			$return_value['status_code'] = 0;
			$repair_company_id=$repair_company_model->get_last_insert();
			$return_value['repair_company_id']=$repair_company_id;
            $repair_company_model->insert_repair_company_type($repair_type_id,$repair_company_id);
			if($repair_type_id2 != null){
				$repair_company_model->insert_repair_company_type($repair_type_id2,$repair_company_id);
			}
			if($repair_type_id3 != null ){
				$repair_company_model->insert_repair_company_type($repair_type_id3,$repair_company_id);
			}	
// 			$return_value['repair'] =$repair_company_model ;
			$return_value['status_code'] = 0;
			$return_value['$return_value2']=$repair_type_id2;
			$return_value['$return_value3']=$repair_type_id3;

			

            return json_encode($return_value);
        }        
    }
?>

