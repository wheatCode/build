class household_do_update_action_P extends ActionHandler {
    constructor(module, action, position_id,housepid) {
        super(module, action);
        this.position_id = position_id;
        this.housepid=housepid;
        // this.housepnum=housepnum;
        // this.housepadd=housepadd;
        // this.houseflow=houseflow;
    }
    prepareArgs() {
        this.php = true;
        this.addArgs('housepid',this.housepid);
        // this.addArgs('housepnum',this.housepnum);
        // this.addArgs('housepadd',this.housepadd);
        // this.addArgs('houseflow',this.houseflow);
        this.addArgsbyid('test_test');
        this.addArgsbyid('num');
        this.addArgsbyid('add');
        this.addArgsbyid('flow');
    }
    ajax_success(json_str) {
        try {
            var json_str = json_str.responseText;
            var phpDatas = JSON.parse(json_str);
            console.log(phpDatas);
            
            // if(phpDatas === true){
                setTimeout("alert('修改成功')",0);
                setTimeout((new building_show_management_page('building','show_management_page','body1')).run(),1000);
            
            // }else{
                // setTimeout("alert('修改失敗')",0);
                // setTimeout((new building_show_management_page('building','show_management_page','body1')).run(),1000);
            // }
        }
        catch (e) {
            console.log(e);
        }
    }
    ajax_error(msg) {

    }
}