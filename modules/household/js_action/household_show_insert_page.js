class household_show_insert_page extends ActionHandler {
    constructor(module, action, position_id,constid,workername) {
        super(module, action);
        this.position_id = position_id;
        this.constid = constid;
        this.workername=workername;
    }
    prepareArgs() {
        this.php = false;
        // this.php_action="do_select_action";
        this.addArgs('constid',this.constid);
        this.addArgs('workername',this.workername);
    }
    showResult(xhttp) {
        try{
            var str=`
                    <div class="container">
                     <div class="row m-0">
                         <div class="col-lg-10 col-md-8">
                            <div class="w-100 p-2  borderB">
                                    <h1 class="bold">新增戶</h1>
                                </div>
                                <div class="md-form my-0">
                                    <input type="text" id="number" class="form-control mb-0 pb-1" style="margin-top: 25px;">
                                    <label for="number">戶號</label>
                                </div>
                                <br>
                                <div class="md-form my-0">
                                    <input type="text" id="address" class="form-control mb-0 pb-1" style="margin-top: 25px;">
                                    <label for="address">地址</label>
                                </div>
                                <br>
                                <div class="md-form my-0">
                                    <input type="text" id="floor" class="form-control mb-0 pb-1" style="margin-top: 25px;">
                                    <label for="floor">樓層</label>
                                </div>
                                <br>
                                <div class="text-center mt-2">
                                    <button onclick="(new household_do_insert_action('household','do_insert_action','body1','${this.constid}','${this.workername}')).run()" class="btn btn-blue darken-4 waves-effect" type="button">新增</button>
                                </div>
                            </div>
                        </div>
                    </div>`;
                
                $('#' + this.position_id).html(str);
               
        }catch(e){
            var msg = e + "<br>";
            msg += "JSON String: " + str;
        }
        this.loadModuleScript(this.module, "do_insert_action");
    }      
}
