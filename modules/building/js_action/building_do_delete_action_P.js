class building_do_delete_action_P extends ActionHandler {
    constructor(module, action, position_id,constructorId) {
        super(module, action);
        this.position_id = position_id;
        this.constructorId = constructorId;
    }
    prepareArgs() {
        var deleteThis = confirm('你確定要刪除？');
        if(deleteThis){
            this.php = true;
            this.addArgs('constructorId',this.constructorId);
            // alert(this.constructorId);
        }
    }
    ajax_success(json_str) {
        try {
            var json_str = json_str.responseText;
            var phpDatas = JSON.parse(json_str);
            console.log(phpDatas);
            
            if(phpDatas === true){
                setTimeout("alert('刪除成功')",0);
                setTimeout((new building_show_management_page('building','show_management_page','body1')).run(),1000);
            }else{
                setTimeout("alert('刪除失敗')",0);
                setTimeout((new building_show_management_page('building','show_management_page','body1')).run(),1000);
           }
        }
        catch (e) {
            console.log(e);
        }
    }
    ajax_error(msg) {

    }
}