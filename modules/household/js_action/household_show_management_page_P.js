class household_show_management_page_P extends ActionHandler {
    constructor(module, action, position_id,constructorid,constructorname,workerid,workername) {
        super(module, action);
        this.position_id = position_id;
        this.constructorid=constructorid;
        this.constructorname=constructorname;
        this.workerid=workerid;
        this.workername=workername;
    }
    
    prepareArgs() {
        this.php = true;
        this.php_action = 'do_select_action';
        this.addArgs('constructorid',this.constructorid);
        this.addArgs('constructorname',this.constructorname);
        this.addArgs('workerid',this.workerid);
        this.addArgs('workername',this.workername);
    }
    ajax_success(json_str) {
        try {
            var json_str = json_str.responseText;
            var obj = JSON.parse(json_str);
            if (obj['status_code'] === 0) 
            // console.log(obj);
            var ds=obj['4'];
            // console.log(ds);
            var str=`
            <div class="row mt-0">
            <div class="col-lg-12 col-md-7">
                <div class="w-100 p-2 borderB">
                    <h1 class="bold">${this.constructorname}  住戶管理<h3>負責工務主任:  ${this.workername}</h3></h1>
                </div>

                <div>`;
             str+=` <span class="bold mr-2">聯絡人</span><input class="mt-2 mr-2 w-8" style="max-width:8%" type="text" id="selectName">
                    <span class="bold mr-2">戶號</span><input class="mt-2 mr-2 w-8" style="max-width:8%" type="text" id="selectContactor">
                    <button onclick="(new building_do_select_search_action_P('building','do_select_search_action_P','search')).run()" class="btn btn-indigo btn-sm  mx-1">搜尋</button>
                    <button id="resetForm" class="btn btn-indigo btn-sm  mx-1">清空</button>
                    <button onclick="(new household_show_insert_page('household','show_insert_page','body1','${this.constructorid}','${this.workername}')).run()" class="btn btn-indigo btn-sm" type="button">新增戶</button>
                </div>
                <div class="overFlow">
                    <table class="table text-center">
                        <thead>
                            <tr>
                                <th scope="col" class="h5 px-2 bold py-2">戶號</th>
                                <th scope="col" class="h5 px-0 bold py-2">地址</th>
                                <th scope="col" class="h5 px-0 bold py-2">詳情</th>
                                <th scope="col" class="h5 px-0 bold py-2">編輯</th>`;
                                // <th scope="col" class="h5 px-0 bold py-2">刪除</th>
                          str+=`  </tr>
                        </thead>
                        <tbody>
                            <tr>`;
                                
                        for(var i in ds){
                                        str+='<th class="py-2">' + ds[i]['number'] + '</th>';
                                        str+='<td class="py-2 w-25">'+ds[i]['address']+'</td>';
                                str+=`<td class="py-0">
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        
                                         <a type="button" class="btn bg-transparent p-2" data-toggle="modal" data-target="#modalCart" onclick="(new household_show_details_page_P('household','show_details_page_P','show_area','${ds[i]['id']}','${ds[i]['address']}')).run()">
                                        
                                    <i class="fa fa-building-o fa-lg text-dark"></i>
                                </a>
                                    </div>
                                </td>
                                        
                                
                                <td class="py-0">
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        
                                         <a type="button" class="btn bg-transparent p-2" data-toggle="modal" data-target="#modalCart" onclick="(new household_show_update_page_P('household','show_update_page_P','show_area','${ds[i]['number']}','${ds[i]['id']}','${ds[i]['address']}','${ds[i]['floor']}')).run()">
                                        
                                    <i class="fa fa-pencil-square-o fa-lg text-dark"></i>
                                </a>
                                    </div>
                                </td>
                                
                                
                                <div class="modal fade" id="modalCart" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="true">
                                      <div class="modal-dialog" role="document">
                                        <div class="modal-content" id="show_area">
                                         
                                        </div>
                                      </div>
                                    </div>
                                `;

                                // <td class="py-0">
                                //     <div class="btn-group" role="group" aria-label="Basic example">
                                //         <a type="button" class="btn bg-transparent p-2" onclick="(new household_do_delete_action_P('household','do_delete_action_P','body1','${ds[i]['id']}')).run()">
                                //     <i class="fa fa-close fa-lg text-dark"></i>
                                // </a>
                                //     </div>
                                // </td>

                           str+=` </tr>`;
                            // }
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
        $('#resetForm').on('click',function(){
            $('#selectName').val("");
            $('#selectContactor').val("");
        })
        
    }); 
        //
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//
//
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
//               佛祖保佑         永無BUG
//
//
//
        this.loadModuleScript(this.module, "show_insert_page");
        this.loadModuleScript(this.module, "show_details_page_P");
        this.loadModuleScript(this.module, "show_update_page_P");
        // this.loadModuleScript(this.module, "do_update_action_P");
        // this.loadModuleScript(this.module, "do_delete_action_P");
    }
    ajax_error(msg) {}
}