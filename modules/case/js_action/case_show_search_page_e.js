class case_show_search_page_E extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;

    }
    prepareArgs() {
        this.php = true;
        this.php_action = 'show_search_page_E';

    }
    ajax_success(xhttp) {
        try {
            var json_str = xhttp.responseText;
            console.log(json_str);
            var obj = JSON.parse(json_str);
            if (obj['status_code'] === 0) {
                this.loadModuleScript("case", "show_search_result_E");
                (new case_show_search_result_E('case', 'show_search_result_E', 'show_search_result', 'end')).run();
                var ds = obj['data_set'];
                var content = "";
                console.log(ds);



                content += `    
        <div class="container mt-5">
                <div class="fontsm">
                    <h4>搜尋</h4>
                    
                    <div class="row">
                        <div class="col-6">
                            案名`;
                content += '<select class="mdb-select" id="construction_project" name="construction_project">' + '<option value="all">全部建案</option>';
                for (var index in obj['construction_project']) {
                    content += '<option value="' + obj['construction_project'][index]['id'] + '">' + obj['construction_project'][index]['name'] + '</option>';
                }
                content += '</select>';
                content += `
                        </div>
                        <div class="col-6">
                            戶號
                            <input class="form-control " type="text" id="household_num" value="">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            維修完成日期
                            <input type="date" class="form-control w-100"  id="end_datetime">
                        </div>
                        <div class="col-6">
                            客戶名稱
                            <input class="form-control " type="text" id="cus_name">
                        </div>
                    </div>
                    <button type="button" class="btn btn-indigo" id="search_btn"><h4>搜尋</h4></button>
                    <div id="search_err"></div>
                    <!-- /.<a href="E_set.html"><button type="button" class="btn btn-indigo"><h4>我的建案</h4></button></a>-->

                    <div class="col-12" id="min-h">

                        <table class="table  text-center">
                            <tr>
                                <th scope="col" class="px-2 fontsm" width="15%">建案</th>
                                <th scope="col" class="pl-2 fontsm" width="35%">報修內容</th>
                                <th scope="col" class="pl-2 fontsm" width="35%">完成日期</th>
                                <th scope="col" class="px-0 fontsm" width="15%">詳細</th>
                            </tr>
                            </thead>
                        </table>
                        <div class="overFlow" id="show_search_result">
                            
                        </div>
                    </div>
                </div>
            </div>`;
                $(document).ready(function() {
                    $("#search_btn").click(function() {
                        if ($("#household_num").val() != null || $("#household_num").val() != "") {
                            $('#construction_project').change(function() {
                                $(this).find(":selected").each(function() {
                                    console.log($(this).val());
                                });
                            });
                            console.log('2');
                            (new case_show_search_result_E('case', 'show_search_result_E', 'show_search_result', 'condition')).run();
                        }
                        else {
                            console.log('3');
                            (new case_show_search_result_E('case', 'show_search_result_E', 'show_search_result', 'condition')).run();
                        }
                    });
                    $('.mdb-select').material_select();
                });

                $('#' + this.position_id).html(content);

            }
            else {
                $('#' + this.position_id).html(obj['status_message']);
                console.log(obj['data_set']);

            }

            this.loadModuleScript("case", "do_select_action");
        }
        catch (e) {
            var msg = e + "<br>";
            msg += "JSON String: " + json_str;
            $('#' + this.position_id).html(msg);
        }

    }
    ajax_error(msg) {
        $('#' + this.position_id).html(msg.status);
    }

}
