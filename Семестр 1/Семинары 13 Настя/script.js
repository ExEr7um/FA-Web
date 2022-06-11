api =
  "https://apidata.mos.ru/v1/datasets/1193/features?api_key=Вот сюда пишешь свой ключ"; // Тут нужно поменять ключ API

let dots = [];
const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");

const fetchData = async () => {
  ctx.clearRect(0, 0, c.clientWidth, c.clientHeight);
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const response = await fetch(api, { headers });
  let data = await response.json();
  data = data["features"].map((item) => {
    return {
      name: `${item["properties"]["Attributes"]["FullName"]}`,
      workingHours: item["properties"]["Attributes"]["WorkingHours"],
      publicPhone:
        item["properties"]["Attributes"]["PublicPhone"][0]["PublicPhone"],
      geometry: item["geometry"],
    };
  });
  let coordsLimits = {
    min: [90, 180],
    max: [0, 0],
  };
  data.map((item) => {
    const coords = item["geometry"]["coordinates"];
    if (coords[0] < coordsLimits.min[0]) {
      coordsLimits.min[0] = coords[0];
    }
    if (coords[1] < coordsLimits.min[1]) {
      coordsLimits.min[1] = coords[1];
    }
    if (coords[0] > coordsLimits.max[0]) {
      coordsLimits.max[0] = coords[0];
    }
    if (coords[1] > coordsLimits.max[1]) {
      coordsLimits.max[1] = coords[1];
    }
  });
  multiplier = [
    (c.clientWidth - 20) / (coordsLimits.max[0] - coordsLimits.min[0]),
    (c.clientHeight - 20) / (coordsLimits.max[1] - coordsLimits.min[1]),
  ];
  dots = [];
  data.map((item) => {
    const coords = item["geometry"]["coordinates"];
    dots.push([
      (coords[0] - coordsLimits.min[0]) * multiplier[0] + 20,
      (coordsLimits.max[1] - coords[1]) * multiplier[1] + 20,
    ]);
    ctx.fillRect(
      (coords[0] - coordsLimits.min[0]) * multiplier[0] + 20,
      (coordsLimits.max[1] - coords[1]) * multiplier[1] + 20,
      4,
      4
    );
    ctx.fillText(
      item.name,
      (coords[0] - coordsLimits.min[0]) * multiplier[0] + 20,
      (coordsLimits.max[1] - coords[1]) * multiplier[1] + 20
    );
  });
};

function generateRandom(amount) {
  dots = [];
  ctx.clearRect(0, 0, c.clientWidth, c.clientHeight);
  for (let i of Array(amount).keys()) {
    dots.push([Math.random() * c.clientWidth, Math.random() * c.clientHeight]);
  }
  dots.map((dot) => {
    ctx.fillRect(dot[0], dot[1], 4, 4);
  });
}

function intersects(a, b, c, d, p, q, r, s) {
  var det, gamma, lambda;
  det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0) {
    return false;
  } else {
    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1;
  }
}

const dx = 200;
const dy = 200;

function task() {
  newDots = [];
  for (let indexFirst of Array(dots.length).keys()) {
    checker = false;
    indexFirst % 2
      ? newDots.push([dots[indexFirst][0] + dx, dots[indexFirst][1]])
      : newDots.push([dots[indexFirst][0], dots[indexFirst][1] + dy]);
    for (let indexSecond of Array(newDots.length).keys()) {
      if (
        intersects(
          dots[indexFirst][0],
          dots[indexFirst][1],
          newDots[indexFirst][0],
          newDots[indexFirst][1],
          dots[indexSecond][0],
          dots[indexSecond][1],
          newDots[indexSecond][0],
          newDots[indexSecond][1]
        )
      ) {
        checker = true;
      }
    }
    if (!checker) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.moveTo(dots[indexFirst][0], dots[indexFirst][1]);
      ctx.lineTo(newDots[indexFirst][0], newDots[indexFirst][1]);
      ctx.stroke();
    }
  }
}

fetchData();
