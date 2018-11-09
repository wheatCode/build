class user_profile_show_update_page_p extends ActionHandler {
    constructor(module, action, position_id,userName,userAccount,userPassword,userPhone,userCharacter,userId) {
        super(module, action);
        this.position_id = position_id;
        this.userName = userName;
        this.userAccount = userAccount;
        this.userPassword = userPassword;
        this.userPhone= userPhone;
        this.userCharacter = userCharacter;
        this.userId = userId;
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
                    <h1 class="bold">使用者編輯</h1>
                </div>
                <from>
                <div class="mt-2">
                    <label>使用者名稱</label>
                    <input type="text" style="max-width:100%" id="user" class="form-control mb-0 pb-1" value="${this.userName}">
                 </div> 
                 <div>
                    <label>帳號</label>
                    <input type="text" style="max-width:100%" id="account" class="form-control mb-0 pb-1" value="${this.userAccount}">
                 </div>
                 <div>
                    <label>密碼</label>
                    <input type="text" style="max-width:100%" id="password" class="form-control mb-0 pb-1" value="" placeholder="請輸入需覆蓋的密碼...">
                </div>
                <div>
                    <label>電話</label>
                    <input type="text" style="max-width:100%" id="phone" class="form-control mb-0 pb-1" value="${this.userPhone}">
                </div>
                    <label>角色</label>
                    <div class="md-form my-0 row pl-3">
                        <select class="browser-default mt-2 pt-1" id="userCharacter">
                        `;
                        if(this.userCharacter === 'user'){
                           content+=`<option value="user" selected>住戶</option> 
                                    <option value="pf_user">管理員</option>`;
                        }else{
                           content+=`<option value="user">住戶</option> 
                                    <option value="pf_user" selected>管理員</option>`; 
                        }
            content+=`
                    </select>
                    </div>
                    <div class="text-center mt-3">
                        <button onclick="(new user_profile_do_update_action_p('user_profile','do_update_action_p','body1','${this.userId}')).run()" class="btn btn-blue darken-4 waves-effect px-5" type="submit">修改</button>
                        <button onclick="(new user_profile_show_select_page_p('user_profile','show_select_page_p','body1')).run()" class="btn btn-danger text-white waves-effect px-5">取消</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
`;
                $('#' + this.position_id).html(content);
                this.loadScript("include/lib/CryptoJSv3.1.2/rollups/aes.js", "CryptoJS_AES");
                this.loadModuleScript("user_profile", "do_update_action_p");
    }
          
}

