(function () {
  "use strict"

  require.config({
    shim: {
      "jquery": ["lib/jquery"]
    }
  })

}())

define("stats", [
  "jquery"
], function() {
    "use strict"
    $.ajax({
        url: "nodes.json",
        dataType: "json"
    }).done(function(jsondata) {
        jsondata = jsondata.nodes

        var routers = {}
        for (var node in jsondata) {
            if (routers.hasOwnProperty(jsondata[node].hardware))
                routers[jsondata[node].hardware] += 1
            else
                routers[jsondata[node].hardware] = 1
        }

        var firmwares = {}
        for (var node in jsondata) {
            if (firmwares.hasOwnProperty(jsondata[node].firmware))
                firmwares[jsondata[node].firmware] += 1
            else
                firmwares[jsondata[node].firmware] = 1
        }

        google.load("visualization", "1", {packages: ["corechart"], callback: drawHardware})
        google.load("visualization", "1", {packages: ["corechart"], callback: drawFirmwares})

        var datalist = []
        datalist.push(["Modell", "Anzahl"])

        for (var router in routers) {
            datalist.push([router, routers[router]])
        }

        var firmwarestats = []
        firmwarestats.push(["Firmware", "Anzahl"])
        for (var firmware in firmwares) {
            firmwarestats.push([firmware, firmwares[firmware]])
        }

        function drawHardware() {
            var data = google.visualization.arrayToDataTable(datalist)
            var options = {
                title: "Routerstatistik",
                vAxis: {titleTextStyle: {color: "red"}},
                chartArea: {width: "50%"}
            }
            var chart = new google.visualization.BarChart(document.getElementById("chart_div"))
            chart.draw(data, options)
        }

        function drawFirmwares() {
            var data = google.visualization.arrayToDataTable(firmwarestats)
            var options = {
                title: "Frimwarestatistik",
                vAxis: {titleTextStyle: {color: "red"}}
            }
            var chart = new google.visualization.BarChart(document.getElementById("chart_div2"))
            chart.draw(data, options)
        }
    })
})
