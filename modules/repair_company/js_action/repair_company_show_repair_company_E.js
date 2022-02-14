class repair_company_show_repair_company_E extends ActionHandler {
    constructor(module, action, position_id, repair_type_id) {
        super(module, action);
        this.position_id = position_id;
        this.repair_type_id = repair_type_id;
    }
    prepareArgs() {
        this.php = true;
        var value1 = $("select[name='select_repair_type']").val(); //抓select的值
        this.addArgs('repair_type', this.repair_type_id);
        this.addArgsbyid('repair_type_id');
        this.addArgs('repair_type_id', this.repair_type_id);
    }
    ajax_success(xhttp) {
        try {
            var json_str = xhttp.responseText;
            console.log(json_str);
            var obj = JSON.parse(json_str);
            if (obj['status_code'] == 0) {
                var ds = obj['repair_company'];
                console.log(obj);
                //this.loadModuleScript("home", "show_home_page_E");
                var content = "";
                content += `
                

                                <table class="table cssraindemo1 ">
                                <thead>
                                    <tr>
                                        <th scope="col" class="px-2 font30">廠商名稱</th>
                                        <th scope="col" class="pl-2 font30">廠商電話</th>
                                        <th scope="col" class="pl-2 font30">詳細</th>
                                    </thead>
                                    <tbody>`;
                for (var i = 0; i < ds.length; i++) {
                    content += `
                                        <tr id="tr` + i + `" data-id="` + ds[i]['id'] + `" data-address="` + ds[i]['address'] + `" data-contactor="` + ds[i]['contactor'] + `" data-name="` + ds[i]['name'] + `" data-phone="` + ds[i]['phone'] + `">
                                            <th class="pt-4 pl-3 font30">` + ds[i]['name'] + `</th>
                                            <td class="pt-4 font30">` + ds[i]['phone'] + `</td>
                                            <td >
                                                <div class="btn-group" role="group" aria-label="Basic example" id="company_data" data-id="` + ds[i]['id'] + `" data-address="` + ds[i]['address'] + `" data-contactor="` + ds[i]['contactor'] + `" data-name="` + ds[i]['name'] + `" data-phone="` + ds[i]['phone'] + `">
                                                    <a type="button"  class="btn bg-transparent p-2">
                                                        <i class="fa fa-file fa-lg text-dark"></i>
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    
                                `;
                }

                content += `
                                    </tbody>
                                </table>
                                <div id="dialoga" title="廠商詳細"></div>
                                
                                <div style="display:none" id="hid_com_id" ></div>
                `;
                $('#' + this.position_id).html(content);
                var repair_company_id;

                function incom_dialog(id, address, contector, name, phone) {

                    document.getElementById("dialoga").innerHTML = `
                                            <div class="col-md font30">
                                                <label for="Case"> 廠商名稱：</label>
                                                <span>` + name + `</span>
                                            </div>
                                            <div class="col-md font30">
                                                <label for="Case"> 聯絡人：</label>
                                                <span>` + contector + `</span>
                                            </div>
                                            <div class="col-md font30">
                                                <label for="Case">電話:</label>
                                                <span>` + phone + `</span>
                                            </div>
                                            <div class="col-md font30">
                                                <label for="Case"> 地址：</label>
                                                <span>` + address + `</span>
                                            </div>`;
                }

                $(document).ready(function() {
                    document.getElementById("hid_com_id").value = "no";
                    console.log( $("#dialoga"));
                    $("#dialoga")[0].dialog({
                        autoOpen: false,
                        height: 350,
                        width: 600,
                        modal: true,
                        buttons: {
                            Ok: function() {
                                $(this).dialog("close");
                            }
                        },
                        position: { my: "center", at: "left+500px top+900px ", of: window }

                    });


                    //-,滑動,點選 變色
                    // $('.cssraindemo1 tbody tr').hover(
                    //     function() { $(this).addClass('highlight'); },
                    //     function() { $(this).removeClass('highlight'); }
                    // );
                    $(".cssraindemo1 tbody #company_data").click(
                        function() {
                            incom_dialog($(this).data('id'), $(this).data('address'), $(this).data('contactor'), $(this).data('name'), $(this).data('phone'));


                            $("#dialoga").dialog("open");
                        }
                    );
                    $('.cssraindemo1 tbody tr').click(
                        function() {
                            $(this).toggleClass('selected');
                            repair_company_id = $(this).data('id');
                            document.getElementById("hid_com_id").value = repair_company_id;
                            // console.log('hid' + document.getElementById("hid_com_id").value);

                            //document.getElementById("company_data").onclick = (incom_dialog("'" + $(this).data('id') + "'", "'" + $(this).data('address') + "'", "'" + $(this).data('contector') + "'", "'" + $(this).data('name') + "'", "'" + $(this).data('phone') + "'"));
                        });
                    $('.cssraindemo1 tbody tr').click(
                        function() {
                            $(this).siblings().removeClass('selected');
                            $(this).addClass('selected');

                        }
                    );
                });
            }

            else {
                $('#' + this.position_id).html(obj['status_message']);
            }

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
