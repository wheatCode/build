<?php
    // require_once 'include/php/action_listener.php';
    // require_once 'include/php/event_message.php';
    require_once 'include/php/model.php';
    //require_once 'include/php/PDO_mysql.php';
    
    class building_model extends model{
        public function __construct() {
            parent::__construct();
        }
        public function get_something_from_construction_project($something,$construction_project_id){
            $sql ="SELECT ".$something." FROM `construction_project` WHERE `id` = $construction_project_id";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchall();
            if ($result != null) {
                $return_value = $result;
            }
            return $return_value;

        }
        public function get_id_from_construction_project($something,$manage_id){//取得用戶之建案名稱
            $sql ="SELECT ".$something." FROM `construction_project` WHERE construction_project.manage_id=$manage_id";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchall();
            if ($result != null) {
                $return_value = $result;
            }
            return $return_value;

        }
        
        public function get_construction_project_data($something,$wherestament){//取得用戶之建案名稱
            $sql ="SELECT ".$something." FROM `construction_project` WHERE ".$wherestament;
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchall();
            if ($result != null) {
                $return_value = $result;
            }
            return $return_value;

        }
        public function insert_building($constructionname,$manage_id){
            $sql="INSERT INTO `construction_project` ( `name`,`manage_id`) VALUES ( '$constructionname','$manage_id')";
            $stmt = $this->conn->prepare($sql);
            $return_value = $stmt->execute();
            return $return_value;
        }
        public function delete_building($constructorId){
            $sql="DELETE FROM construction_project WHERE id = $constructorId";
            $stmt = $this->conn->prepare($sql);
            $return_value = $stmt->execute();
            return $return_value;
        }
    }
    
?>
