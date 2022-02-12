{"changed":true,"filter":false,"title":"do_select_search_action_p.php","tooltip":"/modules/repair_company/php_action/do_select_search_action_p.php","value":"<?php\n    require_once 'include/php/action_listener.php';\n    require_once 'include/php/event_message.php';\n    require_once 'modules/user_profile/php_action/user_profile_model.php';\n\n    class do_select_search_action_p implements action_listener{\n        public function actionPerformed(event_message $em) {\n            $selectAccount = $_POST['selectName'];\n            $selectUserName = $_POST['selectContactor'];\n            $selectUserCharacter = $_POST['selectType'];\n            $data=[];\n            \n            $user = new user_profile_model();\n\n            if($selectAccount){\n                $where .='account LIKE \"%'.$selectAccount.'%\"';\n                if($selectUserName){\n                    $where .=' AND name LIKE \"%'.$selectUserName.'%\"';\n                    if($selectUserCharacter){\n                         $where .=' AND type = \"'.$selectUserCharacter.'\"';\n                    }\n                }\n            }else if($selectUserName){\n                    $where .='name LIKE \"%'.$selectUserName.'%\"';\n                    if($selectUserCharacter){\n                        $where .=' AND type = \"'.$selectUserCharacter.'\"';\n                    }\n            }else if($selectUserCharacter){\n                $where .='type = \"'.$selectUserCharacter.'\"';\n            }else{\n                $where.=\"1\";\n            }\n            \n            $where .=\" ORDER BY id DESC\";\n            $userAll = $user->get_something_from_user_profile_p('*',$where);\n            \n            if($userAll){\n                foreach($userAll as $key => $userOne){\n                    $sumAll=[];\n                    $sumAll=['user' => $userOne];\n                    array_push($data,$sumAll);\n                }\n            }\n            return json_encode($data);\n        }\n    }\n?>","undoManager":{"mark":-2,"position":2,"stack":[[{"start":{"row":7,"column":37},"end":{"row":7,"column":50},"action":"remove","lines":["selectAccount"],"id":2},{"start":{"row":7,"column":37},"end":{"row":7,"column":47},"action":"insert","lines":["selectName"]}],[{"start":{"row":8,"column":38},"end":{"row":8,"column":52},"action":"remove","lines":["selectUserName"],"id":3},{"start":{"row":8,"column":38},"end":{"row":8,"column":53},"action":"insert","lines":["selectContactor"]}],[{"start":{"row":9,"column":43},"end":{"row":9,"column":62},"action":"remove","lines":["selectUserCharacter"],"id":4},{"start":{"row":9,"column":43},"end":{"row":9,"column":53},"action":"insert","lines":["selectType"]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":9,"column":53},"end":{"row":9,"column":53},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1539345152998}