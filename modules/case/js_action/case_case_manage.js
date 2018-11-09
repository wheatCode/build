class case_case_manage extends ActionHandler {
    constructor(module, action, position_id, repair_type) {
        super(module, action);
        this.position_id = position_id;
        this.repair_type = repair_type;
    }
    prepareArgs() {
        this.php = true;
        //this.php_action = 'do_select_action';
    }
    ajax_success(json_str) {

        
        try {
            var json_str = json_str.responseText;
            var obj = JSON.parse(json_str);
            // alert(obj['status_code']);
            if (obj['status_code'] === 0) {
                var ds = obj['data_set'];
                var str = `

                                `;
                $('#' + this.position_id).html(str);
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

        // document.getElementById(this.position_id).innerHTML = str;

        this.loadModuleScript(this.module, "do_repair_action");
    }
    ajax_error(msg) {

    }
}
