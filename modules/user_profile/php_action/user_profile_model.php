<?php
    // require_once 'include/php/action_listener.php';
    // require_once 'include/php/event_message.php';
    require_once 'include/php/model.php';
    //require_once 'include/php/PDO_mysql.php';
    
    class user_profile_model extends model{
        public function __construct() {
            parent::__construct();
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
        public function get_user_profile_join($something,$join,$where){
            $sql ="SELECT $something FROM `user_profile` join $join WHERE $where";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchall();
            return $result;

        }
        public function insert_user_profile($account,$password,$name,$phone,$type){
            $sql="INSERT INTO `user_profile` ( `account`,`password`,`name`,`phone`,`type` ) VALUES ( '$account','$password','$name','$phone','$type')";
            $stmt = $this->conn->prepare($sql);
            $return_value = $stmt->execute();
            return $return_value;
        }
        public function delete_user_profile($userId){
            $sql="DELETE FROM user_profile WHERE id = $userId";
            $stmt = $this->conn->prepare($sql);
            $return_value = $stmt->execute();
            return $return_value;
        }
        public function get_something_from_user_profile($something,$where){
            //$sql ="SELECT * FROM `user_profile` JOIN household_user on user_profile.id=household_user.user_profile_id JOIN household_profile ON household_user.household_profile_id=household_profile.id  WHERE user_profile.id=$user";
            $sql="SELECT ".$something." FROM `user_profile` WHERE $where";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchall();
            if ($result != null) {
                $return_value['data_set'] = $result;
            }
            return $return_value;

        }
        public function get_something_from_user_profile_p($something,$where){
            //$sql ="SELECT * FROM `user_profile` JOIN household_user on user_profile.id=household_user.user_profile_id JOIN household_profile ON household_user.household_profile_id=household_profile.id  WHERE user_profile.id=$user";
            $sql="SELECT ".$something." FROM `user_profile` WHERE $where";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchall();
            if ($result != null) {
                $return_value = $result;
            }
            return $return_value;

        }
        public function update_user_info($name,$phone,$account,$password,$type,$user){
            $sql="UPDATE user_profile SET name=:name, phone=:phone, account=:account, password=:password, type=:type Where user_profile.id=$user";
            $stmt = $this->conn->prepare($sql);
            $return_value = $stmt->execute(array(':name'=>$name, ':phone'=>$phone, ':account'=>$account ,':password'=>$password,':type'=>$type));
            // if ($result != null) {
            //     $return_value['data_set'] = $result;
            // }
            return $return_value;
        }
        public function update_user_other($name,$phone,$account,$user){
            $sql="UPDATE user_profile SET name=:name, phone=:phone, account=:account Where user_profile.id=$user";
            $stmt = $this->conn->prepare($sql);
            $return_value = $stmt->execute(array(':name'=>$name, ':phone'=>$phone, ':account'=>$account));
            // if ($result != null) {
            //     $return_value['data_set'] = $result;
            // }
            return $return_value;
        }
        public function update_password($password,$user){
            $sql="UPDATE user_profile SET password=:password Where user_profile.id=$user";
            $stmt = $this->conn->prepare($sql);
            $return_value = $stmt->execute(array(':password'=>$password));
            // if ($result != null) {
            //     $return_value['data_set'] = $result;
            // }
            return $return_value;
        }
    }
    
?>
