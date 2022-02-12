{"changed":true,"filter":false,"title":"user_profile_do_check_building.js","tooltip":"/modules/user_profile/js_action/user_profile_do_check_building.js","value":"class case_check_data_action_p extends ActionHandler {\n    constructor(module, action, position_id) {\n        super(module, action);\n        this.position_id = position_id;\n    }\n    prepareArgs() {\n        this.php = true;\n        this.php_action = 'do_select_data_building_action_p';\n        this.addArgsbyid('name');\n        this.addArgsbyid('phone');\n    }\n    ajax_success(json_str) {\n        try {\n            var json_str = json_str.responseText;\n            var phpDatas = JSON.parse(json_str);\n            console.log(phpDatas);\n            var data=\"\";\n            var number=1;\n            if(phpDatas != 0){\n                for(var phpData in phpDatas){\n                    data+=`\n                    <div class=\"custom-control custom-radio w-100\">\n                      <input type=\"radio\" class=\"custom-control-input\" id=\"building${phpDatas[phpData][2]['id']}\" value=\"${phpDatas[phpData][2]['id']}\" name=\"building\">\n                      <label class=\"w-75 custom-control-label\" for=\"building${phpDatas[phpData][2]['id']}\">${phpDatas[phpData][1][0]['name']} ${phpDatas[phpData][0][0]['number']} ${phpDatas[phpData][0][0]['address']}</label>\n                    </div>\n`;\nnumber++;\n                }\n            }else{\n                data=\"未找到相關資料，請重新輸入...\";\n            }\n            $('#' + this.position_id).html(data);\n        }catch (e) {\n            console.log(e);\n        }\n  }\n    ajax_error(msg) {\n\n    }\n}","undoManager":{"mark":-2,"position":0,"stack":[[{"start":{"row":0,"column":0},"end":{"row":39,"column":1},"action":"insert","lines":["class case_check_data_action_p extends ActionHandler {","    constructor(module, action, position_id) {","        super(module, action);","        this.position_id = position_id;","    }","    prepareArgs() {","        this.php = true;","        this.php_action = 'do_select_data_building_action_p';","        this.addArgsbyid('name');","        this.addArgsbyid('phone');","    }","    ajax_success(json_str) {","        try {","            var json_str = json_str.responseText;","            var phpDatas = JSON.parse(json_str);","            console.log(phpDatas);","            var data=\"\";","            var number=1;","            if(phpDatas != 0){","                for(var phpData in phpDatas){","                    data+=`","                    <div class=\"custom-control custom-radio w-100\">","                      <input type=\"radio\" class=\"custom-control-input\" id=\"building${phpDatas[phpData][2]['id']}\" value=\"${phpDatas[phpData][2]['id']}\" name=\"building\">","                      <label class=\"w-75 custom-control-label\" for=\"building${phpDatas[phpData][2]['id']}\">${phpDatas[phpData][1][0]['name']} ${phpDatas[phpData][0][0]['number']} ${phpDatas[phpData][0][0]['address']}</label>","                    </div>","`;","number++;","                }","            }else{","                data=\"未找到相關資料，請重新輸入...\";","            }","            $('#' + this.position_id).html(data);","        }catch (e) {","            console.log(e);","        }","  }","    ajax_error(msg) {","","    }","}"],"id":1}]]},"ace":{"folds":[],"scrolltop":213,"scrollleft":0,"selection":{"start":{"row":39,"column":1},"end":{"row":39,"column":1},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":14,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1541960570692}