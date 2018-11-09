class case_do_confirm_E extends ActionHandler {
    constructor(module, action, position_id, case_id, repair_company_id, datetime) {
        super(module, action);
        this.position_id = position_id;
        this.case_id = case_id;
        this.repair_company_id = repair_company_id;
        this.datetime = datetime;

    }
    prepareArgs() {
        this.php = true;
        this.addArgs('case_id', this.case_id);
        this.addArgs('repair_company_id', this.repair_company_id);
        this.addArgs('datetime', this.datetime);
        //this.addArgsbyid('repair_type_id');
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
                this.loadModuleScript("home", "show_home_page_E");
                console.log("in");
                var content = "";
                content += `
                
                `;
                this.loadModuleScript("home", "show_home_page_E");
                (new home_show_home_page_E('home', 'show_home_page_E', 'body', 'home')).run();
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
