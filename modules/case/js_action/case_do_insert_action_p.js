class case_do_insert_action_p extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs() {
        this.php = true;
        this.addArgsbyid('service');
        this.addArgsbyid('caseName');
        this.addArgsbyid('title');
        this.addArgsbyid('content');
        this.addArgsbyid('startTime');
        this.addArgsbyid('endTime');
        this.addArgsbyid('date');
        this.addArgs('houseHoldUserId',$('input[name=building]:checked').val());
    }
    
    ajax_success(json_str) {
        try {
            var json_str = json_str.responseText;
            var phpDatas = JSON.parse(json_str);

            if(phpDatas === true){
                setTimeout("alert('新增成功')",0);
                setTimeout((new case_show_select_page_p('case','show_select_page_p','body1')).run(),1000);
            }else{
                setTimeout("alert('新增失敗')",0);
                setTimeout((new case_show_select_page_p('case','show_select_page_p','body1')).run(),1000);
           }
        }catch (e) {
            console.log(e);
        }
  }
    ajax_error(msg) {

    }
}