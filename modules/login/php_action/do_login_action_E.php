<?php
    require_once 'include/php/action_listener.php';
    require_once 'include/php/event_message.php';
    require_once 'modules/user_profile/user_profile_api_E.php';
    //require_once  'modules/login/php_action/login_model.php';
    
    class do_login_action_E implements action_listener{
        public function actionPerformed(event_message $em) {
            $obj = user_profile_api_E::check_account($em);
            session_start();
            $post = $em->getPost();
            if($obj['data_set'][0]['id']!='' && $obj['data_set'][0]['id']!=null){
                $_SESSION['userid'] = $obj['data_set'][0]['id'];
                $_SESSION['user'] = $obj['data_set'][0]['name'];
                $_SESSION['useracc'] = $obj['data_set'][0]['account'];
            }
            
            $device_token_c = $post['device_token_c'];
            $device_token_e = $post['device_token_e'];
            $userid=$_SESSION['userid'];
            $user_profile_model=new user_profile_model();
            if($device_token_c != null){
                $user_profile_model->update_notice_key_c("'$device_token_c'",$userid);
            }
            if($device_token_e != null){
                $user_profile_model->update_notice_key_e("'$device_token_e'",$userid);
            }
            if($obj['status_code']== 0){ //0為登入成功 -100失敗(帳密錯誤)
                if($obj['data_set'][0]['id']!=null){
                    $obj['status_code']= 1;
                }
                //return json_encode($obj);
                /*
                 $tokenId    = base64_encode(openssl_random_pseudo_bytes(32));
                     $issuedAt   = time();
                     $notBefore  = $issuedAt + 10;  //Adding 10 seconds
                     $expire     = $notBefore + 60; // Adding 60 seconds
                     $serverName ='kuas'
                     //$serverName = $config->get('serverName');
                    
                     /*
                      * Create the token as an array
                      */
                      /*
                     $data = [
                         'iat'  => $issuedAt,         // Issued at: time when the token was generated
                         'jti'  => $tokenId,          // Json Token Id: an unique identifier for the token
                         'iss'  => $serverName,       // Issuer
                         'nbf'  => $notBefore,        // Not before
                         'exp'  => $expire,           // Expire
                         'data' => [                  // Data related to the signer user
                             'userId'   => $account, // userid from the users table
                             'userName' => $$return_value['data_set']['0']['name'], // User name
                         ]
                     ];
                    
                     header('Content-type: application/json');
                     /*
                      * Extract the key, which is coming from the config file. 
                      * 
                      * Best suggestion is the key to be a binary string and 
                      * store it in encoded in a config file. 
                      *
                      * Can be generated with base64_encode(openssl_random_pseudo_bytes(64));
                      *
                      * keep it secure! You'll need the exact key to verify the 
                      * token later.
                      */
                     //$secretKey = base64_decode($config->get('jwt')->get('key'));
                    
                     /*
                      * Extract the algorithm from the config file too
                      */
                     //$algorithm = $config->get('jwt')->get('algorithm');
                    
                     /*
                      * Encode the array to a JWT string.
                      * Second parameter is the key to encode the token.
                      * 
                      * The output string can be validated at http://jwt.io/
                      */
                      /*
                     $jwt = JWT::encode(
                         $data,      //Data to be encoded in the JWT
                         $secretKey, // The signing key
                         $algorithm  // Algorithm used to sign the token, see https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40#section-3
                         );
                        
                     $unencodedArray = ['jwt' => $jwt];
                     echo json_encode($unencodedArray);
                     */
            }
            
            
            return json_encode($obj);
        }        
    }

















// require_once ( 'include/php/action_listener.php');
// require_once ( 'include/php/event_message.php');
// require_once ( 'include/php/PDO_mysql.php');
//require_once ( 'modules/login/php_action/login_model.php');

// class do_login_action implements action_listener {
    
    // public function actionPerformed($em) {
         
         //em沒傳進來
        //  $post = $em->getPost();
        // $account=$post['Email'];
        // $passwd=$post['Password'];
        
        // $where_statement = $post['where_statement'];
        // $dologin = new login_model();
        // if ($return_value != NULL) {
        //         $_SESSION['login_user']=$account;
        //         $_SESSION['login_id']=$return_value['0']['member_id'];
        //         $return_value['status_code'] = 1;
        //         $return_value['status_message'] = 'Execute Success';
        //         $return_value['data_set'] = 'login Success';
                
        //         /*
        //         $tokenId    = base64_encode(openssl_random_pseudo_bytes(32));
        //             $issuedAt   = time();
        //             $notBefore  = $issuedAt + 10;  //Adding 10 seconds
        //             $expire     = $notBefore + 60; // Adding 60 seconds
        //             $serverName = $config->get('serverName');
                    
        //             /*
        //              * Create the token as an array
        //              */
        //           /*  $data = [
        //                 'iat'  => $issuedAt,         // Issued at: time when the token was generated
        //                 'jti'  => $tokenId,          // Json Token Id: an unique identifier for the token
        //                 'iss'  => $serverName,       // Issuer
        //                 'nbf'  => $notBefore,        // Not before
        //                 'exp'  => $expire,           // Expire
        //                 'data' => [                  // Data related to the signer user
        //                     'userId'   => $account, // userid from the users table
        //                     'userName' => $$return_value['data_set']['0']['name'], // User name
        //                 ]
        //             ];
                    
        //             header('Content-type: application/json');
        //             /*
        //              * Extract the key, which is coming from the config file. 
        //              * 
        //              * Best suggestion is the key to be a binary string and 
        //              * store it in encoded in a config file. 
        //              *
        //              * Can be generated with base64_encode(openssl_random_pseudo_bytes(64));
        //              *
        //              * keep it secure! You'll need the exact key to verify the 
        //              * token later.
        //              */
        //             //$secretKey = base64_decode($config->get('jwt')->get('key'));
                    
        //             /*
        //              * Extract the algorithm from the config file too
        //              */
        //             //$algorithm = $config->get('jwt')->get('algorithm');
                    
        //             /*
        //              * Encode the array to a JWT string.
        //              * Second parameter is the key to encode the token.
        //              * 
        //              * The output string can be validated at http://jwt.io/
        //              */
        //              /*
        //             $jwt = JWT::encode(
        //                 $data,      //Data to be encoded in the JWT
        //                 $secretKey, // The signing key
        //                 $algorithm  // Algorithm used to sign the token, see https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40#section-3
        //                 );
                        
        //             $unencodedArray = ['jwt' => $jwt];
        //             echo json_encode($unencodedArray);
                    
        //             */
        //     } else {
        //         $return_value = $dologin->check_acc($account,$passwd);
        //         if($return_value != NULL){
        //             $return_value['status_code'] = 0;
        //             $return_value['status_message'] = "login error  $where_statement 2 $sql";
        //             $return_value['sql'] = $sql;
        //             $return_value['data_set'] ='password worng';
        //         }else{
        //             $return_value['status_code'] = -1;
        //             $return_value['status_message'] = "login error  $where_statement 2 $sql";
        //             $return_value['sql'] = $sql;
        //             $return_value['data_set'] ='login field';
        //         }
        //     }
        
        
//         $return_value['status_code'] = 0;
//         return json_encode($return_value);    
        
//     }

// }

?>