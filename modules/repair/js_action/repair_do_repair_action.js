class repair_do_repair_action extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;

    }
    prepareArgs() {
        this.php = true;
        var value1 = $("select[name='select1']").val(); //抓select的值
        if ($("select[name='select0']").val()) {
            this.addArgs('construction_num', $("select[name='select0']").val());
        }
        else {
            this.addArgs('construction_num', "no");
        }
        this.addArgs('class', value1);
        this.addArgsbyid('input_starttime1-1');
        this.addArgsbyid('input_starttime1-2');
        this.addArgsbyid('input_starttime2-1');
        this.addArgsbyid('input_starttime2-2');
        this.addArgsbyid('input_starttime3-1');
        this.addArgsbyid('input_starttime3-2');
        this.addArgsbyid('case_content');
        this.addArgsbyid('case_title');
        this.addArgsbyid('date1');
        this.addArgsbyid('date2');
        this.addArgsbyid('date3');
        this.addArgsbyid('inimg');
        //this.addArgsbyid('construction_num');
        $("#construction_num").val(this.conid);

    }


    ajax_success(xhttp) {
        var json_str = xhttp.responseText;
        var obj = JSON.parse(json_str);
        var msg = obj['status_message'];
        console.log(obj);
        console.log("id " + obj['case_id']);
        if (obj['status_code'] === 0) {
            (new home_show_home_page('home', 'show_home_page', 'body', 'home')).run();
        }
        else {

        }
    }
    ajax_error(xhttp) {
        // console.log("error");
    }
}
