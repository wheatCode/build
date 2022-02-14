class contact_show_contact_E extends ActionHandler {
    constructor(module, action, position_id, case_id) {
        super(module, action);
        this.position_id = position_id;
        this.case_id = case_id;

    }
    prepareArgs() {
        this.php = true;
        this.addArgs('case_id', this.case_id);
        console.log(this.case_id);
        //this.addArgsbyid('repair_type_id');
        //this.addArgs('repair_type_id', this.repair_type_id);
    }
    ajax_success(xhttp) {
        try {
            this.loadModuleScript("contact", "new_contact_E");
            var json_str = xhttp.responseText;
            console.log(json_str);
            var obj = JSON.parse(json_str);
            if (obj['status_code'] == 1) { //無資料
                var ds = obj['repair_company'];
                console.log(obj);
                //this.loadModuleScript("home", "show_home_page_E");
                var content = "";
                content += `
                        <div class="row">
                            <div class="col-12">
                                <span>聯絡情況:</span>
                            </div>
                            <div class="col-12">
                                <table class="table table-bordered">
                                    
                                    <tr>
                                        <th class="font30">`+st_time_to_min(Date.now())+`</th>
                                        <th>
                                            <div class="row">
                                                <div class="col-8"><input type="text" id="new_contact" style="min-width:100%" class="font30"/></div>
                                                <div class="col-4">
                                                    <button type="button" class="btn btn-indigo font30" id="submit_contact" data-case_id="` + this.case_id + `">送出</button>
                                                    <div id="contact_err_msg"></div>
                                                </div>
                                            </div>
                                        </th>
                                    </tr>
                                </table>
                            </div>
                `;
                $('#' + this.position_id).html(content);

            }
            else if (obj['status_code'] == 0) {
                var ds = obj['repair_company'];
                console.log(obj);
                //this.loadModuleScript("home", "show_home_page_E");
                var content = "";
                content += `
                        <div class="row">
                            <div class="col-12">
                                <span>聯絡情況:</span>
                            </div>
                            <div class="col-12">
                                <table class="table table-bordered">`;
                for (var i = 0; i < obj['contact_data'].length; i++) {
                    content += `
                                    <tr>
                                        <th class="font30">` + st_time_to_min(obj['contact_data'][i]['contact_datetime']) + `</th>
                                        <th>
                                            <div class="row font30 pl-2">
                                                ` + obj['contact_data'][i]['content'] + `
                                            </div>
                                        </th>
                                    </tr>
                                    `;
                }
                content += `
                                
                                    
                                    
                                    <tr>
                                        <th class="font30">` + obj['date'] + `</th>
                                        <th>
                                            <div class="row">
                                                <div class="col-8"><input type="text" id="new_contact" style="min-width:100%" class="font30" /></div>
                                                <div class="col-4">
                                                    <button type="button" class="btn btn-indigo font30" id="submit_contact" data-case_id="` + this.case_id + `">送出</button>
                                                    <div id="contact_err_msg"></div>
                                                </div>
                                            </div>
                                        </th>
                                    </tr>
                                </table>
                            </div>
                `;
                $('#' + this.position_id).html(content);
            }
            else {
                $('#' + this.position_id).html(obj['status_message']);
            }

            function st_time_to_min(tt1) {
                var tt3;
                tt3 = tt1.split(" ")[0].split("-")[0] + "/" + tt1.split(" ")[0].split("-")[1] + "/" + tt1.split(" ")[0].split("-")[2] + " " + tt1.split(" ")[1].split(":")[0] + ":" + tt1.split(" ")[1].split(":")[1];
                return tt3;
            };

            function check_contact() {
                document.getElementById("contact_err_msg").innerHTML = '';
                if ($("#new_contact").val() != null && $("#new_contact").val() != "" && $("#new_contact").val() != " ") {
                    (new contact_new_contact_E('contact', 'new_contact_E', 'contact', '' + $("#submit_contact").data('case_id'))).run();
                }
                else {
                    document.getElementById("contact_err_msg").innerHTML = '<font color="red" size="4">請輸入資料</font>';
                }
            }
            $(document).ready(function() {
                $("#submit_contact").click(
                    function() {
                        check_contact();
                    }
                );
            });
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
