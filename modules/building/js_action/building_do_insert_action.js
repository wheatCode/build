class building_do_insert_action extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs() {
        this.php = true;
        this.addArgsbyid('constructionname');
        var value1 = $("select[name='select_1']").val();
		this.addArgs('select_1', value1);
        // alert(value1);
        // console.log(  
        // $('#constructionname').val(),
        // $('#select_1').val()
        // );
    }
    ajax_success(json_str) {
        try {
            var json_str = json_str.responseText;
            var ds = JSON.parse(json_str);
            console.log(ds);
            
            if(ds === true){
                setTimeout("alert('新增成功')",0);
                (new building_show_management_page('building','show_management_page','body1')).run();
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