class user_profile_do_update_password extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs() {
        this.php = true;
        var enoldpassword = $("#password").val();
        //console.log(enpassword);
        enoldpassword = CryptoJS.MD5(enoldpassword);
        this.addArgs('password', enoldpassword);

        var enpassword = $("#newpassword").val();
        //console.log(enpassword);
        enpassword = CryptoJS.MD5(enpassword);
        this.addArgs('newpassword', enpassword);
        //this.addArgsbyid('password');
    }
    ajax_success(xhttp) {
        try {
            console.log("in_u_update");
            var json_str = xhttp.responseText;
            var obj = JSON.parse(json_str);
            console.log("ddd status_code" + obj['status_code']);
            console.log(obj);
            if (obj['status_code'] == 10) {
                //console.log("yyy");
                this.loadModuleScript("home", "show_home_page");
                (new home_show_home_page('home', 'show_home_page', 'body')).run();
            }
            else if (obj['status_code'] == 20) {
                document.getElementById("U_password_error").innerHTML = '<font color="#FF0000">無法更新! 舊密碼輸入錯誤</font>';
            }
        }
        catch (e) {
            var msg = e + "<br>";
            msg += "JSON String: " + json_str;
            document.getElementById(this.position_id).innerHTML = msg;
        }
    }
    ajax_error(msg) {
        console.log(msg.status);
    }
}
