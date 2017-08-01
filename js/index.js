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

 var appState = {
    takingPicture: true,
    imageUri: ""
};

var APP_STORAGE_KEY = "exampleAppState";

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

        document.addEventListener('pause', this.onPause, false);
        document.addEventListener('resume', this.onResume, false);

    },


    onGetLogin: function() {
        var sesion = window.localStorage.getItem("login");
        if( sesion != null ){
            return JSON.parse( sesion  );
        }else{
            false
        }
    },

    onSetLogin: function(data) {
        window.localStorage.setItem("login", data);
    },

    onPause: function() {
        if(appState.takingPicture || appState.imageUri) {
            window.localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(appState));
        }
    },
    onResume: function(event) {
        var storedState = window.localStorage.getItem(APP_STORAGE_KEY);

        if(storedState) {
            appState = JSON.parse(storedState);
        }

        if(!appState.takingPicture && appState.imageUri) {
            jQuery("#img_portada div").css("background-image", "url("+appState.imageUri+")");
        } else if(appState.takingPicture && event.pendingResult) {
            if(event.pendingResult.pluginStatus === "OK") {
                cameraSuccessCallback(event.pendingResult.result);
            } else {
                cameraFailureCallback(event.pendingResult.result);
            }
        }
    },

    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();