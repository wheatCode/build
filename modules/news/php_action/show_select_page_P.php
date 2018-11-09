<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/news/php_action/news_model.php';
    class show_select_page_P implements action_listener{
        public function actionPerformed(event_message $em) {
             if(isset($_SESSION['useracc'])){
			    $user_id=$_SESSION['userid'];
		    }
            $news_model = new news_model();
            $news_model_data=$news_model->get_something_from_news("*","1 ORDER BY date DESC");
            $return_value['news_model_data']=$news_model_data;
            $return_value['status_code'] = 0;
           
            
            return json_encode($return_value);
        }        
    }
?>