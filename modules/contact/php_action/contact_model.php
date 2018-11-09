<?php
    // require_once 'include/php/action_listener.php';
    // require_once 'include/php/event_message.php';
    //require_once 'include/php/PDO_mysql.php';
    require_once 'include/php/model.php';
    
    class contact_model extends model{
        public function __construct() {
            parent::__construct();
        }
        
        public function insert_new_contact($datetime,$content,$case_id){
            $sql ="INSERT INTO `contact_history` (`id`, `contact_datetime`, `content`, `case_id`) VALUES (NULL, '$datetime', '$content', '$case_id');";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
        }
        public function get_something_from_contact_history($something,$where){
            $sql ="SELECT $something FROM `contact_history` WHERE $where";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchall();
            if ($result != null) {
                 $return_value = $result;
             }
            return $return_value;

        }
       
        
    }
    
?>