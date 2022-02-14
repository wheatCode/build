class notice_show_notice_page_E extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs() {
        this.php_action = "do_select_action_E";
        this.php = true;
    }

    ajax_success(xhttp) {
        var data = '';
        var json_str = xhttp.responseText;
        var obj = JSON.parse(json_str);
        console.log(obj);
        var ds = obj['data_set'];

        try {
            if (obj['status_code'] === 0) {
                for (var allData in obj['allnotice']) {
                    // var buildingName = obj['allnotice'][allData]['building'][0]['name'];
                    // var caseNamech = obj['allnotice'][allData]['case']['namech'];
                    // var householdNumber = obj['allnotice'][allData]['household'][0]['number'];
                    // var caseTitle = obj['dataset'][allData]['case']['title'];

                    // if (obj['allnotice'][allData]['repair'] === []) {
                    //     return;
                    // }
                    // for (var repair in obj['allnotice'][allData]['repair']) {
                    //     var startTime = obj['allnotice'][allData]['case']['start_datetime'];


                    //     startTime = startTime.substring(0, 4) + "/" + startTime.substring(5, 7) + "/" + startTime.substring(8, 10);
                    //     if (caseTitle.length > 6) {
                    //         caseTitle = caseTitle.substring(0, 7) + "...";
                    //     }
                    //     else {
                    //         caseTitle = caseTitle;
                    //     }

                    data = data + `
                                 <div class="list-group font-weight-bold h3">
                                      <a onclick="(new case_show_case_page_E('case', 'show_case_page_E', 'body', tcase_id)).run()">`;
                    //data = data + `<div class="list-group-item list-group-item-success px-1"><span class="text-center" style="display:inline-block">` + ' ' + obj['allnotice'][allData]['title'] + ': ' + obj['allnotice'][allData]['namech'] + ' ' + obj['allnotice'][allData]['name'] + ' ' + obj['allnotice'][allData]['number'] + '  ' + st_time_to_date(obj['allnotice'][allData]['start_datetime']) + `</span> </div>`;
                    if (obj['allnotice'][allData]['id'] == 1) { //水電

                        data = data + `<div class="list-group-item list-group-item-info px-1"><span class="text-center" style="display:inline-block">` + ' ' + obj['allnotice'][allData]['title'] + ': ' + obj['allnotice'][allData]['namech'] + ' ' + obj['allnotice'][allData]['name'] + ' ' + obj['allnotice'][allData]['number'] + '  ' + st_time_to_date(obj['allnotice'][allData]['start_datetime']) + `</span> </div>`;

                    }
                    else if (obj['allnotice'][allData]['id'] == 2) { //電機
                        data = data + `<div class="list-group-item list-group-item-secondary px-1"><span class="text-center" style="display:inline-block">` + ' ' + obj['allnotice'][allData]['title'] + ': ' + obj['allnotice'][allData]['namech'] + ' ' + obj['allnotice'][allData]['name'] + ' ' + obj['allnotice'][allData]['number'] + '  ' + st_time_to_date(obj['allnotice'][allData]['start_datetime']) + `</span> </div>`;
                    }
                    else if (obj['allnotice'][allData]['id'] == 3) { //安裝
                        data = data + `<div class="list-group-item list-group-item-success px-1"><span class="text-center" style="display:inline-block">` + ' ' + obj['allnotice'][allData]['title'] + ': ' + obj['allnotice'][allData]['namech'] + ' ' + obj['allnotice'][allData]['name'] + ' ' + obj['allnotice'][allData]['number'] + '  ' + st_time_to_date(obj['allnotice'][allData]['start_datetime']) + `</span> </div>`;
                    }
                    else if (obj['allnotice'][allData]['id'] == 4) { //公設
                        data = data + `<div class="list-group-item list-group-item-warning px-1"><span class="text-center" style="display:inline-block">` + ' ' + obj['allnotice'][allData]['title'] + ': ' + obj['allnotice'][allData]['namech'] + ' ' + obj['allnotice'][allData]['name'] + ' ' + obj['allnotice'][allData]['number'] + '  ' + st_time_to_date(obj['allnotice'][allData]['start_datetime']) + `</span> </div>`;
                    }
                    else if (obj['allnotice'][allData]['id'] == 5) { //家具
                        data = data + `<div class="list-group-item list-group-item-primary px-1"><span class="text-center" style="display:inline-block">` + ' ' + obj['allnotice'][allData]['title'] + ': ' + obj['allnotice'][allData]['namech'] + ' ' + obj['allnotice'][allData]['name'] + ' ' + obj['allnotice'][allData]['number'] + '  ' + st_time_to_date(obj['allnotice'][allData]['start_datetime']) + `</span> </div>`;
                    }
                    else if (obj['allnotice'][allData]['id'] == 6) { //清潔
                        data = data + `<div class="list-group-item list-group-item-light px-1"><span class="text-center" style="display:inline-block">` + ' ' + obj['allnotice'][allData]['title'] + ': ' + obj['allnotice'][allData]['namech'] + ' ' + obj['allnotice'][allData]['name'] + ' ' + obj['allnotice'][allData]['number'] + '  ' + st_time_to_date(obj['allnotice'][allData]['start_datetime']) + `</span> </div>`;
                    }
                    else if (obj['allnotice'][allData]['id'] == 7) { //油漆
                        data = data + `<div class="list-group-item list-group-item-dark px-1"><span class="text-center" style="display:inline-block">` + ' ' + obj['allnotice'][allData]['title'] + ': ' + obj['allnotice'][allData]['namech'] + ' ' + obj['allnotice'][allData]['name'] + ' ' + obj['allnotice'][allData]['number'] + '  ' + st_time_to_date(obj['allnotice'][allData]['start_datetime']) + `</span> </div>`;
                    }
                    else if (obj['allnotice'][allData]['id'] == 8) { //其他
                        data = data + `<div class="list-group-item list-group-item-danger px-1"><span class="text-center" style="display:inline-block">` + ' ' + obj['allnotice'][allData]['title'] + ': ' + obj['allnotice'][allData]['namech'] + ' ' + obj['allnotice'][allData]['name'] + ' ' + obj['allnotice'][allData]['number'] + '  ' + st_time_to_date(obj['allnotice'][allData]['start_datetime']) + `</span> </div>`;
                    }
                    else {
                        data = '查無值...';
                    }
                    data = data + ` 
                                        </a> </div>`;

                    //data = data.slice(3);




                }

                function st_time_to_date(tt1) {
                    var tt3;
                    tt3 = tt1.split(" ")[0].split("-")[0] + "/" + tt1.split(" ")[0].split("-")[1] + "/" + tt1.split(" ")[0].split("-")[2];
                    return tt3;
                };
            }
            else {
                data = "<h1>目前無通知</h1>";
            }

        }
        catch (e) {
            console.log(e);
        }
        // var str = `
        //         </div>
        //         <!-- /.通知 -->
        //         <div class="tab-pane fade" id="notice" role="tabpanel">
        //             <div class="my-0 py-0 pt-3">
        //                 <select class="mdb-select">
        //                     <option value="" disabled selected>全部顯示</option>
        //                     <option value="1">全部顯示</option>
        //                     <option value="2">完成通知</option>
        //                     <option value="3">時間通知</option>
        //                 </select>
        //             </div>

        //           `;
        document.getElementById('notice').innerHTML = data;
    }
    ajax_error(xhttp) {
        // console.log(xhttp.responseText);
    }
}
