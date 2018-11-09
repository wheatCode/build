<?php
    require_once 'include/php/event_message.php';
    require_once 'include/php/PDO_mysql.php';
    
    $body = (new Main())->run();
    echo $body;
    
    class Main{
        private $module;
        public function __construct(){
            $string = file_get_contents("config.json.php");
            $text=array("<?php","?>");
            $string=str_replace($text, "", $string);
            $config = json_decode($string, true);
            //var_dump($config);
            PDO_mysql::$db_host = $config["db"]["db_host"];
            PDO_mysql::$db_name = $config["db"]["db_name"];
            PDO_mysql::$db_user = $config["db"]["db_user"];
            PDO_mysql::$db_password = $config["db"]["db_password"];
        }
        public function run(){
            define('__ROOT__', dirname(__FILE__));
            
            $event_message = new event_message($_GET, $_POST);
            $get = $event_message->getGet();
            
            if(isset($_GET['module'])) 
                $module=$_GET['module'];
            else{
                $module = 'login';
            }
            if($get['module'] !== 'login' ||  $get['action'] !== 'do_login_action' ){
                    try{
                        session_start();
                        if(!isset($_SESSION['user'])) throw new Exception("No user login.", 2);
                        $user = $_SESSION['user'];
                        $user_name=$_SESSION['user_name'];
                        // var_dump($user);
                        // var_dump($user_name);
                    } catch (Exception $e){
                            $return_value['status_code'] = $e->getCode();
                            $return_value['status_message'] = $e->getMessage();
                            return json_encode($return_value);
                    }
            }
            require_once "modules" . "/" . $module. "/" . 'action_dispatcher.php';
            $module_object = new action_dispatcher();

            $body = $module_object->doAction($event_message);
            return $body;
        }
    }
    
?>