class repair_company_show_insert_page_P extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs() {
        this.php = false;
    }

    showResult(xhttp) {
        var txtId = 2;
        var txtna = 1;
        this.loadModuleScript("repair_company", "do_insert_action_P");
        var content = `
        <div class="container">
             <div class="row m-0">
                 <div class="col-lg-10 col-md-8">
                    <div class="w-100 p-2  borderB">
                        <h1 class="bold">新增廠商</h1>
                    </div>
                    <br>
                    <div class="md-form my-0">
                        <input type="text" id="name"  style="max-width:100%" class="form-control mb-0 pb-1" value="">
                        <label for="name">廠商名稱</label>
                    </div>
                    <br>
                    <div class="md-form my-0">
                        <input type="text" id="contactor" style="max-width:100%" class="form-control mb-0 pb-1" value="">
                        <label for="contactor">聯絡人</label>
                    </div>
                    <br>
                    <div class="md-form">
                        <input type="text" id="address" style="max-width:100%" class="form-control mb-0 pb-1" value="">
                        <label for="address">地址</label>
                    </div>
                    <br>
                    <div class="md-form my-0">
                        <input type="text" id="phone" style="max-width:100%" class="form-control mb-0 pb-1" value="">
                        <label for="phone">電話</label>
                    </div>
                    <br>
                    <div>
                <div class="row pl-2 mt-0 mb-3 pb-0">
                        <label for="time" class="font-weight-bold col-12">廠商維修種類<a type="button" id="addbtn" value="addItem"><i class="fa fa-plus" aria-hidden="true"></i></a></label>
                <div class="md-form my-0">
                    <select class="browser-default float-left mt-2 pt-1" id="service">
                        
                        <option value="1"selected>水電報修</option>
                        <option value="2">電機相關</option>
                        <option value="3">安裝工程</option>
                        <option value="4">公設維修</option>
                        <option value="5">家具維修</option>
                        <option value="6">清潔服務</option>
                        <option value="7">油漆工程</option>
                        <option value="8">其他維修</option>
                    </select>
                </div>
                        </div>
                    <div id="typearea" class="pl-2 pt-0"></div>
                    <div id="type_err"></div>
                
                
                </div>
                <br>
                <div class="text-center mt-2">
                    <button class="btn btn-outline-blue darken-4 waves-effect" type="button" onclick="(new repair_company_do_insert_action_P('repair_company','do_insert_action_P','body1')).run()">新增</button>
                </div>
            </div>
        </div>
    </div>`;


        $('#' + this.position_id).html(content);
        $(document).ready(function() {
            //remove div
            $("#addbtn").click(function() {
                var n1 = txtna;
                if (n1 < 3) {
                    var x = document.getElementById("div2");
                    var y = document.getElementById("div3");
                    if (x) { txtId = 3; }
                    else if (y) { txtId = 2; }
                    else { txtId = 2; }
                    //$("#timearea").append('<div class="row" id="div' + txtId + '"><div class="col-1"></div><div class="col-3 p-0"><input type="date" class="form-control" name="test[]" id="date' + txtId + '" placeholder="Enter month" /></div><div class="col-3 p-0"><input type="text" name="test[]" class="form-control timepicker" id="input_starttime' + txtId + '-1" placeholder="起始時間"/></div><div class="col-3 p-0"><input type="text" class="form-control timepicker" name="test[]"id="input_starttime' + txtId + '-2" placeholder="結束時間"/></div><div class="col-1 p-0 w-32"><button type="button" id="btnd' + txtId + '" class="btn btn-primary m-0 p-0"  style="height:38px;width:38px;" value="del">X</button></div></br>');
                    $("#typearea").append(`<div class="row mt-0 pt-0 pl-0 pb-3" id="div` + txtId + `" >
                                                        <div class="md-form my-0">
                    <select class="browser-default float-left mt-2 pt-1" id="service` + txtId + `">
                        
                        <option value="1"selected>水電報修</option>
                        <option value="2">電機相關</option>
                        <option value="3">安裝工程</option>
                        <option value="4">公設維修</option>
                        <option value="5">家具維修</option>
                        <option value="6">清潔服務</option>
                        <option value="7">油漆工程</option>
                        <option value="8">其他維修</option>
                    </select>
                </div>
                             <div class="col-1 pt-2 p-0 pr-2">    
                                    <button type="button" id="btnd` + txtId + `" class="btn btn-primary m-0 p-0" style="height:25px;width:25px;"  value="del` + txtId + `">
                                 X
                                    </button>
                                </div>    
                         </div>`);
                    //style="height:38px;width:38px;"
                    // $('#input_starttime' + txtId + '-1').pickatime({});
                    // $('#input_starttime' + txtId + '-2').pickatime({});
                    txtna = txtna + 1;
                    console.log($("#service2").val());

                }
                else {
                    document.getElementById("type_err").innerHTML = `<p class="red-text">只能選三個類型喔</p>`;
                }
            });
            $(document).on('click', '#btnd2', function() {
                $("#div2").remove();
                txtna = txtna - 1;

            });
            $(document).on('click', '#btnd3', function() {
                $("#div3").remove();
                txtna = txtna - 1;


                // this.loadModuleScript("repair_company", "do_insert_action_P");
            });

        });
    }

}
