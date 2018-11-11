<?php
    // require_once 'include/php/action_listener.php';
    // require_once 'include/php/event_message.php';
    //require_once 'include/php/PDO_mysql.php';
    require_once 'include/php/model.php';
    
    class repair_company_model extends model{
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
        public function get_something_from_repair_company_profile($something,$where){
            $sql ="SELECT $something FROM `repair_company_profile` WHERE $where";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchall();
            if ($result != null) {
                 $return_value = $result;
             }
            return $return_value;   

        }
        public function get_something_from_repair_company_type($something,$where){
            $sql ="SELECT $something FROM `repair_company_type` WHERE $where";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchall();
            if ($result != null) {
                 $return_value = $result;
             }
            return $return_value;

        }
        public function insert_new_repair_company($name,$contactor,$address,$phone){
            $sql ="INSERT INTO `repair_company_profile` (`id`, `name`, `contactor`, `address`, `phone`) VALUES (NULL,'$name', '$contactor', '$address', '$phone')";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
        }
        public function update_new_repair_company($name,$contactor,$address,$phone,$companyID){
            $sql="UPDATE repair_company_profile SET name=:name, contactor=:contactor, address=:address , phone=:phone Where repair_company_profile.id=$companyID";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(array(':name'=>$name,  ':contactor'=>$contactor ,':address'=>$address, ':phone'=>$phone));
        }
        public function delete_repair_company($companyId){
            $sql="DELETE FROM repair_company_profile WHERE id = $companyId";
            $stmt = $this->conn->prepare($sql);
            $return_value = $stmt->execute();
            return $return_value;
        }
        
        
            public function insert_repair_company_type($repair_type_id,$repair_company_id){
            $sql ="INSERT INTO `repair_company_type` (`id`, `repair_type_id`,`repair_company_id`) VALUES (NULL,'$repair_type_id','$repair_company_id')";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
        }
        
        public function get_repair_company_profile_by_id($id){
            $sql = "SELECT id, name, contactor, address ,phone, FROM repair_company_profile where id=?";
            $stmt = $this->conn->prepare($sql);
            $result = $stmt->execute(array($id));
            if($result){
                $ds = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $return_value['status_code'] = 0;
                $return_value['status_message'] = 'Execute Success';
                $return_value['data_set'] = $ds;
            }
            else{
                $return_value['status_code'] = -1;
                $return_value['status_message'] = 'SQL Execute Error in (repair_company_profile, get_repair_company_profile_by_id)';
                $return_value['sql'] = $sql;
            }
            return $return_value;
        }
        public function get_something_from_repair_company_profile_P($something,$where){
            $sql ="SELECT $something FROM `repair_company_profile` WHERE $where";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchall();
            if ($result != null) {
                 $return_value = $result;
             }
            return $return_value;   

        }
        public function get_something_from_repair_company_join($something,$join,$where){//從case_profile取
            $sql ="SELECT ".$something." FROM `repair_company_profile` $join WHERE $where";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchall();
            if ($result != null) {
                $return_value = $result;
            }
            return $return_value;

        }
        public function update_new_repair_company_type($repair_type_id){
            $sql="UPDATE repair_company_type SET repair_type_id=:repair_type_id, repair_company_id=:repair_company_id Where repair_company_id=$companyID";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute(array(':repair_type_id'=>$repair_type_id ));
        }
        
       
        public function get_com_data($where){
            $sql ="SELECT repair_company_profile.name,repair_company_profile.contactor,repair_type.namech,repair_company_profile.id ,repair_company_profile.address,repair_company_profile.phone FROM `repair_company_profile` JOIN repair_company_type ON repair_company_profile.id=repair_company_type.repair_company_id JOIN repair_type ON repair_company_type.repair_type_id = repair_type.id  where $where GROUP by repair_company_profile.id,repair_type.namech";
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