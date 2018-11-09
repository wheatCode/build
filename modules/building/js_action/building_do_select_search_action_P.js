class building_do_select_search_action_P extends ActionHandler {
    constructor(module, action, position_id,userId,consId) {
        super(module, action);
        this.position_id = position_id;
        this.userId = userId;
        this.consId = consId;
    }
    prepareArgs() {
        this.php = true;
        this.addArgsbyid('selectcons');
        this.addArgsbyid('selectname');
        // alert($('#selectcons').val());
        // alert($('#selectname').val());
    }
    ajax_success(xhttp) {
        try {
            var json_str = xhttp.responseText;
            var obj = JSON.parse(json_str);
            var string="";
            if (obj['status_code'] === 0) {
                var ds =obj['rctid'];
                var str = "";
                console.log(ds);
             for (var i in ds) {
                    string="";
                    str +='<tr><th class="py-2">'+ds[i]["constructor_search"]["name"]+'</th>';
                for (var k in ds[i][0]){
                        string+=ds[i][0][k]["name"]+" ";
                }
                             str+='<td class="py-2 w-25">'+string+'</td>';
                    str+=`<td class="py-0">
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        
                                         <a type="button" class="btn bg-transparent p-2" onclick="(new household_show_management_page_P('household','show_management_page_P','body1','${ds[i]['constructor_search']['id']}','${ds[i][0][k]["id"]}','${ds[i][0][k]["name"]}')).run()">
                                        
                                    <i class="fa fa-building-o fa-lg text-dark"></i>
                                </a>
                                    </div>
                                </td>
                                        
                                
                                <td class="py-0">
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        
                                         <a type="button" class="btn bg-transparent p-2" onclick="(new building_show_update_page_P('building','show_update_page_P','body1')).run()">
                                        
                                    <i class="fa fa-pencil-square-o fa-lg text-dark"></i>
                                </a>
                                    </div>
                                </td>

                                <td class="py-0">
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        <a type="button" class="btn bg-transparent p-2" onclick="(new building_do_delete_action_P('building','do_delete_action_P','body1','${ds[i]['constructor_search']['id']}')).run()">
                                    <i class="fa fa-close fa-lg text-dark"></i>
                                </a>
                                    </div>
                                </td>

                            </tr>`;
                                }
                        str+=`</tobody></table></div></div>`;
         $('#' + this.position_id).html(str);
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