class user_profile_do_delete_action_p extends ActionHandler {
    constructor(module, action, position_id,userId) {
        super(module, action);
        this.position_id = position_id;
        this.userId = userId;
    }
    prepareArgs() {
        var deleteThis = confirm('你確定要刪除？');
        if(deleteThis){
            this.php = true;
            this.addArgs('userId',this.userId);
        }
    }
    ajax_success(json_str) {
        try {
            var json_str = json_str.responseText;
            var phpDatas = JSON.parse(json_str);
            console.log(phpDatas);
            
            if(phpDatas === true){
                setTimeout("alert('修改成功')",0);
                setTimeout((new user_profile_show_select_page_p('user_profile','show_select_page_p','body1')).run(),1000);
            }else{
                setTimeout("alert('修改失敗')",0);
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
