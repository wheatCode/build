<?php
header('Content-type:text/html;charset=utf-8');
//轉換base64圖片 必須手動建一個img文檔夾
   define('UPLOAD_DIR', 'img/');
   $img = $_POST['src'];
   $imgtype=$_POST["imgtype"];
    var_dump($img);
    var_dump($imgtype);
//判斷圖片格式類型
   if($imgtype=="png"){

       $img = str_replace('data:image/png;base64,', '', $img);
   }

   if($imgtype=="jpg"){

       $img = str_replace('data:image/jpeg;base64,', '', $img);
   }


   $img = str_replace(' ', '+', $img);
   $data = base64_decode($img);
   
//判斷圖片格式類型
   if($imgtype=="png"){
       $imgurl = UPLOAD_DIR . uniqid(). '.png';

   } 


    if($imgtype=="jpg"){
           $imgurl = UPLOAD_DIR . uniqid(). '.jpg';
           
       } 

    echo $img;
   //把圖片寫入文檔中
   $success = file_put_contents($imgurl, $data);
?>