class user_profile_show_insert_page_p extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs() {
        this.php = true;
    }
     ajax_success(xhttp){
         var building_id="";
         
         this.loadModuleScript("user_profile","do_check_building_p");
         $(document).ready(function() {
            $("select").on("change", function() {
                building_id = $("select[name='building']").val();
                console.log(building_id);
                $("#bid").val(building_id);
            });
            $("#checkb1").on("change", function() {
            var v=$("#checkb1").prop("checked");
                //console.log(v);
                
            });
              $('.mdb-select').material_select();
         });
         
         
         var json_str = xhttp.responseText;
            var obj = JSON.parse(json_str);
            console.log(obj);
         
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
                        <option value="user">使用者</option>
                        <option value="pf_user">管理員</option>
                    </select>
                </div>`;
                //<綁定帳號>
                // content+=`
                // <div class="row mt-0">
                //     <label>是否要綁定戶號</label>
                //     <div class="form-check">
                //         <input class="form-check-input" type="checkbox" value="" id="checkb1">
                //         <label class="form-check-label gray-text" for="checkb1">yes</label>
                //     </div>
                
                // <label>建案</label>
                // <div class="md-form my-0 row pl-3">
                // <select class="browser-default mt-3 mb-0" id="building" name="building">
                // <option selected="selected">選擇建案</option>`;
                // for(var i in obj['building']){
                // content+=`<option value="${obj['building'][i]["id"]}">${obj['building'][i]["name"]}</option>`;
                // }        
                
                // content+=`
                // </select>
                // </div>
                //     <button onclick="(new user_profile_do_check_building_p('user_profile','do_check_building_p','check_building')).run()" class="btn btn-blue darken-4 waves-effect ml-5">test</button>
                //     <div id="check_building" class="md-form"></div>
                //     <div id="bid" class="hidden"></div>
                // </div>
                // `;
                
                
                content+=`
                <br>
                
                <div class="mt-2">
                    <button onclick="(new user_profile_do_insert_action_p('user_profile','do_insert_action_p','body1')).run()" class="btn btn-blue darken-4 waves-effect" type="submit">新增</button>
                    <button onclick="(new user_profile_show_select_page_p('user_profile','show_select_page_p','body1')).run()" class="btn btn-danger text-white waves-effect px-5">取消</button>
                    
                </div>
            </div>
        </div>
        </form>
    </div>`;
                
                $('#' + this.position_id).html(content);
                this.loadScript("include/lib/CryptoJSv3.1.2/rollups/aes.js", "CryptoJS_AES");
                this.loadModuleScript("user_profile", "do_insert_action_p");
    }
    ajax_error(msg) {
        
    }      
}

