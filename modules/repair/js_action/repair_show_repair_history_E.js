class repair_show_repair_history_E extends ActionHandler {
    constructor(module, action, position_id, case_id) {
        super(module, action);
        this.position_id = position_id;
        this.case_id = case_id;
    }
    prepareArgs() {
        this.php = true;
        this.addArgs('case_id', this.case_id);
        //this.addArgsbyid('repair_type_id');
        //this.addArgs('repair_type_id', this.repair_type_id);
    }
    ajax_success(xhttp) {
        try {
            var json_str = xhttp.responseText;
            console.log(json_str);
            var obj = JSON.parse(json_str);
            if (obj['status_code'] == 1 || obj['check_finish'] == "finish") {
                //var ds = obj['repair_company'];
                console.log(obj);
                //this.loadModuleScript("home", "show_home_page_E");
                var content = "";
                if (obj["check_histroy_length"] == "yes") {
                    content += `
                        <table class="table table-bordered" width="100%">
                            <thead>
                                <tr>
                                    <th class="font30" width="25%">施工日期</th>
                                    <th class="font30" width="25%">施工廠商</th>
                                    <th class="font30" width="25%">工時</th>
                                    <th class="font30" width="25%">維修內容</th>
                                </tr>
                            </thead>
                            <tbody>`;
                    for (var i = 0; i < obj['repair_history'].length; i++) {
                        if (obj['repair_history'][i]['reservetime'] == null) {
                            continue;
                        }
                        content += `<tr>
                                    <th class="font30" scope="row">` + st_time_to_min(obj['repair_history'][i]['reservetime']) + `</th>
                                    <td class="font30">` + obj['repair_com'][i] + `</td>
                                    <td class="font30">` + obj['repair_history'][i]['work_time'] + `小時</td>
                                    <td class="font30">` + obj['repair_history'][i]['repair_content'] + `</td>
                                </tr>`;

                    }

                    function st_time_to_min(tt1) {
                        var tt3;
                        tt3 = tt1.split(" ")[0].split("-")[0] + "/" + tt1.split(" ")[0].split("-")[1] + "/" + tt1.split(" ")[0].split("-")[2] + " " + tt1.split(" ")[1].split(":")[0] + ":" + tt1.split(" ")[1].split(":")[1];
                        return tt3;
                    };

                }
                else {
                    content += ``;
                }

                $('#' + this.position_id).html(content);

            }
            else if (obj['status_code'] == 0) {
                //var ds = obj['repair_company'];
                console.log(obj);
                //this.loadModuleScript("home", "show_home_page_E");
                var content = "";
                content += `
                        <table class="table table-bordered" width="100%">
                            <thead>
                                <tr>
                                    <th class="font30" width="25%">施工日期</th>
                                    <th class="font30" width="25%">施工廠商</th>
                                    <th class="font30" width="25%">工時</th>
                                    <th class="font30" width="25%">維修內容</th>
                                </tr>
                            </thead>
                            <tbody>`;
                for (var i = 0; i < obj['repair_history'].length - 1; i++) {
                    content += `<tr>
                                    <th class="font30" scope="row" width="25%">` + st_time_to_min(obj['repair_history'][i]['reservetime']) + `</th>
                                    <td class="font30" width="25%">` + obj['repair_com'][i] + `</td>
                                    <td class="font30" width="25%">` + obj['repair_history'][i]['work_time'] + `小時</td>
                                    <td class="font30" width="25%">` + obj['repair_history'][i]['repair_content'] + `</td>
                                </tr>`;

                }
                content += `
                                
                                <tr>
                                    <th class="font30" scope="row" width="25%">` + st_time_to_min(obj['repair_history'][obj['repair_history'].length - 1]['reservetime']) + `</th>
                                    <td class="font30" width="25%">` + obj['repair_com'][obj['repair_history'].length - 1] + `</td>
                                    <td class="font30" width="25%"><div class="row mt-0"><div class="col-6 mr-0 pr-0"><input type="text" id="new_time" class="form-control mr-0" style = "font-size:30px"></div><div class="col-6">小時</div></div></td>
                                    <td class="font30" width="25%"><input type="text" id="new_content" class="form-control mr-0" style = "font-size:30px"></td>
                                </tr>
                                <tr>
                                    <th class="font30" scope="row" colsoan="3">合計</th>
                                    <td class="font30" colspan="2">XXX</td>
                                </tr>
                            </tbody>
                            <!--Table body-->
                        </table>
                
                `;
                $('#' + this.position_id).html(content);

                function st_time_to_min(tt1) {
                    var tt3;
                    tt3 = tt1.split(" ")[0].split("-")[0] + "/" + tt1.split(" ")[0].split("-")[1] + "/" + tt1.split(" ")[0].split("-")[2] + " " + tt1.split(" ")[1].split(":")[0] + ":" + tt1.split(" ")[1].split(":")[1];
                    return tt3;
                };
            }

            else {
                $('#' + this.position_id).html(obj['status_message']);
            }

            //this.loadModuleScript("case", "do_select_action");
        }
        catch (e) {
            var msg = e + "<br>";
            msg += "JSON String: " + json_str;
            $('#' + this.position_id).html(msg);
        }

    }
    ajax_error(msg) {
        $('#' + this.position_id).html(msg.status);
    }

}
