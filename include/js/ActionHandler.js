class ActionHandler {
    constructor(module, js_action) {
        this.module = module;
        this.js_action = js_action;
        this.php_action = js_action;
        this.args = null;
        this.php = true;

        console.log(module, js_action);

    }
    // addArgsbyselect(){

    // }
    // addArgsbyid(id) {
    //     var value = $('#' + id).val();
    //     this.addArgs(id, value);
    // }
    addArgsbyid(data) {
        var value = $('#' + data).val();
        this.addArgs(data, value);
    }
    addArgsbyname(name) {
        var value = document.getElementsByName(name).value;
        this.addArgs(name, value);
    }
    addArgs(id, value) {
        if (this.args === null) {
            this.args = id + "=" + value;
        }
        else
            this.args += "&" + id + "=" + value;
    }
    run() {
        this.prepareArgs();
        if (!this.php) {
            // this.showResult();
            this.showResult(xhttp);
            return;
        }
        var self = this;
        var xhttp = new XMLHttpRequest();
        var where_statement = null;
        xhttp.onreadystatechange = function() {
            var ResponseText;
            if (this.readyState === 4 && this.status === 200) {
                self.ajax_success(xhttp);
            }
            else {
                self.ajax_error(xhttp);
            }
        };


        xhttp.open("POST", "module_dispatcher.php?module=" + this.module + "&action=" + this.php_action, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(this.args);
        /*
                                if (data != null) {
                                    this.prepareArgs(data);
                                }
                                else {
                                    this.prepareArgs();
                                }

                                if (!this.php) {
                                    this.showResult();
                                    return;
                                }

                                var parent = this;
                                parent.ajax({
                                    type: "POST",
                                    url: "module_dispatcher.php?module=" + this.module + "&action=" + this.php_action,
                                    data: this.args,
                                    success: function(json_str) { parent.ajax_success(json_str); },


                                    error: function(jqXHR) {
                                        parent.ajax_error(jqXHR);
                                    }
                                });
        */
    }
    loadScript(src, id) {
        var script = document.getElementById(id);
        if (script === null) {
            script = document.createElement("script");
            script.src = src;
            script.id = id;
            document.head.appendChild(script);
        }
        //return script;
    }
    loadModuleScript(module, action) {
        var id = module + "_" + action;
        var src = "/modules/" + module + "/js_action/" + id + ".js";
        this.loadScript(src, id);
        // console.log(src);
        //return this.loadScript(src, id);
    }
    show_dialog(title, body, footer){
        var dialog = `
                    <div class="modal fade" id="__modalDialog__" role="dialog">
                    <div class="modal-dialog">

                      <!-- Modal content-->
                      <div class="modal-content">
                        <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal">&times;</button>
                          <h4 class="modal-title" id="__modalTitle__">標題</h4>
                        </div>
                        <div class="modal-body" id="__modalBody__">訊息內文</div>
                        <div class="modal-footer" id="__modalFooter__">
                          <button type="button" class="btn btn-default" data-dismiss="modal">關閉</button>
                        </div>
                      </div>

                    </div>
                  </div>
                `;
        if($("#__modalDialog__").length==0){
            $('#'+this.position_id).append(dialog);
        }
        $('#__modalTitle__').html(title);
        $('#__modalBody__').html(body);
        $('#__modalFooter__').html(footer);
        $('#__modalDialog__').modal({show:true})
    }
}
