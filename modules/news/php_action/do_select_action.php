<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/news/php_action/news_model.php';
    
    class do_select_action implements action_listener{
        public function actionPerformed(event_message $em) {
            
            $news=new news_model();
            
            $news_info=$news->get_something_from_news('*','1 order by date asc LIMIT 10');
            
            $imgarr=array();
            $newsi;
            for($i=0;$i<sizeof($news_info);$i++){
                $news_id=$news_info[$i]["id"];
                try{
                    if(file_exists("/news_img/".$news_id.".jpeg")){
                        $filedata=file_get_contents("/news_img/".$news_id.".jpeg");
                        $newsi=base64_encode($filedata);
                        $newsi="data:image/jpeg;base64,".$newsi;
                        array_push($imgarr,$newsi);
                    }
                    else{
                        if(file_exists("/news_img/hyl.jpeg")){
                            $filedata=file_get_contents("/news_img/hyl.jpeg");
                        $newsi=base64_encode($filedata);
                        $newsi="data:image/jpeg;base64,".$newsi;
                        array_push($imgarr,$newsi);
                            
                        }else{
                            $newsi="/news_img/".$news_id.".jpeg";
                            array_push($imgarr,$newsi);
                        }
                        
                    }
                }catch (Exception $e) {}
            }
            
            if($news_info){
                $return_value['status_code'] = 0;
                $return_value['status_message'] = 'Execute Success';
                $return_value['news_info'] = $news_info;
                $return_value['news_img'] = $imgarr;
                
            }
            else{
                $return_value['status_code'] = -1;
                $return_value['status_message'] = 'Execute error';
                
            }
            

            return json_encode($return_value);
        }        
    }
?>


