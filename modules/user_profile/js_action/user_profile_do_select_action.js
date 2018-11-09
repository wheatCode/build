class user_profile_do_select_action extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs() {
        this.php = true;
        this.addArgs('where_statement', '');
    }
    ajax_success(json_str) {
        
        try {
            var obj = JSON.parse(json_str);
            if (obj['status_code'] === 0) {
                var content =
                    '<table class="table">'+
                    '<thead><tr>'+
                      '<th></th>'+
                      '<th>帳號</th>'+
                      '<th>密碼</th>'+
                      '<th>姓名</th>'+
                      '<th>信箱</th>'+
                      '<th>電話</th>'+
                      '<th>地址</th>'+
                    '</tr></thead><tbody>';
                var ds = obj['data_set'];
                for (var cn in ds) {
                    content +=
                            '<tr>'+
                              '<td>'+'<input type = "radio" class = "form-check-input"id = "' + ds[cn]['id'] + '"name = "id" value="' + ds[cn]['id'] + '">' +
                              '<label class = "form-check-label"for = "' + ds[cn]['id'] + '" ></label>'+'</td>'+
                              '<td>'+ds[cn]['acc']+'</td>'+
                              '<td>'+ds[cn]['pw']+'</td>' +      
                              '<td>'+ds[cn]['name']+'</td>'+
                              '<td>'+ds[cn]['email']+'</td>'+
                              '<td>'+ds[cn]['tel']+'</td>'+
                              '<td>'+ds[cn]['addr']+'</td>'+
                            '</tr>'
                          
                }
                  content +='</tbody></table>'; 
                
                $('#' + this.position_id).html(content);
            } else {
                $('#' + this.position_id).html(obj['status_message']);
            }
        } catch (e) {
            var msg = e + "<br>";
            msg += "JSON String: " + json_str;
            $('#' + this.position_id).html(msg);
        }
        
    }
    ajax_error(msg) {
        $('#' + this.position_id).html(msg.status);
    }
}
