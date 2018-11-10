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
            
            //SELECT notice.id FROM `notice` order by notice.id desc LIMIT 1
            $sql ="SELECT notice.id FROM `notice` order by notice.id desc LIMIT 1";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchall();
            $notice_id=$result[0][0];
            
            if($type!= "enew"){
                //SELECT c_key FROM `notice` JOIN case_profile ON notice.case_profile_id=case_profile.id JOIN household_user ON case_profile.household_user_id = household_user.id JOIN user_profile ON household_user.user_profile_id = user_profile.id JOIN notice_key ON notice_key.user_profile_id = user_profile.id WHERE notice.id=43
                $sql ="SELECT c_key FROM `notice` JOIN case_profile ON notice.case_profile_id=case_profile.id JOIN household_user ON case_profile.household_user_id = household_user.id JOIN user_profile ON household_user.user_profile_id = user_profile.id JOIN notice_key ON notice_key.user_profile_id = user_profile.id WHERE notice.id=$notice_id";
                $stmt = $this->conn->prepare($sql);
                $stmt->execute();
                $result = $stmt->fetchall();
                $post_json['to'] = $result[0][0];
                $post_json['data']['body'] =$message;
                $post_json['data']['title'] =$title;
                $post_json['notification']['body'] =$message;
                $post_json['notification']['title'] =$title;
                $skey = 'AAAAAnytK_o:APA91bGhQ93p3Tdlc2qqJQdo1L1v1fZkLWoXDGZ4dTiJo71snsEDm64C8HdD45UJLp4pWNk1Kr3Vr74ZdQCAHo4eNflvRjqwwGUJDGGcsgJoFMKBvxOtGt2z0VND6P8NAKQWeTD5mSgU';
            }else{
                //SELECT construction_project.manage_id FROM `notice` JOIN case_profile ON notice.case_profile_id=case_profile.id JOIN household_user ON case_profile.household_user_id = household_user.id JOIN household_profile ON household_user.household_profile_id=household_profile.id JOIN construction_project ON household_profile.construction_project_id=construction_project.id WHERE notice.id=105
                $sql ="SELECT construction_project.manage_id FROM `notice` JOIN case_profile ON notice.case_profile_id=case_profile.id JOIN household_user ON case_profile.household_user_id = household_user.id JOIN household_profile ON household_user.household_profile_id=household_profile.id JOIN construction_project ON household_profile.construction_project_id=construction_project.id WHERE notice.id=$notice_id";
                $stmt = $this->conn->prepare($sql);
                $stmt->execute();
                $manage_id = $stmt->fetchall();
                $sql ="SELECT e_key FROM `notice_key` WHERE notice_key.user_profile_id=".$manage_id[0][0];
                $stmt = $this->conn->prepare($sql);
                $stmt->execute();
                $e_key= $stmt->fetchall();
                $post_json['to'] = $e_key[0][0];
                $post_json['data']['body'] =$message;
                $post_json['data']['title'] =$title;
                $post_json['notification']['body'] =$message;
                $post_json['notification']['title'] =$title;
                //       AAAAJ6a476E:APA91bG-pNCiYmUvj-BueiHFfbDSqWbVe6GaCsAtAniZ6B6bk5kJmRSsMTJZkMRAM41-4Kc2OgsXvGpAvBr7WJiJJgkZKsIQ79YRtlP_7XvdLuk4bDo6UiAkLtUQCuH6I6uxdbHTHtUl
                $skey = 'AAAAJ6a476E:APA91bG-pNCiYmUvj-BueiHFfbDSqWbVe6GaCsAtAniZ6B6bk5kJmRSsMTJZkMRAM41-4Kc2OgsXvGpAvBr7WJiJJgkZKsIQ79YRtlP_7XvdLuk4bDo6UiAkLtUQCuH6I6uxdbHTHtUl';
            }
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