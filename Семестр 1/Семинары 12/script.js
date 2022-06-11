api =
  "https://apidata.mos.ru/v1/datasets/495/features?api_key=60688cb94697bc9085e26a6bc1cfccae";

const fetchData = async () => {
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
  console.log(data);
  const c = document.getElementById("myCanvas");
  const ctx = c.getContext("2d");
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
  data.map((item) => {
    const coords = item["geometry"]["coordinates"][0];
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

fetchData();
