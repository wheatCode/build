{"filter":false,"title":"household_show_insert_page_P.js","tooltip":"/modules/household/js_action/household_show_insert_page_P.js","undoManager":{"mark":77,"position":77,"stack":[[{"start":{"row":0,"column":0},"end":{"row":61,"column":0},"action":"insert","lines":["class building_show_insert_page extends ActionHandler {","    constructor(module, action, position_id) {","        super(module, action);","        this.position_id = position_id;","    }","    prepareArgs() {","        this.php = true;","        this.php_action=\"do_select_action\";","    }","    ajax_success(json_str){","        try{","            var json_str = json_str.responseText;","            var obj = JSON.parse(json_str);","            if (obj['status_code'] === 0) {","              var ds = obj['rctid'];","              console.log(ds);","            var str=`","                    <div class=\"container\">","                     <div class=\"row m-0\">","                         <div class=\"col-lg-10 col-md-8\">","                            <div class=\"w-100 p-2  borderB\">","                                    <h1 class=\"bold\">新增建案</h1>","                                </div>","                                <div class=\"md-form my-0\">","                                    <input type=\"text\" id=\"constructionname\" class=\"form-control mb-0 pb-1\" style=\"margin-top: 25px;\">","                                    <label for=\"constructionname\">建案名稱</label>","                                </div>","                                <br>","                                ","                                <div class=\"md-form my-0\">`;","                                str += '<select class=\"browser-default float-left mt-2 pt-1\" id=\"select_1\" name=\"select_1\">' +","                                '<option value=\"\" disabled selected>選擇工務主任...</option>';","                            for (var index in ds) {","                                // str += '<option value=\"' + ds[index]['constructor']['id'] + '\">' + ds[index][1][i]['name'] + '</option>';","                                for(var i in ds[index][1]){","                                    str += '<option value=\"' + ds[index][1][i]['id'] + '\">' + ds[index][1][i]['name'] + '</option>';","                                }","                                break;","                            }","                            str += `</select>","                                <br>","                                <div class=\"text-center mt-2\">","                                    <button onclick=\"(new building_do_insert_action('building','do_insert_action','body1')).run()\" class=\"btn btn-blue darken-4 waves-effect\" type=\"button\">新增</button>","                                </div>","                            </div>","                        </div>","                    </div>`;","                ","                $('#' + this.position_id).html(str);","            }   ","        }catch(e){","            var msg = e + \"<br>\";","            msg += \"JSON String: \" + str;","        }","           this.loadModuleScript(\"building\", \"do_insert_action\");","    }","    ajax_error(msg) {","        // $('#' + this.position_id).html(msg.status);","    }","          ","}",""],"id":1}],[{"start":{"row":0,"column":6},"end":{"row":0,"column":14},"action":"remove","lines":["building"],"id":2},{"start":{"row":0,"column":6},"end":{"row":0,"column":15},"action":"insert","lines":["household"]}],[{"start":{"row":7,"column":8},"end":{"row":7,"column":11},"action":"insert","lines":["// "],"id":3}],[{"start":{"row":6,"column":19},"end":{"row":6,"column":23},"action":"remove","lines":["true"],"id":4}],[{"start":{"row":6,"column":19},"end":{"row":6,"column":20},"action":"insert","lines":["f"],"id":10},{"start":{"row":6,"column":20},"end":{"row":6,"column":21},"action":"insert","lines":["a"]},{"start":{"row":6,"column":21},"end":{"row":6,"column":22},"action":"insert","lines":["l"]},{"start":{"row":6,"column":22},"end":{"row":6,"column":23},"action":"insert","lines":["s"]},{"start":{"row":6,"column":23},"end":{"row":6,"column":24},"action":"insert","lines":["e"]}],[{"start":{"row":8,"column":5},"end":{"row":9,"column":0},"action":"insert","lines":["",""],"id":11},{"start":{"row":9,"column":0},"end":{"row":9,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":9,"column":4},"end":{"row":14,"column":8},"action":"insert","lines":["showResult(xhttp) {","    //     var kk=\"\";","    //     kk+=`a.k.a b 小8`;","","    //     $('#' + this.position_id).html(kk);","    // }"],"id":12}],[{"start":{"row":14,"column":4},"end":{"row":14,"column":7},"action":"remove","lines":["// "],"id":13}],[{"start":{"row":9,"column":23},"end":{"row":13,"column":46},"action":"remove","lines":["","    //     var kk=\"\";","    //     kk+=`a.k.a b 小8`;","","    //     $('#' + this.position_id).html(kk);"],"id":14}],[{"start":{"row":9,"column":23},"end":{"row":10,"column":0},"action":"insert","lines":["",""],"id":15},{"start":{"row":10,"column":0},"end":{"row":10,"column":8},"action":"insert","lines":["        "]}],[{"start":{"row":10,"column":8},"end":{"row":42,"column":52},"action":"insert","lines":["var str=`","                    <div class=\"container\">","                     <div class=\"row m-0\">","                         <div class=\"col-lg-10 col-md-8\">","                            <div class=\"w-100 p-2  borderB\">","                                    <h1 class=\"bold\">新增建案</h1>","                                </div>","                                <div class=\"md-form my-0\">","                                    <input type=\"text\" id=\"constructionname\" class=\"form-control mb-0 pb-1\" style=\"margin-top: 25px;\">","                                    <label for=\"constructionname\">建案名稱</label>","                                </div>","                                <br>","                                ","                                <div class=\"md-form my-0\">`;","                                str += '<select class=\"browser-default float-left mt-2 pt-1\" id=\"select_1\" name=\"select_1\">' +","                                '<option value=\"\" disabled selected>選擇工務主任...</option>';","                            for (var index in ds) {","                                // str += '<option value=\"' + ds[index]['constructor']['id'] + '\">' + ds[index][1][i]['name'] + '</option>';","                                for(var i in ds[index][1]){","                                    str += '<option value=\"' + ds[index][1][i]['id'] + '\">' + ds[index][1][i]['name'] + '</option>';","                                }","                                break;","                            }","                            str += `</select>","                                <br>","                                <div class=\"text-center mt-2\">","                                    <button onclick=\"(new building_do_insert_action('building','do_insert_action','body1')).run()\" class=\"btn btn-blue darken-4 waves-effect\" type=\"button\">新增</button>","                                </div>","                            </div>","                        </div>","                    </div>`;","                ","                $('#' + this.position_id).html(str);"],"id":16}],[{"start":{"row":10,"column":8},"end":{"row":42,"column":52},"action":"remove","lines":["var str=`","                    <div class=\"container\">","                     <div class=\"row m-0\">","                         <div class=\"col-lg-10 col-md-8\">","                            <div class=\"w-100 p-2  borderB\">","                                    <h1 class=\"bold\">新增建案</h1>","                                </div>","                                <div class=\"md-form my-0\">","                                    <input type=\"text\" id=\"constructionname\" class=\"form-control mb-0 pb-1\" style=\"margin-top: 25px;\">","                                    <label for=\"constructionname\">建案名稱</label>","                                </div>","                                <br>","                                ","                                <div class=\"md-form my-0\">`;","                                str += '<select class=\"browser-default float-left mt-2 pt-1\" id=\"select_1\" name=\"select_1\">' +","                                '<option value=\"\" disabled selected>選擇工務主任...</option>';","                            for (var index in ds) {","                                // str += '<option value=\"' + ds[index]['constructor']['id'] + '\">' + ds[index][1][i]['name'] + '</option>';","                                for(var i in ds[index][1]){","                                    str += '<option value=\"' + ds[index][1][i]['id'] + '\">' + ds[index][1][i]['name'] + '</option>';","                                }","                                break;","                            }","                            str += `</select>","                                <br>","                                <div class=\"text-center mt-2\">","                                    <button onclick=\"(new building_do_insert_action('building','do_insert_action','body1')).run()\" class=\"btn btn-blue darken-4 waves-effect\" type=\"button\">新增</button>","                                </div>","                            </div>","                        </div>","                    </div>`;","                ","                $('#' + this.position_id).html(str);"],"id":17},{"start":{"row":10,"column":8},"end":{"row":53,"column":9},"action":"insert","lines":["try{","            var json_str = json_str.responseText;","            var obj = JSON.parse(json_str);","            if (obj['status_code'] === 0) {","              var ds = obj['rctid'];","              console.log(ds);","            var str=`","                    <div class=\"container\">","                     <div class=\"row m-0\">","                         <div class=\"col-lg-10 col-md-8\">","                            <div class=\"w-100 p-2  borderB\">","                                    <h1 class=\"bold\">新增建案</h1>","                                </div>","                                <div class=\"md-form my-0\">","                                    <input type=\"text\" id=\"constructionname\" class=\"form-control mb-0 pb-1\" style=\"margin-top: 25px;\">","                                    <label for=\"constructionname\">建案名稱</label>","                                </div>","                                <br>","                                ","                                <div class=\"md-form my-0\">`;","                                str += '<select class=\"browser-default float-left mt-2 pt-1\" id=\"select_1\" name=\"select_1\">' +","                                '<option value=\"\" disabled selected>選擇工務主任...</option>';","                            for (var index in ds) {","                                // str += '<option value=\"' + ds[index]['constructor']['id'] + '\">' + ds[index][1][i]['name'] + '</option>';","                                for(var i in ds[index][1]){","                                    str += '<option value=\"' + ds[index][1][i]['id'] + '\">' + ds[index][1][i]['name'] + '</option>';","                                }","                                break;","                            }","                            str += `</select>","                                <br>","                                <div class=\"text-center mt-2\">","                                    <button onclick=\"(new building_do_insert_action('building','do_insert_action','body1')).run()\" class=\"btn btn-blue darken-4 waves-effect\" type=\"button\">新增</button>","                                </div>","                            </div>","                        </div>","                    </div>`;","                ","                $('#' + this.position_id).html(str);","            }   ","        }catch(e){","            var msg = e + \"<br>\";","            msg += \"JSON String: \" + str;","        }"]}],[{"start":{"row":54,"column":5},"end":{"row":104,"column":5},"action":"remove","lines":["","    ajax_success(json_str){","        try{","            var json_str = json_str.responseText;","            var obj = JSON.parse(json_str);","            if (obj['status_code'] === 0) {","              var ds = obj['rctid'];","              console.log(ds);","            var str=`","                    <div class=\"container\">","                     <div class=\"row m-0\">","                         <div class=\"col-lg-10 col-md-8\">","                            <div class=\"w-100 p-2  borderB\">","                                    <h1 class=\"bold\">新增建案</h1>","                                </div>","                                <div class=\"md-form my-0\">","                                    <input type=\"text\" id=\"constructionname\" class=\"form-control mb-0 pb-1\" style=\"margin-top: 25px;\">","                                    <label for=\"constructionname\">建案名稱</label>","                                </div>","                                <br>","                                ","                                <div class=\"md-form my-0\">`;","                                str += '<select class=\"browser-default float-left mt-2 pt-1\" id=\"select_1\" name=\"select_1\">' +","                                '<option value=\"\" disabled selected>選擇工務主任...</option>';","                            for (var index in ds) {","                                // str += '<option value=\"' + ds[index]['constructor']['id'] + '\">' + ds[index][1][i]['name'] + '</option>';","                                for(var i in ds[index][1]){","                                    str += '<option value=\"' + ds[index][1][i]['id'] + '\">' + ds[index][1][i]['name'] + '</option>';","                                }","                                break;","                            }","                            str += `</select>","                                <br>","                                <div class=\"text-center mt-2\">","                                    <button onclick=\"(new building_do_insert_action('building','do_insert_action','body1')).run()\" class=\"btn btn-blue darken-4 waves-effect\" type=\"button\">新增</button>","                                </div>","                            </div>","                        </div>","                    </div>`;","                ","                $('#' + this.position_id).html(str);","            }   ","        }catch(e){","            var msg = e + \"<br>\";","            msg += \"JSON String: \" + str;","        }","           this.loadModuleScript(\"building\", \"do_insert_action\");","    }","    ajax_error(msg) {","        // $('#' + this.position_id).html(msg.status);","    }"]}],[{"start":{"row":54,"column":5},"end":{"row":55,"column":4},"action":"remove","lines":["","    "],"id":19}],[{"start":{"row":11,"column":12},"end":{"row":15,"column":30},"action":"remove","lines":["var json_str = json_str.responseText;","            var obj = JSON.parse(json_str);","            if (obj['status_code'] === 0) {","              var ds = obj['rctid'];","              console.log(ds);"],"id":20}],[{"start":{"row":10,"column":12},"end":{"row":11,"column":12},"action":"remove","lines":["","            "],"id":21}],[{"start":{"row":44,"column":12},"end":{"row":44,"column":13},"action":"remove","lines":["}"],"id":22}],[{"start":{"row":25,"column":31},"end":{"row":33,"column":29},"action":"remove","lines":[" str += '<select class=\"browser-default float-left mt-2 pt-1\" id=\"select_1\" name=\"select_1\">' +","                                '<option value=\"\" disabled selected>選擇工務主任...</option>';","                            for (var index in ds) {","                                // str += '<option value=\"' + ds[index]['constructor']['id'] + '\">' + ds[index][1][i]['name'] + '</option>';","                                for(var i in ds[index][1]){","                                    str += '<option value=\"' + ds[index][1][i]['id'] + '\">' + ds[index][1][i]['name'] + '</option>';","                                }","                                break;","                            }"],"id":23}],[{"start":{"row":24,"column":60},"end":{"row":25,"column":31},"action":"remove","lines":["","                               "],"id":24}],[{"start":{"row":25,"column":35},"end":{"row":25,"column":45},"action":"remove","lines":["`</select>"],"id":25}],[{"start":{"row":25,"column":35},"end":{"row":25,"column":37},"action":"insert","lines":["``"],"id":26}],[{"start":{"row":25,"column":36},"end":{"row":25,"column":37},"action":"remove","lines":["`"],"id":27}],[{"start":{"row":25,"column":36},"end":{"row":26,"column":31},"action":"remove","lines":["","                               "],"id":28}],[{"start":{"row":1,"column":43},"end":{"row":1,"column":44},"action":"insert","lines":[","],"id":29}],[{"start":{"row":1,"column":44},"end":{"row":1,"column":45},"action":"insert","lines":["c"],"id":30},{"start":{"row":1,"column":45},"end":{"row":1,"column":46},"action":"insert","lines":["o"]},{"start":{"row":1,"column":46},"end":{"row":1,"column":47},"action":"insert","lines":["n"]},{"start":{"row":1,"column":47},"end":{"row":1,"column":48},"action":"insert","lines":["s"]},{"start":{"row":1,"column":48},"end":{"row":1,"column":49},"action":"insert","lines":["i"]},{"start":{"row":1,"column":49},"end":{"row":1,"column":50},"action":"insert","lines":["d"]}],[{"start":{"row":3,"column":39},"end":{"row":4,"column":0},"action":"insert","lines":["",""],"id":31},{"start":{"row":4,"column":0},"end":{"row":4,"column":8},"action":"insert","lines":["        "]},{"start":{"row":4,"column":8},"end":{"row":4,"column":9},"action":"insert","lines":["t"]},{"start":{"row":4,"column":9},"end":{"row":4,"column":10},"action":"insert","lines":["h"]},{"start":{"row":4,"column":10},"end":{"row":4,"column":11},"action":"insert","lines":["i"]},{"start":{"row":4,"column":11},"end":{"row":4,"column":12},"action":"insert","lines":["s"]},{"start":{"row":4,"column":12},"end":{"row":4,"column":13},"action":"insert","lines":["."]}],[{"start":{"row":4,"column":13},"end":{"row":4,"column":14},"action":"insert","lines":["c"],"id":32},{"start":{"row":4,"column":14},"end":{"row":4,"column":15},"action":"insert","lines":["o"]},{"start":{"row":4,"column":15},"end":{"row":4,"column":16},"action":"insert","lines":["n"]}],[{"start":{"row":4,"column":13},"end":{"row":4,"column":16},"action":"remove","lines":["con"],"id":33},{"start":{"row":4,"column":13},"end":{"row":4,"column":19},"action":"insert","lines":["consId"]}],[{"start":{"row":1,"column":48},"end":{"row":1,"column":49},"action":"insert","lines":["t"],"id":34}],[{"start":{"row":4,"column":17},"end":{"row":4,"column":18},"action":"insert","lines":["t"],"id":35}],[{"start":{"row":4,"column":13},"end":{"row":4,"column":18},"action":"remove","lines":["const"],"id":36},{"start":{"row":4,"column":13},"end":{"row":4,"column":20},"action":"insert","lines":["constid"]}],[{"start":{"row":4,"column":22},"end":{"row":4,"column":23},"action":"insert","lines":[" "],"id":37},{"start":{"row":4,"column":23},"end":{"row":4,"column":24},"action":"insert","lines":["="]}],[{"start":{"row":4,"column":24},"end":{"row":4,"column":25},"action":"insert","lines":[" "],"id":38},{"start":{"row":4,"column":25},"end":{"row":4,"column":26},"action":"insert","lines":["c"]},{"start":{"row":4,"column":26},"end":{"row":4,"column":27},"action":"insert","lines":["o"]},{"start":{"row":4,"column":27},"end":{"row":4,"column":28},"action":"insert","lines":["n"]},{"start":{"row":4,"column":28},"end":{"row":4,"column":29},"action":"insert","lines":["s"]},{"start":{"row":4,"column":29},"end":{"row":4,"column":30},"action":"insert","lines":["t"]}],[{"start":{"row":4,"column":25},"end":{"row":4,"column":30},"action":"remove","lines":["const"],"id":39},{"start":{"row":4,"column":25},"end":{"row":4,"column":32},"action":"insert","lines":["constid"]}],[{"start":{"row":4,"column":32},"end":{"row":4,"column":33},"action":"insert","lines":[";"],"id":40}],[{"start":{"row":4,"column":21},"end":{"row":4,"column":22},"action":"remove","lines":["d"],"id":41},{"start":{"row":4,"column":20},"end":{"row":4,"column":21},"action":"remove","lines":["I"]}],[{"start":{"row":8,"column":46},"end":{"row":9,"column":0},"action":"insert","lines":["",""],"id":42},{"start":{"row":9,"column":0},"end":{"row":9,"column":8},"action":"insert","lines":["        "]}],[{"start":{"row":9,"column":8},"end":{"row":9,"column":57},"action":"insert","lines":["this.addArgs('constructorid',this.constructorid);"],"id":43}],[{"start":{"row":9,"column":22},"end":{"row":9,"column":35},"action":"remove","lines":["constructorid"],"id":44},{"start":{"row":9,"column":22},"end":{"row":9,"column":29},"action":"insert","lines":["constid"]}],[{"start":{"row":9,"column":36},"end":{"row":9,"column":49},"action":"remove","lines":["constructorid"],"id":45},{"start":{"row":9,"column":36},"end":{"row":9,"column":43},"action":"insert","lines":["constid"]}],[{"start":{"row":29,"column":58},"end":{"row":29,"column":66},"action":"remove","lines":["building"],"id":46},{"start":{"row":29,"column":58},"end":{"row":29,"column":59},"action":"insert","lines":["h"]},{"start":{"row":29,"column":59},"end":{"row":29,"column":60},"action":"insert","lines":["o"]},{"start":{"row":29,"column":60},"end":{"row":29,"column":61},"action":"insert","lines":["u"]},{"start":{"row":29,"column":61},"end":{"row":29,"column":62},"action":"insert","lines":["s"]},{"start":{"row":29,"column":62},"end":{"row":29,"column":63},"action":"insert","lines":["e"]}],[{"start":{"row":29,"column":63},"end":{"row":29,"column":64},"action":"insert","lines":["h"],"id":47},{"start":{"row":29,"column":64},"end":{"row":29,"column":65},"action":"insert","lines":["o"]},{"start":{"row":29,"column":65},"end":{"row":29,"column":66},"action":"insert","lines":["l"]},{"start":{"row":29,"column":66},"end":{"row":29,"column":67},"action":"insert","lines":["d"]}],[{"start":{"row":29,"column":86},"end":{"row":29,"column":94},"action":"remove","lines":["building"],"id":48},{"start":{"row":29,"column":86},"end":{"row":29,"column":95},"action":"insert","lines":["household"]}],[{"start":{"row":29,"column":123},"end":{"row":29,"column":124},"action":"insert","lines":[","],"id":49}],[{"start":{"row":29,"column":124},"end":{"row":29,"column":155},"action":"insert","lines":["'${ds[i]['constructor']['id']}'"],"id":50}],[{"start":{"row":29,"column":127},"end":{"row":29,"column":153},"action":"remove","lines":["ds[i]['constructor']['id']"],"id":51},{"start":{"row":29,"column":127},"end":{"row":29,"column":139},"action":"insert","lines":["this.constid"]}],[{"start":{"row":22,"column":66},"end":{"row":22,"column":70},"action":"remove","lines":["建案名稱"],"id":52}],[{"start":{"row":24,"column":36},"end":{"row":25,"column":0},"action":"insert","lines":["",""],"id":53},{"start":{"row":25,"column":0},"end":{"row":25,"column":32},"action":"insert","lines":["                                "]}],[{"start":{"row":25,"column":32},"end":{"row":28,"column":38},"action":"insert","lines":["<div class=\"md-form my-0\">","                                    <input type=\"text\" id=\"constructionname\" class=\"form-control mb-0 pb-1\" style=\"margin-top: 25px;\">","                                    <label for=\"constructionname\"></label>","                                </div>"],"id":54}],[{"start":{"row":28,"column":38},"end":{"row":29,"column":0},"action":"insert","lines":["",""],"id":55},{"start":{"row":29,"column":0},"end":{"row":29,"column":32},"action":"insert","lines":["                                "]},{"start":{"row":29,"column":32},"end":{"row":29,"column":33},"action":"insert","lines":["<"]},{"start":{"row":29,"column":33},"end":{"row":29,"column":34},"action":"insert","lines":[">"]}],[{"start":{"row":29,"column":33},"end":{"row":29,"column":34},"action":"insert","lines":["b"],"id":56},{"start":{"row":29,"column":34},"end":{"row":29,"column":35},"action":"insert","lines":["r"]}],[{"start":{"row":29,"column":36},"end":{"row":30,"column":0},"action":"insert","lines":["",""],"id":57},{"start":{"row":30,"column":0},"end":{"row":30,"column":32},"action":"insert","lines":["                                "]}],[{"start":{"row":30,"column":32},"end":{"row":33,"column":38},"action":"insert","lines":["<div class=\"md-form my-0\">","                                    <input type=\"text\" id=\"constructionname\" class=\"form-control mb-0 pb-1\" style=\"margin-top: 25px;\">","                                    <label for=\"constructionname\"></label>","                                </div>"],"id":58}],[{"start":{"row":21,"column":59},"end":{"row":21,"column":75},"action":"remove","lines":["constructionname"],"id":59},{"start":{"row":21,"column":59},"end":{"row":21,"column":60},"action":"insert","lines":["n"]},{"start":{"row":21,"column":60},"end":{"row":21,"column":61},"action":"insert","lines":["u"]},{"start":{"row":21,"column":61},"end":{"row":21,"column":62},"action":"insert","lines":["m"]}],[{"start":{"row":21,"column":62},"end":{"row":21,"column":63},"action":"insert","lines":["b"],"id":60},{"start":{"row":21,"column":63},"end":{"row":21,"column":64},"action":"insert","lines":["e"]},{"start":{"row":21,"column":64},"end":{"row":21,"column":65},"action":"insert","lines":["r"]}],[{"start":{"row":26,"column":59},"end":{"row":26,"column":75},"action":"remove","lines":["constructionname"],"id":61}],[{"start":{"row":26,"column":59},"end":{"row":26,"column":60},"action":"insert","lines":["a"],"id":62},{"start":{"row":26,"column":60},"end":{"row":26,"column":61},"action":"insert","lines":["d"]},{"start":{"row":26,"column":61},"end":{"row":26,"column":62},"action":"insert","lines":["d"]},{"start":{"row":26,"column":62},"end":{"row":26,"column":63},"action":"insert","lines":["r"]},{"start":{"row":26,"column":63},"end":{"row":26,"column":64},"action":"insert","lines":["e"]},{"start":{"row":26,"column":64},"end":{"row":26,"column":65},"action":"insert","lines":["s"]},{"start":{"row":26,"column":65},"end":{"row":26,"column":66},"action":"insert","lines":["s"]}],[{"start":{"row":31,"column":59},"end":{"row":31,"column":75},"action":"remove","lines":["constructionname"],"id":63},{"start":{"row":31,"column":59},"end":{"row":31,"column":60},"action":"insert","lines":["f"]},{"start":{"row":31,"column":60},"end":{"row":31,"column":61},"action":"insert","lines":["l"]},{"start":{"row":31,"column":61},"end":{"row":31,"column":62},"action":"insert","lines":["o"]},{"start":{"row":31,"column":62},"end":{"row":31,"column":63},"action":"insert","lines":["e"]},{"start":{"row":31,"column":63},"end":{"row":31,"column":64},"action":"insert","lines":["r"]}],[{"start":{"row":31,"column":62},"end":{"row":31,"column":63},"action":"remove","lines":["e"],"id":64}],[{"start":{"row":31,"column":62},"end":{"row":31,"column":63},"action":"insert","lines":["o"],"id":65}],[{"start":{"row":22,"column":48},"end":{"row":22,"column":64},"action":"remove","lines":["constructionname"],"id":66},{"start":{"row":22,"column":48},"end":{"row":22,"column":54},"action":"insert","lines":["number"]}],[{"start":{"row":27,"column":48},"end":{"row":27,"column":64},"action":"remove","lines":["constructionname"],"id":67},{"start":{"row":27,"column":48},"end":{"row":27,"column":54},"action":"insert","lines":["number"]}],[{"start":{"row":32,"column":48},"end":{"row":32,"column":64},"action":"remove","lines":["constructionname"],"id":68},{"start":{"row":32,"column":48},"end":{"row":32,"column":54},"action":"insert","lines":["number"]}],[{"start":{"row":27,"column":48},"end":{"row":27,"column":54},"action":"remove","lines":["number"],"id":69},{"start":{"row":27,"column":48},"end":{"row":27,"column":55},"action":"insert","lines":["address"]}],[{"start":{"row":32,"column":48},"end":{"row":32,"column":54},"action":"remove","lines":["number"],"id":70},{"start":{"row":32,"column":48},"end":{"row":32,"column":53},"action":"insert","lines":["floor"]}],[{"start":{"row":35,"column":58},"end":{"row":36,"column":37},"action":"remove","lines":["`;","                            str += ` "],"id":71}],[{"start":{"row":34,"column":32},"end":{"row":35,"column":58},"action":"remove","lines":["","                                <div class=\"md-form my-0\">"],"id":72}],[{"start":{"row":22,"column":56},"end":{"row":22,"column":60},"action":"insert","lines":["建案名稱"],"id":73}],[{"start":{"row":22,"column":56},"end":{"row":22,"column":60},"action":"remove","lines":["建案名稱"],"id":74}],[{"start":{"row":22,"column":56},"end":{"row":22,"column":58},"action":"insert","lines":["戶號"],"id":80}],[{"start":{"row":27,"column":57},"end":{"row":27,"column":59},"action":"insert","lines":["地址"],"id":88}],[{"start":{"row":32,"column":55},"end":{"row":32,"column":57},"action":"insert","lines":["樓層"],"id":110}],[{"start":{"row":18,"column":55},"end":{"row":18,"column":57},"action":"remove","lines":["建案"],"id":111}],[{"start":{"row":18,"column":55},"end":{"row":18,"column":56},"action":"insert","lines":["戶"],"id":114}],[{"start":{"row":0,"column":32},"end":{"row":0,"column":33},"action":"insert","lines":["_"],"id":115}],[{"start":{"row":0,"column":33},"end":{"row":0,"column":34},"action":"insert","lines":["P"],"id":117}],[{"start":{"row":0,"column":33},"end":{"row":0,"column":34},"action":"remove","lines":["P"],"id":118},{"start":{"row":0,"column":32},"end":{"row":0,"column":33},"action":"remove","lines":["_"]}],[{"start":{"row":0,"column":32},"end":{"row":0,"column":33},"action":"insert","lines":["_"],"id":119},{"start":{"row":0,"column":33},"end":{"row":0,"column":34},"action":"insert","lines":["P"]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":0,"column":34},"end":{"row":0,"column":34},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1541509620265,"hash":"57b543761d9f0f09c76513ee32b5d66684999acc"}