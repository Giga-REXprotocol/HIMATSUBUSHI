//電卓ゲーム
function get_calc(btn) {
    if(btn.value == "=") {
      document.dentaku.display.value = eval(document.dentaku.display.value);
    } else if (btn.value == "C") {
      document.dentaku.display.value = "";
    } else {
      if (btn.value == "×") {
        btn.value = "*";
      } else if (btn.value == "÷") {
        btn.value = "/";
      } 
      document.dentaku.display.value += btn.value;
      document.dentaku.multi_btn.value = "×";
      document.dentaku.div_btn.value = "÷";
    }
  }

//デジタル時計
const clock = () => {
  // 現在の日時・時刻の情報を取得
  const d = new Date();

  // 年を取得
  let year = d.getFullYear();
  // 月を取得
  let month = d.getMonth() + 1;
  // 日を取得
  let date = d.getDate();
  // 曜日を取得
  let dayNum = d.getDay();
  const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let day = weekday[dayNum];
  // 時を取得
  let hour = d.getHours();
  // 分を取得
  let min = d.getMinutes();
  // 秒を取得
  let sec = d.getSeconds();

  // 1桁の場合は0を足して2桁に
  month = month < 10 ? "0" + month : month;
  date = date < 10 ? "0" + date : date;
  hour = hour < 10 ? "0" + hour : hour;
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;

  // 日付・時刻の文字列を作成
  let today = `${year}.${month}.${date} ${day}`;
  let time = `${hour}:${min}:${sec}`;

  // 文字列を出力
  document.querySelector(".clock-date").innerText = today;
  document.querySelector(".clock-time").innerText = time;
};

// 1秒ごとにclock関数を呼び出す
setInterval(clock, 1000);

//ブロックゲーム
var canvas;
		var context;

		var ball = {
			x: 320,
			y: 240,
			radius: 10,
			speedX: 5,
			speedY: 5
		};

		var paddle = {
			x: 250,
			y: 460,
			width: 100,
			height: 10,
			speed: 10
		};

		var blocks = [];
		var blockWidth = 50;
		var blockHeight = 20;

		var score = 0;

		function startGame() {
			canvas = document.getElementById("gameCanvas");
			context = canvas.getContext("2d");

			document.addEventListener("keydown", handleKeyDown);
			document.addEventListener("keyup", handleKeyUp);

			resetGame();
			setInterval(updateGame, 20);
		}

		function resetGame() {
			// Reset ball
			ball.x = canvas.width / 2;
			ball.y = canvas.height / 2;
			ball.speedX = 5;
			ball.speedY = -5;

			// Reset paddle
			paddle.x = canvas.width / 2 - paddle.width / 2;
			paddle.y = 460;

			// Reset blocks
			blocks = [];
			for (var row = 0; row < 3; row++) {
				for (var col = 0; col < 10; col++) {
					blocks.push({
						x: col * blockWidth + 10,
						y: row * blockHeight + 50,
						width: blockWidth,
						height: blockHeight,
						color: getRandomColor(),
						visible: true
					});
				}
			}

			score = 0;
		}

		function updateGame() {
			context.clearRect(0, 0, canvas.width, canvas.height);

			drawBall();
			drawPaddle();
			drawBlocks();
			drawScore();

			moveBall();
			movePaddle();
			checkCollisions();
		}

		function drawBall() {
			context.beginPath();
			context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
			context.fillStyle = "red";
			context.fill();
			context.closePath();
		}

		function drawPaddle() {
			context.fillStyle = "blue";
			context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
		}

		function drawBlocks() {
			for (var i = 0; i < blocks.length; i++) {
				if (blocks[i].visible) {
context.fillStyle = blocks[i].color;
context.fillRect(blocks[i].x, blocks[i].y, blocks[i].width, blocks[i].height);
}
}
}
	function drawScore() {
		context.fillStyle = "black";
		context.font = "20px Arial";
		context.fillText("Score: " + score, 10, 25);
	}

	function moveBall() {
		ball.x += ball.speedX;
		ball.y += ball.speedY;

		// Check if ball hits left or right wall
		if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
			ball.speedX = -ball.speedX;
		}

		// Check if ball hits top wall
		if (ball.y - ball.radius < 0) {
			ball.speedY = -ball.speedY;
		}

		// Check if ball hits bottom wall
		if (ball.y + ball.radius > canvas.height) {
			resetGame();
		}
	}

	function movePaddle() {
		if (leftKeyDown) {
			paddle.x -= paddle.speed;
			if (paddle.x < 0) {
				paddle.x = 0;
			}
		}

		if (rightKeyDown) {
			paddle.x += paddle.speed;
			if (paddle.x + paddle.width > canvas.width) {
				paddle.x = canvas.width - paddle.width;
			}
		}
	}

	function checkCollisions() {
		// Check if ball hits paddle
		if (collision(ball, paddle)) {
			ball.speedY = -ball.speedY;
		}

		// Check if ball hits blocks
		for (var i = 0; i < blocks.length; i++) {
			if (collision(ball, blocks[i]) && blocks[i].visible) {
				ball.speedY = -ball.speedY;
				blocks[i].visible = false;
				score++;
			}
		}
	}

	function collision(object1, object2) {
		if (object1.x < object2.x + object2.width && object1.x + object1.radius * 2 > object2.x &&
			object1.y < object2.y + object2.height && object1.y + object1.radius * 2 > object2.y) {
			return true;
		} else {
			return false;
		}
	}

	function getRandomColor() {
		var letters = "0123456789ABCDEF";
		var color = "#";
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	var leftKeyDown = false;
	var rightKeyDown = false;

	function handleKeyDown(event) {
		if (event.keyCode == 37) { // Left arrow
			leftKeyDown = true;
		} else if (event.keyCode == 39) { // Right arrow
			rightKeyDown = true;
		}
	}

	function handleKeyUp(event) {
		if (event.keyCode == 37) { // Left arrow
			leftKeyDown = false;
		} else if (event.keyCode == 39) { // Right arrow
			rightKeyDown = false;
		}
	}