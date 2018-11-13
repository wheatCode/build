<?php
    // require_once 'include/php/action_listener.php';
    // require_once 'include/php/event_message.php';
    //require_once 'include/php/PDO_mysql.php';
    require_once 'include/php/model.php';
    
    class news_model extends model{
        public function __construct() {
            parent::__construct();
        }
        
        public function insert_new_news($topic,$content,$date){
            $sql ="INSERT INTO `announcement` (`id`, `topic`, `content`, `date`) VALUES (NULL, '$topic', '$content', '$date');";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            
            $sql ="SELECT c_key FROM notice_key WHERE c_key is not null";
                $stmt = $this->conn->prepare($sql);
                $stmt->execute();
                $allckey = $stmt->fetchall();
                $alluser=array();
                for($i=0;$i<sizeof($allckey);$i++){
                    array_push($alluser,$allckey[$i]['c_key']);
                    //$allckey[$i]['c_key'];
                }
                $post_json['registration_ids'] = $alluser;
                $post_json['data']['body'] =$content;
                $post_json['data']['title'] =$topic;
                $post_json['notification']['body'] =$content;
                $post_json['notification']['title'] =$topic;
                $skey = 'AAAAAnytK_o:APA91bGhQ93p3Tdlc2qqJQdo1L1v1fZkLWoXDGZ4dTiJo71snsEDm64C8HdD45UJLp4pWNk1Kr3Vr74ZdQCAHo4eNflvRjqwwGUJDGGcsgJoFMKBvxOtGt2z0VND6P8NAKQWeTD5mSgU';
                
                $data = json_encode($post_json);
                //FCM API end-point
                $url = 'https://fcm.googleapis.com/fcm/send';
                //api_key in Firebase Console -> Project Settings -> CLOUD MESSAGING -> Server key
                $server_key =$skey;
                //header with content_type api key
                $headers = array(
                    'Content-Type:application/json',
                    'Authorization:key='.$server_key
                );
                //CURL request to route notification to FCM connection server (provided by Google)
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, $url);
                curl_setopt($ch, CURLOPT_POST, true);
                curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
                curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
                $result = curl_exec($ch);
                if ($result === FALSE) {
                    die('Oops! FCM Send Error: ' . curl_error($ch));
                }
                curl_close($ch);
            
        }
        public function get_something_from_news($something,$where){
            $sql ="SELECT $something FROM `announcement` WHERE $where";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchall();
            if ($result != null) {
                 $return_value = $result;
             }
            return $return_value;

        }
        public function get_something_from_announcement_img($something,$where){
            $sql ="SELECT $something FROM `announcement_image` WHERE $where";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchall();
            if ($result != null) {
                 $return_value = $result;
             }
            return $return_value;

        }
        
        
         public function delete_news($newsID){
            $sql="DELETE FROM announcement WHERE id = $newsID";
            $stmt = $this->conn->prepare($sql);
            $return_value = $stmt->execute();
            return $return_value;
        }
        
        public function insert_new_news_image($path,$announcement_id){
            $sql ="INSERT INTO `announcement` (`id`, `path`, `announcement_id`) VALUES (NULL, '$path', '$announcement_id');";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
        }
        public function update_news($topic,$content,$date,$newsID){
            $sql="UPDATE announcement SET topic=:topic, content=:content, date=:date  Where announcement.id=$newsID";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(array(':topic'=>$topic,  ':content'=>$content ,':date'=>$date));
        }
        public function get_last_insert(){
            $sql ="select LAST_INSERT_ID();";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchall();
            if ($result != null) {
                 $return_value = $result;
             }
            return $return_value[0][0];

        }
        
       
        
    }
    
?>