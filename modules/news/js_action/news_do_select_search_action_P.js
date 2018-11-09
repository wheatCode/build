class news_do_select_search_action_P extends ActionHandler {
    constructor(module, action, position_id,userId) {
        super(module, action);
        this.position_id = position_id;
        this.userId = userId;
    }
    prepareArgs() {
        this.php = true;
        this.addArgsbyid('selectTopic');
        this.addArgsbyid('selectDate');

       console.log(  
        $('#selectTopic').val(),
        $('#selectDate').val(),
        );
    }
    ajax_success(xhttp) {
        try {
           var json_str = xhttp.responseText;
            var obj = JSON.parse(json_str);
            if (obj['status_code'] === 0) {
                var ds =obj['news_model_data'];
                var content = "";
                console.log(ds);

             for (var cn in ds) {
                    
                    content +=
                              '<tr>'+
                              '<td class="py-2 w-20">'+ds[cn]["topic"]+'</td>'+
                              '<td class="py-2 w-20">'+ds[cn]["content"]+'</td>'+
                              '<td class="py-2 w-20">'+ds[cn]["date"]+'</td>';  
                    content+=`
                              <td class="py-2">
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        <a type="button" class="btn bg-transparent p-2" onclick="(new news_do_delete_action_P('news','do_delete_action_P','body1','${ds[cn]['id']}')).run()">
                                    <i class="fa fa-close fa-lg text-dark"></i>
                                </a>
                                    </div>
                                </td>
                                <td class="py-2">
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        <a type="button" class="btn bg-transparent p-2" onclick="(new news_show_update_page_P('news','show_update_page_P','body1','${ds[cn]['topic']}','${ds[cn]['content']}','${ds[cn]['date']}','${ds[cn]['id']}')).run()">
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
