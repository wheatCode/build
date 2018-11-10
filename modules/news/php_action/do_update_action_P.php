<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/news/php_action/news_model.php';

    
    class do_update_action_P implements action_listener{
        public function actionPerformed(event_message $em) {
            //  $data=[]; 
            $post=$em->getPost();
            $newsID = $post['newsID'];
            $content = $post['newstextarea'];
            $topic = $post['topic'];
            $date = $post['date'];
        
            $news_model = new news_model();
            $return_value = $news_model->update_news($topic,$content,$date,$newsID);
            
			

            return json_encode($return_value);
        }        
    }
?>

