class repair_company_do_select_search_action_P extends ActionHandler {
    constructor(module, action, position_id,userId) {
        super(module, action);
        this.position_id = position_id;
        this.userId = userId;
    }
    prepareArgs() {
        this.php = true;
        this.addArgsbyid('selectName');
        this.addArgsbyid('selectContactor');
        this.addArgsbyid('selectType');
        
        var s = $("select[id='select1']").val();
        this.addArgs('repair_type_id',s);
        
       //console.log(s);
    }
    ajax_success(xhttp) {
        
         
        
        
        
        
        try {
            var json_str = xhttp.responseText;
            //console.log(json_str);
            var obj = JSON.parse(json_str);
            var string="";
            console.log(obj['where']);
            console.log(obj['data']);
            if (obj['status_code'] === 0) {
                var ds =obj['data'];
                var content = "";
                console.log(ds);

             for (var cn in ds) {
                    content +=
                              '<tr>'+
                                '<td class="py-2 w-25">'+ds[cn][1]+'</td>';
                    content +=
                              
                                '<td class="py-2 w-25">'+ds[cn]["namech"]+'</td>';
                    content +=
                                              
                                '<td class="py-2 w-25">'+ds[cn]["contactor"]+'</td>';
                 
                    content+=`
                              <td class="py-2">
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        <a type="button" class="btn bg-transparent p-2" onclick="(new repair_company_do_delete_action_P('repair_company','do_delete_action_P','body1','${ds[cn]['id']}')).run()">
                                    <i class="fa fa-close fa-lg text-dark"></i>
                                </a>
                                    </div>
                                </td>
                                <td class="py-2">
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        <a type="button" class="btn bg-transparent p-2" onclick="(new repair_company_show_update_page_P('repair_company','show_update_page_P','body1','${ds[cn]['name']}','${ds[cn]['contactor']}','${ds[cn]['address']}','${ds[cn]['phone']}','${ds[cn]["namech"]}','${ds[cn]['id']}')).run()">
                                    <i class="fa fa-pencil-square-o fa-lg text-dark"></i>
                                </a>
                                    </div>
                                </td></tr>`;
                          
                }
                  content +='</tbody></table></div>'; 
                            
         $('#' + this.position_id).html(content);
        }
        else {
                $('#' + this.position_id).html(obj['status_message']);
                //console.log(obj['data_set']);

            }
        }
        catch (e) {
            console.log(e);
        }
    }
    ajax_error(msg) {

    }
}
