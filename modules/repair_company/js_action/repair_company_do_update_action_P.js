class repair_company_do_update_action_P extends ActionHandler {
    constructor(module, action, position_id,companyID) {
        super(module, action);
        this.position_id = position_id;
        this.companyID=companyID;
    }
    prepareArgs() {
        this.php = true;
        // this.addArgsById('id');
        this.addArgsbyid('name');
        this.addArgsbyid('contactor');
        this.addArgsbyid('address');
        this.addArgsbyid('phone');
        this.addArgs('companyID',this.companyID);
        
        
        console.log(  
        $('#name').val(),
        $('#contactor').val(),
        $('#address').val(),
        $('#phone').val(),
        $('#companyID').val(),
        );
        
        // this.addArgsbyid('service');
    }
    ajax_success(json_str) {
        try {
            var json_str = json_str.responseText;
            var phpDatas = JSON.parse(json_str);
            console.log(phpDatas);
            
            // if(phpDatas === true){
                setTimeout("alert('修改成功')",0);
                setTimeout((new repair_company_show_select_page_P('repair_company','show_select_page_P','body1')).run(),1000);
            // }
        //     }else{
        //         setTimeout("alert('修改失敗')",0);
        //         setTimeout((new repair_company_show_select_page_P('repair_company','show_select_page_P','body1')).run(),1000);
        //   }
        }
        catch (e) {
            console.log(e);
        }
    }
    ajax_error(msg) {

    }
}