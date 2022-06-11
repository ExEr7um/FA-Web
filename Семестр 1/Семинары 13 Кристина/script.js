api =
  "https://apidata.mos.ru/v1/datasets/2456/features?api_key=Вот сюда пишешь свой ключ"; // Тут нужно поменять ключ API

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
      publicPhone: item["properties"]["Attributes"]["PublicPhone"],
      email: item["properties"]["Attributes"]["Email"],
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
      (coords[0] - coordsLimits.min[0]) * multiplier[0] - 20,
      (coordsLimits.max[1] - coords[1]) * multiplier[1] + 20,
    ]);
    ctx.fillRect(
      (coords[0] - coordsLimits.min[0]) * multiplier[0] - 20,
      (coordsLimits.max[1] - coords[1]) * multiplier[1] + 20,
      4,
      4
    );
    ctx.fillText(
      item.name,
      (coords[0] - coordsLimits.min[0]) * multiplier[0] - 20,
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

function task() {
  dots.sort((a, b) => {
    return a[1] - b[1];
  });
  if (dots.length % 2) {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(0, dots[Math.floor(dots.length / 2)][1]);
    ctx.lineTo(c.clientWidth, dots[Math.floor(dots.length / 2)][1]);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(
      0,
      (dots[dots.length / 2][1] + dots[dots.length / 2 - 1][1]) / 2
    );
    ctx.lineTo(
      c.clientWidth,
      (dots[dots.length / 2][1] + dots[dots.length / 2 - 1][1]) / 2
    );
    ctx.stroke();
  }
}

fetchData();
