<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/news/php_action/news_model.php';


    class show_update_page_P implements action_listener{
        public function actionPerformed(event_message $em) {
            
            $post = $em->getPost();
		    $news_id = $post['nid'];
            $newsi="";
            $filedata="";
            if(file_exists("/news_img/".$news_id.".jpeg")){
                $filedata=file_get_contents("/news_img/".$news_id.".jpeg");
                $newsi=base64_encode($filedata);
                $newsi="data:image/jpeg;base64,".$newsi;
                $return_value['news_img'] = $newsi;
                
            }
            $return_value['news_img'] = $newsi;
            $return_value['status_code'] = 0;
            return json_encode($return_value);
        }
    }
?>