class login_do_login_action_E extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;

    }
    prepareArgs() {
        this.php = true;
        this.addArgsbyid('account');
        var enpassword = $("#password").val();
        //this.addArgs('device_token_e',$("#device_token_e").val());
        enpassword = CryptoJS.MD5(enpassword);
        //alert(enpassword);
        console.log(enpassword);
        this.addArgs('password', enpassword);
        //this.addArgsbyid('password');
    }
    ajax_success(xhttp) {
        try {
            console.log("login");
            //this.loadScript("include/lib/CryptoJSv3.1.2/rollups/aes.js", "CryptoJS_AES");
            //var value = '255522';
            // value = CryptoJS.MD5(value);
            // alert('2' + value);
            //var hash = CryptoJS.MD5(value).toString();
            var json_str = xhttp.responseText;
            console.log(json_str);
            var obj = JSON.parse(json_str);

            if (obj['status_code'] === 0) { //0為登入成功 -100失敗(帳密錯誤)
                //var str = `<button type="button" class="btn btn-success btn-block btn-rounded z-depth-1" onclick="(new home_show_home_page('home', 'show_home_page', 'body')).run()">登入</button>`;
                //document.getElementById(this.position_id).innerHTML = str;
                document.getElementById("login_err_msg").innerHTML = `<h2><p class="red-text">請登入主任帳號</p></h2>`;
            }
            else if (obj['status_code'] === 1) {
                (new home_show_home_page_E('home', 'show_home_page_E', 'body')).run();
            }
            else if (obj['status_code'] === -100) {
                document.getElementById("login_err_msg").innerHTML = `<div><p class="font-small white-text d-flex justify-content-end"></p> <a href="#" class="gray-text ml-1 font-weight-bold">忘記密碼?</a></div><p class="red-text">帳號或密碼錯誤or請登入主任帳號</p>`;
                //alert("帳號或密碼錯誤");
            }
            else {
                document.getElementById("login_err_msg").innerHTML = `<p class="red-text">發生未知錯誤</p>`;
                //alert("錯誤");
            }
        }
        catch (e) {
            var msg = e + "<br>";
            msg += "JSON String: " + json_str;
            //msg += "<br> login's catch";
            $('#' + this.position_id).html(msg);
        }

    }
    ajax_error(msg) {


    }
}
