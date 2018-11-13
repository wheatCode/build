class household_show_update_page_P extends ActionHandler {
    constructor(module, action, position_id,housenum,housepid,houseadd,houseflow) {
        super(module, action);
        this.position_id = position_id;
        this.housenum=housenum;
        this.housepid=housepid;
        this.houseadd=houseadd;
        this.houseflow=houseflow;
    }
    prepareArgs() {
        this.php = true;
        this.php_action = 'do_select_details_action_P';
        this.addArgs('housepid',this.housepid);
    }
    ajax_success(json_str) {
        console.log(json_str);
        try {
            var json_str = json_str.responseText;
                var obj = JSON.parse(json_str);
                if (obj['status_code'] === 0) 
                console.log(obj);
                var ds=obj['3'];
                var kp=obj['4'];
                console.log(ds);
                console.log(kp);
            var str=`
            <div class="modal-content" id="show_area">
            <!--Header-->
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel">編輯${this.housepid}</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                      <div class="modal-body" >
                      
                      <div class="mt-2">
                    <label>戶號</label>
                    <input type="text" style="max-width:100%" id="num" class="form-control mb-0 pb-1"  value="${this.housenum}">
                 </div> 
                 <div>
                    <label>地址</label>
                    <input type="text" style="max-width:100%" id="add" class="form-control mb-0 pb-1"  value="${this.houseadd}">
                 </div>
                  <div>
                    <label>樓層</label>
                    <input type="text" style="max-width:100%" id="flow" class="form-control mb-0 pb-1"  value="${this.houseflow}">
                 </div>
                        <table class="table table-hover">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>住戶姓名</th>
                              <th>Phone</th>
                            </tr>
                          </thead>
                          <tbody>`;
                          for(var p in ds){
                            //   for(var k in ds[0]){
                            str+=`<tr>
                              <th scope="row">${ds[p]['constructor_search'][0]['id']}</th>
                              <td>${ds[p]['constructor_search'][0]['name']}</td>
                              <td>${ds[p]['constructor_search'][0]['phone']}</td>
                            </tr>`;
                            //   }
                          }
                          str+=`</tbody>
                        </table>
                        <select class="mdb-select md-form" id="test_test" searchable="Search here..">
                          <option value="" disabled selected>請選擇入住之用戶</option>`;
                          for(var yt in kp){
                              str += '<option value="' + kp[yt]['id'] + '">' + kp[yt]['name'] + '</option>';
                          }
                        str+=`</select>
                      </div><!--Footer-->
                                          <div class="modal-footer">
                                            <button type="button" class="btn btn-outline-danger waves-effect" data-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-outline-primary waves-effect" data-dismiss="modal" onclick="(new household_do_update_action_P('household','do_update_action_P','show_area','${this.housepid}')).run()">修改</button>
                                          </div></div>`;
                $('#' + this.position_id).html(str);
            
        } catch (e) {
            var msg = e + "<br>";
            msg += "JSON String: " + json_str;
        }
        // Material Select Initialization
         $(document).ready(function() {
            $('.mdb-select').material_select();
            $('.caret').css('margin-top','-7px');
            $('.select-dropdown').css('max-width','100%').css('margin','0').css('height','2rem');
            $('.select-wrapper').css('display','inline-block').css('margin','0').css('max-width','200px');
        }); 
        
        this.loadModuleScript(this.module, "do_update_action_P");
    }
    ajax_error(msg) {
        
    }
}