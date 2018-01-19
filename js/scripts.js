function buildEmpty(width, height) {
  var newMap = [];
  for (var i = 0; i < width; i++) {
    newMap.push(Array(height).fill(0));
  };
  return newMap;
};

function dropBomb(map, x, y) {
  console.log("here");
  map[x][y] = "@";
  var xmin = x - 1;
  var xmax = x + 1;
  var ymin = y - 1;
  var ymax = y + 1;

  if (xmin < 0) xmin = 0;
  if (ymin < 0) ymin = 0;
  if (xmax >= map.length) xmax = map.length - 1;
  if (ymax >= map[0].length) ymax = map[0].length - 1;

  for (var yi = ymin; yi <= ymax; yi++) {
    for (var xi = xmin; xi <= xmax; xi++) {
      if (map[xi][yi] !== "@") {
        map[xi][yi] = parseInt(map[xi][yi]) + 1;
      };
    };
  };
};

function fill(map) {
  for (var y = 0; y < map[0].length; y++) {
    for (var x = 0; x < map.length; x++) {
      if (Math.random() < 1/8) {
        dropBomb(map, x, y);
      };
    };
  };
};

function generateBoard(map, width, height) {
  console.log(map[1]);
  var board = $("#board");
  for (var y = 0; y < height; y++) {
    var line = "<p>";
    for (var x = 0; x < width; x++) {
      line += "<span id='" + x + "-" + y + "'>&nbsp;</span>";
    };
    line += "</p>";
    board.append(line);
  };
};

function showBombs(map) {
  for (var y = 0; y < map[0].length; y++) {
    for (var x = 0; x < map.length; x++) {
      if (map[x][y] === "@") {
        showTile(map, x, y);
      };
    };
  };
  $("span").unbind("click");
};

function showTile(map, x, y) {
  var tag = $("#" + x + "-" + y);
  var value = map[x][y] + "";
  tag.addClass("shown c" + value);
  tag.text(value);
}

function showAll(map) {
  for (var y = 0; y < map[0].length; y++) {
    for (var x = 0; x < map.length; x++) {
      showTile(map, x, y);
    };
  };
  $("span").unbind("click");
};


$(document).ready(function() {
  var width = parseInt(prompt("Enter board width..."));
  var height = parseInt(prompt("Enter board height..."));

  var map = buildEmpty(width, height);
  fill(map);
  generateBoard(map, width, height);

  $("span").click(function() {
    var location = $(this).attr("id").split("-");
    showTile(map, location[0], location[1]);
    var value = map[location[0]][location[1]] + "";
    if (value === "@") {
      showBombs(map);
    };
  });

  $("#showAll").click(function() {
    showAll(map);
  });
});
