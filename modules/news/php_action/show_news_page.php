<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/news/php_action/news_model.php';
    
    class show_news_page implements action_listener{
        public function actionPerformed(event_message $em) {
            
            
            $post = $em->getPost();
		    $news_id = $post['nid'];
		    $newsi="";
            $news=new news_model();
            
            
            
            $news_info=$news->get_something_from_news('*',"id=".$news_id);
            
            if(file_exists("/news_img/".$news_id.".jpeg")){
                $filedata=file_get_contents("/news_img/".$news_id.".jpeg");
                $newsi=base64_encode($filedata);
                $newsi=$newsi;
                
            }
            else{
                $filedata=file_get_contents("/news_img/hyl.jpeg");
                $newsi=base64_encode($filedata);
                $newsi=$newsi;
            }
            
            
            if($news_info){
                $return_value['status_code'] = 0;
                $return_value['status_message'] = 'Execute Success';
                $return_value['news_info'] = $news_info;
                $return_value['news_img'] = "/news_img/".$news_id.".jpeg";
            }
            else{
                $return_value['status_code'] = -1;
                $return_value['status_message'] = 'Execute error';
                
            }
            

            return json_encode($return_value);
        }        
    }
?>


