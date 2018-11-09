class user_profile_show_update_page extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs() {
        this.php = true;
    }
    ajax_success(xhttp) {
        this.loadScript("include/lib/CryptoJSv3.1.2/rollups/aes.js", "CryptoJS_AES");
        // alert("u_show_update_in");
        try {
            var json_str = xhttp.responseText;
            var obj = JSON.parse(json_str);
            if (obj['status_code'] == 0) {
                var ds = obj['data_set'];
                console.log(obj);
                console.log("zz" + ds[0]['name']);
                var msg = `        
            <!-- Navbar -->

        <nav class="navbar bgdark text-white py-1" style="height:51px">
      <div onclick="(new home_show_home_page('home','show_home_page','body')).run()">
        <i class="fa fa-chevron-left text-white" aria-hidden="true"></i>
    </div>
            <span class="h6 m-auto pr-3">
                   基本資料
            </span>
        </nav>
        <!-- /.Navbar -->
    </header>
    <!-- Default form contact -->
    <form class="mt-5">
        <div class="container p-3">
        
            <!-- Default input 名字 -->
            <i class="fa fa-user prefix grey-text text-center"></i>
            <label for="exampleForm2">名稱</label>
            <input type="text" id="name" class="form-control"readonly="readonly" value="`;
                msg += ds[0][3];
                msg += `">
            
            <!-- Default 所屬建案 -->
            <i class="fa fa-home prefix grey-text text-center"></i>
            <label for="exampleForm2">所屬建案</label>
            <input type="text" id="cp" class="form-control"readonly="readonly" value="`;
                msg += obj['construction_project'];
                //msg += ds[0]['name'];
                msg += `">
            
            <!-- Default 住址 -->
            <i class="fa fa-home prefix grey-text text-center"></i>
            <label for="exampleForm2">住址</label>
            <input type="text" id="address" class="form-control"readonly="readonly" value="`;
                msg += obj['address'];
                msg += `">
            
            <!-- Default 電話 -->
            <i class="fa fa-phone prefix grey-text text-center"></i>
            <label for="exampleForm2">電話</label>
            <input type="text" id="phonenum" class="form-control"  value="`;
                msg += ds[0]['phone'];
                msg += `">
            
            <!-- Default email -->
            <i class="fa fa-envelope prefix grey-text text-center"></i>
            <label for="exampleForm2">信箱</label>
            <input type="email" id="email" class="form-control" value="`;
                msg += ds[0]['account'];
                msg += `">
            
            
                

            <div class="text-center mt-2">
                <button class="btn btn-outline-blue darken-4 waves-effect" type="button" onclick="(new user_profile_do_update_action('user_profile','do_update_action','body')).run()">修改</button>
                <button type="button" class="btn btn-outline-danger waves-effect" data-toggle="modal" data-target="#basicExampleModal">
                                          修改密碼
                                        </button>
            </div>
            
                            
                            <!-- Modal -->
                            <div class="modal fade" id="basicExampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">取消案件</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div class="modal-body">
                                    <!-- Default password -->
                                    <i class="fa fa-lock prefix grey-text text-center"></i>
                                    <label for="exampleForm2">請輸入舊密碼</label>
                                    <input type="password" id="password" class="form-control" value="">
                                    <!-- Default password -->
                                    <i class="fa fa-lock prefix grey-text text-center"></i>
                                    <label for="exampleForm2">請輸入新密碼</label>
                                    <input type="password" id="newpassword" class="form-control" value="">
                                  </div>
                                  <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" id="cancel" data-dismiss="modal" onclick="(new user_profile_do_update_password('user_profile','do_update_password','U_password_error')).run()">更改密碼</button>
                                    <div id="U_password_error"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
            <div id="U_update_error"></div>
        </div>
    </form>
`;
                document.getElementById(this.position_id).innerHTML = msg;
                this.loadModuleScript("user_profile", "do_update_action");
                this.loadModuleScript("user_profile", "do_update_password");
            }
            else {
                // document.getElementById(this.position_id).innerHTML = "<div>此帳號沒有綁定建案， 請聯絡客服</div>";
                alert('此帳號沒有綁定建案， 請聯絡客服');
                (new home_show_home_page('home', 'show_home_page', 'body')).run()
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
        console.log(msg.responseText)
    }
}
