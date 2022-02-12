{"filter":false,"title":"do_check_building_p.php","tooltip":"/modules/user_profile/php_action/do_check_building_p.php","undoManager":{"mark":81,"position":81,"stack":[[{"start":{"row":0,"column":0},"end":{"row":35,"column":2},"action":"insert","lines":["<?php","    require_once 'include/php/action_listener.php';","    require_once 'include/php/event_message.php';","    require_once 'modules/case/php_action/case_model.php';","    require_once 'modules/household/php_action/household_model.php';","    require_once 'modules/building/php_action/building_model.php';","    require_once 'modules/user_profile/php_action/user_profile_model.php';","    require_once 'modules/repair/php_action/repair_model.php';","    require_once 'modules/repair_company/php_action/repair_company_model.php';","    class show_insert_page_P implements action_listener{","        public function actionPerformed(event_message $em) {","             if(isset($_SESSION['useracc'])){","\t\t\t    $user_id=$_SESSION['userid'];","\t\t    }","\t\t    $post = $em->getPost();","\t\t    //$comid=$post['comid'];","            $case_model = new case_model();","            $household_model= new household_model();","            $building_model= new building_model();","            $user_model = new user_profile_model();","            $repair_model= new repair_model();","            $repair_company_model= new repair_company_model();","            $all_repair_company=array();","            $comall;","            $building;","            //$where=\"repair_company_id= $comid\";","            //$comall=$repair_company_model->get_com_data($where);","            //SELECT repair_company_profile.name,repair_company_profile.contactor,repair_type.namech,repair_company_profile.id ,repair_company_profile.address,repair_company_profile.phone FROM `repair_company_profile` JOIN repair_company_type ON repair_company_profile.id=repair_company_type.repair_company_id JOIN repair_type ON repair_company_type.repair_type_id = repair_type.id  where repair_company_profile.id=1 GROUP by repair_company_profile.id,repair_type.namech","            $building=$building_model->get_construction_project_data(\"*\",1);","            ","            ","            $return_value['building'] = $building;","            return json_encode($return_value);","        }        ","    }","?>"],"id":1}],[{"start":{"row":9,"column":10},"end":{"row":9,"column":28},"action":"remove","lines":["show_insert_page_P"],"id":2},{"start":{"row":9,"column":10},"end":{"row":9,"column":29},"action":"insert","lines":["do_check_building_p"]}],[{"start":{"row":15,"column":7},"end":{"row":15,"column":8},"action":"remove","lines":["/"],"id":3}],[{"start":{"row":15,"column":6},"end":{"row":15,"column":7},"action":"remove","lines":["/"],"id":4}],[{"start":{"row":15,"column":22},"end":{"row":15,"column":23},"action":"remove","lines":["m"],"id":5}],[{"start":{"row":15,"column":21},"end":{"row":15,"column":22},"action":"remove","lines":["o"],"id":6}],[{"start":{"row":15,"column":20},"end":{"row":15,"column":21},"action":"remove","lines":["c"],"id":7}],[{"start":{"row":15,"column":20},"end":{"row":15,"column":21},"action":"insert","lines":["b"],"id":8}],[{"start":{"row":15,"column":7},"end":{"row":15,"column":10},"action":"remove","lines":["com"],"id":9},{"start":{"row":15,"column":7},"end":{"row":15,"column":8},"action":"insert","lines":["b"]}],[{"start":{"row":15,"column":8},"end":{"row":15,"column":9},"action":"insert","lines":["u"],"id":10}],[{"start":{"row":15,"column":9},"end":{"row":15,"column":10},"action":"insert","lines":["i"],"id":11}],[{"start":{"row":15,"column":10},"end":{"row":15,"column":11},"action":"insert","lines":["l"],"id":12}],[{"start":{"row":15,"column":11},"end":{"row":15,"column":12},"action":"insert","lines":["d"],"id":13}],[{"start":{"row":15,"column":12},"end":{"row":15,"column":13},"action":"insert","lines":["i"],"id":14}],[{"start":{"row":15,"column":13},"end":{"row":15,"column":14},"action":"insert","lines":["m"],"id":15}],[{"start":{"row":15,"column":13},"end":{"row":15,"column":14},"action":"remove","lines":["m"],"id":16}],[{"start":{"row":15,"column":13},"end":{"row":15,"column":14},"action":"insert","lines":["n"],"id":17}],[{"start":{"row":15,"column":14},"end":{"row":15,"column":15},"action":"insert","lines":["g"],"id":18}],[{"start":{"row":15,"column":15},"end":{"row":15,"column":16},"action":"insert","lines":["_"],"id":19}],[{"start":{"row":29,"column":12},"end":{"row":29,"column":28},"action":"insert","lines":["$household_model"],"id":20}],[{"start":{"row":29,"column":28},"end":{"row":29,"column":29},"action":"insert","lines":["-"],"id":21}],[{"start":{"row":29,"column":29},"end":{"row":29,"column":30},"action":"insert","lines":[">"],"id":22}],[{"start":{"row":29,"column":30},"end":{"row":29,"column":32},"action":"insert","lines":["''"],"id":23}],[{"start":{"row":29,"column":30},"end":{"row":29,"column":32},"action":"remove","lines":["''"],"id":24}],[{"start":{"row":29,"column":30},"end":{"row":29,"column":31},"action":"insert","lines":[";"],"id":25}],[{"start":{"row":28,"column":12},"end":{"row":28,"column":13},"action":"insert","lines":["/"],"id":26}],[{"start":{"row":28,"column":13},"end":{"row":28,"column":14},"action":"insert","lines":["/"],"id":27}],[{"start":{"row":29,"column":12},"end":{"row":30,"column":0},"action":"insert","lines":["",""],"id":28},{"start":{"row":30,"column":0},"end":{"row":30,"column":12},"action":"insert","lines":["            "]}],[{"start":{"row":30,"column":12},"end":{"row":31,"column":0},"action":"insert","lines":["",""],"id":29},{"start":{"row":31,"column":0},"end":{"row":31,"column":12},"action":"insert","lines":["            "]}],[{"start":{"row":31,"column":30},"end":{"row":31,"column":66},"action":"insert","lines":["get_something_from_household_profile"],"id":30}],[{"start":{"row":31,"column":66},"end":{"row":31,"column":68},"action":"insert","lines":["()"],"id":31}],[{"start":{"row":31,"column":67},"end":{"row":31,"column":68},"action":"insert","lines":[","],"id":32}],[{"start":{"row":31,"column":68},"end":{"row":31,"column":70},"action":"insert","lines":["\"\""],"id":33}],[{"start":{"row":31,"column":69},"end":{"row":31,"column":70},"action":"insert","lines":["c"],"id":34}],[{"start":{"row":31,"column":70},"end":{"row":31,"column":71},"action":"insert","lines":["o"],"id":35}],[{"start":{"row":31,"column":71},"end":{"row":31,"column":72},"action":"insert","lines":["n"],"id":36}],[{"start":{"row":31,"column":69},"end":{"row":31,"column":72},"action":"remove","lines":["con"],"id":37},{"start":{"row":31,"column":69},"end":{"row":31,"column":92},"action":"insert","lines":["construction_project_id"]}],[{"start":{"row":31,"column":92},"end":{"row":31,"column":93},"action":"insert","lines":["="],"id":38}],[{"start":{"row":31,"column":92},"end":{"row":31,"column":93},"action":"insert","lines":[" "],"id":39}],[{"start":{"row":31,"column":94},"end":{"row":31,"column":95},"action":"insert","lines":[" "],"id":40}],[{"start":{"row":31,"column":96},"end":{"row":31,"column":97},"action":"insert","lines":["."],"id":41}],[{"start":{"row":31,"column":97},"end":{"row":31,"column":98},"action":"insert","lines":["$"],"id":42}],[{"start":{"row":31,"column":98},"end":{"row":31,"column":99},"action":"insert","lines":["b"],"id":43}],[{"start":{"row":31,"column":99},"end":{"row":31,"column":100},"action":"insert","lines":["u"],"id":44}],[{"start":{"row":31,"column":97},"end":{"row":31,"column":100},"action":"remove","lines":["$bu"],"id":45},{"start":{"row":31,"column":97},"end":{"row":31,"column":109},"action":"insert","lines":["$building_id"]}],[{"start":{"row":31,"column":67},"end":{"row":31,"column":69},"action":"insert","lines":["\"\""],"id":46}],[{"start":{"row":31,"column":68},"end":{"row":31,"column":69},"action":"insert","lines":["*"],"id":47}],[{"start":{"row":31,"column":12},"end":{"row":31,"column":13},"action":"insert","lines":["v"],"id":48}],[{"start":{"row":31,"column":13},"end":{"row":31,"column":14},"action":"insert","lines":["a"],"id":49}],[{"start":{"row":31,"column":14},"end":{"row":31,"column":15},"action":"insert","lines":["r"],"id":50}],[{"start":{"row":31,"column":15},"end":{"row":31,"column":16},"action":"insert","lines":[" "],"id":51}],[{"start":{"row":31,"column":16},"end":{"row":31,"column":17},"action":"insert","lines":["h"],"id":52}],[{"start":{"row":31,"column":17},"end":{"row":31,"column":18},"action":"insert","lines":["o"],"id":53}],[{"start":{"row":31,"column":18},"end":{"row":31,"column":19},"action":"insert","lines":["u"],"id":54}],[{"start":{"row":31,"column":19},"end":{"row":31,"column":20},"action":"insert","lines":["s"],"id":55}],[{"start":{"row":31,"column":20},"end":{"row":31,"column":21},"action":"insert","lines":["e"],"id":56}],[{"start":{"row":31,"column":16},"end":{"row":31,"column":21},"action":"remove","lines":["house"],"id":57},{"start":{"row":31,"column":16},"end":{"row":31,"column":33},"action":"insert","lines":["household_profile"]}],[{"start":{"row":31,"column":33},"end":{"row":31,"column":34},"action":"insert","lines":["="],"id":58}],[{"start":{"row":31,"column":16},"end":{"row":31,"column":17},"action":"insert","lines":["$"],"id":59}],[{"start":{"row":33,"column":40},"end":{"row":33,"column":49},"action":"remove","lines":["$building"],"id":60},{"start":{"row":33,"column":40},"end":{"row":33,"column":58},"action":"insert","lines":["$household_profile"]}],[{"start":{"row":33,"column":27},"end":{"row":33,"column":35},"action":"remove","lines":["building"],"id":61},{"start":{"row":33,"column":27},"end":{"row":33,"column":45},"action":"insert","lines":["$household_profile"]}],[{"start":{"row":33,"column":27},"end":{"row":33,"column":28},"action":"remove","lines":["$"],"id":62}],[{"start":{"row":31,"column":16},"end":{"row":31,"column":17},"action":"insert","lines":["\\"],"id":63}],[{"start":{"row":31,"column":16},"end":{"row":31,"column":17},"action":"remove","lines":["\\"],"id":64}],[{"start":{"row":31,"column":15},"end":{"row":31,"column":16},"action":"remove","lines":[" "],"id":65}],[{"start":{"row":31,"column":14},"end":{"row":31,"column":15},"action":"remove","lines":["r"],"id":66}],[{"start":{"row":31,"column":13},"end":{"row":31,"column":14},"action":"remove","lines":["a"],"id":67}],[{"start":{"row":31,"column":12},"end":{"row":31,"column":13},"action":"remove","lines":["v"],"id":68}],[{"start":{"row":25,"column":12},"end":{"row":28,"column":78},"action":"remove","lines":["//$where=\"repair_company_id= $comid\";","            //$comall=$repair_company_model->get_com_data($where);","            //SELECT repair_company_profile.name,repair_company_profile.contactor,repair_type.namech,repair_company_profile.id ,repair_company_profile.address,repair_company_profile.phone FROM `repair_company_profile` JOIN repair_company_type ON repair_company_profile.id=repair_company_type.repair_company_id JOIN repair_type ON repair_company_type.repair_type_id = repair_type.id  where repair_company_profile.id=1 GROUP by repair_company_profile.id,repair_type.namech","            //$building=$building_model->get_construction_project_data(\"*\",1);"],"id":69}],[{"start":{"row":28,"column":118},"end":{"row":28,"column":119},"action":"remove","lines":["."],"id":70}],[{"start":{"row":28,"column":118},"end":{"row":28,"column":119},"action":"insert","lines":[" "],"id":71}],[{"start":{"row":28,"column":119},"end":{"row":28,"column":120},"action":"insert","lines":["."],"id":72}],[{"start":{"row":28,"column":118},"end":{"row":28,"column":119},"action":"remove","lines":[" "],"id":73}],[{"start":{"row":25,"column":12},"end":{"row":25,"column":30},"action":"insert","lines":["$household_profile"],"id":74}],[{"start":{"row":25,"column":30},"end":{"row":25,"column":31},"action":"insert","lines":[";"],"id":75}],[{"start":{"row":29,"column":12},"end":{"row":29,"column":68},"action":"insert","lines":["$return_value['household_profile'] = $household_profile;"],"id":76}],[{"start":{"row":29,"column":27},"end":{"row":29,"column":44},"action":"remove","lines":["household_profile"],"id":77}],[{"start":{"row":29,"column":32},"end":{"row":29,"column":50},"action":"remove","lines":["$household_profile"],"id":78}],[{"start":{"row":29,"column":32},"end":{"row":29,"column":44},"action":"insert","lines":["$building_id"],"id":79}],[{"start":{"row":29,"column":27},"end":{"row":29,"column":28},"action":"insert","lines":["b"],"id":80}],[{"start":{"row":29,"column":28},"end":{"row":29,"column":29},"action":"insert","lines":["i"],"id":81}],[{"start":{"row":29,"column":29},"end":{"row":29,"column":30},"action":"insert","lines":["d"],"id":82}]]},"ace":{"folds":[],"scrolltop":180,"scrollleft":47.1953125,"selection":{"start":{"row":30,"column":27},"end":{"row":30,"column":44},"isBackwards":true},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":7,"state":"php-start","mode":"ace/mode/php"}},"timestamp":1541965069099,"hash":"144d79aaacccfd20a3fb2540bdc05a9fd3c0d065"}