class contact_new_contact_E extends ActionHandler {
    constructor(module, action, position_id, case_id) {
        super(module, action);
        this.position_id = position_id;
        this.case_id = case_id;
    }
    prepareArgs() {
        this.php = true;
        this.addArgs('case_id', this.case_id);
        this.addArgsbyid('new_contact');
        //this.addArgsbyid('repair_type_id');
        //this.addArgs('repair_type_id', this.repair_type_id);
    }
    ajax_success(xhttp) {
        try {
            this.loadModuleScript("contact", "show_contact_E");
            var json_str = xhttp.responseText;
            console.log(json_str);
            var obj = JSON.parse(json_str);

            if (obj['status_code'] == 0) {
                (new contact_show_contact_E('contact', 'show_contact_E', 'contact', this.case_id)).run();

                //var ds = obj['repair_company'];
                //console.log(obj);
                //this.loadModuleScript("home", "show_home_page_E");
                // var content = "";
                // content += `

                // `;

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
