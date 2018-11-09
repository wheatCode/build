class news_show_insert_page_P extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs() {
        this.php = false;
    }

    showResult(xhttp) {
        var image64 = '';
        this.loadModuleScript("news", "do_insert_action_P");
        var content = `
        <div class="container">
             <div class="row m-0">
                 <div class="col-lg-10 col-md-8">
                    <div class="w-100 p-2  borderB">
                        <h1 class="bold">新增新聞</h1>
                    </div>
                    <br>
                    <div class="md-form my-0">
                        <input type="text" id="topic"  style="max-width:100%" class="form-control mb-0 pb-1" value="">
                        <label for="name">新聞標題</label>
                    </div>
                    <br>
                    <div class="md-form my-0">
                        <input type="text" id="content" style="max-width:100%" class="form-control mb-0 pb-1" value="">
                        <label for="contactor">新聞內容</label>
                    </div>
                    
                    <div class="col-12">
                            <div class="md-form row">
                                    <input type="file" id="progressbarTWInput" accept="image/gif, image/jpeg, image/png" multiple/ >
                                         <div id="preview_progressbarTW_imgs" style="width:100%; height: 300px; overflow:scroll;">
                                                   <p>目前沒有圖片</p>
                                         </div>
                            </div>
                            <div id="inimg" style="display:none"></div>
                    </div>
                    <br>
                <div class="text-center mt-2">
                    <button class="btn btn-outline-blue darken-4 waves-effect" type="button" onclick="(new news_do_insert_action_P('news','do_insert_action_P','body1')).run()">新增</button>
                </div>
            </div>
        </div>
    </div>`;
    
    
    

        $('#' + this.position_id).html(content);
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
    }
}