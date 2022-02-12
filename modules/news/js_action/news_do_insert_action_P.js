class news_do_insert_action_P extends ActionHandler {
    constructor(module, action, position_id,num) {
        super(module, action);
        this.position_id = position_id;
        this.num=num;
        // this.newsID=newsID;
    }
    prepareArgs() {
        this.php = true;
        // this.addArgsById('id');
        var data='';
        var a=1;
        for(var i=1;i<=this.num;i++){
            if(i === this.num){
                data+=$('#content'+a).val().trim();  
            }else{
                data+=$('#content'+a).val().trim()+`<br><br>`;
            }
            a++;
        }
        this.addArgsbyid('title');
        this.addArgs('content', data);
        this.addArgsbyid('topic');
        this.addArgsbyid('inimg'); 

        // this.addArgs('newsID',this.newsID);
        
        console.log(  
        data,
        $('#topic').val(),
         $('#inimg').val(),
        );
        
        // this.addArgsbyid('service');
    }
    ajax_success(json_str) {
        
        
        try {
           var json_str = json_str.responseText;
            var obj = JSON.parse(json_str);
        console.log(obj);
           
                setTimeout((new news_show_select_page_P('news','show_select_page_P','body1')).run(),1000);
        }
    catch (e) {
            console.log(e);
            }

}
 ajax_error(msg) {
        // console.log(msg.status);
    }
}