class case_show_select_page_p extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs() {
        this.php = true;
        this.php_action = 'do_select_action_p';
    }
    ajax_success(json_str) {
        try {
            this.loadModuleScript("case", "show_case_page_E");


            var json_str = json_str.responseText;
            console.log(json_str);

            var obj = JSON.parse(json_str);
            console.log(obj);
            var data;
            //obj['repairdata']
            //obj['building']
            data = `<div class="row mt-0">
            <div class="col-lg-12 col-md-7">
                <div class="w-100 p-2 borderB">
                    <h1 class="bold">案件管理</h1>
                </div>
                <div>
                    <span class="bold mr-2">建案</span>
                    <select class="mdb-select md-form" id="selectBuilding">
                    <option value=""></option>
                    `;
            for (var i in obj['building']) {
                data += `<option value="${obj['building'][i]["id"]}">${obj['building'][i]["name"]}</option>`;
            }
            data += `
                    </select>
                    
                    <span class="bold mr-2">聯絡人</span><input class="mt-2 w-8" style="max-width:8%" type="text" id="selectUser">
                    <span class="bold mr-2">維修類別</span>
                    <select class="mdb-select md-form" id="selectRepairType">
                    <option value=""></option>
                    `;
            for (var i in obj['repairdata']) {
                data += `<option value="${obj['repairdata'][i]["id"]}">${obj['repairdata'][i]["namech"]}</option>`;
            }
            data += `
                    </select>
                    <span class="bold mr-2">日期</span><input class="mt-2 w-8" style="max-width:13%" type="date" id="selectDate">
                    <button onclick="(new case_do_select_search_action_p('case','do_select_search_action_p','showSelect')).run()" type="button" class="btn btn-indigo btn-sm  mx-1 ">搜尋</button>
                    <button onclick ="(new case_show_select_page_p('case','show_select_page_p','body1')).run()" class="btn btn-indigo btn-sm mx-1">清空</button>
                    <a onclick ="(new case_show_insert_page_p('case','show_insert_page_p','body1')).run()"><button type="button" class="btn btn-indigo btn-sm  mx-1">新增維修單</button></a>
                </div>
                <div class="overFlow1">
                    <table class="table text-center mb-0">
                        <thead>
                            <tr>
                                <th scope="col" class="h5 px-3 bold w-16 py-2">日期</th>
                                <th scope="col" class="h5 px-3 bold w-16 py-2">維修類別</th>
                                <th scope="col" class="h5 px-1 bold w-16 py-2">建案名稱</th>
                                <th scope="col" class="h5 px-3 bold w-16 py-2">戶號</th>
                                <th scope="col" class="h5 px-3 bold w-16 py-2">聯絡人</th>
                                <th scope="col" class="h5 px-3 bold py-2">詳細資料</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div class="overFlow2">
                    <table class="table text-center">
                        <tbody id="showSelect">`;

            for (var i in obj['allcase']) {
                data += `<tr>
                                 <td class="w-15 py-2">`;

                data += obj['allcase'][i]['start_datetime'];
                data += `</td><td class="w-17 py-2">`;
                if (obj['allcase'][i]['namech']) {
                    data += obj['allcase'][i]['namech'];
                }
                else {
                    data += '沒有維修類型'
                }
                data += `</td><td class="w-17 py-2">`;
                if (obj['allcase'][i][3]) {
                    data += obj['allcase'][i][3]; //聯絡人
                }
                else {
                    data += '無聯絡人'
                }
                data += `</td><td class="w-15 py-2">`;
                if (obj['allcase'][i]['number']) {
                    data += obj['allcase'][i]['number']; //戶號
                }
                else {
                    data += `<td class="w-15 py-2">無戶號`;
                }

                data += `</td><td class="w-15 py-2">`;
                if (obj['allcase'][i][5]) {
                    data += obj['allcase'][i][5];
                }
                else {
                    data += `<td class="w-15 py-2">無建案名稱`;
                }
                data += `<td class="py-0">
                                    <div class="btn-group " role="group " aria-label="Basic example ">
                                        <a type="button " class="btn bg-transparent p-2 " onclick="(new case_show_case_page_E('case','show_case_page_E','body1','${obj['allcase'][i]['id']}')).run();">
                                                    <i class="fa fa-file fa-lg text-dark "></i>
                                                </a>
                                    </div>
                                </td>
                            </tr>`;
            }
            // for(var phpData in phpDatas){
            //     var start_datetime = phpDatas[phpData]['case']['start_datetime'].substring(0,4)+"/"+phpDatas[phpData]['case']['start_datetime'].substring(5,7)+"/"+phpDatas[phpData]['case']['start_datetime'].substring(8,10);
            //                  try{
            //                  data+=`       
            //                  <tr>
            //                     <td class="w-15 py-2">${start_datetime}</td>
            //                     <td class="w-17 py-2">${phpDatas[phpData]['repairType'][0]['namech']}</td>
            //                     <td class="w-17 py-2">${phpDatas[phpData]['building'][0]['name']}</td>`;
            //                     try{
            //                         if(phpDatas[phpData]['houseHold']['houseHoldProfile'][0]['number']){
            //                             data+=`<td class="w-15 py-2">${phpDatas[phpData]['houseHold']['houseHoldProfile'][0]['number']}</td>`;
            //                         }else{
            //                             data+=`<td class="w-15 py-2">無戶號</td>`;
            //                         }

            //                     }catch(e){
            //                         data+=`<td class="w-15 py-2">無戶號</td>`;
            //                     }}
            //                     catch(e){console.log(phpDatas[phpData]['building']);};
            //                     data+= `

            //                     <td class="w-15 py-2">${phpDatas[phpData]['user']['data_set'][0]['name']}</td>
            //                     <td class="py-0">
            //                         <div class="btn-group " role="group " aria-label="Basic example ">
            //                             <a type="button " class="btn bg-transparent p-2 " onclick="(new case_show_case_page_E('case','show_case_page_E','body1','${phpDatas[phpData]['case']['id']}')).run();">
            //                                         <i class="fa fa-file fa-lg text-dark "></i>
            //                                     </a>
            //                         </div>
            //                     </td>
            //                 </tr>`;
            // }
            data += ` </tbody>
                    </table>
                </div>
            </div>
        </div>`;

            $('#' + this.position_id).html(data);

            this.loadModuleScript("case", "show_insert_page_p");
            this.loadModuleScript("case", "do_select_search_action_p");
            this.loadModuleScript("repair", "show_apply_date_E");
            this.loadModuleScript("contact", "show_contact_E");
            this.loadModuleScript("repair", "show_repair_history_E");
            this.loadModuleScript("repair_company", "show_repair_company_E");
            this.loadModuleScript("repair", "show_apply_date_E");
            this.loadModuleScript("case", "show_repair_type_E");




            $(document).ready(function() {
                $('.mdb-select').material_select();
                $('.caret').css('margin-top', '-7px');
                $('.select-dropdown').css('max-width', '100%').css('margin', '0').css('height', '2rem');
                $('.select-wrapper').css('display', 'inline-block').css('margin', '0').css('max-width', '150px');
                $('#resetForm').on('click', function() {
                    $('#selectBuilding option[value=5]').attr('selected', 'selected');
                    $('#selectRepairType option[value=5]').attr('selected', 'selected');
                    $('#selectUser').val("");
                    $('#selectDate').val("");
                })
            }); // }
        }
        catch (e) {
            console.log(e);
        }

        // document.getElementById(this.position_id).innerHTML = str;

        // this.loadModuleScript(this.module, "do_repair_action");
    }
    ajax_error(msg) {

    }
}
