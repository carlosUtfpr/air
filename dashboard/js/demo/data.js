const max_registers = 50;
const alarms = ["Sistema Desligado", "OK", "Alta Pressão", "Alta PEEP", "Baixa Pressão", "Vazamento", "Maximo Volume", "Erro de comunicação"];
const uri = "http://localhost:8000/";

let last_update = 0;
let idLastElement = 0;

let pressure_chart = null;
let volume_chart = null;
let flow_chart = null;

let labels = [];
let dataPressure = [];
let dataVolume = [];
let dataFlow = [];

let statusAlarm = 1;

function initializeCharts() {
  last_update = new Date().getTime();
  let request = new Request(
      uri
      +"showCounted?max=" +
      max_registers
  );

  fetch(request).then((response) =>
    response
      .json()
      .then((data) => {
        const qtd = data.length;
        idLastElement = data[qtd-1]._id;
        checkAlarms(data[qtd-1]);
        for (let i = 0; i < qtd; i++) {
          labels.push(i);
          dataPressure.push(data[qtd - 1 - i].pressure);
          dataVolume.push(data[qtd - 1 - i].volume);
          dataFlow.push(data[qtd - 1 - i].flow);
        }

        //Pressão
        var ctx = document.getElementById("pressao");
        pressure_chart = new Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Pressão",
                lineTension: 0.3,
                backgroundColor: "rgba(78, 115, 223, 0.05)",
                borderColor: "#00f",
                pointRadius: 1,
                pointBackgroundColor: "#00f",
                pointBorderColor: "#00f",
                pointHoverRadius: 1,
                pointHoverBackgroundColor: "#00f",
                pointHoverBorderColor: "#00f",
                pointHitRadius: 1,
                pointBorderWidth: 1,
                data: dataPressure,
              },
            ],
          },
          options: {
            animation: false,
            maintainAspectRatio: false,
            layout: {
              padding: {
                left: 2,
                right: 25,
                top: 25,
                bottom: 0,
              },
            },
            scales: {
              xAxes: [
                {
                  display: false,
                  time: {
                    unit: "date",
                  },
                  gridLines: {
                    display: false,
                    drawBorder: false,
                  },
                  ticks: {
                    maxTicksLimit: max_registers,
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    maxTicksLimit: 7,
                    padding: 5,
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                      return number_format(value);
                    },
                  },
                  gridLines: {
                    color: "rgb(234, 236, 244)",
                    zeroLineColor: "rgb(234, 236, 244)",
                    drawBorder: false,
                    borderDash: [2],
                    zeroLineBorderDash: [2],
                  },
                },
              ],
            },
            legend: {
              display: false,
            },
            tooltips: {
              backgroundColor: "rgb(255,255,255)",
              bodyFontColor: "#00f",
              titleMarginBottom: 10,
              titleFontColor: "#00f",
              titleFontSize: 14,
              borderColor: "#00f",
              borderWidth: 3,
              xPadding: 10,
              yPadding: 10,
              displayColors: false,
              intersect: false,
              mode: "index",
              caretPadding: 10,
              callbacks: {
                label: function (tooltipItem, chart) {
                  var datasetLabel =
                    chart.datasets[tooltipItem.datasetIndex].label || "";
                  return (
                    datasetLabel + "   " + number_format(tooltipItem.yLabel)
                  );
                },
              },
            },
          },
        });

        $("#currentPressure label").text(dataPressure[qtd - 1]);

        //Volume
        ctx = document.getElementById("volume");
        volume_chart = new Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Volume",
                lineTension: 0.3,
                backgroundColor: "rgba(78, 115, 223, 0.05)",
                borderColor: "#f00",
                pointRadius: 1,
                pointBackgroundColor: "#f00",
                pointBorderColor: "#f00",
                pointHoverRadius: 1,
                pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                pointHoverBorderColor: "#f00",
                pointHitRadius: 10,
                pointBorderWidth: 1,
                data: dataVolume,
              },
            ],
          },
          options: {
            animation: false,
            maintainAspectRatio: false,
            layout: {
              padding: {
                left: 2,
                right: 25,
                top: 25,
                bottom: 0,
              },
            },
            scales: {
              xAxes: [
                {
                  display: false,
                  time: {
                    unit: "date",
                  },
                  gridLines: {
                    display: false,
                    drawBorder: false,
                  },
                  ticks: {
                    maxTicksLimit: max_registers,
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    maxTicksLimit: 5,
                    padding: 5,
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                      return number_format(value);
                    },
                  },
                  gridLines: {
                    color: "rgb(234, 236, 244)",
                    zeroLineColor: "rgb(234, 236, 244)",
                    drawBorder: false,
                    borderDash: [2],
                    zeroLineBorderDash: [2],
                  },
                },
              ],
            },
            legend: {
              display: false,
            },
            tooltips: {
              backgroundColor: "rgb(255,255,255)",
              bodyFontColor: "#f00",
              titleMarginBottom: 10,
              titleFontColor: "#f00",
              titleFontSize: 14,
              borderColor: "#f00",
              borderWidth: 3,
              xPadding: 10,
              yPadding: 10,
              displayColors: false,
              intersect: false,
              mode: "index",
              caretPadding: 10,
              callbacks: {
                label: function (tooltipItem, chart) {
                  var datasetLabel =
                    chart.datasets[tooltipItem.datasetIndex].label || "";
                  return datasetLabel + " " + number_format(tooltipItem.yLabel);
                },
              },
            },
          },
        });
        
        $("#currentVolume label").text(dataVolume[qtd - 1]);

        //Fluxo
        ctx = document.getElementById("fluxo");
        flow_chart = new Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Fluxo",
                lineTension: 0.3,
                backgroundColor: "rgba(78, 115, 223, 0.05)",
                borderColor: "#000",
                pointRadius: 1,
                pointBackgroundColor: "#000",
                pointBorderColor: "#000",
                pointHoverRadius: 1,
                pointHoverBackgroundColor: "#000",
                pointHoverBorderColor: "#000",
                pointHitRadius: 10,
                pointBorderWidth: 1,
                data: dataFlow,
              },
            ],
          },
          options: {
            animation: false,
            maintainAspectRatio: false,
            layout: {
              padding: {
                left: 2,
                right: 25,
                top: 25,
                bottom: 0,
              },
            },
            scales: {
              xAxes: [
                {
                  display: false,
                  time: {
                    unit: "date",
                  },
                  gridLines: {
                    display: false,
                    drawBorder: false,
                  },
                  ticks: {
                    maxTicksLimit: max_registers,
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    maxTicksLimit: 5,
                    padding: 5,
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                      return number_format(value);
                    },
                  },
                  gridLines: {
                    color: "rgb(234, 236, 244)",
                    zeroLineColor: "rgb(234, 236, 244)",
                    drawBorder: false,
                    borderDash: [2],
                    zeroLineBorderDash: [2],
                  },
                },
              ],
            },
            legend: {
              display: false,
            },
            tooltips: {
              backgroundColor: "rgb(255,255,255)",
              bodyFontColor: "#000",
              titleMarginBottom: 10,
              titleFontColor: "#000",
              titleFontSize: 14,
              borderColor: "##000",
              borderWidth: 3,
              xPadding: 10,
              yPadding: 10,
              displayColors: false,
              intersect: false,
              mode: "index",
              caretPadding: 10,
              callbacks: {
                label: function (tooltipItem, chart) {
                  var datasetLabel =
                    chart.datasets[tooltipItem.datasetIndex].label || "";
                  return datasetLabel + " " + number_format(tooltipItem.yLabel);
                },
              },
            },
          },
        });
        $("#currentFlow label").text(dataFlow[qtd - 1]);
      })
      .catch((err) => {
        console.log(err);
      })
  );
}

function addData(chart, data) {
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push(data);
  });
}

function removeData(chart) {
  chart.data.datasets.forEach((dataset) => {
    dataset.data.shift();
  });
}

function updateChart(chart, data) {
  addData(chart, data);
  if (chart.data.datasets[0].data.length > max_registers) {
    removeData(chart);
  }
  chart.update();
}

function updateCharts() {
  if (last_update == 0) return initializeCharts();

  let request = new Request(
    uri + "showCounted?max=1" 
  );

  last_update = new Date().getTime();

  fetch(request).then((response) =>
    response.json().then((data) => {
      data.reverse();
      data.forEach((element) => {
          if(idLastElement != element._id){
            checkAlarms(element);
  
            updateChart(pressure_chart, element.pressure);
            $("#currentPressure label").text(element.pressure);
  
            updateChart(volume_chart, element.volume);
            $("#currentVolume label").text(element.volume);
  
            updateChart(flow_chart, element.flow);
            $("#currentFlow label").text(element.flow);
            idLastElement = element._id;
          }
      });
    })
  );
}

function checkAlarms(res){
  if(res.alarm == statusAlarm) return;

  if(res.alarm == 1){
    restauraAlarm();
  }else{
    disparaAlarm(res.alarm);
  }

  statusAlarm = res.alarm;
}

function restauraAlarm(){
  let footer = document.getElementsByTagName("footer")[0];
  let imgFather = footer.getElementsByTagName("span")[0];
  let headerBody = document.getElementsByClassName("card-header");
  let bodyCards = document.getElementsByClassName("card-body");
  let sidebar = document.getElementById("accordionSidebar");
  
  sidebar.classList.remove("bg-gradient-danger");
  sidebar.classList.add("bg-gradient-warning");

  footer.classList.remove("bg-gradient-danger");
  footer.classList.add("bg-white");

  imgFather.firstChild.classList.remove("alarm-active");
  imgFather.lastChild.classList.remove("alarm-active");
  imgFather.lastChild.innerHTML = "";

  for(let item = 0; item < bodyCards.length; item++){
    if(item < 3)
        headerBody[item].classList.remove("bg-gradient-danger");
    bodyCards[item].classList.remove("alert-danger");
  }
}

function disparaAlarm(tipo){
  let footer = document.getElementsByTagName("footer")[0];
  let imgFather = footer.getElementsByTagName("span")[0];
  let headerBody = document.getElementsByClassName("card-header");
  let bodyCards = document.getElementsByClassName("card-body");
  let sidebar = document.getElementById("accordionSidebar");
  let text = document.createTextNode(alarms[tipo]);
  
  sidebar.classList.remove("bg-gradient-warning");
  sidebar.classList.add("bg-gradient-danger");

  footer.classList.remove("bg-white");
  footer.classList.add("bg-gradient-danger");

  imgFather.firstChild.classList.add("alarm-active");
  imgFather.lastChild.classList.add("alarm-active");
  imgFather.lastChild.innerHTML = ""; 
  imgFather.lastChild.appendChild(text);

  for(let item = 0; item < bodyCards.length; item++){
    if(item < 3)
      headerBody[item].classList.add("bg-gradient-danger");
    bodyCards[item].classList.add("alert-danger");
  }
}