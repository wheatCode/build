<?php
    // require_once 'include/php/action_listener.php';
    // require_once 'include/php/event_message.php';
    //require_once 'include/php/PDO_mysql.php';
    require_once 'include/php/model.php';
    
    class notice_model extends model{
        public function __construct() {
            parent::__construct();
        }
        public function insert_new_notice($type,$case_id,$message,$title){
            $sql ="INSERT INTO `notice` (`id`, `type`, `case_profile_id`, `message`, `title`) VALUES (NULL, '$type', '$case_id', '$message', '$title');";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
        }
        public function get_notice_join($something,$join,$where){
            $sql ="SELECT $something FROM `notice` join $join WHERE $where";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchall();
            return $result;

        }
        // public function get_last_insert(){
        //     $sql ="select LAST_INSERT_ID();";
        //     $stmt = $this->conn->prepare($sql);
        //     $stmt->execute();
        //     $result = $stmt->fetchall();
        //     if ($result != null) {
        //          $return_value = $result;
        //      }
        //     return $return_value[0][0];

        // }
        // public function get_something_from_repair_history($something,$where){
        //     $sql ="SELECT $something FROM `repair_history_profile` WHERE $where";
        //     $stmt = $this->conn->prepare($sql);
        //     $stmt->execute();
        //     $result = $stmt->fetchall();
        //     if ($result != null) {
        //          $return_value = $result;
        //      }
        //     return $return_value;

        // }
        
         
        // public function update_repair_history($something,$where){
        //     $sql ="UPDATE `repair_history_profile` SET $something WHERE $where";
        //     $stmt = $this->conn->prepare($sql);
        //     $stmt->execute();

        // }
    }
    
?>