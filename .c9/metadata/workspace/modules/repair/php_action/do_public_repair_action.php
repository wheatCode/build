{"filter":false,"title":"do_public_repair_action.php","tooltip":"/modules/repair/php_action/do_public_repair_action.php","undoManager":{"mark":18,"position":18,"stack":[[{"start":{"row":57,"column":3},"end":{"row":58,"column":0},"action":"insert","lines":["",""],"id":8},{"start":{"row":58,"column":0},"end":{"row":58,"column":3},"action":"insert","lines":["\t\t\t"]}],[{"start":{"row":53,"column":6},"end":{"row":57,"column":9},"action":"insert","lines":["public function insert_new_case($household_user_id,$repair_type_id,$title, $content,$start_datetime, $contact_starttime, $contact_endtime, $contact_name, $contact_tel){","            $sql =\"INSERT INTO `case_profile` (`id`, `status`, `household_user_id`, `repair_type_id`, `title`, `content`, `user_rank`, `user_comment`, `start_datetime`, `end_datetime`, `contact_starttime`, `contact_endtime`, `contact_name`, `contact_tel`, `cancel`) VALUES (NULL, 'new', '$household_user_id', '$repair_type_id', '$title', '$content', NULL, NULL, '$start_datetime', NULL, '$contact_starttime', '$contact_endtime', '$contact_name', '$contact_tel', NULL)\";","            $stmt = $this->conn->prepare($sql);","            $stmt->execute();","        }"],"id":9}],[{"start":{"row":53,"column":6},"end":{"row":53,"column":9},"action":"insert","lines":["// "],"id":10},{"start":{"row":54,"column":6},"end":{"row":54,"column":8},"action":"insert","lines":["//"]},{"start":{"row":55,"column":6},"end":{"row":55,"column":8},"action":"insert","lines":["//"]},{"start":{"row":56,"column":6},"end":{"row":56,"column":8},"action":"insert","lines":["//"]},{"start":{"row":57,"column":6},"end":{"row":57,"column":8},"action":"insert","lines":["//"]}],[{"start":{"row":53,"column":6},"end":{"row":53,"column":9},"action":"remove","lines":["// "],"id":11},{"start":{"row":54,"column":6},"end":{"row":54,"column":8},"action":"remove","lines":["//"]},{"start":{"row":55,"column":6},"end":{"row":55,"column":8},"action":"remove","lines":["//"]},{"start":{"row":56,"column":6},"end":{"row":56,"column":8},"action":"remove","lines":["//"]},{"start":{"row":57,"column":6},"end":{"row":57,"column":8},"action":"remove","lines":["//"]}],[{"start":{"row":53,"column":6},"end":{"row":53,"column":9},"action":"insert","lines":["// "],"id":12},{"start":{"row":54,"column":6},"end":{"row":54,"column":8},"action":"insert","lines":["//"]},{"start":{"row":55,"column":6},"end":{"row":55,"column":8},"action":"insert","lines":["//"]},{"start":{"row":56,"column":6},"end":{"row":56,"column":8},"action":"insert","lines":["//"]},{"start":{"row":57,"column":6},"end":{"row":57,"column":8},"action":"insert","lines":["//"]}],[{"start":{"row":53,"column":1},"end":{"row":57,"column":11},"action":"insert","lines":["\t    // public function insert_new_case($household_user_id,$repair_type_id,$title, $content,$start_datetime, $contact_starttime, $contact_endtime, $contact_name, $contact_tel){","      //      $sql =\"INSERT INTO `case_profile` (`id`, `status`, `household_user_id`, `repair_type_id`, `title`, `content`, `user_rank`, `user_comment`, `start_datetime`, `end_datetime`, `contact_starttime`, `contact_endtime`, `contact_name`, `contact_tel`, `cancel`) VALUES (NULL, 'new', '$household_user_id', '$repair_type_id', '$title', '$content', NULL, NULL, '$start_datetime', NULL, '$contact_starttime', '$contact_endtime', '$contact_name', '$contact_tel', NULL)\";","      //      $stmt = $this->conn->prepare($sql);","      //      $stmt->execute();","      //  }"],"id":14,"ignore":true}],[{"start":{"row":60,"column":115},"end":{"row":60,"column":119},"action":"remove","lines":["null"],"id":15,"ignore":true},{"start":{"row":60,"column":115},"end":{"row":60,"column":130},"action":"insert","lines":["00:00:00.000000"]}],[{"start":{"row":60,"column":133},"end":{"row":60,"column":137},"action":"remove","lines":["null"],"id":16,"ignore":true},{"start":{"row":60,"column":133},"end":{"row":60,"column":148},"action":"insert","lines":["00:00:00.000000"]}],[{"start":{"row":40,"column":44},"end":{"row":41,"column":0},"action":"insert","lines":["",""],"id":17},{"start":{"row":41,"column":0},"end":{"row":41,"column":6},"action":"insert","lines":["\t\t    "]}],[{"start":{"row":41,"column":6},"end":{"row":41,"column":41},"action":"insert","lines":["$date1=date(\"m/d\").\" \".date(\"H:i\");"],"id":18}],[{"start":{"row":64,"column":62},"end":{"row":64,"column":63},"action":"insert","lines":["."],"id":19}],[{"start":{"row":64,"column":63},"end":{"row":64,"column":65},"action":"insert","lines":["''"],"id":20}],[{"start":{"row":64,"column":64},"end":{"row":64,"column":65},"action":"insert","lines":[" "],"id":21}],[{"start":{"row":64,"column":66},"end":{"row":64,"column":67},"action":"insert","lines":["."],"id":22}],[{"start":{"row":64,"column":67},"end":{"row":64,"column":68},"action":"insert","lines":["d"],"id":23}],[{"start":{"row":64,"column":67},"end":{"row":64,"column":68},"action":"remove","lines":["d"],"id":24}],[{"start":{"row":64,"column":67},"end":{"row":64,"column":68},"action":"insert","lines":["$"],"id":25}],[{"start":{"row":64,"column":68},"end":{"row":64,"column":69},"action":"insert","lines":["d"],"id":26}],[{"start":{"row":64,"column":67},"end":{"row":64,"column":69},"action":"remove","lines":["$d"],"id":27},{"start":{"row":64,"column":67},"end":{"row":64,"column":73},"action":"insert","lines":["$date1"]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":62,"column":3},"end":{"row":62,"column":3},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1544124876707,"hash":"a5f2bbbb6cecb0e51bf6eae242e085fa1818eb50"}