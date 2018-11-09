<?php
    // require_once 'include/php/action_listener.php';
    // require_once 'include/php/event_message.php';
    require_once 'include/php/model.php';
    //require_once 'include/php/PDO_mysql.php';
    
    class public_facilities_model extends model{
        public function __construct() {
            parent::__construct();
        }
        
        public function get_something_from_public_facilities($something,$where){//從household_profile(戶)取
            $sql ="SELECT ".$something." FROM `public_facilities` WHERE $where";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchall();
            if ($result != null) {
                $return_value = $result;
            }
            return $return_value;

        }
        
        public function insert_new_public_facilities($construction_project_id,$location){
            $sql ="INSERT INTO `public_facilities` (`id`, `construction_project_id`, `location`) VALUES (NULL, '$construction_project_id', '$location')";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
        }
        
        
    }
    
?>
