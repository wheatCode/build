class repair_insert_new_apply_date extends ActionHandler {
    constructor(module, action, position_id, case_id) {
        super(module, action);
        this.position_id = position_id;
        this.case_id = case_id;
    }
    prepareArgs() {
        this.php = true;
        this.addArgs('case_id', this.case_id);
        this.addArgsbyid('input_starttime1-1');
        this.addArgsbyid('input_starttime1-2');
        this.addArgsbyid('input_starttime2-1');
        this.addArgsbyid('input_starttime2-2');
        this.addArgsbyid('input_starttime3-1');
        this.addArgsbyid('input_starttime3-2');
        this.addArgsbyid('date1');
        this.addArgsbyid('date2');
        this.addArgsbyid('date3');
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
                var content = "";
                content += `
                
                `;
                this.loadModuleScript("case", "do_select_action");
                (new case_do_select_action('case', 'do_select_action', 'body', this.case_id)).run();
                //$('#' + this.position_id).html(content);

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
