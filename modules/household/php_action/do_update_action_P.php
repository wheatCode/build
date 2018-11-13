<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/household/php_action/household_model.php';

    
    class do_update_action_P implements action_listener{
        public function actionPerformed(event_message $em) {
            $post = $em->getPost();
            $housepid=$post['housepid'];
            $housepnum=$post['num'];
            $housepadd=$post['add'];
            $houseflow=$post['flow'];
            $test_test=$post['test_test'];
            $household = new household_model();
                $sm = $household->update_household_profile_P($housepid,$housepnum,$housepadd,$houseflow);
            
            if($test_test!="null"){
                $ym = $household->insert_household_user_P($test_test,$housepid);
            }else{
                $ym=true;
            }
             if($sm){
                $return_value['status_code'] = 0;
                $return_value['sm']=$sm;
                $return_value['ym']=$ym;
                // $return_value['1']=$housepid;
                // $return_value['2']=$housepnum;
                // $return_value['3']=$housepadd;
                // $return_value['4']=$houseflow;
            }
            else{
                $return_value['status_code'] = -1;
                $return_value['status_message'] = 'error';
                $return_value['sql'] = $sm;
            }
            return json_encode($return_value);
        }        
    }
?>