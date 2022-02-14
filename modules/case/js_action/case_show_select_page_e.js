class case_show_select_page_e extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
console.log(module, action, position_id);

    }
    prepareArgs() {
        this.php = true;
        this.php_action = 'show_select_page_e';

    }
    ajax_success(xhttp) {
        try {
            var json_str = xhttp.responseText;
            var obj = JSON.parse(json_str);
            if (obj['status_code'] === 0) {
                //var ds = obj['data_set'];
                var ds = obj['j_case'];
                var content = "";
                var t1;
                var da = new Date();
                var ye = da.getFullYear();
                var na = obj['buildingname'];
                var test = obj['test'];


                console.log(obj);
                console.log(test);
                console.log(obj);
                //console.log(ds[0]); //every user 0-1-2...
                //console.log(ds[0][0]); //every case alldata
                //console.log(ds[0][0]["repair_type_id"]);

                var contenta = "";
                var contentb = "";
                var contenta2 = "";
                var contenta3 = "";
                var contentb1 = "";
                var contentb2 = "";
                var contentb3 = "";
                var ns;
                content += `<div class="container pt-3">
                                <div class="row mt-4">
                                    <div class="col-4">
                                        <span class="h2">案件</span>
                                    </div>
                                    <div class="switch col-6">
                                        <ul class="nav nav-tabs nav-justified bg-indigo">
                                            <li class="nav-item">
                                                <a class="nav-link active" data-toggle="tab" href="#Yet_Finish" role="tab">待完成</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="tab" href="#New" role="tab">新案件</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="row tab-content card mt-4" id="min-h">
                                
                                    <div class="tab-pane fade in show active" id="Yet_Finish" role="tabpanel">
                                        <table class="table table-striped text-center touchtable">
                                            <thead>
                                                <tr>
                                                    <th scope="col" class="py-1 font-weight-bold h4">建案名稱 </th>
                                                    <th scope="col" class="py-1 font-weight-bold h4">維修日期 </th>
                                                    <th scope="col" class="py-1 font-weight-bold h4">維修事項</th>
                                                    <th scope="col" class="py-1 font-weight-bold h4">維修進度</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            `;

                contenta3 = `</tbody>
                            </table>
                        </div>`;


                // for (var i = 0; i < ds.length; i++) {
                //     if (ds[i] == null) {
                //         //do nothing
                //     }
                //     else {
                //for (var j in ds[i]) {
                for (var i = 0; i < ds.length; i++) {
                    if (ds[i]["status"] == "unfinish") {
                        contenta2 += `
                                    <tr data-case_id="${ds[i]['id']}">
                                        <a onclick="(new case_show_case_page_E('case','show_case_page_E','body','${ds[0]["id"]}')).run();">
                                            <th class="py-1 fontsm">
                                                ` + ds[i]['name'] + `
                                            </th>
                                            <th class="py-1 fontsm">
                                                `;
                        if (obj["check_repair_date"][i]["repair_date"] != "尚無") {
                            contenta2 += st_time_to_date(obj["check_repair_date"][i]["repair_date"]);
                        }
                        else {
                            contenta2 += obj["check_repair_date"][i]["repair_date"];
                        }
                        contenta2 += `
                                            </th>
                                            <th class="py-1 fontsm">
                                                ${ds[i]["title"]}
                                            </th>
                                            <th class="py-1 fontsm">
                                                ` + obj["check_repair_date"][i]["check_repair_date"] + `
                                            </th>
                                        </a>
                                    </tr>`;
                    }
                    else if (ds[i]["status"] == "new") {
                        ns = ds[i]["namech"];
                        contentb2 += `
                                    <tr class="" data-case_id="${ds[i]['id']}">
                                        <th class="py-1 fontsm ">${ns}</th>
                                        <td class="py-1 fontsm ">${ds[i]["title"]}</td>
                                        <td class="py-1 fontsm ">` + ds[i]['name'] + `</td>
                                        <td class="py-1 fontsm "><a onclick="(new case_show_case_page_E('case','show_case_page_E','body','` + ds[i]["id"] + `')).run();">` + ds[i]['number'] + `</a></td>
                                    </tr>`; //${ds[i][j]["id"]}
                    }
                }
                //     }
                // }






                contentb1 = `<div class="tab-pane fade" id="New" role="tabpanel">
                                        <table class="table table-striped text-center touchtable">
                                            <thead>
                                                <tr>
                                                    <th scope="col" class="py-1 font-weight-bold h4">報修類別</th>
                                                    <th scope="col" class="py-1 font-weight-bold h4">待修情形</th>
                                                    <th scope="col" class="py-1 font-weight-bold h4">建案名稱 </th>
                                                    <th scope="col" class="py-1 font-weight-bold h4">戶號</th>
                                                </tr>
                                            </thead>
                                            <tbody>`;

                contentb3 = `</tbody>
                            </table>
                            </div>
                            </div>
                            </div>`;
                content = content + contenta2;
                content = content + contenta3;
                content = content + contentb1;
                content = content + contentb2;
                content = content + contentb3;



                function st(tt1) { //set time
                    var tt3;
                    if (tt1.split("-", 1) == ye) { tt3 = tt1.split(" ")[0].split("-")[1] + "-" + tt1.split(" ")[0].split("-")[2] + " " + tt1.split(" ")[1].split(":")[0] + ":" + tt1.split(" ")[1].split(":")[1]; }
                    else { tt3 = tt1; }
                    return tt3;
                };

                function st_time_to_date(tt1) {
                    var tt3;
                    tt3 = tt1.split(" ")[0].split("-")[0] + "/" + tt1.split(" ")[0].split("-")[1] + "/" + tt1.split(" ")[0].split("-")[2];
                    return tt3;
                };
                $('#' + this.position_id).html(content);

                function sn(n1) { //sn=setname
                    var n;
                    var n2 = n1;
                    switch (n2) {
                        case "1":
                            n = "水電報修";
                            break;
                        case "2":
                            { n = "電機相關"; break; }
                        case "3":
                            { n = "安裝工程"; break; }
                        case "4":
                            { n = "公設維修"; break; }
                        case "5":
                            { n = "家具維修"; break; }
                        case "6":
                            { n = "清潔服務"; break; }
                        case "7":
                            { n = "油漆工程"; break; }
                        case "8":
                            { n = "其他維修"; break; }

                        default:
                            { break; }
                    }
                    return n;
                };
                $('.touchtable tbody tr').click(
                    function() {

                        var tcase_id = $(this).data('case_id');
                        (new case_show_case_page_E('case', 'show_case_page_E', 'body', tcase_id)).run();

                    });




            }
            else {
                var content = "";
                content += `<div class="container pt-3">
                <div class="row mt-4">
                    <div class="col-4">
                        <span class="h2">案件</span>
                    </div>
                    <div class="switch col-6">
                        <ul class="nav nav-tabs nav-justified bg-indigo">
                            <li class="nav-item">
                                <a class="nav-link active" data-toggle="tab" href="#Yet_Finish" role="tab">待完成</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#New" role="tab">新案件</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="row tab-content card mt-4" id="min-h">
                    <!--Panel 1-->
                    <div class="tab-pane fade in show active" id="Yet_Finish" role="tabpanel">
                        <table class="table table-striped text-center">
                            <thead>
                                <tr>
                                    <th scope="col" class="py-1 font-weight-bold h4">建案名稱 </th>
                                    <th scope="col" class="py-1 font-weight-bold h4">維修日期 </th>
                                    <th scope="col" class="py-1 font-weight-bold h4">維修事項</th>
                                    <th scope="col" class="py-1 font-weight-bold h4">維修進度</th>
                                </tr>
                            </thead>
                            
                        </table>
                    </div>
                    <!--/.Panel 1-->
                    <!--Panel 2-->
                    <div class="tab-pane fade" id="New" role="tabpanel">
                        <table class="table table-striped text-center">
                            <thead>
                                <tr>
                                    <th scope="col" class="py-1 font-weight-bold h4">報修類別</th>
                                    <th scope="col" class="py-1 font-weight-bold h4">待修情形</th>
                                    <th scope="col" class="py-1 font-weight-bold h4">建案名稱 </th>
                                    <th scope="col" class="py-1 font-weight-bold h4">戶號</th>
                                </tr>
                            </thead>
                            
                        </table>
                    </div>
                    <!--/.Panel 2-->
                </div>
            </div>
                                            `;




                $('#' + this.position_id).html(content);
                console.log(obj);

            }

        }
        catch (e) {
            var msg = e + "<br>";
            msg += "JSON String: " + json_str;
            $('#' + this.position_id).html(msg);
            console.log(msg);
        }

    }
    ajax_error(msg) {
        $('#' + this.position_id).html(msg.status);
        console.log(1);
    }

}


///
