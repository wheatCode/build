<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/user_profile/php_action/user_profile_model.php';
    
    class do_select_action implements action_listener{
        public function actionPerformed(event_message $em) {
//             if(isset($_SESSION['useracc'])){
// 			$userid=$_SESSION['userid'];
// 		    }
// 		    $user_model = new user_profile_model();
// 		    $user_info = $user_model->get_something_from_user_profile("*","user_profile.id=".$userid);
            $conn = PDO_mysql::getConnection();
            $sql = "SELECT * FROM user_profile";
            $post = $em->getPost();
            $where_statement = $post['where_statement'];
            if($where_statement != ""){
                $sql .= " where $where_statement";
            }
            $stmt = $conn->prepare($sql);
            $result = $stmt->execute();
            if($result){
                $ds = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $return_value['status_code'] = 0;
                $return_value['status_message'] = 'Execute Success';
                $return_value['data_set'] = $ds;
                $return_value['sql'] = $sql;
            }
            else{
                $return_value['status_code'] = -1;
                $return_value['status_message'] = 'SQL Execute Error in (user_profile, do_select_action)';
                $return_value['sql'] = $sql;
            }
            return json_encode($return_value);
        }        
    }
?>