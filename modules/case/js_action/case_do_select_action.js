class case_do_select_action extends ActionHandler {
    constructor(module, action, position_id, case_id) {
        super(module, action);
        this.position_id = position_id;
        this.case_id = case_id;
    }
    prepareArgs() {
        this.php = true;
        this.php_action = 'do_select_action';
        console.log(this.case_id);
        this.addArgs('cid', this.case_id)
        // this.addArgs('where_statement', 'id = ' + value);
    }
    ajax_success(json_str) {
        this.loadModuleScript("repair", "insert_new_apply_date");
        this.loadModuleScript("case", "update_user_rank");
        try {
            var txtId = 2;
            var txtna = 1;
            var json_str = json_str.responseText;
            var obj = JSON.parse(json_str);
            var check_apply = obj['check_apply'];
            var check_finish = obj['data_set'][0]['status'];
            console.log(check_finish);
            //var case_id = obj['data_set']['id'];
            if (obj['status_code'] === 0) {
                var ds = obj['data_set'];
                console.log(obj);
                var content = `
               <header>
                            <!-- Navbar -->
                            <nav class="navbar bgdark text-white">
                                <div onclick="(new home_show_home_page('home','show_home_page','body','record')).run()">
                                <i class="fa fa-chevron-left text-white" aria-hidden="true"></i>
                                </div>
                                <span class="h6 m-auto pr-3 py-2"> 維修單</span>
                            </nav>
                            <!-- /.Navbar -->
                            </header>
                  <!-- /Start your project here-->
    <div class="container mt-3">
        <div class="form-group">
            <form>`;
                if (ds[0]['user_rank'] == null && ds[0]['status'] == "finish") {
                    content += `
                    <div class="col-12 border boxShadow rounded p-3">
                        <p class="h6">此次維修已完成，請給予我們評價和意見，感謝您!</p>
                    </div>`;
                }
                content += `
                <!--Textarea with icon prefix-->
                <div class="form-group mb-1">
                    <label for="exampleFormControlTextarea2">你的狀況</label>
                    <textarea class="form-control rounded-0" id="exampleFormControlTextarea2" rows="2" readonly="readonly">` + ds[0]['content'] + `</textarea>
                </div>
						`;
                content += "<div>報修內容:<input type='text' class='form-control my-0' id='month1' placeholder='Enter month' readonly='readonly' value='" + ds[0]['title'] + "'></div>";
                content += "<div>報修日期:<input type='text' class='form-control my-0' id='month1' placeholder='Enter month' readonly='readonly' value='" + st_time_to_min(ds[0]['start_datetime']) + "'></div>";

                if (ds[0]['status'] == "finish" && ds[0]['user_rank'] == null) {
                    content += "<div>維修狀態追蹤:<input type='text' class='form-control my-0' id='month1' placeholder='Enter month' readonly='readonly' value='已維修完成，待評分'></div>";
                }
                else if (ds[0]['status'] == "finish" && ds[0]['user_rank'] != null) {
                    content += "<div>維修狀態追蹤:<input type='text' class='form-control my-0' id='month1' placeholder='Enter month' readonly='readonly' value='維修完成'></div>";
                }
                else if (obj["check_repair_date"] == "yes") {
                    content += "<div>維修狀態追蹤:<input type='text' class='form-control my-0' id='month1' placeholder='Enter month' readonly='readonly' value='已確認維修時間，待維修'></div>";
                }
                else if (obj["check_apply"] == "yes") {
                    content += "<div>維修狀態追蹤:<input type='text' class='form-control my-0' id='month1' placeholder='Enter month' readonly='readonly' value='待確認維修時間'></div>";
                }
                else if (obj["check_apply"] == "no") {
                    content += "<div>維修狀態追蹤:<input type='text' class='form-control my-0' id='month1' placeholder='Enter month' readonly='readonly' value='待確認下次維修時間'></div>";
                }
                else {
                    content += "<div>維修狀態追蹤:<input type='text' class='form-control my-0' id='month1' placeholder='Enter month' readonly='readonly' value='未完成'></div>";
                }

                if (obj['check_repair_date'] == "yes" && ds[0]['status'] == "unfinish") {
                    content += `<div>下次維修日期:<input type='text' class='form-control my-0'  readonly='readonly' value='` + st_time_to_min(obj['repair_date'][0]['reservetime']) + `'></div>`;
                }

                // if (obj['check_apply'] == "no" && ds[0]['status'] == "unfinish") {
                //     content += `
                //         <div class="row my-0 pb-0 mb-0" id="showBlock">
                //             <label for="time" class=" col-12">請輸入您下次維修方便的時間<a type="button" id="addbtn" value="addItem"><i class="fa fa-plus" aria-hidden="true"></i></a></label>
                //             <div class="col-4">
                //                 <input type="date" class="form-control" id="date1" placeholder="Enter month">
                //             </div>
                //             <div class="col-4" >
                //                 <input placeholder="起始時間" type="text" id="input_starttime1-1" class="form-control timepicker">
                //             </div>
                //             <div class="col-4">
                //                 <input placeholder="結束時間" type="text" id="input_starttime1-2" class="form-control timepicker">
                //             </div>
                //         </div>
                //         </br>
                //     <div id="timearea" class="row pl-2 pt-0"></div>
                //     <div id="time_err1"></div>
                //     <div id="case_id" data-value="` + obj['data_set'][0]['id'] + `"></div>
                //     `;
                // }
                if (ds[0]['user_rank'] == null && ds[0]['status'] == "finish") {
                    content += `
                        <div class="col-12 mt-2 font-weight-bold" id="star_div">
                            評價:
                            <span id="start01" class="fa fa-star-o "></span>
                            <span id="start02" class="fa fa-star-o "></span>
                            <span id="start03" class="fa fa-star-o "></span>
                            <span id="start04" class="fa fa-star-o "></span>
                            <span id="start05" class="fa fa-star-o "></span>
                            <!--沒辦法就暫時用這個簡單版的 -->
                        </div>
                        <div class="col-12 mt-2 font-weight-bold" id="case_id" data-value="` + obj['data_set'][0]['id'] + `">
                            意見回復:
                            <textarea type="text" id="reply" class="form-control md-textarea" rows="5"></textarea>
                
                        </div>
                        <div id="show_reply_err"></div>
                        <div style="display:none" id="hid_star" value="0" ></div>
                    `;
                }
                else if (ds[0]['status'] == "finish") {
                    content += `
                        <div>您的評價:<div class="col-12 mt-2 ">`;
                    for (var i = 1; i <= 5; i++) {
                        // if (i <= ds[0]['user_rank']) {
                        //     content += `<span><i class="fa fa-star white-text checked"></i> </span>`;
                        // }
                        // else {
                        //     content += `<span><i class="fa fa-star white-text"></i> </span>`;
                        // }
                        if (i <= ds[0]['user_rank']) {
                            content += `<span class="fa fa-star checked"></span>`;
                        }
                        else {
                            content += `<span class="fa fa-star-o"></span>`;
                        }
                    }
                    content += `</div></div>`;
                }
                content += `
                    <a onclick=""><button type="button" class="btn btn-primary mt-3" id="do_select_btn">確定</button></a>
                    </form>
                    </div>
                    </div>
                           `;

                $('#' + this.position_id).html(content);

                function st_time_to_min(tt1) {
                    var tt3;
                    tt3 = tt1.split(" ")[0].split("-")[0] + "/" + tt1.split(" ")[0].split("-")[1] + "/" + tt1.split(" ")[0].split("-")[2] + " " + tt1.split(" ")[1].split(":")[0] + ":" + tt1.split(" ")[1].split(":")[1];
                    return tt3;
                };


                $(document).ready(function() {
                    // $('#input_starttime1-1').pickatime({});
                    // $('#input_starttime1-2').pickatime({});
                    // //remove div
                    // $("#addbtn").click(function() {
                    //     var n1 = txtna;
                    //     if (n1 < 3) {
                    //         var x = document.getElementById("div2");
                    //         var y = document.getElementById("div3");
                    //         if (x) { txtId = 3; }
                    //         else if (y) { txtId = 2; }
                    //         else { txtId = 2; }
                    //         //$("#timearea").append('<div class="row" id="div' + txtId + '"><div class="col-1"></div><div class="col-3 p-0"><input type="date" class="form-control" name="test[]" id="date' + txtId + '" placeholder="Enter month" /></div><div class="col-3 p-0"><input type="text" name="test[]" class="form-control timepicker" id="input_starttime' + txtId + '-1" placeholder="起始時間"/></div><div class="col-3 p-0"><input type="text" class="form-control timepicker" name="test[]"id="input_starttime' + txtId + '-2" placeholder="結束時間"/></div><div class="col-1 p-0 w-32"><button type="button" id="btnd' + txtId + '" class="btn btn-primary m-0 p-0"  style="height:38px;width:38px;" value="del">X</button></div></br>');
                    //         $("#timearea").append(`<div class="row mt-0 pt-0 pl-1 pb-3" id="div` + txtId + `" >
                    //                                     <div class="col-4 p-0 ">
                    //                                         <div class="col-11">
                    //                                         <input type="date" class="form-control" name="test[]" id="date` + txtId + `" placeholder="Enter month" />
                    //                                         </div>
                    //                                     </div>
                    //                                     <div class="col-4 p-0 ">
                    //                                         <div class="col-11">
                    //                                         <input type="text" name="test[]" class="form-control timepicker" id="input_starttime` + txtId + `-1" placeholder="起始時間"/>
                    //                                         </div>
                    //                                     </div>
                    //                                     <div class="col-4 p-0 row">
                    //                                         <div class="col-11 pr-1">
                    //                                             <input type="text" class="form-control timepicker" name="test[]" id="input_starttime` + txtId + `-2" placeholder="結束時間"/>
                    //                                         </div>
                    //                                         <div class="col-1 p-0 ">
                    //                                             <button type="button" id="btnd` + txtId + `" class="btn btn-primary m-0 p-0"  value="del` + txtId + `">
                    //                                                 ×
                    //                                             </button>
                    //                                         </div>
                    //                                     </div></br>`);
                    //         //style="height:38px;width:38px;"

                    //         $('#input_starttime' + txtId + '-1').pickatime({});
                    //         $('#input_starttime' + txtId + '-2').pickatime({});
                    //         txtna = txtna + 1;
                    //         console.log($("#btnd2").val());
                    //     }
                    //     else {
                    //         document.getElementById("time_err1").innerHTML = `<p class="red-text">只能選三個時間喔</p>`;
                    //     }
                    // });

                    // function deltxt(id) {
                    //     $("#div" + id).remove();
                    //     txtna = txtna - 1;
                    //     console.log(txtna);
                    // }
                    // $(document).on('click', '#btnd2', function() {
                    //     $("#div2").remove();
                    //     txtna = txtna - 1;
                    //     console.log(txtna);
                    // });
                    // $(document).on('click', '#btnd3', function() {
                    //     $("#div3").remove();
                    //     txtna = txtna - 1;
                    //     console.log(txtna);
                    // });
                    $("#do_select_btn").click(
                        function() {
                            if (check_apply == "yes") {
                                if (check_finish == "finish") {
                                    if ($("#hid_star").val() == "0") {
                                        $("#show_reply_err").val('<font color="red" size="4">請輸入評分</font>')
                                    }
                                    else {
                                        (new case_update_user_rank('case', 'update_user_rank', 'show_reply_err', $("#case_id").data("value"))).run();
                                    }


                                }
                                else {
                                    (new home_show_home_page('home', 'show_home_page', 'body', 'record')).run();
                                }

                            }
                            else if (check_apply == "no") {
                                console.log("cid" + $("#case_id").data("value"));
                                if (check_finish == "finish") {
                                    if ($("#hid_star").val() == "0") {
                                        $("#show_reply_err").val('<font color="red" size="4">請輸入評分</font>')
                                    }
                                    else {
                                        (new case_update_user_rank('case', 'update_user_rank', 'show_reply_err', $("#case_id").data("value"))).run();
                                    }
                                }
                                else {
                                    (new home_show_home_page('home', 'show_home_page', 'body', 'record')).run();
                                }

                                //(new repair_insert_new_apply_date('repair', 'insert_new_apply_date', 'time_err1', $("#case_id").data("value"))).run();
                            }


                            // $("#btnd-2").click(function() {
                            //     //deltxt(2);
                            //     $("#div2").remove();
                            //     txtna = txtna - 1;
                            //     console.log(txtna);
                            // });
                            // $("#btnd-3").click(function() {
                            //     //deltxt(3);
                            //     $("#div3").remove();
                            //     txtna = txtna - 1;
                            //     console.log(txtna);
                        });
                });
                $(document).on('click', '#start01', function() {
                    $('#star_div').html(`評價:
                        <span id="start01" class="fa fa-star checked"></span>
                            <span id="start02" class="fa fa-star-o "></span>
                            <span id="start03" class="fa fa-star-o "></span>
                            <span id="start04" class="fa fa-star-o "></span>
                            <span id="start05" class="fa fa-star-o "></span>`);
                    $('#hid_star').val("1");
                    console.log("star " + $('#hid_star').val());
                });
                $(document).on('click', '#start02', function() {
                    $('#star_div').html(`評價:
                        <span id="start01" class="fa fa-star checked"></span>
                            <span id="start02" class="fa fa-star checked "></span>
                            <span id="start03" class="fa fa-star-o "></span>
                            <span id="start04" class="fa fa-star-o "></span>
                            <span id="start05" class="fa fa-star-o "></span>`);
                    $('#hid_star').val("2");
                    console.log("star " + $('#hid_star').val());
                });
                $(document).on('click', '#start03', function() {
                    $('#star_div').html(`評價:
                        <span id="start01" class="fa fa-star checked"></span>
                            <span id="start02" class="fa fa-star checked "></span>
                            <span id="start03" class="fa fa-star checked "></span>
                            <span id="start04" class="fa fa-star-o "></span>
                            <span id="start05" class="fa fa-star-o "></span>`);
                    $('#hid_star').val("3");
                    console.log("star " + $('#hid_star').val());
                });
                $(document).on('click', '#start04', function() {
                    $('#star_div').html(`評價:
                        <span id="start01" class="fa fa-star checked"></span>
                            <span id="start02" class="fa fa-star checked "></span>
                            <span id="start03" class="fa fa-star checked "></span>
                            <span id="start04" class="fa fa-star checked "></span>
                            <span id="start05" class="fa fa-star-o "></span>`);
                    $('#hid_star').val("4");
                    console.log("star " + $('#hid_star').val());
                });
                $(document).on('click', '#start05', function() {
                    $('#star_div').html(`評價:
                        <span id="start01" class="fa fa-star checked"></span>
                            <span id="start02" class="fa fa-star checked "></span>
                            <span id="start03" class="fa fa-star checked "></span>
                            <span id="start04" class="fa fa-star checked "></span>
                            <span id="start05" class="fa fa-star checked "></span>`);
                    $('#hid_star').val("5");
                    console.log("star " + $('#hid_star').val());
                });
                $(document).ready(function() {


                    // $('#start01').mouseenter(function() {
                    //     $('#start01').addClass('checked');
                    //     $('#start02').removeClass('checked');
                    //     $('#start03').removeClass('checked');
                    //     $('#start04').removeClass('checked');
                    //     $('#start05').removeClass('checked');
                    // }).mouseleave(function() {
                    //     //$('#start01').removeClass('checked');
                    // }).on('click', function() {
                    //     $('#start01').addClass('checked');
                    //     $('#hid_star').val("1");
                    //     console.log("star " + $('#hid_star').val());
                    // });
                    // $('#start02').mouseenter(function() {
                    //     $('#start01').addClass('checked');
                    //     $('#start02').addClass('checked');
                    //     $('#start03').removeClass('checked');
                    //     $('#start04').removeClass('checked');
                    //     $('#start05').removeClass('checked');
                    // }).mouseleave(function() {
                    //     // $('#start01').removeClass('checked');
                    //     // $('#start02').removeClass('checked');
                    // }).on('click', function() {
                    //     $('#start01').addClass('checked');
                    //     $('#start02').addClass('checked');
                    //     $('#start03').removeClass('checked');
                    //     $('#start04').removeClass('checked');
                    //     $('#start05').removeClass('checked');
                    //     $('#hid_star').val("2");
                    //     console.log("star " + $('#hid_star').val());
                    // });
                    // $('#start03').mouseenter(function() {
                    //     $('#start01').addClass('checked');
                    //     $('#start02').addClass('checked');
                    //     $('#start03').addClass('checked');
                    //     $('#start04').removeClass('checked');
                    //     $('#start05').removeClass('checked');
                    // }).mouseleave(function() {
                    //     // $('#start01').removeClass('checked');
                    //     // $('#start02').removeClass('checked');
                    //     // $('#start03').removeClass('checked');
                    // }).on('click', function() {
                    //     $('#start01').addClass('checked');
                    //     $('#start02').addClass('checked');
                    //     $('#start03').addClass('checked');
                    //     $('#start04').removeClass('checked');
                    //     $('#start05').removeClass('checked');
                    //     $('#hid_star').val("3");
                    //     console.log("star " + $('#hid_star').val());
                    // });
                    // $('#start04').mouseenter(function() {
                    //     $('#start01').addClass('checked');
                    //     $('#start02').addClass('checked');
                    //     $('#start03').addClass('checked');
                    //     $('#start04').addClass('checked');
                    //     $('#start05').removeClass('checked');
                    // }).mouseleave(function() {
                    //     // $('#start01').removeClass('checked');
                    //     // $('#start02').removeClass('checked');
                    //     // $('#start03').removeClass('checked');
                    //     // $('#start04').removeClass('checked');
                    // }).on('click', function() {
                    //     $('#start01').addClass('checked');
                    //     $('#start02').addClass('checked');
                    //     $('#start03').addClass('checked');
                    //     $('#start04').addClass('checked');
                    //     $('#start05').removeClass('checked');
                    //     $('#hid_star').val("4");
                    //     console.log("star " + $('#hid_star').val());
                    // });
                    // $('#start05').mouseenter(function() {
                    //     $('#start01').addClass('checked');
                    //     $('#start02').addClass('checked');
                    //     $('#start03').addClass('checked');
                    //     $('#start04').addClass('checked');
                    //     $('#start05').addClass('checked');
                    // }).mouseleave(function() {
                    //     // $('#start01').removeClass('checked');
                    //     // $('#start02').removeClass('checked');
                    //     // $('#start03').removeClass('checked');
                    //     // $('#start04').removeClass('checked');
                    //     // $('#start05').removeClass('checked');
                    // }).on('click', function() {
                    //     $('#start01').addClass('checked');
                    //     $('#start02').addClass('checked');
                    //     $('#start03').addClass('checked');
                    //     $('#start04').addClass('checked');
                    //     $('#start04').addClass('checked');
                    //     $('#hid_star').val("5");
                    //     console.log("star " + $('#hid_star').val());
                    // });
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

    }
    ajax_error(msg) {
        $('#' + this.position_id).html(msg.status);
    }
}
