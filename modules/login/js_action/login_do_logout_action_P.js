class login_do_logout_action_P extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs() {
        this.php = true;
		this.addArgsbyid('device_token_c');
    }
    ajax_success(xhttp) {
        try {
            var json_str = xhttp.responseText;
            var obj = JSON.parse(json_str);
            if (obj['status_code'] === 0) { //0為登入成功 -100失敗(帳密錯誤)
                this.loadModuleScript('login', 'show_login_page_P');
                (new login_show_login_page('login', 'show_login_page', 'body',2)).run();


              
            }
            else {
                console.log("shit happend");
               
            }
        }
        catch (e) {
            var msg = e + "<br>";
            msg += "JSON String: 555" + json_str;
            //msg += "<br> login's catch";
            $('#' + this.position_id).html(msg);
        }

    }
    ajax_error(msg) {
        console.log(msg.responseText)
    }
}
