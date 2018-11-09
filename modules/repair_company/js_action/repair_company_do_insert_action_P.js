class repair_company_do_insert_action_P extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
        // this.case_id = case_id;

    }
    prepareArgs() {
        this.php = true;
        this.addArgsbyid('name');
        this.addArgsbyid('contactor');
        this.addArgsbyid('address');
        this.addArgsbyid('phone');
        this.addArgsbyid('service');
        this.addArgs('service2', $("#service2").val());
        this.addArgs('service3', $("#service3").val());

        //this.addArgsbyid('service2');
        //this.addArgsbyid('service3');

    }
    ajax_success(json_str) {


        try {
            var json_str = json_str.responseText;
            var obj = JSON.parse(json_str);

            // var ds1 =obj['repair'];
            var ds = obj['repair_company_id'];

            console.log(obj);

            setTimeout((new repair_company_show_select_page_P('repair_company', 'show_select_page_P', 'body1')).run(), 1000);
        }
        catch (e) {
            console.log(e);
        }

    }
    ajax_error(msg) {
        console.log(msg.status);
    }
}
