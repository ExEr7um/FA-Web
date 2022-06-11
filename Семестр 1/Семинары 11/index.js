let data = [];

function createTable(resData) {
  data = resData;
  head = "<tr>";
  for (key of Object.keys(data[0])) {
    head += `<th onClick="sort('${key}')">${key}</th>`;
  }
  head += "</tr>";
  body = "";
  for (item of data) {
    body += "<tr>";
    for (td of Object.values(item)) {
      body += `<td>${td}</td>`;
    }
    body += "</tr>";
  }
  document.getElementById("table").innerHTML = `<table>${head}${body}</table>`;
}

function load() {
  fetch("data-3891-2021-11-18.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => createTable(data));
}

function sort(key) {
  data.sort((a, b) => {
    if (typeof a[key] === "number" && typeof b[key] === "number") {
      return a[key] - b[key];
    } else if (typeof a[key] === "string" && typeof b[key] === "string") {
      const fa = a[key].toLowerCase(),
        fb = b[key].toLowerCase();
      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    }
  });
  createTable(data);
}
