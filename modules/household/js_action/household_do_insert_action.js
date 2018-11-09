class household_do_insert_action extends ActionHandler {
    constructor(module, action, position_id,constid,workername) {
        super(module, action);
        this.position_id = position_id;
        this.constid = constid;
        this.workername=workername;
    }
    prepareArgs() {
        // this.php = true;
        this.php_action = 'do_insert_action_P';
        this.addArgsbyid('number');
        this.addArgsbyid('address');
        this.addArgsbyid('floor');
		this.addArgs('constid', this.constid);
        console.log(this.constid,$('#number').val(),$('#address').val(),$('#floor').val());
    }
    ajax_success(json_str) {
        try {
            var json_str = json_str.responseText;
            var ds = JSON.parse(json_str);
            console.log(ds);
            
            if(ds === true){
                setTimeout("alert('新增成功')",0);
                (new building_show_management_page('building','show_management_page','body1')).run();
                // (new household_show_management_page_P('household','show_management_page_P','body1',this.constid,this.workername)).run();
            }else{
                setTimeout("alert('新增失敗，此建案已存在')",0);
                // setTimeout((new user_profile_show_select_page_p('user_profile','show_select_page_p','body1')).run(),1000);
           }
        }
        catch (e) {
            console.log(e);
        }
    }
    ajax_error(msg) {

    }
}