class repair_company_show_update_page_P extends ActionHandler {
    constructor(module, action, position_id,companyName,companyContactor,companyAddress,companyPhone,companyType,companyID,companyType2) {
        super(module, action);
        this.position_id = position_id;
        this.companyName= companyName;
        this.companyContactor= companyContactor;
        this.companyAddress= companyAddress;
        this.companyPhone= companyPhone;
        this.companyType= companyType;
        this.companyID=companyID;
        this.companyType2= companyType2;
        
    }
    prepareArgs() {
        this.php = false;
    }
    showResult(xhttp){
        var companyType =this.companyType;
        var companyType2 =this.companyType2;
        console.log(companyType);
        console.log(companyType2);
        
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
                    <input type="text" style="max-width:100%" id="name" class="form-control mb-0 pb-1" value="${this.companyName}">
                 </div> 
                 <div>
                    <label>廠商聯絡人</label>
                    <input type="text" style="max-width:100%" id="contactor" class="form-control mb-0 pb-1" value="${this.companyContactor}">
                 </div>
                 <div>
                    <label>廠商地址</label>
                    <input type="text" style="max-width:100%" id="address" class="form-control mb-0 pb-1" value="${this.companyAddress}">
                </div>
                <div>
                    <label>廠商電話</label>
                    <input type="text" style="max-width:100%" id="phone" class="form-control mb-0 pb-1" value="${this.companyPhone}">
                </div>`;
                if(companyType==companyType2){
                    content+=`
                <div>
                    <label>廠商類型</label>
                    <input type="text" style="max-width:100%" id="namech" class="form-control mb-0 pb-1" value="${this.companyType}">
                </div>
                        `;
                    
                }
                else{
                content+=`
                <div>
                    <label>廠商類型</label>
                    <input type="text" style="max-width:100%" id="namech" class="form-control mb-0 pb-1" value="${this.companyType}${this.companyType2}">
                </div>
                        `;
                    
                }
                    
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
          
}

 




