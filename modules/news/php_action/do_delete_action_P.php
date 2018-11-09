<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/news/php_action/news_model.php';
    
    
    class do_delete_action_P implements action_listener{
        public function actionPerformed(event_message $em) {
            $newsID= $_POST['newsID'];
        
            $news_model = new news_model();
            $data = $news_model->delete_news($newsID);
            
            return json_encode($data);
        }
    }
?>