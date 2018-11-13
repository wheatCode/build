class user_profile_do_insert_action_p extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs() {
        var password = CryptoJS.MD5($('#password').val());
        this.php = true;
        this.addArgsbyid('name');
        this.addArgsbyid('account');
        this.addArgs('password',password);
        this.addArgsbyid('phone');
        this.addArgsbyid('type');
        this.addArgs('householdid',$('input[name=building]:checked').val());
        console.log(  
        $('#name').val(),
        $('#account').val(),
        password,
        $('#phone').val(),
        $('#type').val(),
        );
    }
    ajax_success(json_str) {
        try {
            var json_str = json_str.responseText;
            var phpDatas = JSON.parse(json_str);
            console.log(phpDatas);
            
            if(phpDatas === true){
                setTimeout("alert('新增成功')",0);
                setTimeout((new user_profile_show_select_page_p('user_profile','show_select_page_p','body1')).run(),1000);
            }else{
                setTimeout("alert('新增失敗')",0);
                setTimeout((new user_profile_show_select_page_p('user_profile','show_select_page_p','body1')).run(),1000);
           }
        }
        catch (e) {
            console.log(e);
        }
    }
    ajax_error(msg) {

    }
}
