<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/news/php_action/news_model.php';

    
    class do_insert_action_P implements action_listener{
        public function actionPerformed(event_message $em) {
            //  $data=[]; 
        //   $newsID = $_POST['newsID'];
            $post = $em->getPost();
            $title =$post['title'];
            $topic = $post['topic'];
            $content = $post['content'];
            $img=$post['inimg'];
            


            $news_model = new news_model();
            ini_set ( 'date.timezone' , 'Asia/Taipei' );
			date_default_timezone_set('Asia/Taipei');
		    $date=date("Y-m-d");
            $return_value = $news_model->insert_new_news($title,$topic,$content,$date);
            $news_id=$news_model->get_last_insert();
			$return_value['news_id']=$news_id;
            
            
            
            if($img){
				$img = str_replace('data:image/jpeg;base64,', '', $img);
				$img = str_replace(' ', '+', $img);
				$data = base64_decode($img);
				$fileName = $news_id.'.jpeg';
				file_put_contents("/home/ubuntu/workspace/news_img/".$fileName, $data);
				$return_value['img'] = 'inimg'.$img;
			}
            
          
            $return_value['status_code'] = 0;   
		    


            return json_encode($return_value);
        }        
    }
?>

