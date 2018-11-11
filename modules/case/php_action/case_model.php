<?php
    // require_once 'include/php/action_listener.php';
    // require_once 'include/php/event_message.php';
    require_once 'include/php/model.php';
    //require_once 'include/php/PDO_mysql.php';
    
    class case_model extends model{
        public function __construct() {
            parent::__construct();
        }
        public function insert_new_case($household_user_id,$repair_type_id,$title, $content,$start_datetime){
            $sql ="INSERT INTO `case_profile` (`id`, `status`, `household_user_id`, `repair_type_id`, `title`, `content`, `user_rank`, `user_comment`, `start_datetime`, `end_datetime`) VALUES (NULL, 'new', '$household_user_id', '$repair_type_id', '$title', '$content', NULL, NULL, '$start_datetime', NULL)";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
        }
        
        public function get_case_id($household_user_id,$start_datetime){
            $sql ="SELECT id FROM `case_profile` WHERE household_user_id=$household_user_id and start_datetime='$start_datetime'";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchall();
            if ($result != null) {
                 $return_value = $result;
             }
            return $return_value[0][0];
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
        public function get_something_from_case_profile($something,$where){//從case_profile取
            $sql ="SELECT ".$something." FROM `case_profile` WHERE $where";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchall();
            if ($result != null) {
                $return_value = $result;
            }
            return $return_value;

        }
        public function get_something_from_repair_type($something,$where){//從repair_type(戶)取
            $sql ="SELECT ".$something." FROM `repair_type` WHERE $where";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchall();
            if ($result != null) {
                $return_value = $result;
            }
            return $return_value;

        }
        
        public function update_case_profile($something,$where){
            $sql ="UPDATE `case_profile` SET $something WHERE $where";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
        }
        public function update_repair_type($something,$where){
            $sql ="UPDATE `repair_type` SET $something WHERE $where";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
        }
        public function get_something_from_case_profile_join($something,$join,$where){//從case_profile取
            $sql ="SELECT ".$something." FROM `case_profile` $join WHERE $where";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchall();
            if ($result != null) {
                $return_value = $result;
            }
            return $return_value;

        }
        public function get_p_case(){//從case_profile取
            $sql ="SELECT case_profile.id, start_datetime , repair_type.namech,construction_project.name, household_profile.number, user_profile.name FROM `case_profile` JOIN repair_type ON case_profile.repair_type_id = repair_type.id JOIN household_user ON case_profile.household_user_id = household_user.id JOIN household_profile ON household_profile.id = household_user.household_profile_id JOIN construction_project ON household_profile.construction_project_id = construction_project.id JOIN user_profile ON household_user.user_profile_id= user_profile.id ORDER by case_profile.id DESC";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchall();
            return $result;

        }
    }
    
?>
