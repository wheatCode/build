class case_show_search_result_E extends ActionHandler {
    constructor(module, action, position_id, end) {
        super(module, action);
        this.position_id = position_id;
        this.end = end;
    }
    prepareArgs() {
        this.php = true;
        this.addArgs('end', this.end);
        console.log('cond ' + this.end);
        var value1 = $("select[name='construction_project']").val();
        if (value1 == "all") { value1 = "all"; }
        console.log(value1);
        this.addArgsbyid('household_num');
        this.addArgs('construction_project', value1);
        //this.addArgsbyid('construction_project');
        this.addArgsbyid('end_datetime');
        this.addArgsbyid('cus_name');
    }
    ajax_success(xhttp) {
        try {
            var json_str = xhttp.responseText;
            console.log(json_str);
            var obj = JSON.parse(json_str);
            if (obj['status_code'] == 0) {
                //var ds = obj['repair_company'];
                console.log(obj);
                //this.loadModuleScript("home", "show_home_page_E");
                var content = ` 
                        <table class="table  text-center table-striped">
                                <tbody>`;
                for (var i = 0; i < obj['case_data'].length; i++) {
                    content += `
                                    <tr>
                                        <th class="pt-4 pl-3 fontsm" width="15%">` + obj['case_data'][i]['name'] + `</th>
                                        <td class="pt-4 fontsm" width="35%">` + obj['case_data'][i]['title'] + `</td>
                                        <td class="pt-4 fontsm" width="35%">`;
                    if (obj['case_data'][i]['end_datetime'] == null) {
                        content += `未完成`;
                    }
                    else {
                        content += st_time_to_date(obj['case_data'][i]['end_datetime']);
                    }
                    content += `</td>
                                        <td width="15%">
                                            <div class="btn-group" role="group" aria-label="Basic example">
                                                <a type="button" class="btn bg-transparent p-2" onclick="(new case_show_case_page_E('case','show_case_page_E','body','` + obj['case_data'][i]['id'] + `')).run();">
                                                    <i class="fa fa-file fa-lg text-dark"></i>
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                    `;
                }

                content += `</table>`;

                function st_time_to_date(tt1) {
                    var tt3;
                    tt3 = tt1.split(" ")[0].split("-")[0] + "/" + tt1.split(" ")[0].split("-")[1] + "/" + tt1.split(" ")[0].split("-")[2];
                    return tt3;
                };
                $('#' + this.position_id).html(content);

            }

            else {
                $('#' + this.position_id).html(obj['status_message']);
            }

            //this.loadModuleScript("case", "do_select_action");
        }
        catch (e) {
            var msg = e + "<br>";
            msg += "JSON String: ccc" + json_str;
            $('#' + this.position_id).html(msg);
        }

    }
    ajax_error(msg) {
        $('#' + this.position_id).html(msg.status);
    }

}
