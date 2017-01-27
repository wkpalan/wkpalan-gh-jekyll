$(document).ready(function($) {
	google.setOnLoadCallback(drawChart);

	function drawChart(){
		var quality_lines = $("#fastq_txt").val().split("\n");
		var data = new google.visualization.DataTable();
		data.addColumn('number',"Pos")
		data.addColumn('number',"Qual")
		quals = quality_lines[3]
		quals_ascii = Array();
		for(var i=0; i<quals.length;i++){
			data.addRow([i+1,quals.charCodeAt(i)-64])
			quals_ascii.push([i,quals.charCodeAt(i)-64])
		}
		//console.log(data);
		var options = {
			chart:{
				title: 'Pos vs Quality',
				subtitle: 'in millions of dollars (USD)'
			},
			hAxis:{
				title: 'Position'
			},
			vAxis:{
				title: 'Quality value',
				max:60,
				min:0
			},
			vAxes: {0:
				{viewWindowMode:'explicit',
	                		viewWindow:{
						max:60,
						min:0
		                          }
				}
			},
			width: 600,
			height: 500
		};
		//console.log(document.getElementById("chart_div"))
		var chart = new google.visualization.LineChart(document.getElementById("chart_div"));
		//console.log(chart);
		chart.draw(data, options);
		$("#ascii_code").val(quals_ascii.join("\n"))
	}
	$("#draw_plot_btn").click(function(){
		drawChart();
	})

});
