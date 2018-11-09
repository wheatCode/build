<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/news/php_action/news_model.php';


    class do_select_search_action_P implements action_listener{
        public function actionPerformed(event_message $em) {
            $selectTopic = $_POST['selectTopic'];
            $selectDate = $_POST['selectDate'];

            if(isset($_SESSION['useracc'])){
			    $user_id=$_SESSION['userid'];
		    }

            
           if($selectTopic){
                $where .='topic LIKE "%'.$selectTopic.'%"';
                if($selectDate){
                    $where .=' AND date LIKE "%'.$selectDate.'%"';
                    
                }
            }else if($selectDate){
                    $where .='date LIKE "%'.$selectDate.'%"';
                    
            }
            else{
                $where.="1";
            }
            
            $where .=" ORDER BY id DESC"; 
            
            
            
            
            $news_model_data=$news_model->get_something_from_news("*",$where);
            $news_model = new news_model();
            $news_model_data=$news_model->get_something_from_news("*","1 ORDER BY date DESC");
            $return_value['news_model_data']=$news_model_data;
            $return_value['status_code'] = 0;
            return json_encode($return_value);
        }
    }
?>