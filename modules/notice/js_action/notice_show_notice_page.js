class notice_show_notice_page extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs() {
        this.php_action = "do_select_action";
        this.php = true;
    }

    ajax_success(xhttp) {
        var data = '';
        var color = '';
        //var allDatas = JSON.parse(xhttp.responseText);
        var json_str = xhttp.responseText;
        console.log(json_str);
        var obj = JSON.parse(json_str);
        console.log(obj);
        this.loadModuleScript("case", "do_select_action");
        try {
            if (obj) {
                // for (var allData in allDatas['data_set']) {
                //     console.log(allDatas['data_set'][allData]);
                //     for (var oneDate in allDatas['data_set'][allData][3]) {
                //         var end_datetime = allDatas['data_set'][allData][3][oneDate]['reservetime'].substring(5, 7) + "/" + allDatas['data_set'][allData][3][oneDate]['reservetime'].substring(8, 10);
                //         var notice_title;
                //         // console.log(end_datetime);
                //         if (allDatas['data_set'][allData][3][oneDate]['repair_content'].length > 8) {
                //             notice_title = allDatas['data_set'][allData][3][oneDate]['repair_content'].substring(0, 8) + "...";
                //         }
                //         else {
                //             notice_title = allDatas['data_set'][allData][3][oneDate]['repair_content'];
                //         }
                //         // console.log(allDatas['data_set'][allData][3][oneDate]['repair_content']);
                //         // console.log(notice_title);
                //         // console.log(end_datetime);
                //         data = data + `
                //                   <div class="list-group font-weight-bold pt-0">
                //                       <a onclick="(new notice_show_select_page('notice','show_select_page','body','${allDatas['data_set'][allData][1][oneDate]['id']}','${allDatas['data_set'][allData][1][oneDate]['type']}','${allDatas['data_set'][allData][0]['content']}','${allDatas['data_set'][allData][3][oneDate]['repair_content']}','${allDatas['data_set'][allData][0]['content']}','${allDatas['data_set'][allData][2]['name']}','${end_datetime}','${allDatas['userData'][2][0]['name']}','${allDatas['userData'][1][0]['number']}')).run()">
                //                              `;
                //         if (allDatas['data_set'][allData][1][oneDate]['type'] === "finish") {
                //             data = data + `<div class="list-group-item text-dark py-2 list-group-item-warning">${notice_title} <span class="float-right"> ??????????????? ${end_datetime} </span></div>`;
                //         }
                //         else if (allDatas['data_set'][allData][1][oneDate]['type'] === "confirm") {
                //             data = data + `<div class="list-group-item text-dark py-2 list-group-item-success">${notice_title} <span class="float-right"> ???????????? ${end_datetime} </span></div>`;
                //         }
                //         else if (allDatas['data_set'][allData][1][oneDate]['type'] === "cancel") {
                //             data = data + `<div class="list-group-item text-white py-2 list-group-item- red accent-4s">${notice_title} <span class="float-right"> ??????????????? ${end_datetime} </span></div>`;
                //         }
                //         else {
                //             data = '?????????...';
                //         }
                //         data = data + `     
                //                         </a>     
                //                   </div>`;

                //         data = data.slice(3);
                //     }
                // }
                // console.log(data);

                // for (var allData in obj) {
                //     data += `    <div class="list-group font-weight-bold pt-0">
                //                     <a onclick="(new notice_show_select_page('notice','show_select_page','body')).run()">
                //                       <div class="list-group-item text-dark py-2 list-group-item-warning">${obj[allData]['$repairOne'][0]['repair_content']} <span class="float-right"> ??????????????? ${obj[allData]['$caseOne']['end_datetime']} </span></div></a></div>`;
                // }
                // data = data.slice(4);
                console.log(obj['allnotice'][5]['type']);

                for (var i = 0; i < obj['allnotice'].length; i++) {
                    if (obj['allnotice'][i]['type'] == 'confirm') {
                        color = 'warning';
                    }
                    else if (obj['allnotice'][i]['type'] == 'finish') {
                        color = 'success';
                    }
                    else if (obj['allnotice'][i]['type'] == 'cancel') {
                        color = 'danger';
                    }


                    data += `    <div class="list-group font-weight-bold pt-0">
                                                        <a onclick="(new case_do_select_action('case', 'do_select_action', 'body', ` + obj['allnotice'][i]['case_profile_id'] + `)).run()">
                                                           <div class="list-group-item text-dark py-2 list-group-item-` + color + `">` + obj['allnotice'][i]['title'] + `</div></a></div>`;
                }


                //(new case_do_select_action('case', 'do_select_action', 'body', obj['allnotice'][i]['case_profile_id'])).run();
            }
            else {
                data = "<h1>????????????????????????</h1>";
            }
        }
        catch (e) {
            console.log(e);
        }
        // var str = `
        //         </div>
        //         <!-- /.?????? -->
        //         <div class="tab-pane fade" id="notice" role="tabpanel">
        //             <div class="my-0 py-0 pt-3">
        //                 <select class="mdb-select">
        //                     <option value="" disabled selected>????????????</option>
        //                     <option value="1">????????????</option>
        //                     <option value="2">????????????</option>
        //                     <option value="3">????????????</option>
        //                 </select>
        //             </div>

        //           `;
        document.getElementById(this.position_id).innerHTML = data;
    }
    ajax_error(xhttp) {
        // console.log(xhttp.responseText);
    }
}
