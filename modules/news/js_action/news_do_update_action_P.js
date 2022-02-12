class news_do_update_action_P extends ActionHandler {
    constructor(module, action, position_id,newsID,num) {
        super(module, action);
        this.position_id = position_id;
        this.newsID=newsID;
        this.num = num;
    }
    prepareArgs() {
        this.php = true;

        var data='';
        var a=1;
        for(var i=1;i<=this.num;i++){
            console.log($('#content'+a).val(),this.num);
            if(i === this.num){
                data+=$('#content'+a).val().trim();  
            }else{
                data+=$('#content'+a).val().trim()+`<br><br>`;
            }
            a++;
        }
        this.addArgsbyid('title');
        this.addArgs('content',data);
        this.addArgsbyid('topic');
        this.addArgsbyid('date');
        this.addArgs('newsID',this.newsID);
        
        
        console.log(  
        data,
        $('#title').val(),
        );
        
        // this.addArgsbyid('service');
    }
    ajax_success(json_str) {
        try {
            var json_str = json_str.responseText;
            var obj = JSON.parse(json_str); 
            
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