class case_show_insert_page_p extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs() {
        this.php = true;
        this.php_action = 'do_select_repairType_action_p';
    }
    ajax_success(json_str) {
    try {
            var json_str = json_str.responseText;
            var phpDatas = JSON.parse(json_str);
            console.log(phpDatas);
            var data="";
        data+=`    
    <div class="container">
        <div class="row m-0">
            <div class="offset-lg-1 offset-md-2 col-lg-10 col-md-8">
                <div class="w-100 p-2 borderB">
                    <h1 class="bold">新增案件</h1>
                </div>
                 <span class="bold mr-2 mt-2">維修項目</span>
                   <select class="mdb-select md-form mt-2" id="service">
                    `;
                    for(var phpData in phpDatas){
                        data+=`<option value="${phpDatas[phpData]['id']}">${phpDatas[phpData]['namech']}</option>`;
                    }
                
                data+=`
                      </select>
           
                <br>
                <br>
                   <div class="md-form my-0">
                        <input type="text" id="name" style="max-width:100%" class="form-control my-0 pb-1" value="">
                        <label for="name">名字(必填)</label>
                    </div>
                    <div class="md-form mt-3 mb-0">
                        <input type="text" id="phone" style="max-width:100%" class="form-control mb-0 pb-1" value="">
                        <label for="name">電話(必填)</label>
                        <button class="my-2" onclick="(new case_check_data_action_p('case','check_data_action_p','showAddress')).run()" >確認資料</button>
                    </div>
                    <div class="md-form mt-0 mb-3" id="showAddress"></div>
                    
                    <br>
                    <div class="md-form my-0">
                        <input type="text" id="title" style="max-width:100%" class="form-control mb-0 pb-1" value="">
                        <label for="title">待修情形</label>
                    </div>
                    <br>
                    <div class="md-form my-0">
                        <input type="text" id="content" style="max-width:100%" class="form-control mb-0 pb-1" value="">
                        <label for="content">維修項目</label>
                    </div>
                    <br>
                    <div class="md-form my-0">
                        <input style="max-width:100%" type="date" id="date" class="form-control timepicker">
                    </div>
                     <div class="md-form my-0">
                        <input style="max-width:100%" type="text" id="startTime" class="form-control timepicker">
                        <label for="content">預約起始時間</label>
                    </div>
                     <div class="md-form my-0">
                        <input style="max-width:100%" type="text" id="endTime" class="form-control timepicker">
                        <label for="content">預約結束時間</label>
                    </div>
            </div>
        </div>
    </div>
    
    <script>
    $(document).ready(function(){
                                    $('.mdb-select').material_select();
    });
                        
                                var input = $('#manual-operations-input').pickatime({
                                    autoclose: true,
                                    'default': 'now'
                                });
                                
                                $('#check-minutes').click(function(e) {
                                    e.stopPropagation();
                                    input.pickatime('show').pickatime('toggleView', 'minutes');
                                });
                                
        $('#startTime').pickatime({});
        $('#endTime').pickatime({}); 

    </script>
                    <br>
                    <div class="text-center mt-2">
                        <button onclick="(new case_do_insert_action_p('case','do_insert_action_p','body1')).run()" class="btn btn-blue darken-4 waves-effect px-5">新增</button>
                        <button onclick="(new case_show_select_page_p('case','show_select_page_p','body1')).run()" class="btn btn-danger text-white waves-effect px-5">取消</button>
                    </div>
            </div>
        </div>
    </div>
`;
    $('#startTime01').pickatime({});
    $('#endTime01').pickatime({});
    
    $('#' + this.position_id).html(data);
    
    this.loadModuleScript("case", "check_data_action_p");
    this.loadModuleScript("case", "do_insert_action_p");
     this.loadModuleScript("case", "show_insert_page_p");
        $(document).ready(function() {
        // $('.mdb-select').material_select();
        $('.caret').css('margin-top','-7px');
        $('.select-dropdown').css('max-width','100%').css('margin','0').css('height','2rem');
        $('.select-wrapper').css('display','inline-block').css('margin','0').css('max-width','125px');
        });
    }
    catch (e) {
            console.log(e);
        }
    }
    ajax_error(msg) {

    }
}
