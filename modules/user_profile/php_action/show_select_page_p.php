<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/user_profile/php_action/user_profile_model.php';
    
    
    class show_select_page_p implements action_listener{
        public function actionPerformed(event_message $em) {
            $user = new user_profile_model();
            $data=[];
            $userAll = $user->get_something_from_user_profile_p('*','1 ORDER BY id DESC');
            foreach($userAll as $key => $userOne){
                $sumAll=[];
                $sumAll=['user' => $userOne];
                array_push($data,$sumAll);
            }
            return json_encode($data);
        }
    }
?>