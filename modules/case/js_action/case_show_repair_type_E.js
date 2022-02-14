class case_show_repair_type_E extends ActionHandler {
    constructor(module, action, position_id, repair_type_id) {
        super(module, action);
        this.position_id = position_id;
        this.repair_type_id = repair_type_id;
    }
    prepareArgs() {
        this.php = true;
        //var value1 = $("select[name='select_repair_type']").val(); //抓select的值
        //this.addArgs('repair_type', value1);
        //this.addArgsbyid('repair_type_id');
        //this.addArgs('repair_type_id', this.repair_type_id);
    }
    ajax_success(xhttp) {
        try {
            var json_str = xhttp.responseText;
            console.log(json_str);
            var obj = JSON.parse(json_str);
            if (obj['status_code'] == 0) {
                //var ds = obj['data_set'];
                console.log(obj);
                //this.loadModuleScript("home", "show_home_page_E");
                var content = `<select class="mdb-select selectfont" name="select_repair_type" style="min-width:100%" id="select_repair_type">`;

                for (var index in obj['repair_type']) {
                    if (obj['repair_type'][index]['id'] == this.repair_type_id) {
                        content += '<option  value="' + obj['repair_type'][index]['id'] + '"  selected>' + obj['repair_type'][index]['namech'] + "類廠商" + '</option>';

                    }
                    else {
                        content += `<option onclick="(new repair_company_show_repair_company_E('repair_company', 'show_repair_company_E', 'repair_company', ` + obj['repair_type'][index]['id'] + `)).run();" value="` + obj['repair_type'][index]['id'] + `">` + obj['repair_type'][index]['namech'] + "類廠商" + `</option>`;
                    }
                }
                content += `
                                        </select>
                `;
                $(document).ready(function() {
                    $('.mdb-select').material_select();
                    $("select").on("change", function() {
                        var s = $("select[name='select_repair_type']").val();
                        (new repair_company_show_repair_company_E('repair_company', 'show_repair_company_E', 'repair_company', s)).run();
                    });
                });
                $('#' + this.position_id).html(content);
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
