// initialize some variables for the chart
var canvas = $("#canvas")[0];
var ctx = canvas.getContext('2d');
var data = [45, 45, 45, 45, 45, 45, 45, 45];
var textData = ["Engage", "Gamify", "Introduce", "Curate", "Create", "Distribute", "Amplify", "Results"];
var sliceData = [
  {title: "Curate", description: "HR or CSR curates authentic employee-generated content and messaging shared by employees through portal to all social networks as brand advocates.", image: "/assets/images/icons/curate.svg"},
  {title: "Create", description: "Create short video content (AR and/or VR) about company CSR to blend with the employee-generated content about volunteering", image: "/assets/images/icons/create.svg"},
  {title: "Distribute", description: "Distribute content via the IMMINENT buying platform on social networks to highly targeted public audience identified through connected big data insights", image: "/assets/images/icons/distribute.svg"},
  {title: "Amplify", description: "IMMINENTamplify™ significantly boosts earned media empowering your employees to act as CSR Superfans, instantly sharing Company-prepared messages to their peers.", image: "/assets/images/icons/amplify.svg"},
  {title: "Check Real-Time Results", description: "All results available in real-time to entire C-Suite via cloud-based IMMINENTdashboard™.", image: "/assets/images/icons/results.svg"},
  {title: "Engage", description: "Employees join the IMMINENTengage™ CSR hub and link their social networks with one-click", image: "/assets/images/icons/engage.svg"},
  {title: "Gamify", description: "Integrate HR program administration and present employee incentives via gamification strategy", image: "/assets/images/icons/gamify.svg"},
  {title: "Introduce", description: "Introduce all cause partners and volunteer opportunities with video on the portal", image: "/assets/images/icons/introduce.svg"}
];
var color = "rgba(255,255,255,0.19)";
var altColor = "rgba(255,255,255,0.4)";
var center = [canvas.width / 2, canvas.height / 2];
var radius = Math.min(canvas.width, canvas.height) / 2;
var lastPosition = 0;
var total = 0;
var pieData = [];

var app = {
  init: function() {
    app.setup(app.draw);
  },
  setup: function(callback) {
    $('#canvas').mousemove(app.clickHandler);

    for (var i in data) {
      total += data[i];
    }
    lastPosition = (data[0] / total)/2;
    for (var i in data) {
      pieData[i] = [];
      pieData[i]['value'] = data[i];
      pieData[i]['krasa'] = color;
      pieData[i]['startAngle'] = 2 * Math.PI * lastPosition;
      pieData[i]['endAngle'] = 2 * Math.PI * (lastPosition + (data[i] / total));
      lastPosition += data[i] / total;
    }
    app.draw();
  },

  draw: function(slice) {
    var which = slice;
    if (!which && slice != 0) {
      which = 5;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;

    for (var i = 0; i < pieData.length; i++) {
      ctx.beginPath();
      ctx.moveTo(center[0], center[1]);
      ctx.arc(center[0], center[1], radius, pieData[i]['startAngle'], pieData[i]['endAngle'], false);
      ctx.closePath();
      if (which == i) {
        ctx.fillStyle = altColor;
      } else {
        ctx.fillStyle = color;
      }
      ctx.fill();
    }

    lastPosition = 22.5

    for(var i = 1; i < pieData.length+1; i++) {
      lastPosition += 45;
      app.radiantLine(center[0], center[1], 0, radius, lastPosition, 1, "rgba(255,255,255,0.5)");
    }

    app.hole();
  },

  hole: function() {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(canvas.width / 2, canvas.height / 2, 60, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
    app.text();
  },

  radiantLine: function(centerX,centerY,innerRadius,outerRadius,degrees,linewidth,color){
      var radians=degrees*Math.PI/180;
      var innerX = centerX + innerRadius * Math.cos(radians);
      var innerY = centerY + innerRadius * Math.sin(radians);
      var outerX = centerX + outerRadius * Math.cos(radians);
      var outerY = centerY + outerRadius * Math.sin(radians);

      ctx.beginPath();
      ctx.moveTo(innerX,innerY);
      ctx.lineTo(outerX,outerY);
      ctx.strokeStyle=color || "white";
      ctx.lineWidth=linewidth;
      ctx.stroke();
  },

  clickHandler: function(clickEvent) {
      var x = clickEvent.pageX - $(canvas).offset().left - canvas.width/2,
        y = clickEvent.pageY - $(canvas).offset().top - canvas.height/2,
        mAngle = Math.atan2(y, x);
    
      if (mAngle > -1 * Math.PI && mAngle < -0.5 * Math.PI) {
          mAngle = 2 * Math.PI + mAngle;
      }
      
      var percentage = (mAngle + Math.PI / 2) / 2 * Math.PI * 10;

      if(Math.round(percentage) > 92 || Math.round(percentage) <= 6 && lastPosition != 5) {
          app.draw(5);
          app.changeStuff(5);
          lastPosition = 5;
      }
      if(Math.round(percentage) > 6 && Math.round(percentage) <= 18 && lastPosition != 6) {
          app.draw(6);
          app.changeStuff(6);
          lastPosition = 6;
      }
      if(Math.round(percentage) > 18 && Math.round(percentage) <= 31 && lastPosition != 7) {
          app.draw(7);
          app.changeStuff(7);
          lastPosition = 7;
      }
      if(Math.round(percentage) > 31 && Math.round(percentage) <= 43 && lastPosition != 0) {
          app.draw(0);
          app.changeStuff(0);
          lastPosition = 0;
      }
      if(Math.round(percentage) > 43 && Math.round(percentage) <= 55 && lastPosition != 1) {
          app.draw(1);
          app.changeStuff(1);
          lastPosition = 1;
      }
      if(Math.round(percentage) > 55 && Math.round(percentage) <= 68 && lastPosition != 2) {
          app.draw(2);
          app.changeStuff(2);
          lastPosition = 2;
      }
      if(Math.round(percentage) > 68 && Math.round(percentage) <= 80 && lastPosition != 3) {
          app.draw(3);
          app.changeStuff(3);
          lastPosition = 3;
      }
      if(Math.round(percentage) > 80 && Math.round(percentage) <= 92 && lastPosition != 4) {
          app.draw(4);
          app.changeStuff(4);
          lastPosition = 4;
      }
  },

  changeStuff: function(slice) {

    if(slice < 5 && slice > 0)
      $('.sliceType').html("Out");
    else 
      $('.sliceType').html('Inside');

    $('.sliceInfo').fadeOut(function() {
      $('.loading').show();
      $(".how .sliceTitle").html(sliceData[slice].title);
      $(".how .sliceDescription").html(sliceData[slice].description);
      $(".how .sliceImage").attr("src",sliceData[slice].image);
      $(".how .sliceImage").load(function() {
        $('.sliceInfo').fadeIn();
        $('.loading').hide();
      });
    });
  },
  text: function() {
    var inner=app.getRadians(90);
    var outter=app.getRadians(200);

    lastPosition = 45*6;

    for(var i = 0; i < data.length; i++) {
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.font = "50px gothamBold";
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.textAlign = "center";
      ctx.fillText(i+1, inner[lastPosition].x, inner[lastPosition].y+17);
      ctx.font = "28px gothamLight";
      ctx.fillStyle = "rgba(255,255,255,1)";
      ctx.fillText(textData[i], outter[lastPosition].x, outter[lastPosition].y+5);
      
      lastPosition += 45;
      if(lastPosition >= 360)
        lastPosition = lastPosition - 360;
    }
  },
  getRadians: function(radius) {
    var points=[];
    for(var degree=0;degree<360;degree++){
        var radians = degree * Math.PI/180;
        var x = center[0] + radius * Math.cos(radians);
        var y = center[1] + radius * Math.sin(radians);
        points.push({x:x,y:y});
    }
    return points;
  }
}
setTimeout(function() {
  app.init();
}, 1000);