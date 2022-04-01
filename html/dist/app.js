 //Location Icon Color Change on page load function
 function updLStat(locid) {
     var color = "";
     var colorG = "green";
     var colorR = "red";
     var colorY = "rgba(165, 165, 44, 0.966)";

     $.ajax({
         url: "http://localhost/sensetalk/api/api.php?service=statChange&locid=" + locid,
         type: "GET",
         dataType: "json",
         success: function(data) {
             console.log(data["response"]);
             // jQuery.each(data["response"], function(j, lval) {

             // console.log(lval);
             if (data["response"]["stat"] == "2") {
                 color = colorG;

             } else if (data["response"]["stat"] == "0") {
                 color = colorR;
             } else if (data["response"]["stat"] == "1") {
                 color = colorY;
             }



             // });
             var locIcon = '<span style = "float: right;color:' + color + '"><i class="fa fa-check-circle" ></i></span>';

             $(".locIcon" + data["response"]["locid"]).empty().append(locIcon);

             // Indication

         },

     });

     $.ajax({
         url: "http://localhost/sensetalk/api/api.php?service=assets&loc_id=" + locid,
         type: "GET",
         dataType: "json",
         success: function(data) {
             console.log(data);
             jQuery.each(data, function(i, val) {
                 console.log(val);
                 if (val['asset_stat'] == "0") {
                     color = colorR;
                 } else if (val['asset_stat'] == "1") {
                     color = colorY;
                 } else if (val['asset_stat'] == "2") {
                     color = colorG;
                 }
                 var assetIcon = '<span style="float: right; padding: 9px 0px 9px 0px;color:' + color + '" ><i class="fa fa-check-circle" ></i></span>';

                 $('.assetIcon' + val["asset_id"]).empty().append(assetIcon);
             })




         },

     });




 }

 //Location and assets loading on page load
 function loadSidebar() {
     $.ajax({
         url: "http://localhost/sensetalk/api/api.php?service=location",
         type: "GET",
         dataType: "json",
         success: function(data) {
             console.log(data);
             jQuery.each(data, function(i, val) {
                 var loc = "";
                 var asset = "";
                 var astgrp = "";
                 var loc = '<li>' +
                     '                            <a href="#submenu' + data[i]["loc_id"] + '" data-bs-toggle="collapse" class="nav-link px-0 align-middle a_menu_style ">' +
                     '                                <i class="fs-4 bi-speedometer2"></i> <span class="ms-1 d-none d-sm-inline " style="color:grey">' + data[i]["loc_name"] + '' +
                     '                                </span> <div class="locIcon' + data[i]["loc_id"] + '" style="display:inline-flex"></div></a>' +
                     '                            <ul class="collapse  nav flex-column ms-1" id="submenu' + data[i]["loc_id"] + '" data-bs-parent="#menu">';
                 var locid = data[i]["loc_id"];
                 $.ajax({
                         url: "http://localhost/sensetalk/api/api.php?service=assets&loc_id=" + data[i]['loc_id'],
                         type: "GET",
                         dataType: "json",
                         success: function(data) {
                             console.log(data);
                             jQuery.each(data, function(j, astVal) {

                                 asset = '<li class="w-100">' +
                                     '                                    <a href="#" class="nav-link px-0 assetid locid' + locid + '" id="' + data[j]["asset_id"] + '"> ' +
                                     '<span class="d-none d-sm-inline">' + data[j]["asset_name"] +
                                     '<div class="assetIcon' + data[j]['asset_id'] + '" style="display: inline-flex; padding-left:5px"></div>' +
                                     ' </a>' +
                                     '                                </li>';



                                 astgrp += asset;
                             });

                             loc = loc + astgrp;
                             loc = loc + '</ul></li>';
                             $("#nav_loc").append(loc);
                         },
                     })
                     .done(function() {
                         updLStat(locid);

                     })

             });

         }
     });
 }

 // jQuery default ready function
 $(document).ready(function() {
     //Stomp client URL for websocket
     var client = Stomp.client('ws://localhost:15674/ws'); // change url to your own

     // Subscribe to the topic
     var on_connect = function(x) {
         id = client.subscribe("/topic/sensetalk ", function(d) {
             // console.log(d.body);
         });
     };

     // Publish to the topic
     function SendPing(locId, msg) {

         // var msg = "test";
         var msg = "{\"Locid\":\"" + locId + "\",\"data\":\"" + msg + "\"}";
         client.send("/topic/sensetalk ", {
             "content-type ": "application/json"
         }, msg);
     };

     // error trigger for stomp
     var on_error = function() {
         console.log('error');
     };

     // Connect to the stomp server
     client.connect('guest', 'guest', on_connect, on_error, '/'); // change username and password to your own



     // Change Icon color for location and Asset using assetID
     function updLStatA(assetid) {
         var a = $('a#' + assetid).attr('class');
         var loc = a.split(' ');
         var loc = loc[3].replace('locid', '');
         var color = "";
         var colorG = "green";
         var colorR = "red";
         var colorY = "rgba(165, 165, 44, 0.966)";

         $.ajax({
             url: "http://localhost/sensetalk/api/api.php?service=statChange&locid=" + loc,
             type: "GET",
             dataType: "json",
             success: function(data) {
                 console.log(data["response"]);

                 if (data["response"]["stat"] == "2") {
                     color = colorG;

                 } else if (data["response"]["stat"] == "0") {
                     color = colorR;
                 } else if (data["response"]["stat"] == "1") {
                     color = colorY;
                 }

                 var locIcon = '<span style = "float: right;color:' + color + '"><i class="fa fa-check-circle" ></i></span>';

                 $(".locIcon" + data["response"]["locid"]).html(locIcon);
                 SendPing(data["response"]["locid"], data["response"]["stat"]);


             },

         }).done(function() {
             $.ajax({
                 url: "http://localhost/sensetalk/api/api.php?service=assetsingle&ast_id=" + assetid,
                 type: "GET",
                 dataType: "json",
                 success: function(data) {
                     console.log("test Asset: " + data[0]["asset_stat"])
                     console.log(data);
                     var color = "";
                     var colorG = "green";
                     var colorR = "red";
                     var colorY = "rgba(165, 165, 44, 0.966)";
                     var colorGr = "grey";

                     if (data[0]["asset_stat"] == "2") {
                         color = colorG;
                     } else if (data[0]["asset_stat"] == "0") {
                         color = colorR;
                     } else if (data[0]["asset_stat"] == "1") {
                         color = colorY;
                     } else if (data[0]["asset_stat"] == "3") {
                         color = colorGr;
                     }

                     var assetIcon = '<span style="float: right; padding: 9px 0px 9px 0px;color:' + color + '" ><i class="fa fa-check-circle" ></i></span>';

                     $('.assetIcon' + assetid).html(assetIcon);


                 },
             })
         });





     }
     loadSidebar();

     $(document).on('click', '.assetid', function() {
         var asset_id = $(this).attr('id');
         var green = "green";
         var red = "red";
         var grey = "grey";
         var yellow = "rgba(165, 165, 44, 0.966)";

         console.log(asset_id);
         $.ajax({
             url: "http://localhost/sensetalk/api/api.php?service=assetval&ast_id=" + asset_id,
             type: "GET",
             dataType: "json",
             success: function(data) {
                 console.log(data);


                 var val = '<div class="col py-3" style="padding-left:250px;padding-top:80px  !important">' +
                     '                <h5 class="card-title">' + data[0]["asset_name"] + '</h5>' +
                     '                <h6 class="card-subtitle mb-2 text-muted">Good Condition</h6>' +
                     '                <div class="row">' +
                     '                    <div class="col-md-6">' +
                     '                        <div class="card cardTemp">' +
                     '                            <div class="head" style="display:inline-flex"><h5 class="card-title"><i class="fa fa-thermometer-empty tempIcon" style="color:green"></i>  Temperature </h5>' +
                     // '<div class = "form-check form-switch" style="padding-left:50px;padding-top:3px;"><input class="form-check-input tempSwitch" type="checkbox" id="flexSwitchCheckChecked" ></div>'+
                     '</div>' +
                     '                            <p class="card-body">' +
                     '                            <div class="slidecontainer slidecontainerTemp" align="center">' +
                     '                               <input type="range" min="0" max="2" value="' + data[0]["temp"] + '" class="slider temprange" id="myRange" >' +
                     '                                 <div class="rw ">' +
                     '                                   <div class="cl-md-4 Rchild ">' +
                     '                                         <p>Fault</p>' +
                     '                                   </div>' +
                     '                                  <div class="cl-md-4 Rchild">' +
                     '                                         <p>Okay</p>' +
                     '                                  </div>' +
                     '                                  <div class="cl-md-4 Rchild">' +
                     '                                         <p>Good</p>' +
                     '                                   </div>' +
                     '                               </div>' +
                     '                            </div>' +
                     '                            </p>' +
                     '                        </div>' +
                     '                    </div>' +
                     '                    <div class="col-md-6">' +
                     '                        <div class="card">' +
                     '                            <h5 class="card-title"><i class="fa fa-bolt powerIcon" style="color:rgba(165, 165, 44, 0.966)"></i>  Power</h5>' +
                     '                            <p class="card-body">' +
                     '                             <div class="slidecontainer" align="center">' +
                     '                               <input type="range" min="0" max="2" value="' + data[0]["power"] + '" class="slider powrange" id="myRange" >' +
                     '                                 <div class="rw ">' +
                     '                                   <div class="cl-md-4 Rchild">' +
                     '                                         <p>Fault</p>' +
                     '                                   </div>' +
                     '                                  <div class="cl-md-4 Rchild">' +
                     '                                         <p>Okay</p>' +
                     '                                  </div>' +
                     '                                  <div class="cl-md-4 Rchild">' +
                     '                                         <p>Good</p>' +
                     '                                   </div>' +
                     '                               </div>' +
                     '                            </div>' +
                     '                            </p>' +
                     '                        </div>' +
                     '                    </div>' +
                     '                    <div class="col-md-6">' +
                     '                        <div class="card">' +
                     '                            <h5 class="card-title"><i class="fa fa-bullseye vibrationIcon" style="color:grey"></i>  Vibration</h5>' +
                     '                            <p class="card-body">' +
                     '                            <div class = "slidecontainer" align="center"> ' +
                     '                               <input type="range" min="0" max="2" value="' + data[0]["vibration"] + '" class="slider vibrange" id="myRange" >' +
                     '                                 <div class="rw ">' +
                     '                                   <div class="cl-md-4 Rchild">' +
                     '                                         <p>Fault</p>' +
                     '                                   </div>' +
                     '                                  <div class="cl-md-4 Rchild">' +
                     '                                         <p>Okay</p>' +
                     '                                  </div>' +
                     '                                  <div class="cl-md-4 Rchild">' +
                     '                                         <p>Good</p>' +
                     '                                   </div>' +
                     '                               </div>' +
                     '                            </div>' +
                     '                            </p>' +
                     '                        </div>' +
                     '' +
                     '                    </div>' +
                     '                    <div class="col-md-6">' +
                     '                        <div class="card">' +
                     '                            <h5 class="card-title"><i class="fa fa-circle-o-notch rpmIcon" style="color:red"></i>  RPM</h5>' +
                     '                            <p class="card-body">' +
                     '                            <div class = "slidecontainer" align="center" > ' +
                     '                               <input type="range" min="0" max="2" value="' + data[0]["rpm"] + '" class="slider rpmrange" id="myRange" >' +
                     '                                 <div class="rw ">' +
                     '                                   <div class="cl-md-4 Rchild">' +
                     '                                         <p>Fault</p>' +
                     '                                   </div>' +
                     '                                  <div class="cl-md-4 Rchild">' +
                     '                                         <p>Okay</p>' +
                     '                                  </div>' +
                     '                                  <div class="cl-md-4 Rchild">' +
                     '                                         <p>Good</p>' +
                     '                                   </div>' +
                     '                               </div>' +
                     '                            </div>' +
                     '                            </p>' +
                     '                        </div>' +
                     '' +
                     '                    </div>' +
                     '                </div>' +
                     '' +
                     '' +
                     '' +
                     '' +
                     '' +
                     '            </div>';

                 $("#asset_val").html(val);


             },
             error: function(val) {
                 console.log(val);
             }
         }).done(function() {
             console.log("success");
             var ChangedValue;
             $(".temprange").change(function() {
                 var value = $(this).val();
                 ChangedValue = value;
                 $('.cardTemp').css("background-color", "#fff");
                 $('.slidecontainerTemp').css('pointer-events', "auto");
                 console.log("Asset ID: " + asset_id + " Temperature: " + value);
                 if (value == 0) {
                     $(".tempIcon").css("color", red);
                 } else if (value == 1) {
                     $(".tempIcon").css("color", yellow);
                 } else if (value == 2) {
                     $(".tempIcon").css("color", green);
                 } else if (value == 3) {
                     $(".tempIcon").css("color", grey);
                 }

                 $.ajax({
                     url: "http://localhost/sensetalk/api/api.php?service=valchange&ast_id=" + asset_id + "&evnt=temp&val=" + value,
                     type: "GET",
                     dataType: "json",
                     success: function(data) {

                         console.log(data);

                     }
                 }).done(function() {
                     updLStatA(asset_id);

                 });
             });

             $(".vibrange").change(function() {
                 var value = $(this).val();
                 console.log("Asset ID: " + asset_id + " Vibration: " + value);
                 if (value == 0) {
                     $(".vibrationIcon").css("color", red);
                 } else if (value == 1) {
                     $(".vibrationIcon").css("color", yellow);
                 } else if (value == 2) {
                     $(".vibrationIcon").css("color", green);
                 } else if (value == 3) {
                     $(".vibrationIcon").css("color", grey);
                 }
                 $.ajax({
                     url: "http://localhost/sensetalk/api/api.php?service=valchange&ast_id=" + asset_id + "&evnt=vibration&val=" + value,
                     type: "GET",
                     dataType: "json",
                     success: function(data) {
                         updLStatA(asset_id);

                     }
                 })
             });
             $(".powrange").change(function() {
                 var value = $(this).val();
                 console.log("Asset ID: " + asset_id + " Power: " + value);
                 if (value == 0) {
                     $(".powerIcon").css("color", red);
                 } else if (value == 1) {
                     $(".powerIcon").css("color", yellow);
                 } else if (value == 2) {
                     $(".powerIcon").css("color", green);
                 } else if (value == 3) {
                     $(".powerIcon").css("color", grey);
                 }
                 $.ajax({
                     url: "http://localhost/sensetalk/api/api.php?service=valchange&ast_id=" + asset_id + "&evnt=power&val=" + value,
                     type: "GET",
                     dataType: "json",
                     success: function(data) {
                         updLStatA(asset_id);
                     }
                 })
             });
             $(".rpmrange").change(function() {
                 var value = $(this).val();
                 console.log("Asset ID: " + asset_id + " RPM: " + value);
                 if (value == 0) {
                     $(".rpmIcon").css("color", red);
                 } else if (value == 1) {
                     $(".rpmIcon").css("color", yellow);
                 } else if (value == 2) {
                     $(".rpmIcon").css("color", green);
                 } else if (value == 3) {
                     $(".rpmIcon").css("color", grey);
                 }

                 $.ajax({
                     url: "http://localhost/sensetalk/api/api.php?service=valchange&ast_id=" + asset_id + "&evnt=rpm&val=" + value,
                     type: "GET",
                     dataType: "json",
                     success: function(data) {
                         updLStatA(asset_id);
                     }
                 })


             });

         });
     });



 });