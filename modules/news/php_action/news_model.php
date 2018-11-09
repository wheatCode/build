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