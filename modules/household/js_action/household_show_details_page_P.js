class household_show_details_page_P extends ActionHandler {
    constructor(module, action, position_id,housepid,houseadd) {
        super(module, action);
        this.position_id = position_id;
        this.housepid=housepid;
        this.houseadd=houseadd;
    }
    prepareArgs() {
        this.php = true;
        this.php_action = 'do_select_details_action_P';
        this.addArgs('housepid',this.housepid);
    }
    ajax_success(json_str) {
        try {
            var json_str = json_str.responseText;
                var obj = JSON.parse(json_str);
                if (obj['status_code'] === 0) 
                // console.log(obj);
                var ds=obj['3'];
                // console.log(ds);
            var str=`
            <div class="modal-content" id="show_area">
            <!--Header-->
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel">${this.houseadd}</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                      <div class="modal-body" >
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
                      </div><!--Footer-->
                                          <div class="modal-footer">
                                            <button type="button" class="btn btn-outline-primary" data-dismiss="modal">Close</button>
                                          </div></div>`;
                $('#' + this.position_id).html(str);
            
        } catch (e) {
            var msg = e + "<br>";
            msg += "JSON String: " + json_str;
        }
    }
    ajax_error(msg) {}
}