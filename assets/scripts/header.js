function fix_dpi(canvas, dpi) {

	//create a style object that returns width and height
	let style = {
		height() {
			return +getComputedStyle(canvas).getPropertyValue('height').slice(0, -2);
		},
		width() {
			return +getComputedStyle(canvas).getPropertyValue('width').slice(0, -2);
		}
	}
	//set the correct attributes for a crystal clear image!
	canvas.setAttribute('width', style.width() * dpi);
	canvas.setAttribute('height', style.height() * dpi);
}

function draw() {

	
	const canvas = document.getElementById('test');
	
	// let w_wid = window.innerWidth
	let w_wid = canvas.offsetWidth
	var dpi = window.devicePixelRatio;
	
	let wid = Math.floor(w_wid / 45);
	wid = wid*dpi;
	let ht = wid/2;
	console.log(wid+" "+ht);
	let row1 = 0;
	let row2 = (150*dpi)-ht;
	if (canvas.getContext) {
		const ctx = canvas.getContext('2d');
		
		console.log(dpi)
		var nucs = Array("A", "C", "G", "T");
		var nucCols = Array("#009a00", "#1f00ff", "#df6c00", "#ff0000")
		var aaCols = Array('rgba(84, 105, 58)', "rgba(58, 95, 126)", "rgba(182, 105, 32)","rgba(151, 63, 29)")
		let site_title = "BIQINFQRMAPPING".split("")

		fix_dpi(canvas, dpi)
		ctx.strokeStyle = 'rgba(255, 0, 0, 1)';
		//ctx.font =  "bolder " + wid/2+"px monospace"
		ctx.textAlign = "center"
		ctx.textBaseline = "middle"
		col1='rgba(240, 240, 240, 1)'
		col2='rgba(225, 225, 225, 1)'
		for (var i = 0; i < 45; i++) {
			let randIdx1 = Math.floor(Math.random() * 4)
			let randIdx2 = Math.floor(Math.random() * 4)
			if (i % 2 == 0) {
				ctx.fillStyle = col1;
				ctx.fillRect(wid * i, row1 , wid, ht);
				ctx.fillRect(wid * i, row2 , wid, ht);
			} else {
				ctx.fillStyle = col2;
				ctx.fillRect(wid * i, row1 , wid, ht);
				ctx.fillRect(wid * i, row2 , wid, ht);
			}
			if(i%3==1){
				ctx.fillStyle = "white";	
				//ctx.fillRect(wid * i, 75 , wid, ht);
				let midRow = 150/2*dpi;
				console.log(midRow)
				ctx.font =  "bolder " + wid*3+"px monospace"
				ctx.fillText(site_title.shift(), wid * i + (wid / 2), midRow);
			}else if(i%3==0){
				ctx.fillStyle = aaCols[randIdx2];
				ctx.fillRect(wid * i, ht+3, wid*3, ((150*dpi)-ht-ht)-6);
			}
			ctx.font =  "bolder " + wid/2+"px monospace"
			ctx.fillStyle = nucCols[randIdx1];
			ctx.fillText(nucs[randIdx1], wid * i + (wid / 2), row1 + (ht / 2));
			ctx.fillStyle = nucCols[randIdx2];
			ctx.fillText(nucs[randIdx2], wid * i + (wid / 2), row2 + (ht / 2));
		}
	}
}
window.onload = (event) => {
	draw();	
};
window.onresize = (event) => {
	draw();	
};