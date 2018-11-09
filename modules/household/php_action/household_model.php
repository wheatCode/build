<?php
    // require_once 'include/php/action_listener.php';
    // require_once 'include/php/event_message.php';
    require_once 'include/php/model.php';
    //require_once 'include/php/PDO_mysql.php';
    
    class household_model extends model{
        public function __construct() {
            parent::__construct();
        }
        public function get_something_from_household_user($something,$where){//從household_user取
            $sql ="SELECT ".$something." FROM `household_user` WHERE $where";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchall();
            if ($result != null) {
                $return_value = $result;
            }
            return $return_value;

        }
        public function get_something_from_household_profile($something,$where){//從household_profile(戶)取
            $sql ="SELECT ".$something." FROM `household_profile` WHERE $where";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchall();
            if ($result != null) {
                $return_value = $result;
            }
            return $return_value;

        }
        public function get_something_from_household_profile_P($something,$where){//從household_profile(戶)取
            $sql ="SELECT ".$something." FROM `household_profile` WHERE $where";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchall();
            if ($result != null) {
                $return_value = $result;
            }
            return $return_value;

        }
        public function get_something_from_household_user_P($something,$where){//從household_user取
            $sql ="SELECT ".$something." FROM `household_user` WHERE $where";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchall();
            if ($result != null) {
                $return_value = $result;
            }
            return $return_value;

        }
        public function insert_household_profile($construction_project_id,$number,$address,$floor){
            $sql="INSERT INTO `household_profile` ( `construction_project_id`,`number`,`address`,`floor`) VALUES ( '$construction_project_id','$number','$address','$floor')";
            $stmt = $this->conn->prepare($sql);
            $return_value = $stmt->execute();
            return $return_value;
        }
        public function delete_household_profile($houseId){
            $sql="DELETE FROM household_profile WHERE id = $houseId";
            $stmt = $this->conn->prepare($sql);
            $return_value = $stmt->execute();
            return $return_value;
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
        public function get_something_from_household_user_join($something,$join,$where){//從household_user取
            $sql ="SELECT ".$something." FROM `household_user` JOIN $join WHERE $where";
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
