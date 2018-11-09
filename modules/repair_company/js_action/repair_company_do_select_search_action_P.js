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
        
       console.log(  
        $('#selectName').val(),
        $('#selectContactor').val(),
        $('#selectType').val()
        );
    }
    ajax_success(xhttp) {
        try {
            var json_str = xhttp.responseText;
            var obj = JSON.parse(json_str);
            var string="";
            if (obj['status_code'] === 0) {
                var ds =obj['rctid'];
                var content = "";
                console.log(ds);

             for (var cn in ds) {
                    string="";
                    content +=
                              '<tr>'+
                            //'<td>'+obj['repair_type_name']+'</td>' +      
                              
                              '<td class="py-2 w-25">'+ds[cn]["company"]["name"]+'</td>';
                for (var sn in ds[cn][0]){
                        string+=ds[cn][0][sn][0]["namech"]+" ";
                }
                             content+='<td class="py-2 w-25">'+string+'</td>';
                
                         
                    content += '<td class="py-2 w-25">'+ds[cn]["company"]["contactor"]+'</td>';  //obj["repair_company_profile_name"][cn]["name"]
                    content+=`
                              <td class="py-2">
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        <a type="button" class="btn bg-transparent p-2" onclick="(new repair_company_do_delete_action_P('repair_company','do_delete_action_P','body1','${ds[cn]['company']['id']}')).run()">
                                    <i class="fa fa-close fa-lg text-dark"></i>
                                </a>
                                    </div>
                                </td>
                                <td class="py-2">
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        <a type="button" class="btn bg-transparent p-2" onclick="(new repair_company_show_update_page_P('repair_company','show_update_page_P','body1','${ds[cn]['company']['name']}','${ds[cn]['company']['contactor']}','${ds[cn]['company']['address']}','${ds[cn]['company']['phone']}','${ds[cn][0][sn][0]["namech"]}','${ds[cn]['company']['id']}')).run()">
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
