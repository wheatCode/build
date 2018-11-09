class news_show_select_page_P extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs() {
        this.php = true;
    }

    ajax_success(xhttp) {
        try {
            this.loadModuleScript("news", "do_delete_action_P");
            this.loadModuleScript("news", "show_insert_page_P");
            this.loadModuleScript("news", "show_update_page_P");
            this.loadModuleScript("news", "do_select_search_action_P");

            var json_str = xhttp.responseText;
            var obj = JSON.parse(json_str);
            if (obj['status_code'] === 0) {
                var ds =obj['news_model_data'];
                var content = "";
                console.log(ds);
                content += `
                <div class="row mt-0">
            <div class="col-lg-12 col-md-7">
                <div class="w-100 p-2 borderB">
                    <h1 class="bold ">新聞管理</h1>
                </div>

                    <div class="d-flex justify-content-end">
                         <button type="button" class="btn btn-indigo btn-sm mx-3 "onclick="(new news_show_insert_page_P('news','show_insert_page_P','body1')).run()">新增新聞</button></a>
                    </div>
                    <div class="overFlow1">
                     <table class="table mb-0 text-center">
                         <thead>
                            <tr>
                              <th scope="col" class="h5 bold py-2 w-20">新聞標題</th>
                                <th scope="col" class="h5 bold py-2 w-20">新聞內容</th>
                                <th scope="col" class="h5 bold py-2 w-20">日期</th>
                                <th scope="col" class="h5 bold py-2 w-20">刪除</th>
                                <th scope="col" class="h5 bold py-2 w-20">修改內容</th>
                            </tr>
                         </thead>
                     </table>
                    </div>
                <div class="overFlow2">
                    <table class="table text-center mb-0">
                        <tbody id="search">
                `;
                for (var cn in ds) {
                    
                    content +=
                              '<tr>'+
                              '<td class="py-2 w-20">'+ds[cn]["topic"]+'</td>'+
                              '<td class="py-2 w-20">'+ds[cn]["content"]+'</td>'+
                              '<td class="py-2 w-20">'+ds[cn]["date"]+'</td>';  
                    content+=`
                              <td class="py-2">
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        <a type="button" class="btn bg-transparent p-2" onclick="(new news_do_delete_action_P('news','do_delete_action_P','body1','${ds[cn]['id']}')).run()">
                                    <i class="fa fa-close fa-lg text-dark"></i>
                                </a>
                                    </div>
                                </td>
                                <td class="py-2">
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        <a type="button" class="btn bg-transparent p-2" onclick="(new news_show_update_page_P('news','show_update_page_P','body1','${ds[cn]['topic']}','${ds[cn]['content']}','${ds[cn]['date']}','${ds[cn]['id']}')).run()">
                                    <i class="fa fa-pencil-square-o fa-lg text-dark"></i>
                                </a>
                                    </div>
                                </td></tr>`;
                          
                }
                  content +='</tbody></table></div>';







                $('#' + this.position_id).html(content);


            }
            else {
                $('#' + this.position_id).html(obj['status_message']);
                //console.log(obj['data_set']);

            }
            $(document).ready(function() {
                $('.mdb-select').material_select();
                $('.caret').css('margin-top', '-7px');
                $('.select-dropdown').css('max-width', '100%').css('margin', '0').css('height', '2rem');
                $('.select-wrapper').css('display', 'inline-block').css('margin', '0').css('max-width', '100px');
                $('#resetForm').on('click', function() {
                    $('#selectName').val("");
                    $('#selectContactor').val("");
                })
            });

        }
        catch (e) {
            var msg = e + "<br>";
            msg += "JSON String: " + json_str;
            $('#' + this.position_id).html(msg);
            console.log(msg);
        }


    }
    ajax_error(msg) {
        $('#' + this.position_id).html(msg.status);
    }

}
//  <span class="bold mr-2">新聞標題</span><input class="mt-2 mr-2 w-8" style="max-width:8%" type="text" id="selectTopic">
//                     <span class="bold mr-2">日期</span><input class="mt-2 mr-2 w-8" style="max-width:8%" type="text" id="selectDate">
//                     <button onclick="(new news_do_select_search_action_P('news','do_select_search_action_P','search')).run()" class="btn btn-indigo btn-sm  mx-1">搜尋</button>
//                     <button id="resetForm" class="btn btn-indigo btn-sm  mx-1">清空</button>