class building_show_management_page extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs() {
        // console.log('test');
        this.php = true;
        this.php_action = 'do_select_action';
    }
    ajax_success(json_str) {
            $(document).ready(function(){
                $("select[name='selectcons']").change(function(){
                var t = $(this).val();
                // alert(t);
                });
                $("select[name='selectname']").change(function(){
                var c = $(this).val();
                // alert(c);
                });
            });
        try {
            var json_str = json_str.responseText;
            var obj = JSON.parse(json_str);
            if (obj['status_code'] === 0) 
            var ds=obj['rctid'];
            console.log(ds);
            var str=`
            <div class="row mt-0">
            <div class="col-lg-12 col-md-7">
                <div class="w-100 p-2 borderB">
                    <h1 class="bold">建案管理</h1>
                </div>

                <div>
                    <span class="bold mr-2">建案</span>`;
                      str+='<select class="mdb-select md-form" id="selectcons" name="selectcons"><option value="" disabled selected>選擇建案...</option>';
                      for (var index in ds) {
                        str += '<option value="' + ds[index]['constructor']['id'] + '">' + ds[index]['constructor']['name'] + '</option>';
                        }
                        str += '</select><span class="bold mr-2">負責人</span><select class="mdb-select md-form" id="selectname" name="selectname"><option value="" disabled selected>選擇負責人...</option>';
                        for (var index in ds) {
                            for(var p in ds[index][1]){
                                str += '<option value="' + ds[index][1][p]['id'] + '">' + ds[index][1][p]['name'] + '</option>';
                            }
                            break;
                        }
                        
                        
             str+=`</select><button onclick="(new building_do_select_search_action_P('building','do_select_search_action_P','search')).run()" class="btn btn-indigo btn-sm  mx-1">搜尋</button>
                    <button onclick ="(new building_show_management_page('building','show_management_page','body1')).run()" class="btn btn-indigo btn-sm mx-1">清空</button>
                    <button onclick="(new building_show_insert_page('building','show_insert_page','body1')).run()" class="btn btn-indigo btn-sm" type="button">新增建案</button>
                    <button onclick="(new building_show_M_setcomview_page('building','show_M_setcomview_page','body1')).run()" class="btn btn-indigo btn-sm" type="button">編輯工務主任負責建案</button>
                </div><div class="overFlow">
                    <table class="table text-center">
                        <thead>
                            <tr>
                                <th scope="col" class="h5 px-2 bold py-2">建案名稱</th>
                                <th scope="col" class="h5 px-0 bold py-2">負責人</th>
                                <th scope="col" class="h5 px-0 bold py-2">詳情</th>
                                <th scope="col" class="h5 px-0 bold py-2">編輯</th>
                                <th scope="col" class="h5 px-0 bold py-2">刪除</th>
                            </tr>
                        </thead>
                        <tbody id="search">
                            <tr>`;
                                
                                for(var i in ds){
                                    var string="";
                                        str+='<th class="py-2">' + ds[i]['constructor']['name'] + '</th>';
                                    for (var k in ds[i][0]) {
                                        string+=ds[i][0][k]['name']+" ";
                                    }
                                     str+='<td class="py-2 w-25">'+string+'</td>';
                                   
                                
                                
                                str+=`<td class="py-0">
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        
                                         <a type="button" class="btn bg-transparent p-2" onclick="(new household_show_management_page_P('household','show_management_page_P','body1','${ds[i]['constructor']['id']}','${ds[i]['constructor']['name']}','${ds[i][0][k]['id']}','${ds[i][0][k]['name']}')).run()">
                                        
                                    <i class="fa fa-building-o fa-lg text-dark"></i>
                                </a>
                                    </div>
                                </td>
                                        
                                
                                <td class="py-0">
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        
                                         <a type="button" class="btn bg-transparent p-2" onclick="(new building_show_update_page_P('building','show_update_page_P','body1')).run()">
                                        
                                    <i class="fa fa-pencil-square-o fa-lg text-dark"></i>
                                </a>
                                    </div>
                                </td>

                                <td class="py-0">
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        <a type="button" class="btn bg-transparent p-2" onclick="(new building_do_delete_action_P('building','do_delete_action_P','body1','${ds[i]['constructor']['id']}')).run()">
                                    <i class="fa fa-close fa-lg text-dark"></i>
                                </a>
                                    </div>
                                </td>

                            </tr>`;
                                }
                        str+=`</tobody>
                    </table>
                </div>
            </div>
            `;
                $('#' + this.position_id).html(str);
            
        } catch (e) {
            var msg = e + "<br>";
            msg += "JSON String: " + json_str;
            
            // $('#' + this.position_id).html(msg);
        }
        $(document).ready(function() {
        $('.mdb-select').material_select();
        $('.caret').css('margin-top','-7px');
        $('.select-dropdown').css('max-width','100%').css('margin','0').css('height','2rem');
        $('.select-wrapper').css('display','inline-block').css('margin','0').css('max-width','200px');
    }); 
        this.loadModuleScript(this.module, "show_insert_page");
        this.loadModuleScript(this.module, "do_delete_action_P");
        this.loadModuleScript(this.module, "do_select_search_action_P");
        this.loadModuleScript(this.module, "show_update_page_P");
        this.loadModuleScript(this.module, "show_M_setcomview_page");
        this.loadModuleScript("household", "show_management_page_P");
    }
    ajax_error(msg) {
        // $('#' + this.position_id).html(msg.status);
    }
}