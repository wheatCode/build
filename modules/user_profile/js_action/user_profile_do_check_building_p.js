class user_profile_do_check_building_p extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
        
    }
    prepareArgs() {
        this.php = true;
        //this.php_action = 'do_select_data_building_action_p';
        //this.addArgs('bid',this.building_id);
        this.addArgsbyid('bid');
        //this.addArgsbyid('phone');
    }
    ajax_success(xhttp) {
        try {
            var json_str = xhttp.responseText;
            var obj = JSON.parse(json_str);
            console.log(obj);
            var build=obj['household_profile'];
            var content="";
            //var number=1;
            if(obj != 0){
                for(var i in build){
                    content+=`
                    <div class="custom-control custom-radio w-100">
                      <input type="radio" class="custom-control-input" id="buildingda${i}" value="buildingda${build[i]["id"]}" name="building">
                      <label class="w-75 custom-control-label" for="${build[i]["id"]}">${build[i]["number"]} ${build[i]["address"]} ${build[i]["floor"]}</label>
                    </div>
                    `;
                }
            }else{
                content="未找到相關資料，請重新輸入...";
            }
            $('#' + this.position_id).html(content);
        }catch (e) {
            console.log(e);
        }
  }
    ajax_error(msg) {

    }
}