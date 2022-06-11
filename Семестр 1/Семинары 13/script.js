api =
  "https://apidata.mos.ru/v1/datasets/495/features?api_key=60688cb94697bc9085e26a6bc1cfccae";

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
      name: `${item["properties"]["Attributes"]["CommonName"]}`,
      webSite: item["properties"]["Attributes"]["WebSite"],
      workingHours: item["properties"]["Attributes"]["WorkingHours"],
      publicPhone:
        item["properties"]["Attributes"]["PublicPhone"][0]["PublicPhone"],
      email: item["properties"]["Attributes"]["Email"][0]["Email"],
      geometry: item["geometry"],
    };
  });
  let coordsLimits = {
    min: [90, 180],
    max: [0, 0],
  };
  data.map((item) => {
    const coords = item["geometry"]["coordinates"][0];
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
    const coords = item["geometry"]["coordinates"][0];
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

function task() {
  let min = [];
  dots.map((dotCenter) => {
    let minForDot = Math.sqrt(c.clientWidth ** 2 + c.clientHeight ** 2);
    dots.map((dot) => {
      const x = dot[0] - dotCenter[0];
      const y = dot[1] - dotCenter[1];
      if (x != 0 && y != 0) {
        const distance = Math.sqrt(x ** 2 + y ** 2);
        if (minForDot > distance) {
          minForDot = distance;
        }
      }
    });
    min.push({ distance: minForDot, coords: dotCenter });
  });
  let max = 0;
  min.map((dot) => {
    if (dot.distance > max) {
      max = dot.distance;
    }
  });
  min.map((dot) => {
    if (dot.distance === max) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.arc(
        dot.coords[0],
        dot.coords[1],
        dot.distance,
        0,
        2 * Math.PI,
        false
      );
      ctx.stroke();
    }
  });
}

fetchData();
