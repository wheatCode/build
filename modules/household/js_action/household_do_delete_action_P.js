class household_do_delete_action_P extends ActionHandler {
    constructor(module, action, position_id,houseId) {
        super(module, action);
        this.position_id = position_id;
        this.houseId = houseId;
    }
    prepareArgs() {
        var deleteThis = confirm('你確定要刪除？');
        if(deleteThis){
            this.php = true;
            this.addArgs('houseId',this.houseId);
            // alert(this.houseId);
        }
    }
    ajax_success(json_str) {
        // console.log(json_str);
        try {
            var json_str = json_str.responseText;
            var ds = JSON.parse(json_str);
            // console.log(ds);
            
            if(ds === true){
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