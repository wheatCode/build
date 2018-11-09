<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/user_profile/php_action/user_profile_model.php';

    class do_select_search_action_p implements action_listener{
        public function actionPerformed(event_message $em) {
            $selectAccount = $_POST['selectAccount'];
            $selectUserName = $_POST['selectUserName'];
            $selectUserCharacter = $_POST['selectUserCharacter'];
            $data=[];
            
            $user = new user_profile_model();

            if($selectAccount){
                $where .='account LIKE "%'.$selectAccount.'%"';
                if($selectUserName){
                    $where .=' AND name LIKE "%'.$selectUserName.'%"';
                    if($selectUserCharacter){
                         $where .=' AND type = "'.$selectUserCharacter.'"';
                    }
                }
            }else if($selectUserName){
                    $where .='name LIKE "%'.$selectUserName.'%"';
                    if($selectUserCharacter){
                        $where .=' AND type = "'.$selectUserCharacter.'"';
                    }
            }else if($selectUserCharacter){
                $where .='type = "'.$selectUserCharacter.'"';
            }else{
                $where.="1";
            }
            
            $where .=" ORDER BY id DESC";
            $userAll = $user->get_something_from_user_profile_p('*',$where);
            
            if($userAll){
                foreach($userAll as $key => $userOne){
                    $sumAll=[];
                    $sumAll=['user' => $userOne];
                    array_push($data,$sumAll);
                }
            }
            return json_encode($data);
        }
    }
?>