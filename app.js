var follows = ['Alienware', 'Blizzard', 'BruceGrannec', 'CohhCarnage', 'cretetion', 'EAMaddenNFL', 'ElegyofGames', 'ESL_SC2', 'FireBall1725', 'FreeCodeCamp', 'noobs2ninjas', 'OgamingSC2', 'resttpowered', 'RobotCaleb', 'storbeck'];
var panels = $(".panels");
var placeHolder = 'http://www.pieglobal.com/wp-content/uploads/2015/10/placeholder-user.png';
var offline = ['brunofin', 'comster404'];
var online = [];
var onLineButton = $("#online");
var offLineButton = $("#offline");
var fcc = $("#fcc");
var intro = $(".intro");
var fccUser = true;
var user = '';
var streamUrl = 'https://api.twitch.tv/kraken/streams/'
var userUrl = 'https://api.twitch.tv/kraken/users/'
$(function() {
    //display all online users on load
    for (var i = 0; i < follows.length; i++) {
        $.ajax({
            type: 'GET',
            url: streamUrl + follows[i],
            headers: {
                'Client-ID': 'st6lldhb71xn0r3v17erqj9d715fz3m'
            },
            success: function(data) {
                if (data.stream == null) {
                    //find username if user is not online
                    user = data._links['channel'].substr(38);
                    if (user === 'FreeCodeCamp') {
                        fccUser = false;
                    }
                    offline.push(user);
                } else {
                    user = data.stream.channel.display_name;
                    //if user is online push that data into online array
                    online.push(user);
                    var name = data.stream.channel.display_name;
                    var logo = data.stream.channel.logo;
                    var url = data.stream.channel.url;
                    var status = data.stream.channel.status;
                    panels.append("<div class='panel'><div class='img-wrapper'><img class='logo' src=" + logo + "></div><div class='title'><a href=" + url + " target='_blank'><h2 class='name'>" + name + "</h2></a></div><p class='status'>Status: " + status + "</p></div>");
                }

            }

        });
    }
    fcc.click(function() {
        intro.html('Free Code Camp');
        panels.html('');
        if (!fccUser) {
            $.ajax({
                type: 'GET',
                url: userUrl + 'freecodecamp',
                headers: {
                    'Client-ID': 'st6lldhb71xn0r3v17erqj9d715fz3m'
                },
                success: function(data) {
                    var name = data.display_name;
                    var logo = data.logo;
                    var url = 'https://www.twitch.tv/freecodecamp';
                    var status = 'offline';
                    panels.append("<div class='panel'><div class='img-wrapper'><img class='logo' src=" + logo + "></div><div class='title'><a href=" + url + " target='_blank'><h2 class='name'>" + name + "</h2></a></div><p class='status'>Status: " + status + "</p></div>");
                }
            });
        } else {
            $.ajax({
                type: 'GET',
                url: streamUrl + 'freecodecamp',
                headers: {
                    'Client-ID': 'st6lldhb71xn0r3v17erqj9d715fz3m'
                },
                success: function(data) {
                    var name = data.stream.channel.display_name;
                    var logo = data.stream.channel.logo;
                    var url = data.stream.channel.url;
                    var status = data.stream.channel.status;
                    panels.append("<div class='panel'><div class='img-wrapper'><img class='logo' src=" + logo + "></div><div class='title'><a href=" + url + " target='_blank'><h2 class='name'>" + name + "</h2></a></div><p class='status'>Status: " + status + "</p></div>");
                }

            });
        }
    })
    onLineButton.click(function() {
        intro.html('Online Users');
        panels.html('');
        for (var i = 0; i < online.length; i++) {
            $.ajax({
                type: 'GET',
                url: streamUrl + online[i],
                headers: {
                    'Client-ID': 'st6lldhb71xn0r3v17erqj9d715fz3m'
                },
                success: function(data) {
                    if (data.stream == null) {
                        offline.push(data._links['channel'].substr(38));
                    } else {
                        online.push(data.stream);
                        var name = data.stream.channel.display_name;
                        var logo = data.stream.channel.logo;
                        var url = data.stream.channel.url;
                        var status = data.stream.channel.status;
                        panels.append("<div class='panel'><div class='img-wrapper'><img class='logo' src=" + logo + "></div><div class='title'><a href=" + url + " target='_blank'><h2 class='name'>" + name + "</h2></a></div><p class='status'>Status: " + status + "</p></div>");
                    }

                }


            });
        }
    })
    offLineButton.click(function() {
        intro.html('Offline Users');
        panels.html('');
        var name = '';
        var logo = '';
        var url = '';
        var status = '';
        for (var i = 0; i < offline.length; i++) {
            $.ajax({
                type: 'GET',
                url: userUrl + offline[i],
                headers: {
                    'Client-ID': 'st6lldhb71xn0r3v17erqj9d715fz3m'
                },
                success: function(data) {
                    name = data.display_name;
                    logo = data.logo;
                    url = 'https://www.twitch.tv/' + data.display_name;
                    status = 'offline';
                    panels.append("<div class='panel'><div class='img-wrapper'><img class='logo' src=" + logo + "></div><div class='title'><a href=" + url + " target='_blank'><h2 class='name'>" + name + "</h2></a></div><p class='status'>Status: " + status + "</p></div>");

                },
                error: function(request, status, error) {
                    if (request.responseText.includes(offline[0])) {
                        name = offline[0];
                        logo = placeHolder;
                        status = 'offline'

                    } else if (request.responseText.includes(offline[1])) {
                        name = offline[1];
                        logo = placeHolder;
                        status = 'offline'
                    }
                    panels.append("<div class='panel'><div class='img-wrapper'><img class='logo' src=" + logo + "></div><div class='title'><a href=" + url + " target='_blank'><h2 class='name'>" + name + "</h2></a></div><p class='status'>Status: " + status + "</p></div>");

                },

            });


        }

    })
});
