class case_check_data_action_p extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs() {
        this.php = true;
        this.php_action = 'do_select_data_building_action_p';
        this.addArgsbyid('name');
        this.addArgsbyid('phone');
    }
    ajax_success(json_str) {
        try {
            var json_str = json_str.responseText;
            var phpDatas = JSON.parse(json_str);
            console.log(phpDatas);
            var data="";
            var number=1;
            if(phpDatas != 0){
                for(var phpData in phpDatas){
                    data+=`
                    <div class="custom-control custom-radio w-100">
                      <input type="radio" class="custom-control-input" id="building${phpDatas[phpData][2]['id']}" value="${phpDatas[phpData][2]['id']}" name="building">
                      <label class="w-75 custom-control-label" for="building${phpDatas[phpData][2]['id']}">${phpDatas[phpData][1][0]['name']} ${phpDatas[phpData][0][0]['number']} ${phpDatas[phpData][0][0]['address']}</label>
                    </div>
`;
number++;
                }
            }else{
                data="未找到相關資料，請重新輸入...";
            }
            $('#' + this.position_id).html(data);
        }catch (e) {
            console.log(e);
        }
  }
    ajax_error(msg) {

    }
}