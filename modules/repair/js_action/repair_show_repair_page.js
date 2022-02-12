class repair_show_repair_page extends ActionHandler {
    constructor(module, action, position_id, repair_type, repair_id) {
        super(module, action);
        this.position_id = position_id;
        this.repair_type = repair_type;
        this.repair_id = repair_id;
        this.conid = 'no';
    }
    prepareArgs() {
        this.php = true;
        this.php_action = 'do_select_action';
    }
    ajax_success(json_str) {
        var txtId = 2;
        var txtna = 1;
        var image64 = '';
        $(document).ready(function() {
            $("select").on("change", function() {
                var s = $("select[name='select1']").val();
                //console.log(s);
                var r = $("select[name='select0']").val();
                if (r) {
                    //console.log(r);
                    $("#construction_num").val(r);
                }

            });

            $("#progressbarTWInput").change(function() {
                $("#preview_progressbarTW_imgs").html(""); // 清除預覽
                readURL(this);
                var file = document.querySelector('#progressbarTWInput').files[0];
                getBase64(file)
                // console.log(this);
            });

            function getBase64(file) {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function() {
                    //console.log(reader.result);
                    image64 += reader.result;
                    //document.getElementById('inimg').value = image64;
                    $("#inimg").val(image64);
                };
                reader.onerror = function(error) {
                    console.log('Error: ', error);
                };
            }




            function readURL(input) {
                var str = "";
                var imgtype = "";

                var src = "";

                //imgtype = gs.toLowerCase().split('.'); //截取圖片格式 png，jpg，是一個數組
                //imgtype = imgtype[1]; //選取

                if (input.files && input.files.length >= 0) {
                    for (var i = 0; i < input.files.length; i++) {
                        var reader = new FileReader();
                        reader.readAsDataURL(input.files[i]);
                        reader.onload = function(e) {
                            src = e.target.result; //base64圖片
                            // str += "<img src='" + e.target.result + "'/>";
                            // $("#preview_progressbarTW_imgs").html(str); //預覽圖片
                            var img = $("<img width='300' height='200'>").attr('src', e.target.result);
                            $("#preview_progressbarTW_imgs").append(img);
                            //console.log(src);
                        }
                    }
                }
                else {
                    var noPictures = $("<p>目前沒有圖片</p>");
                    $("#preview_progressbarTW_imgs").append(noPictures);
                }
            }
        });
        try {
            var json_str = json_str.responseText;
            var obj = JSON.parse(json_str);
            console.log(obj);
            // alert(obj['status_code']);
            if (obj['status_code'] === 0) {
                var ds = obj['data_set'];
                var r = this.repair_type;
                var title = document.getElementById("case_title");
                var content = document.getElementById("case_content");


                var str = `<header>
                            <!-- Navbar -->
                            <nav class="navbar bgdark text-white">
                                <div onclick="(new home_show_home_page('home','show_home_page','body')).run()">
                                <i class="fa fa-chevron-left text-white" aria-hidden="true"></i>
                                </div>
                                <span class="h6 m-auto pr-3 py-2"> 維修單</span>
                            </nav>
                            <!-- /.Navbar -->
                            </header>   
                            <div id="construction_num" style="display:none" value="no"></div>
                            <div class="container px-3 mt-2">
                                <div class="">
                                    <form>`;


                if (obj['check_construction'] == "yes") {
                    //$("#construction_num").val("over1");
                    str += `<div class="row mt-0">
                                            <div class="col-4">
                                                <label class="font-weight-bold">報修社區:</label>
                                            </div>
                                            <div class="col-8 ">`;
                    str += '<select class="mdb-select" name="select0" id="select0">';
                    for (var index = 0; index < obj['construction_data'].length; index++) {
                        if (index == 0) {
                            str += '<option value="' + obj['construction_data'][index]['id'] + '" selected>' + obj['construction_data'][index]['name'] + '</option>';
                            this.conid = obj['construction_data'][index]['id'];
                        }
                        else {
                            str += '<option value="' + obj['construction_data'][index]['id'] + '" >' + obj['construction_data'][index]['name'] + '</option>';
                        }
                    }
                    str += '</select>';
                    str += `</div></div>`;
                    //var n = $("#select0").val();


                }
                else if (obj['check_construction'] == "nonono") {

                    alert('此帳號沒有綁定建案， 請聯絡客服');
                    (new home_show_home_page('home', 'show_home_page', 'body')).run()
                }


                str += `
                                    <div class="row mt-0">
                                    <div id="inimg" style="display:none"></div>
                                            <div class="col-4">
                                                <label class="font-weight-bold">維修類型:</label>
                                            </div>
                                            <div class="col-8">`;
                str += '<select class="mdb-select" name="select1">';
                for (var index in ds) {
                    if (ds[index]['name'] == this.repair_type) {
                        str += '<option value="' + ds[index]['id'] + '"  selected>' + ds[index]['namech'] + '</option>';

                    }
                    else if (ds[index]['id'] == 4) {
                        str += "";
                    }
                    else {
                        str += '<option value="' + ds[index]['id'] + '">' + ds[index]['namech'] + '</option>';
                    }
                }
                str += '</select>';
                str += `</div></div>
                        <div class="row mt-0 mb-3 pb-0" id="showBlock">
                            <label for="time" class="font-weight-bold col-12">請輸入您方便的時間<a type="button" id="addbtn" value="addItem"><i class="fa fa-plus" aria-hidden="true"></i></a></label>
                            <div class="col-4">
                                <input type="date" style="width:100%" class="form-control" id="date1" placeholder="Enter month">
                            </div>
                            <div class="col-4" >
                                <input placeholder="起始時間" type="text" id="input_starttime1-1" style="width:100%" class="form-control timepicker">
                            </div>
                            <div class="col-4">
                                <input placeholder="結束時間" type="text" id="input_starttime1-2" style="width:100%" class="form-control timepicker">
                            </div>
                        </div>
                        
                    <div id="timearea" class="row mt-0 pl-2 pt-0"></div>
                    <div id="time_err"></div>
                    <div class="row mt-0">
                        <div class="col-4" >
                            <label class="font-weight-bold ">待修狀況:</label>
                        </div>
                        <div class="col-8" >
                            <input type="text" id="case_title" name="" length="30" style="border:1px solid #ced4da;border-radius:2px"/>
                        </div>
                    </div>
                    <div class="col-12">
                        <label class="font-weight-bold ">說明:</label>
                        <div class="md-form mt-1 mb-3">
                            <i class="fa fa-pencil prefix grey-text mt-2"></i>
                            <textarea type="text" id="case_content" style="width:100%" class="form-control md-textarea ml-4" rows="4"></textarea>
                        </div>
                    </div>
                                        <div class="col-12">
                                            <div class="md-form row mt-0">
                                               <input type="file" id="progressbarTWInput" accept="image/gif, image/jpeg, image/png" multiple/ >
                                               <div id="preview_progressbarTW_imgs" style="width:100%; height: 300px; overflow:scroll;">
                                                   <p>目前沒有圖片</p>
                                               </div>
                                            </div>
                                        </div>
                                        <button type="button" id="dorepair" class="btn btn-primary rounded" click="checktime()">提交</button>
                                        
                                                                                  <!--(new repair_do_repair_action('repair','do_repair_action','body')).run()-->
                                    </form>
                                    
                                </div>
                            </div>
                            <script>
                                $(document).ready(function() {
                                    $('.mdb-select').material_select();
                                });
                        
                                var input = $('#manual-operations-input').pickatime({
                                    autoclose: true,
                                    'default': 'now'
                                });
                                
                                $('#check-minutes').click(function(e) {
                                    e.stopPropagation();
                                    input.pickatime('show').pickatime('toggleView', 'minutes');
                                });
                                $('#input_starttime1-1').pickatime({});
                                $('#input_starttime1-2').pickatime({});
                                $('#input_starttime2-1').pickatime({});
                                $('#input_starttime2-2').pickatime({});
                                $('#input_starttime3-1').pickatime({});
                                $('#input_starttime3-2').pickatime({});
                                
                            </script>
                                `;

                $('#' + this.position_id).html(str);
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
                            //$("#timearea").append('<div class="row" id="div' + txtId + '"><div class="col-1"></div><div class="col-3 p-0"><input type="date" style="width:100%" class="form-control" name="test[]" id="date' + txtId + '" placeholder="Enter month" /></div><div class="col-3 p-0"><input type="text" name="test[]" style="width:100%" class="form-control timepicker" id="input_starttime' + txtId + '-1" placeholder="起始時間"/></div><div class="col-3 p-0"><input type="text" style="width:100%" class="form-control timepicker" name="test[]"id="input_starttime' + txtId + '-2" placeholder="結束時間"/></div><div class="col-1 p-0 w-32"><button type="button" id="btnd' + txtId + '" class="btn btn-primary m-0 p-0"  style="height:38px;width:38px;" value="del">X</button></div></br>');
                            $("#timearea").append(`<div class="row mt-0 pt-0 pl-1 pb-3" id="div` + txtId + `" >
                                                        <div class="col-1"></div>
                                                        <div class="col-3 p-0 pr-2">
                                                            
                                                            <input type="date" style="width:100%" class="form-control" name="test[]" id="date` + txtId + `" placeholder="Enter month" />
                                                            
                                                        </div>
                                                        <div class="col-3 p-0 pr-2">
                                                            
                                                            <input type="text" name="test[]" style="width:100%" class="form-control timepicker" id="input_starttime` + txtId + `-1" placeholder="起始時間"/>
                                                            
                                                        </div>
                                                        <div class="col-3 p-0 pr-2">
                                                            
                                                                <input type="text" style="width:100%" class="form-control timepicker" name="test[]" id="input_starttime` + txtId + `-2" placeholder="結束時間"/>
                                                        </div>    
                                                        <div class="col-1 p-0 pr-2">    
                                                                <button type="button" id="btnd` + txtId + `" class="btn btn-primary m-0 p-0" style="height:38px;width:38px;"  value="del` + txtId + `">
                                                                    X
                                                                </button>
                                                        </div>    
                                                    </div>`);
                            //style="height:38px;width:38px;"
                            $('#input_starttime' + txtId + '-1').pickatime({});
                            $('#input_starttime' + txtId + '-2').pickatime({});
                            txtna = txtna + 1;

                        }
                        else {
                            document.getElementById("time_err").innerHTML = `<p class="red-text">只能選三個時間喔</p>`;
                        }
                    });
                    $(document).on('click', '#btnd2', function() {
                        $("#div2").remove();
                        txtna = txtna - 1;

                    });
                    $(document).on('click', '#btnd3', function() {
                        $("#div3").remove();
                        txtna = txtna - 1;

                    });

                    function gt() {
                        var timedate = new Date();
                        var year = timedate.getFullYear();
                        var month;
                        var date;
                        if ((timedate.getMonth() + 1) < 10) {
                            month = "0" + (timedate.getMonth() + 1);
                        }
                        else {
                            month = (timedate.getMonth() + 1);
                        }
                        if (timedate.getDate() < 10) {
                            date = "0" + timedate.getDate();
                        }
                        else {
                            date = timedate.getDate();
                        }
                        var ttime = year + "-" + month + "-" + date;
                        return ttime;
                    }




                    $("#dorepair").click(function checktime() {
                        //console.log(this.conid);
                        $("#construction_num").val(this.conid);





                        var t1 = gt();
                        var x1 = document.getElementById("div2");
                        var x2 = document.getElementById("div3")


                        if (x1 == null && x2 == null) {
                            var time1 = document.getElementById("input_starttime1-1").value;
                            var time2 = document.getElementById("input_starttime1-2").value;
                            var date1 = document.getElementById("date1").value;
                            var title = document.getElementById("case_title").value;
                            var content = document.getElementById("case_content").value;

                            if (title == "" || content == "") {
                                document.getElementById("time_err").innerHTML = `<p class="red-text">尚未填寫狀況</p>`;
                            }
                            else {
                                if (date1 == false) {
                                    document.getElementById("time_err").innerHTML = `<p class="red-text">還沒選擇日期</p>`;
                                }
                                else if (date1 < t1) {
                                    document.getElementById("time_err").innerHTML = `<p class="red-text">日期已經過期</p>`;
                                }
                                else {
                                    if (time1 == null || time2 == null) {
                                        document.getElementById("time_err").innerHTML = `<p class="red-text">還沒選擇時間</p>`;
                                    }
                                    else if (time1 == time2) {
                                        document.getElementById("time_err").innerHTML = `<p class="red-text">時間選擇相同</p>`;
                                    }
                                    else {
                                        if (time1 > time2) {
                                            document.getElementById("time_err").innerHTML = `<p class="red-text">時間選擇有誤</p>`;
                                        }
                                        else {
                                            document.getElementById("time_err").innerHTML = `<p class="red-text">時間選擇正確</p>`;
                                            //do repair action;
                                            (new repair_do_repair_action('repair', 'do_repair_action', 'body')).run();
                                        }
                                    }
                                }
                            }
                        }
                        else if (x1 && x2 == null) {
                            var time1 = document.getElementById("input_starttime1-1").value;
                            var time2 = document.getElementById("input_starttime1-2").value;
                            var time3 = document.getElementById("input_starttime2-1").value;
                            var time4 = document.getElementById("input_starttime2-2").value;
                            var date1 = document.getElementById("date1").value;
                            var date2 = document.getElementById("date2").value;
                            var title = document.getElementById("case_title").value;
                            var content = document.getElementById("case_content").value;
                            if (title == "" || content == "") {
                                document.getElementById("time_err").innerHTML = `<p class="red-text">尚未填寫狀況</p>`;
                            }
                            else {
                                if (date1 == false || date2 == false) {
                                    document.getElementById("time_err").innerHTML = `<p class="red-text">還沒選擇日期</p>`;
                                }
                                else if (date1 < t1 || date2 < t1) {
                                    document.getElementById("time_err").innerHTML = `<p class="red-text">日期已經過期</p>`;
                                }
                                else {
                                    if (time1 == null || time2 == null || time3 == null || time4 == null) {
                                        document.getElementById("time_err").innerHTML = `<p class="red-text">還沒選擇時間</p>`;
                                    }
                                    else if (time1 == time2 || time3 == time4) {
                                        document.getElementById("time_err").innerHTML = `<p class="red-text">時間選擇相同</p>`;
                                    }
                                    else {
                                        if (time1 > time2 || time3 > time4) {
                                            document.getElementById("time_err").innerHTML = `<p class="red-text">時間選擇有誤</p>`;
                                        }
                                        else {
                                            document.getElementById("time_err").innerHTML = `<p class="red-text">時間選擇正確</p>`;
                                            //do repair action;
                                            (new repair_do_repair_action('repair', 'do_repair_action', 'body')).run();
                                        }
                                    }
                                }
                            }
                        }
                        else if (x1 == null && x2) {
                            var time1 = document.getElementById("input_starttime1-1").value;
                            var time2 = document.getElementById("input_starttime1-2").value;
                            var time3 = document.getElementById("input_starttime3-1").value;
                            var time4 = document.getElementById("input_starttime3-2").value;
                            var date1 = document.getElementById("date1").value;
                            var date2 = document.getElementById("date3").value;
                            var title = document.getElementById("case_title").value;
                            var content = document.getElementById("case_content").value;
                            if (title == "" || content == "") {
                                document.getElementById("time_err").innerHTML = `<p class="red-text">尚未填寫狀況</p>`;
                            }
                            else {
                                if (date1 == false || date2 == false) {
                                    document.getElementById("time_err").innerHTML = `<p class="red-text">還沒選擇日期</p>`;
                                }
                                else if (date1 < t1 || date2 < t1) {
                                    document.getElementById("time_err").innerHTML = `<p class="red-text">日期已經過期</p>`;
                                }
                                else {
                                    if (time1 == null || time2 == null || time3 == null || time4 == null) {
                                        document.getElementById("time_err").innerHTML = `<p class="red-text">還沒選擇時間</p>`;
                                    }
                                    else if (time1 == time2 || time3 == time4) {
                                        document.getElementById("time_err").innerHTML = `<p class="red-text">時間選擇相同</p>`;
                                    }
                                    else {
                                        if (time1 > time2 || time3 > time4) {
                                            document.getElementById("time_err").innerHTML = `<p class="red-text">時間選擇有誤</p>`;
                                        }
                                        else {
                                            document.getElementById("time_err").innerHTML = `<p class="red-text">時間選擇正確</p>`;
                                            //do repair action;
                                            (new repair_do_repair_action('repair', 'do_repair_action', 'body')).run();
                                        }
                                    }
                                }
                            }
                        }
                        else if (x1 && x2) {
                            var time1 = document.getElementById("input_starttime1-1").value;
                            var time2 = document.getElementById("input_starttime1-2").value;
                            var time3 = document.getElementById("input_starttime2-1").value;
                            var time4 = document.getElementById("input_starttime2-2").value;
                            var time5 = document.getElementById("input_starttime3-1").value;
                            var time6 = document.getElementById("input_starttime3-2").value;
                            var date1 = document.getElementById("date1").value;
                            var date2 = document.getElementById("date2").value;
                            var date3 = document.getElementById("date3").value;
                            var title = document.getElementById("case_title").value;
                            var content = document.getElementById("case_content").value;
                            if (title == "" || content == "") {
                                document.getElementById("time_err").innerHTML = `<p class="red-text">尚未填寫狀況</p>`;
                            }
                            else {
                                if (date1 == false || date2 == false || date3 == false) {
                                    document.getElementById("time_err").innerHTML = `<p class="red-text">還沒選擇日期</p>`;
                                }
                                else if (date1 < t1 || date2 < t1 || date3 < t1) {
                                    document.getElementById("time_err").innerHTML = `<p class="red-text">日期已經過期</p>`;
                                }
                                else {
                                    if (time1 == null || time2 == null || time3 == null || time4 == null || time5 == null || time6 == null) {
                                        document.getElementById("time_err").innerHTML = `<p class="red-text">還沒選擇時間</p>`;
                                    }
                                    else if (time1 == time2 || time3 == time4 || time5 == time6) {
                                        document.getElementById("time_err").innerHTML = `<p class="red-text">時間選擇相同</p>`;
                                    }
                                    else {
                                        if (time1 > time2 || time3 > time4 || time5 > time6) {
                                            document.getElementById("time_err").innerHTML = `<p class="red-text">時間選擇有誤</p>`;
                                        }
                                        else {
                                            document.getElementById("time_err").innerHTML = `<p class="red-text">時間選擇正確</p>`;
                                            //do repair action;
                                            (new repair_do_repair_action('repair', 'do_repair_action', 'body')).run();
                                        }
                                    }
                                }
                            }
                        }
                    });
                });


            }
            else {
                $('#' + this.position_id).html(obj['status_message']);
            }
        }
        catch (e) {
            var msg = e + "<br>";
            msg += "JSON String: " + json_str;
            $('#' + this.position_id).html(msg);
        }
        // document.getElementById(this.position_id).innerHTML = str;
        this.loadModuleScript(this.module, "do_repair_action");
    }
    ajax_error(msg) {}
}
