class repair_show_apply_date_E extends ActionHandler {
    constructor(module, action, position_id, repair_history_id) {
        super(module, action);
        this.position_id = position_id;
        this.repair_history_id = repair_history_id;
    }
    prepareArgs() {
        this.php = true;
        this.addArgs('repair_history_id', this.repair_history_id);
    }
    ajax_success(xhttp) {
        try {
            var json_str = xhttp.responseText;
            //console.log(json_str);
            var obj = JSON.parse(json_str);
            var ds = obj['data_set'];
            console.log(obj);
            this.loadModuleScript("home", "show_home_page_E");
            var content = "";
            if (obj['status_code'] == 0) {
                var atime1 = obj['apply_date'][0]['start_Time'];
                var atime2 = obj['apply_date'][0]['end_Time'];
                console.log(st(atime1));
                content += `
                     <div class="col-12 mt-4 pl-0" >
                                    <span>選擇適用時間</span>
                    </div>
                                <div class="col-12 mt-2 pl-0">
                                    <div class="form-check"id="time1" style="min-witdh:100%"  data-date="` + st(atime1) + `">
                                        <input class="form-check-input" style="min-witdh:100%"  name="group100" type="radio" id="radio101">
                                        <label class="form-check-label col-12"  style="min-witdh:100%"  font30" for="radio101">` + st(atime1) + ` (` + st_time(atime1) + `-` + st_time(atime2) + `)<br><input placeholder="確定維修時間" type="text" id="input_starttime1" class="form-control timepicker"></label>
                                    </div>
                                    
                                </div>
                                <script>$('#input_starttime1').pickatime({});</script>
                                `;
                if (obj['apply_date'][1]) {
                    var btime1 = obj['apply_date'][1]['start_Time'];
                    var btime2 = obj['apply_date'][1]['end_Time'];
                    content += `
                         <div class="col-12 mt-2">
                                    <div class="form-check" id="time2"  style="min-witdh:100%"  data-date="` + st(btime1) + `">
                                        <input class="form-check-input "  style="min-witdh:100%"  name="group100" type="radio" id="radio102">
                                        <label class="form-check-label col-12" style="min-witdh:100%"  for="radio102">` + st(btime1) + ` (` + st_time(btime1) + `-` + st_time(btime2) + `)<input placeholder="確定維修時間" type="text" id="input_starttime2" class="form-control timepicker"></label>
                                    </div>
                                </div>
                                <script>$('#input_starttime2').pickatime({});</script>
                    `
                }
                if (obj['apply_date'][2]) {
                    var ctime1 = obj['apply_date'][2]['start_Time'];
                    var ctime2 = obj['apply_date'][2]['end_Time'];
                    content += `
                         <div class="col-12 mt-2">
                                    <div class="form-check" id="time3"  style="min-witdh:100%"  data-date="` + st(ctime1) + `">
                                        <input class="form-check-input "  style="min-witdh:100%"  name="group100" type="radio" id="radio103">
                                        <label class="form-check-label col-12"  style="min-witdh:100%"  for="radio103" >` + st(ctime1) + ` (` + st_time(ctime1) + `-` + st_time(ctime2) + `)<input placeholder="確定維修時間" type="text" id="input_starttime3" class="form-control timepicker"></label>
                                    </div>
                                </div>
                                <script>$('#input_starttime3').pickatime({});</script>
                    `
                }
                content += `
                               
                                <div class=" mt-3 ">
                                    <div class="form-check" id="time4">
                                        <input class="form-check-input " name="group100" type="radio" id="radio104">
                                        <label class="form-check-label col-12" for="radio104">其他:</label>
                                        <div class="form-check">
                                            <div class="row my-0">
                                                <div class="col-12">
                                                    <input type="date" class=""  style="min-witdh:100%"  id="pick_dateo" placeholder="Enter month">
                                                </div>
                                                <div class="col-12" id="timea">
                                                    <input placeholder="時間" type="time"  style="min-witdh:100%"  id="input_starttime4" class="">
                                                </div>
                                                <script>$('#input_starttime4').pickatime({});</script>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                    
                                
                `;
                //<script>$('#input_starttime1').pickatime({});</script>
                //<script>$('#input_starttime2').pickatime({});</script>
                //<script>$('#input_starttime3').pickatime({});</script>
                //<script>$('#input_starttime4').pickatime({});</script>
            }
            else {
                //document.getElementById("apply_date_msg").innerHTML = "客戶尚未選擇時間";
                content += `
                     <div class="col-12 mt-4" >
                                    <span>選擇適用時間</span>
                    </div>
                            `;
                content += `
                               
                                <div class=" mt-3 ">
                                    <div class="form-check" id="time4">
                                        <input class="form-check-input " name="group100" type="radio" id="radio104" checked="true">
                                        <label class="form-check-label col-12 font30" for="radio104">其他:</label>
                                        <div class="form-check">
                                            <div class="row my-0">
                                                <div class="col-12">
                                                    <input type="date" class="" id="pick_dateo" placeholder="Enter month">
                                                </div>
                                                <div class="col-12">
                                                    <input placeholder="時間" type="text" id="input_starttime4" class="form-control timepicker">
                                                </div>
                                                <script>$('#input_starttime4').pickatime({});</script>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                    
                                
                `;
            }
            // else {
            //     $('#' + this.position_id).html(obj['status_message']);
            // }
            // $('#input_starttime1').pickatime({});
            // $('#input_starttime2').pickatime({});
            // $('#input_starttime3').pickatime({});
            // $('#input_starttime4').pickatime({});

           
            function st(tt1) {
                var tt3;
                tt3 = tt1.split(" ")[0].split("-")[0] + "/" + tt1.split(" ")[0].split("-")[1] + "/" + tt1.split(" ")[0].split("-")[2];
                return tt3;
            };

            function st_time(tt1) {
                var tt3;
                tt3 = tt1.split(" ")[1].split(":")[0] + ":" + tt1.split(" ")[1].split(":")[1];
                return tt3;
            };

            // $( document ).ready(function() {
            //     $('#timea').html(` <input placeholder="時間" type="time"  style="min-witdh:100%"  id="input_starttime4" class="">`);

            // });

            //this.loadModuleScript("case", "do_select_action");
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
