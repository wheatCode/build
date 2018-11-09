class user_profile_do_select_search_action_p extends ActionHandler {
    constructor(module, action, position_id,userId) {
        super(module, action);
        this.position_id = position_id;
        this.userId = userId;
    }
    prepareArgs() {
        this.php = true;
        this.addArgsbyid('selectAccount');
        this.addArgsbyid('selectUserName');
        this.addArgsbyid('selectUserCharacter');
        
       console.log(  
        $('#selectAccount').val(),
        $('#selectUserName').val(),
        $('#selectUserCharacter').val()
        );
    }
    ajax_success(json_str) {
        try {
            var json_str = json_str.responseText;
            var phpDatas = JSON.parse(json_str);
            console.log(phpDatas);
            var userCharacter="";
            var data="";

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
         $('#' + this.position_id).html(data);
        }
        catch (e) {
            console.log(e);
        }
    }
    ajax_error(msg) {

    }
}
