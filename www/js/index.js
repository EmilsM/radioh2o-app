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
 
$( document ).ready(function() {
	
	
	//$.ajax({
      //     type: "GET",
        //   url: "http://radioh2o.lv/player/nowplaying.json",
          // success: function(data)
           //{
				 $(".button.list").click(function() {
					$("#songList").show();
				});
				
				$("#songList .close").click(function() {
					$("#songList").hide();
				});
					
				
				refreshSongList();
				setInterval(refreshSongList, 15000);
				
				var myaudio = new Audio('http://live.radioh2o.lv:8080/RadioH2O_hq_mp3');
				myaudio.id = 'RadioH2O';
				
				$(".jp-play").click(function() {
					try {
						myaudio.play();
					} catch (e) {
						alert('tavam telefonam nav iespējota straumēšana!');
					}
					$(this).hide();
					$(".jp-pause").css("display", "block");
				});
				
				$(".jp-pause").click(function() {
					try {
						myaudio.pause();
					} catch (e) {
						alert('neizdevās!');
					}
					$(this).hide();
					$(".jp-play").css("display", "block");
				});
				
				
					
				$("#overlay").hide();
      //     },
		//   error: function(data)
		//   {
				return;
	//	   }
    //     });
});

function refreshSongList() {
	$.getJSON("http://radioh2o.lv/player/nowplaying.json", function( data ) {
	var items = [];
	var i = 1;
	$("#songList ul").html("");
	  $.each( data, function( key, val ) {
		if(i <= 9) {
			if(i == 1) {
				$("#nowplaying .title").text(val["artist"]);
				$("#nowplaying .name").text(val["title"]);
			}
			else {
				var songlist = $("#songList ul");
				var html = songlist.html();
				var date = new Date(val["date_played"] * 1000);
				songlist.html(html + "<li><h2>" + val["artist"] + "</h2><p>" + val["title"] + "</p><span>" + date.getHours() + ":" + date.getMinutes() + "</li>");
			}
		i++;
		}
	  });
	});
}