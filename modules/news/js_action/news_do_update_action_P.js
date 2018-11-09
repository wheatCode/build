class news_do_update_action_P extends ActionHandler {
    constructor(module, action, position_id,newsID) {
        super(module, action);
        this.position_id = position_id;
        this.newsID=newsID;
    }
    prepareArgs() {
        this.php = true;
        // this.addArgsById('id');
        
        this.addArgsbyid('content');
        this.addArgsbyid('topic');
        this.addArgsbyid('date');
        this.addArgs('newsID',this.newsID);
        
        
        console.log(  
        $('#content').val(),
        $('#topic').val(),
        $('#date').val(),
        $('#newsID').val(),
        );
        
        // this.addArgsbyid('service');
    }
    ajax_success(json_str) {
        try {
            var json_str = json_str.responseText;
            var obj = JSON.parse(json_str);
            console.log(obj);
            
            if(obj !=""){
                setTimeout("alert('修改成功')",0);
                setTimeout((new news_show_select_page_P('news','show_select_page_P','body1')).run(),1000);
            }else{
                setTimeout("alert('修改失敗')",0);
                setTimeout((new news_show_select_page_P('news','show_select_page_P','body1')).run(),1000);
           }
        }
        catch (e) {
            console.log(e);
        }
    }
    ajax_error(msg) {

    }
}