class user_profile_show_insert_page_p extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs() {
        this.php = false;
    }
    showResult(xhttp){
                var content = "";
                content+= `
        <div class="row mt-0">
            <div class="col-lg-12 col-md-7">
                <div class="w-100 p-2 borderB">
                    <h1 class="bold">新增使用者</h1>
                </div>

                <div class="md-form mt-3 mb-0">
                    <input type="text" style="max-width:100%" id="name" class="form-control mb-0 pb-1" value="">
                    <label for="name">使用者名稱</label>
                </div>

                <div class="md-form mt-3 mb-0">
                    <input type="text" style="max-width:100%" id="account" class="form-control mb-0 pb-1" value="">
                    <label for="account">帳號</label>
                </div>

                <div class="md-form mt-3 mb-0">
                    <input type="text" style="max-width:100%" id="password" class="form-control mb-0 pb-1" value="">
                    <label for="password">密碼</label>
                </div>
                
                <div class="md-form mt-3 mb-0">
                    <input type="text" style="max-width:100%" id="phone" class="form-control mb-0 pb-1" value="">
                    <label for="phone">電話</label>
                </div>
                
                <div>
                    <label>角色</label>
                   <select class="browser-default mt-3 mb-0" id="type">
                        <option value="user">住戶</option>
                        <option value="pf_user">管理員</option>
                    </select>
                </div>
                
                <br>
                
                <div class="mt-2">
                    <button onclick="(new user_profile_do_insert_action_p('user_profile','do_insert_action_p','body1')).run()" class="btn btn-blue darken-4 waves-effect" type="submit">新增</button>
                </div>
            </div>
        </div>
        </form>
    </div>`;
                
                $('#' + this.position_id).html(content);
                this.loadScript("include/lib/CryptoJSv3.1.2/rollups/aes.js", "CryptoJS_AES");
                this.loadModuleScript("user_profile", "do_insert_action_p");
    }
          
}

