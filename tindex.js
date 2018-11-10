/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function () {
        document.getElementById('image-picker-btn').addEventListener("click", imagePicker);
        document.getElementById('camera-btn').addEventListener("click", camera);
        document.getElementById('push-notification-btn').addEventListener("click", pushNotification);
        window.FirebasePlugin.getToken(function(token) {
            document.getElementById('device-token').value = token;
        }, function(error) {
            console.error(error);
        });
        window.FirebasePlugin.onNotificationOpen(function (notification) {
            alert(notification.title);
            alert(notification.body);
        }, function (error) {
            console.error(error);
        });
    }
};

app.initialize();

function imagePicker() {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        targetWidth: 300,
        targetHeight: 300
    });
}
$(document).on('click', '#incambut', function() {
					camera();
                    });
//$(document).on('click', '#inimgbut', function() {
//					imagePicker();
 //                   });
//$(document).ready(function() {
//	document.getElementById('inbut').addEventListener("click",camera);
//});

function camera() {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        targetWidth: 300,
        targetHeight: 300
    });
}

function onSuccess(imageURL) {
    var image = document.getElementById('picker-image');
	$("#progressbarTWInput").val(imageURL);
	console.log(imageURL);
    image.src = imageURL;
}

function onFail(message) {
    alert('Failed because: ' + message);
}

function pushNotification() {
    var token = document.getElementById('device-token').value;
    var notificationTitle = document.getElementById('notification-title').value;
    var notificationMessage = document.getElementById('notification-message').value;
    $.ajax({
        url: "https://fcm.googleapis.com/fcm/send",
        method: "POST",
        contentType: 'application/json',
        dataType: 'json',
        headers: {
            Authorization: 'key=AAAARqVLjFg:APA91bH1cq5dtrRfydxZ2r7ThNXKd-KmfkuM3-PkX5ZDRAT3UBF6mIkWFllnVKRG_5cEpjGGUb8S40zqcja32_voc3YGo2pJm1inA-RHmRi4HKhcIA0QjUwm7Y3mJfChi6IdCMrhnvUD'
        },
        data: JSON.stringify({
            to: token,
            data: {
              title: notificationTitle,
              body: notificationMessage
            },
            notification: {
                title: notificationTitle,
                body: notificationMessage
            }
        })
    })
    .done(function(response) {
        alert('發送成功');
    })
    .fail(function () {
        alert('發送失敗');
    });
}