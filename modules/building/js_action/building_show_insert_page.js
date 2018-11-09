class building_show_insert_page extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs() {
        this.php = true;
        this.php_action="do_select_action";
    }
    ajax_success(json_str){
        try{
            var json_str = json_str.responseText;
            var obj = JSON.parse(json_str);
            if (obj['status_code'] === 0) {
              var ds = obj['rctid'];
              console.log(ds);
            var str=`
                    <div class="container">
                     <div class="row m-0">
                         <div class="col-lg-10 col-md-8">
                            <div class="w-100 p-2  borderB">
                                    <h1 class="bold">新增建案</h1>
                                </div>
                                <div class="md-form my-0">
                                    <input type="text" id="constructionname" class="form-control mb-0 pb-1" style="margin-top: 25px;">
                                    <label for="constructionname">建案名稱</label>
                                </div>
                                <br>
                                
                                <div class="md-form my-0">`;
                                str += '<select class="browser-default float-left mt-2 pt-1" id="select_1" name="select_1">' +
                                '<option value="" disabled selected>選擇工務主任...</option>';
                            for (var index in ds) {
                                // str += '<option value="' + ds[index]['constructor']['id'] + '">' + ds[index][1][i]['name'] + '</option>';
                                for(var i in ds[index][1]){
                                    str += '<option value="' + ds[index][1][i]['id'] + '">' + ds[index][1][i]['name'] + '</option>';
                                }
                                break;
                            }
                            str += `</select>
                                <br>
                                <div class="text-center mt-2">
                                    <button onclick="(new building_do_insert_action('building','do_insert_action','body1')).run()" class="btn btn-blue darken-4 waves-effect" type="button">新增</button>
                                </div>
                            </div>
                        </div>
                    </div>`;
                
                $('#' + this.position_id).html(str);
            }   
        }catch(e){
            var msg = e + "<br>";
            msg += "JSON String: " + str;
        }
           this.loadModuleScript("building", "do_insert_action");
    }
    ajax_error(msg) {
        // $('#' + this.position_id).html(msg.status);
    }
          
}
