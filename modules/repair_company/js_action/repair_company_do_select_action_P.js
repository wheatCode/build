class repair_company_do_select_action_P extends ActionHandler {
    constructor(module, action, position_id, case_id) {
        super(module, action);
        this.position_id = position_id;
        this.case_id = case_id;

    }
    prepareArgs() {
        this.php = true;
        this.php_action = 'do_select_action';
        console.log(this.case_id);
        this.addArgs('cid', this.case_id)
        // this.addArgs('where_statement', 'id = ' + value);
    }
    ajax_success(json_str) {
        try {
            var json_str = json_str.responseText;
            var obj = JSON.parse(json_str);
            if (obj['status_code'] === 0) {
                var ds = obj['data_set'];
                console.log(json_str);
                var content = `
               
                           `;

                $('#' + this.position_id).html(content);
            }

            else {
                $('#' + this.position_id).html(obj['status_message']);
            }
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
