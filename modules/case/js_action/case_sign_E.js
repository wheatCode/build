class case_sign_E extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs() {
        this.php = true;
        //this.addArgs('repair_type', this.repair_type_id);
        //this.addArgsbyid('repair_type_id');
        //this.addArgs('repair_type_id', this.repair_type_id);
    }
    ajax_success(xhttp) {
        try {
            var doc = new jsPDF();
            var json_str = xhttp.responseText;
            console.log(json_str);
            var obj = JSON.parse(json_str);
            if (obj['status_code'] == 0) {
                var ds = obj['repair_company'];
                console.log(obj);
                //this.loadModuleScript("home", "show_home_page_E");
                var content = "";
                content += `
                <div id="sign_area">
                <div class="ml-3">客戶簽名</div>
                    
                        <div id="canvasDiv">
                        
                        </div>
                        <canvas id="canvas"></canvas>
                        
                            <br>
 
                            <button type="button" class="btn btn-danger font30"id="btn_clear">清除</button>
                        
                            <button type="button" class="btn btn-indigo font30" id="btn_submit">完成案件</button>
                            
                            <img id="qmimg" />
                            <div id="pdf"></div>
                </div>
                `;
                $('#' + this.position_id).html(content);
                this.loadModuleScript("case", "do_unfinish_E");

                var canvasDiv = document.getElementById('canvasDiv');
                //var canvasDiv1 = document.getElementById('canvasDiv1');
                var canvas = document.getElementById('canvas');
                //var canvas = document.createElement('canvas');
                var screenwidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;


                //var canvasWidth = $("#sign_penal").width();
                var canvasWidth = screenwidth;
                //var canvasWidth = 800;
                var canvasHeight = 320;


                document.body.addEventListener("touchstart", function(e) {
                    if (e.target == canvas) {
                        e.preventDefault();
                    }
                }, false);
                document.body.addEventListener("touchend", function(e) {
                    if (e.target == canvas) {
                        e.preventDefault();
                    }
                }, false);
                document.body.addEventListener("touchmove", function(e) {
                    if (e.target == canvas) {
                        e.preventDefault();
                    }
                }, false);


                //document.addEventListener('touchmove', onDocumentTouchMove, false);
                var point = {};
                point.notFirst = false;
                canvas.setAttribute('width', canvasWidth);
                canvas.setAttribute('height', canvasHeight);
                //canvas.setAttribute('id', 'canvas');
                //canvasDiv.appendChild(canvas);
                //canvasDiv1.appendChild(canvas);
                if (typeof G_vmlCanvasManager != 'undefined') {
                    canvas = G_vmlCanvasManager.initElement(canvas);
                }
                var context = canvas.getContext("2d");



                /*var ptrn = context.createPattern(img, 'no-repeat');
                context.fillStyle = ptrn;
                context.fillRect(0, 0, canvas.width, canvas.height);
                */

                // var img = new Image();
                // img.src = "Transparent.png";

                // img.onload = function() {
                //     var ptrn = context.createPattern(img, 'repeat');
                //     context.fillStyle = ptrn;
                //     context.fillRect(0, 0, canvas.width, canvas.height);
                // }

                canvas.addEventListener("touchstart", function(e) {
                    //console.log(e);
                    e.preventDefault();
                    var mouseX = e.touches[0].pageX - this.offsetLeft;
                    var mouseY = e.touches[0].pageY - this.offsetTop;
                    paint = true;
                    addClick(e.touches[0].pageX - this.offsetLeft, e.touches[0].pageY - this.offsetTop);
                    //console.log(e.touches[0].pageX - this.offsetLeft, e.touches[0].pageY - this.offsetTop);
                    redraw();
                });
                canvas.addEventListener("touchend", function(e) {
                    //console.log("touch end");
                    paint = false;
                });
                canvas.addEventListener("touchmove", function(e) {
                    e.preventDefault();
                    if (paint) {

                        $("#canvas").bind("wheel mousewheel", function(e) { e.preventDefault() });
                        //console.log("touchmove");
                        addClick(e.touches[0].pageX - this.offsetLeft, e.touches[0].pageY - this.offsetTop, true);
                        //console.log(e.touches[0].pageX - this.offsetLeft, e.touches[0].pageY - this.offsetTop);
                        redraw();
                    }

                });
                canvas.addEventListener("mousedown", function(e) {
                    var mouseX = e.pageX - this.offsetLeft;
                    var mouseY = e.pageY - this.offsetTop;
                    paint = true;
                    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
                    redraw();
                });
                canvas.addEventListener("mousemove", function(e) {
                    if (paint) {
                        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
                        redraw();
                    }
                });
                canvas.addEventListener("mouseup", function(e) {
                    paint = false;
                });
                canvas.addEventListener("mouseleave", function(e) {
                    paint = false;
                });


                document.getElementById("btn_clear").addEventListener("click", function() {
                    canvas.width = canvas.width;

                });
                document.getElementById("btn_submit").addEventListener("click", function() {
                    //$("#qmimg").attr("src", canvas.toDataURL("image/png"));
                    var image = canvas.toDataURL("image/jpg");
                    //base64.encode();
                    var specialElementHandlers = {
                        '#editor': function(element, renderer) {
                            return true;
                        }
                    };
                    // doc.fromHTML($('#body').html(), 15, 15, {
                    //     'width': screenwidth,
                    //     'elementHandlers': specialElementHandlers
                    // });
                    //doc.addImage(image, 'JPEG', 0, 0, canvas.width, canvas.height);
                    //doc.addImage(image, 'JPEG', 0, 0);
                    //doc.save('test.pdf');
                    $("#pdf").val(image);
                    (new case_do_unfinish_E('case', 'do_unfinish_E', 'unfinish_err', $("#case_id").data("value"), 'finish')).run();
                });


                function onDocumentTouchStart(event) {
                    if (event.touches.length == 1) {
                        event.preventDefault();
                        // Faking double click for touch devices
                        var now = new Date().getTime();
                        if (now - timeOfLastTouch < 250) {
                            reset();
                            return;
                        }
                        timeOfLastTouch = now;
                        mouseX = event.touches[0].pageX;
                        mouseY = event.touches[0].pageY;
                        isMouseDown = true;

                    }

                }

                function onDocumentTouchMove(event) {

                    if (event.touches.length == 1) {
                        event.preventDefault();
                        mouseX = event.touches[0].pageX;
                        mouseY = event.touches[0].pageY;
                    }
                }

                function onDocumentTouchEnd(event) {
                    if (event.touches.length == 0) {
                        event.preventDefault();
                        isMouseDown = false;
                    }
                }


                var clickX = new Array();
                var clickY = new Array();
                var clickDrag = new Array();
                var paint;

                function addClick(x, y, dragging) {
                    clickX.push(x);
                    clickY.push(y);
                    clickDrag.push(dragging);
                }



                function redraw() { //canvas.width = canvas.width; // Clears the canvas
                    context.strokeStyle = "#222222"; //df4b26
                    context.lineJoin = "round";
                    context.lineWidth = 4;
                    while (clickX.length > 0) {
                        point.bx = point.x;
                        point.by = point.y;
                        point.x = clickX.pop();
                        point.y = clickY.pop();
                        point.drag = clickDrag.pop();
                        context.beginPath();
                        if (point.drag && point.notFirst) {
                            context.moveTo(point.bx, point.by);
                        }
                        else {
                            point.notFirst = true;
                            context.moveTo(point.x - 1, point.y);
                        }
                        context.lineTo(point.x, point.y);
                        context.closePath();
                        context.stroke();
                    }
                }
                // Prevent scrolling when touching the canvas

                $(document).ready(function() {
                    // $("canvas").bind("wheel mousewheel", function(e) { e.preventDefault() });
                    // $("#canvas").bind("wheel mousewheel", function(e) { e.preventDefault() });
                    // $("#sign_area").bind("wheel mousewheel", function(e) { e.preventDefault() });
                    // $("#do_sign").click(function() {
                    //     $("#signdiv").dialog("open");

                    // });
                    // $("#signdiv").dialog({
                    //     autoOpen: false,
                    //     height: 600,
                    //     width: 800,
                    //     modal: true,
                    //     buttons: {
                    //         Ok: function() {
                    //             $(this).dialog("close");
                    //         }
                    //     },
                    //     position: { my: "center", at: "left+500px top+900px ", of: window }

                    // });
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
