class case_update_user_rank extends ActionHandler {
    constructor(module, action, position_id, case_id) {
        super(module, action);
        this.position_id = position_id;
        this.case_id = case_id;
    }
    prepareArgs() {
        this.php = true;
        this.addArgs('case_id', this.case_id);
        this.addArgsbyid('hid_star');
        this.addArgsbyid('reply');
        //this.addArgs('repair_type_id', this.repair_type_id);
    }
    ajax_success(xhttp) {
        try {
            var json_str = xhttp.responseText;
            console.log(json_str);
            var obj = JSON.parse(json_str);
            if (obj['status_code'] == 0) {
                var ds = obj['repair_company'];
                console.log(obj);
                var content = "";
                content += `
                
                `;
                this.loadModuleScript("home", "show_home_page");
                this.loadModuleScript("case", "do_select_action");
                (new home_show_home_page('home', 'show_home_page', 'body', 'record')).run();
                //(new case_do_select_action('case', 'do_select_action', 'body', this.case_id)).run();
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
