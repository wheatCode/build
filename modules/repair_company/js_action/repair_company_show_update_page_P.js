class repair_company_show_update_page_P extends ActionHandler {
    constructor(module, action, position_id,companyID) {
        super(module, action);
        this.position_id = position_id;
        this.companyID=companyID;
        
        
    }
    prepareArgs() {
        this.php = true;
        this.addArgs('comid',this.companyID);
    }
    ajax_success(xhttp){
        
        var json_str = xhttp.responseText;
        var obj = JSON.parse(json_str);
        console.log(obj);
        //var companyType =this.companyType;
        //var companyType2 =this.companyType2;
        //console.log(companyType);
        //console.log(companyType2);
        
                var content = "";
                content+= `
        <div class="row mt-0">
            <div class="col-lg-12 col-md-7">
                <div class="w-100 p-2 borderB">
                    <h1 class="bold">廠商編輯</h1>
                </div>
                <from>
                <div class="mt-2">
                    <label>廠商名稱</label>
                    <input type="text" style="max-width:100%" id="name" class="form-control mb-0 pb-1" value="${obj['comall'][0]['name']}">
                 </div> 
                 <div>
                    <label>廠商聯絡人</label>
                    <input type="text" style="max-width:100%" id="contactor" class="form-control mb-0 pb-1" value="${obj['comall'][0]['contactor']}">
                 </div>
                 <div>
                    <label>廠商地址</label>
                    <input type="text" style="max-width:100%" id="address" class="form-control mb-0 pb-1" value="${obj['comall'][0]['address']}">
                </div>
                <div>
                    <label>廠商電話</label>
                    <input type="text" style="max-width:100%" id="phone" class="form-control mb-0 pb-1" value="${obj['comall'][0]['phone']}">
                </div>`;
                
                var text="";    
                for(var i in obj['comall']){
                    text+=obj['comall'][i]['namech'];
                    
                }
                //console.log(text);
                    content+=`
                <div>
                    <label>廠商類型</label>
                    <input type="text" style="max-width:100%" id="namech" class="form-control mb-0 pb-1" value="${text}">
                </div>
                        `;
                    
                
                    
                
                    
            content+=`
                    </select>
                    </div>
                    <div class="text-center mt-3">
                        <button onclick="(new repair_company_do_update_action_P('repair_company','do_update_action_P','body1','${this.companyID}')).run()" class="btn btn-blue darken-4 waves-effect px-5" type="submit">修改</button>
                        <button onclick="(new repair_company_show_select_page_P('repair_company','show_select_page_P','body1')).run()" class="btn btn-danger text-white waves-effect px-5">取消</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
`;
                $('#' + this.position_id).html(content);
                this.loadModuleScript("repair_company", "show_select_page_P");
                this.loadModuleScript("repair_company", "do_update_action_P");
                
    }
    ajax_error(msg) {
        // $('#' + this.position_id).html(msg.status);
    }      
}

 




