class case_show_select_page extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;

    }
    prepareArgs() {
        this.php = true;
        this.php_action = 'show_select_page';
        // var value = $('input[name=id]:checked').val();
        // this.addArgs('where_statement', 'id = ' + value);
    }
    ajax_success(xhttp) {
        try {
            var json_str = xhttp.responseText;

            var obj = JSON.parse(json_str);
            if (obj['status_code'] === 0) {
                var ds = obj['data_set'];
                var content = "";
                var t1;
                var da = new Date();
                var ye = da.getFullYear();
                content += `
    <div class="container mb-3">
        <div class="row pt-0 mt-0" id="min-h">
            <div class="col-12 px-0 ">
                <table class="table table-striped text-center mt-3 " id="touchtable">
                    <thead>
                        <tr>
                            <th scope="col-4" class="py-1 font-weight-bold h6" width="30%">報修日期 </th>
                            <th scope="col-4" class="py-1 font-weight-bold h6" width="50%">維修事項</th>
                            <th scope="col-4" class="py-1 font-weight-bold h6" width="20%"">狀況</th>
                        </tr>
                    </thead>
                    <tbody>
                        `;
                for (var i in ds) {
                    //t1 = st(ds[i]['start_datetime']);
                    content += `
                    <tr data-case_id="${ds[i]["id"]}">
                        <td class="py-1 fontsm"><a onclick="(new case_do_select_action('case','do_select_action','body','${ds[i]["id"]}')).run()">` + st_time_to_date(ds[i]['start_datetime']) + ` </a></td>
                        <td class="py-1 fontsm"><a onclick="(new case_do_select_action('case','do_select_action','body','${ds[i]["id"]}')).run()">${ds[i]['title']} </a></td>
                        <td class="py-1 fontsm"><a onclick="(new case_do_select_action('case','do_select_action','body','${ds[i]["id"]}')).run()">`;
                    if (ds[i]["status"] == "finish") {
                        content += '<i class = "fa fa-check light-blue-text" aria-hidden="true"></i>';
                    }
                    content += `</a></td>
                    </tr>
                                `; //<i class = "fa fa-check light-blue-text" aria-hidden="true"></i>
                }
                content += `                
                    </tbody>
                </table>
            </div>
        </div>
    </div>
      `;

                function st(tt1) {
                    var tt3;
                    if (tt1.split("-", 1) == ye) { tt3 = tt1.split(" ")[0].split("-")[1] + "-" + tt1.split(" ")[0].split("-")[2] + " " + tt1.split(" ")[1].split(":")[0] + ":" + tt1.split(" ")[1].split(":")[1]; }
                    else {
                        tt3 = tt1;
                    }
                    return tt3;
                };

                function st_time_to_date(tt1) {
                    var tt3;
                    tt3 = tt1.split(" ")[0].split("-")[0] + "/" + tt1.split(" ")[0].split("-")[1] + "/" + tt1.split(" ")[0].split("-")[2];
                    return tt3;
                };
                $(document).ready(function() {
                    $('#touchtable tbody tr').click(
                        function() {
                            var tcase_id = $(this).data('case_id');
                            (new case_do_select_action('case', 'do_select_action', 'body', tcase_id)).run()

                        });

                });
                $('#' + this.position_id).html(content);

            }
            else {
                $('#' + this.position_id).html(obj['status_message']);
            }

            this.loadModuleScript("case", "do_select_action");
        }
        catch (e) {
            var msg = e + "<br>";
            msg += "JSON String: ssss" + json_str;
            $('#' + this.position_id).html(msg);
        }

    }
    ajax_error(msg) {
        $('#' + this.position_id).html(msg.status);
    }

}
