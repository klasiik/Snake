var CONFIG = {
	width: 60,
	height: 30,
	cellSize: 30
};

var body = document.getElementsByTagName("body");

var table = document.createElement("table");
document.body.appendChild(table);

table.cellSpacing = "0";
table.cellPadding = "0";


for (var i = 0; i < CONFIG.height; i++) {

	var tableRow = document.createElement("tr");
	table.appendChild(tableRow);


	for (var j = 0; j < CONFIG.width; j++) {
		var tableCol = document.createElement("td");
		tableRow.appendChild(tableCol);
		tableCol.width = CONFIG.cellSize + "px"
		tableCol.height = CONFIG.cellSize + "px";
	};
};
