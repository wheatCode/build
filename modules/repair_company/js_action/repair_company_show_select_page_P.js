class repair_company_show_select_page_P extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs() {
        this.php = true;
        this.php_action = 'show_select_page_P';
    }

ajax_success(xhttp) {
       try {
           
           $(document).ready(function() {
            $("select").on("change", function() {
                var s = $("select[id='select1']").val();
                console.log(s);
                

            });});
           
           
       
            this.loadModuleScript("repair_company", "show_update_page_P");
            this.loadModuleScript("repair_company", "show_insert_page_P");
            this.loadModuleScript("repair_company", "do_delete_action_P");
            this.loadModuleScript("repair_company", "do_select_search_action_P");
            
            var json_str = xhttp.responseText;
            var obj = JSON.parse(json_str);
            var string="";
            if (obj['status_code'] === 0) {
                 var ds =obj['rctid'];
                var content = "";
                console.log(ds);
        
              //console.log(ds2[1][0]["repair_type_id"]);
              
               
               

                content+= `
               <div class="row mt-0">
            <div class="col-lg-12 col-md-7">
                <div class="w-100 p-2 borderB">
                    <h1 class="bold">廠商管理</h1>
                </div>

                    <div>
                    <span class="bold mr-2">廠商名稱</span><input class="mt-2 mr-2 w-8" style="max-width:8%" type="text" id="selectName">
                    <span class="bold mr-2">廠商負責人</span><input class="mt-2 mr-2 w-8" style="max-width:8%" type="text" id="selectContactor">
                    <span class="bold mr-2">維修類別</span>
                    <select class="mdb-select md-form" id="select1" >
                            <option value="0">全部類別</option>
                            <option value="1">水電報修</option>
                            <option value="2">電機相關</option>
                            <option value="3">安裝工程</option>
                            <option value="4">公設維修</option>
                            <option value="5">家具維修</option>
                            <option value="6">清潔服務</option>
                            <option value="7">油漆工程</option>
                            <option value="8">其他維修</option>
                    </select>
                    <button onclick="(new repair_company_do_select_search_action_P('repair_company','do_select_search_action_P','search')).run()" class="btn btn-indigo btn-sm  mx-1">搜尋</button>
                    <button id="resetForm" class="btn btn-indigo btn-sm  mx-1" >清空</button>
                    
                    
                    <button type="button" class="btn btn-indigo btn-sm mx-3"onclick="(new repair_company_show_insert_page_P('repair_company','show_insert_page_P','body1')).run()">新增維修廠商</button></a>
                </div>
                    <div class="overFlow1">
                     <table class="table mb-0 text-center">
                         <thead>
                            <tr>
                              <th scope="col" class="h5 bold py-2 w-25">廠商名稱</th>
                                <th scope="col" class="h5 bold py-2 w-25">廠商類別</th>
                                <th scope="col" class="h5 bold py-2 w-25">廠商負責人</th>
                                <th scope="col" class="h5 bold py-2">刪除資料</th>
                                <th scope="col" class="h5 bold py-2">修改資料</th>
                            </tr>
                         </thead>
                     </table>
                    </div>
                <div class="overFlow2">
                    <table class="table text-center mb-0">
                        <tbody id="search">`;
                
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
                                        <a type="button" class="btn bg-transparent p-2" onclick="(new repair_company_show_update_page_P('repair_company','show_update_page_P','body1','${ds[cn]['company']['name']}','${ds[cn]['company']['contactor']}','${ds[cn]['company']['address']}','${ds[cn]['company']['phone']}','${ds[cn][0][0][0]["namech"]}','${ds[cn]['company']['id']}','${ds[cn][0][sn][0]["namech"]}')).run()">
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
            $(document).ready(function() {
        $('.mdb-select').material_select();
        $('.caret').css('margin-top','-7px');
        $('.select-dropdown').css('max-width','100%').css('margin','0').css('height','2rem');
        $('.select-wrapper').css('display','inline-block').css('margin','0').css('max-width','100px');
        $('#resetForm').on('click',function(){
            
            $('#select1 option[value=0]').attr('selected', 'selected');
            console.log($("#select1").val());
            //console.log($('#select1').attr("option",0));
            var obj=document.getElementById('select1');
            obj.options[0].selected=true;
            $('#selectName').val("");
            $('#selectContactor').val("");
        });
        
        
        
    }); 

        }
        catch (e) {
            var msg = e + "<br>";
            msg += "JSON String: " + json_str;
            $('#' + this.position_id).html(msg);
            console.log(msg);
        }
        

    }
    ajax_error(msg) {
        // $('#' + this.position_id).html(msg.status);
    }

}