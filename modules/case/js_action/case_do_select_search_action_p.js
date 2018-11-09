class case_do_select_search_action_p extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs() {
        this.php = true;
        this.addArgsbyid('selectBuilding');
        this.addArgsbyid('selectUser');
        this.addArgsbyid('selectRepairType');
        this.addArgsbyid('selectDate');
        console.log(
            $('#selectBuilding').val(),
            $('#selectUser').val(),
            $('#selectRepairType').val(),
            $('#selectDate').val(),
        )
    }
    ajax_success(json_str) {
    try {
            var json_str = json_str.responseText;
            var phpDatas = JSON.parse(json_str);
            console.log(phpDatas);
            
            var data;
            if(phpDatas == false){
                data+=`       
                                 <tr>
                                </tr>`;
            }else{
                for(var phpData in phpDatas){
                    var start_datetime = phpDatas[phpData]['case']['start_datetime'].substring(0,4)+"/"+phpDatas[phpData]['case']['start_datetime'].substring(5,7)+"/"+phpDatas[phpData]['case']['start_datetime'].substring(8,10);
                                 data+=`       
                                 <tr>
                                    <td class="w-15 py-2">${start_datetime}</td>
                                    <td class="w-17 py-2">${phpDatas[phpData]['repairType'][0]['namech']}</td>
                                    <td class="w-17 py-2">${phpDatas[phpData]['building'][0]['name']}</td>
                                `;
                                if(phpDatas[phpData]['houseHold']['houseHoldProfile']){
                                    data+= `<td class="w-15 py-2">${phpDatas[phpData]['houseHold']['houseHoldProfile'][0]['number']}</td>`;
                                }else{
                                     data+= `<td class="w-15 py-2">${phpDatas[phpData]['houseHold']['publicFacilities'][0]['location']}</td>`;
                                }
                                 data+=`<td class="w-15 py-2">${phpDatas[phpData]['user']['data_set'][0]['name']}</td>
                                    <td class="py-0">
                                        <div class="btn-group " role="group " aria-label="Basic example ">
                                            <a type="button " class="btn bg-transparent p-2 " href="casefinal.html ">
                                                        <i class="fa fa-file fa-lg text-dark "></i>
                                                    </a>
                                        </div>
                                    </td>
                                </tr>`;
                }
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
