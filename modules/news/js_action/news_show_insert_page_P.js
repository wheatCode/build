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
        var num=1;
        var getSrc='';
        var content = `
        <div class="container">
             <div class="row m-0">
                 <div class="col-lg-10 col-md-8">
                    <div class="w-100 p-2  borderB">
                        <h1 class="bold">新增新聞</h1>
                    </div>
                    <br>
                    <label for="title" style="color:#757575">新聞標籤</label>
                    <select class="mt-3 browser-default custom-select" id="title">
                            <option value="activities">好康活動</option>
                            <option value="latest">最新消息</option>
                            <option value="information">節慶資訊</option>
                    </select>
                    <br>                  
                    <div class="md-form my-0">
                        <input type="text" id="topic"  style="max-width:100%" class="form-control mb-0 pb-1" value="">
                        <label for="topic">新聞標題</label>
                    </div>
                    <br>
                    <div class="md-form" id="showInsertText">
                      <label for="form10">新聞內容</label>
                      <textarea type="text mr-0" style="max-width:100%" id="content${num}" class="md-textarea form-control" placeholder="第 ${num} 段" rows="10"></textarea>
                    </div>
                    <button class="rounded" id="insertText">+</button>
                    
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
                <div class="text-center mt-2" id="restNum">
                    <button class="btn btn-blue" id="demo">預覽</button>
                    <div id="showButton" style="display:inline-block!important">
                    <button class="btn btn-outline-danger darken-4 waves-effect" type="button" onclick="(new news_do_insert_action_P('news','do_insert_action_P','body1',${num})).run()">新增</button>
               </div>
                </div>
                <div id="showDemo"></div>
            </div>
        </div>
    </div>`;
    
    
    

        $('#' + this.position_id).html(content);
        $(document).ready(function() {
            $('#insertText').on('click',function() {
                num++;
                var data = `<textarea type="text mr-0" style="max-width:100%" id="content${num}" class="md-textarea form-control" placeholder="第 ${num} 段" rows="5"></textarea>
                    `;
                    $('#showInsertText').append(data);
                    $('#showButton').html(`<button class="btn btn-outline-danger darken-4 waves-effect" type="button" onclick="(new news_do_insert_action_P('news','do_insert_action_P','body1',${num})).run()">新增</button>
        `);
                    
                    
            })
            $('#demo').on('click',function() {
                        var b='';
                        var a=1;
                        for(var i=0;i<num;i++){
                            b+=`<p class="h5">`+$('#content'+a).val()+`</p><br><br>`;
                            a++;
                        }
                        console.log(b);
                var data = `<!-- Button trigger modal -->
                <button class="btn btn-blue font-weight-bold" data-toggle="modal" id="showHtml" data-target="#basicExampleModal" style="display:none">預覽網頁</button>
                <!-- Modal -->
                <div class="modal fade font-weight-bold" id="basicExampleModal" tabindex="-1" role="dialog">
                  <div class="modal-dialog modal-fluid" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title font-weight-bold" id="exampleModalLabel">網頁預覽</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                    <div class="container">
                        <div class="row">
                            <div class="offset-md-2 col-md-8">
                                <h1 class="text-center my-4 font-weight-bold">${$('#topic').val()}</h1>
                                <img class="w-100" src="${getSrc}" alt="">
                                <nav>
                                    <ol class="breadcrumb pl-0" style="background-color:transparent">
                                        <li class="breadcrumb-item"><a href="#">首頁</a></li>
                                        <li class="breadcrumb-item active">新聞</li>
                                    </ol>
                                </nav>
                                <h6><span class="font-weight-bold">發布時間 : 20XX-XX-XX </span>
                                </h6>
                                ${b}
                            </div>
                        </div>
                    </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-blue" data-dismiss="modal">關閉</button>
                      </div>
                    </div>
                  </div>
                </div>`;
                $('#showDemo').html(data);
                $("#showHtml").click();
            });
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
                            getSrc = src;
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