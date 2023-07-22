const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// ----- Set Canvas
canvas.width = 800;
canvas.height = 600;

// ----- Board Positions (GO, Properties, Etc.)
const board_segments = [
  { x: 0, width: 200, color: "green" },
  { x: 200, width: 200, color: "blue" },
  { x: 400, width: 200, color: "red" },
  { x: 600, width: 200, color: "brown" },
  { x: 800, width: 200, color: "yellow" },
  { x: 1000, width: 200, color: "pink" },
  { x: 1200, width: 200, color: "maroon" },
];

// ----- Camera and Camera Animation.
let camera_x = 0;
let previous_time = 0;
const camera_speed = 300;
let camera_distance_modifier = 0;

function Update_Game() {
  // ----- Events
  window.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
      camera_distance_modifier = 1;
    }
  });

  window.addEventListener("keyup", function (event) {
    if (event.key === "ArrowRight") {
      camera_distance_modifier = 0;
    }
  });
}

function Render() {
  // ----- Frame Rate Limiting
  const now_time = performance.now();
  const delta_time = (now_time - previous_time) / 1000;
  previous_time = now_time;

  // ----- Update Camera Postion
  const moveStep = camera_speed * delta_time;
  camera_x += camera_distance_modifier * moveStep;

  // ----- Update Board Segments
  const first_segment = board_segments[0];
  if (first_segment.x + first_segment.width - camera_x < 0) {
    board_segments.push(board_segments.shift());
    const last_segment = board_segments[board_segments.length - 2];
    board_segments[board_segments.length - 1].x =
      last_segment.x + last_segment.width;
  }

  // ----- Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // ----- Draw Board Segments
  for (const segment of board_segments) {
    ctx.fillStyle = segment.color;
    ctx.fillRect(segment.x - camera_x, canvas.height - 200, segment.width, 50);
  }

  // ----- Call Game Loop
  requestAnimationFrame(Render);
}

// Start the game loop
function Start_Game() {
  Update_Game();
  previous_time = performance.now();
  requestAnimationFrame(Render);
}

Start_Game();
