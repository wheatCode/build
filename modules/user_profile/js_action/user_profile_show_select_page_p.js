class user_profile_show_select_page_p extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs() {
        this.php = true;
    }
    ajax_success(json_str) {
        try {
            var json_str = json_str.responseText;
            var phpDatas = JSON.parse(json_str);
            console.log(phpDatas);
            var data="";
            var userCharacter="";
            
            data+=`<div class="row mt-0">
            <div class="col-lg-12 col-md-7">
                <div class="w-100 p-2 borderB">
                    <h1 class="bold">使用者管理</h1>
                </div>

                <div>
                    <span class="bold mr-2">帳號</span><input class="mt-2 mr-2 w-8" style="max-width:8%" type="text" id="selectAccount">
                    <span class="bold mr-2">使用者名稱</span><input class="mt-2 mr-2 w-8" style="max-width:8%" type="text" id="selectUserName">
                    <span class="bold mr-2">角色</span>
                    <select class="mdb-select md-form" id="selectUserCharacter">
                        <option value="user">住戶</option>
                        <option value="pf_user">管理員</option>
                    </select>
                    <button onclick="(new user_profile_do_select_search_action_p('user_profile','do_select_search_action_p','search')).run()" class="btn btn-indigo btn-sm  mx-1">搜尋</button>
                    <button id="resetForm" class="btn btn-indigo btn-sm  mx-1">清空</button>
                    <a onclick="(new user_profile_show_insert_page_p('user_profile','show_insert_page_p','body1')).run()"><button type="button" class="btn btn-indigo btn-sm  mx-1 text-white"><i class="fa fa-user fa-lg">新增使用者</i></button></a>
                </div>
                <div class="overFlow1">
                    <table class="table mb-0 text-center">
                        <thead>
                            <tr>
                                <th scope="col" class="h5 bold py-2 w-25">帳號</th>
                                <th scope="col" class="h5 bold py-2 w-25">使用者名稱</th>
                                <th scope="col" class="h5 bold py-2 w-25">角色</th>
                                <th scope="col" class="h5 bold py-2">修改資料</th>
                                <th scope="col" class="h5 bold py-2">刪除資料</th>
                                </tr>
                        </thead>
                    </table>
                </div>
                <div class="overFlow2">
                    <table class="table text-center mb-0">
                        <tbody id="search">`;
                        
                        for(var phpData in phpDatas){
                            userCharacter="";
                            
                            if(phpDatas[phpData]['user']['type'] === 'user'){
                                userCharacter = "住戶";
                            }else{
                                userCharacter = "管理員";
                            }
                             
                            data+=`<tr>
                                <td class="py-2 w-25">${phpDatas[phpData]['user']['account']}</td>
                                <td class="py-2 w-25">${phpDatas[phpData]['user']['name']}</td>
                                <td class="py-2 w-25">${userCharacter}</td>
                                <td class="py-0">
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        <a onclick="(new user_profile_show_update_page_p('user_profile','show_update_page_p','body1','${phpDatas[phpData]['user']['name']}','${phpDatas[phpData]['user']['account']}','${phpDatas[phpData]['user']['password']}','${phpDatas[phpData]['user']['phone']}','${phpDatas[phpData]['user']['type']}','${phpDatas[phpData]['user']['id']}')).run()" type="button" class="btn bg-transparent p-2">
                                        <i class="fa fa-pencil-square-o fa-lg text-dark"></i>
                                        </a>
                                    </div>
                                </td>
                                <td class="py-0">
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        <a onclick="(new user_profile_do_delete_action_p('user_profile','do_delete_action_p','body1','${phpDatas[phpData]['user']['id']}')).run()" type="button" class="btn bg-transparent p-2">
                                        <i class="fa fa-close fa-lg text-dark"></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>`;
                            }
                    data+=`
                    </table>
                </div>
            </div>
        </div>`;
   
    $('#' + this.position_id).html(data);
    this.loadModuleScript("user_profile", "show_insert_page_p");
    this.loadModuleScript("user_profile", "show_update_page_p");
    this.loadModuleScript("user_profile", "do_delete_action_p");
    this.loadModuleScript("user_profile", "do_select_search_action_p");
   $(document).ready(function() {
        $('.mdb-select').material_select();
        $('.caret').css('margin-top','-7px');
        $('.select-dropdown').css('max-width','100%').css('margin','0').css('height','2rem');
        $('.select-wrapper').css('display','inline-block').css('margin','0').css('max-width','100px');
        $('#resetForm').on('click',function(){
            $('#selectAccount').val("");
            $('#selectUserName').val("");
        })
    }); 
        }
        catch (e) {
            console.log(e);
        }
    }
    ajax_error(msg) {

    }
}
