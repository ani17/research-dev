<?php
/**
 * stats.php
 *
 * Statistics Using Dynamic Multilevel Drill-down using HiCharts
 *
 * @category   R&D
 * @author     Anirudh Mathur
 * @link       http://jsfiddle.net/p2xw9416/, http://jsfiddle.net/phpdeveloperrahul/LjUaz/, http://jsfiddle.net/6zYmJ/1/
 * 
 * Note : For simplicity, this example shows drill-down option only for the first date : 2017-04-01
 *
 */
?>
<!DOCTYPE html>
<html>
	<body>
		<div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>

		<script src='//code.jquery.com/jquery-1.12.4.js'></script>
		<script src="http://github.highcharts.com/master/highcharts.js"></script>
		<script src="http://github.highcharts.com/master/modules/drilldown.js"></script>
		<script>

    	    $(document).ready(function() {
        		  chart = Highcharts.chart('container',{
                    chart: {
                        type: 'bar',
                        events: {
                            drilldown: function (e) {
                                    /*Dynamic drill*/
                                    if (!e.seriesOptions) {
                                        chart = this;
                                        
                                        var seldate =  (this.series[0].userOptions.nxtlvl == 'Movies') ? this.series[0].userOptions.seldate : e.point.name;
                                        var addParams =  (this.series[0].userOptions.nxtlvl == 'Movies') ? '&source='+e.point.name : '';

                                        chart.showLoading('Loading ...');

                                        $.ajax({url: "ajx.php?level="+this.series[0].userOptions.nxtlvl+"&date="+seldate+addParams, success: function(result){
                                                drilldowns = JSON.parse(result);
                                                series = drilldowns[e.point.name];

                                                setTimeout(function () {
                                                    chart.hideLoading();
                                                    chart.addSingleSeriesAsDrilldown(e.point, series);
                                                    chart.applyDrilldown();
                                                }, 1000);
                                        }});
                                       
                                  }
                                  /*Dynamic drill*/
                            }
                        }
                    },
                    title: {
                        text: 'Basic drilldown'
                    },
                    xAxis: {
                        type: 'category'
                    },
                    plotOptions: {
                        series: {
                            borderWidth: 1,
                            dataLabels: {
                                enabled: true,
                            }
                        }
                    },
                    series: [{
                        id: 'toplevel',
                        name: 'Bookings',
                        nxtlvl: 'Source',
                        data: [
                            {name: '2017-04-01', y: 154, drilldown: true},
                            {name: '2017-04-02', y: 139, drilldown: true},
                            {name: '2017-04-03', y: 72, drilldown: true},
                            {name: '2017-04-04', y: 73, drilldown: true},
                        ]
                    }]
                })
    		});
		</script>
	</body>
</html>