$(document).ready(function($) {
	google.charts.load('current', {packages: ['corechart']});
	google.setOnLoadCallback(drawChart);  

	function drawChart(){
		var quality_lines = $("#fastq_txt").val().split("\n");
		var data = new google.visualization.DataTable();
		data.addColumn('number',"Pos")
		data.addColumn('number',"Qual")
		quals = quality_lines[3]
		quals_ascii = Array();
		for(var i=0; i<quals.length;i++){
			data.addRow([i+1,quals.charCodeAt(i)- 33])
			quals_ascii.push([i,quals.charCodeAt(i) - 33])
		}
		//console.log(data);
		var options = {
			chart:{
				title: 'Pos vs Quality',
			},
			hAxis:{
				title: 'Position'
			},
			vAxis:{
				title: 'Quality value',
				max:50,
				min:0
			},
			vAxes: {0:
				{viewWindowMode:'explicit',
	                		viewWindow:{
						max:50,
						min:0
		                          }
				}
			}
		};
		//console.log(document.getElementById("chart_div"))
		var chart = new google.visualization.LineChart(document.getElementById("chart_div"));
		//console.log(chart);
		chart.draw(data, options);
		console.log(quals_ascii)
		if ( $.fn.dataTable.isDataTable('#ascii_code') ) {
			table = $('#ascii_code').DataTable();
			console.log(table)
			table.clear().rows.add(quals_ascii).draw()
		}else{
			$('#ascii_code').DataTable({
				data: quals_ascii
			});
		}
		
	}
	$("#draw_plot_btn").click(function(){
		drawChart();
	})

});
