import { data } from './data.js'

const scatter = document.getElementById('scatter').getContext('2d');

let dataType = "sugars"


const scatterChart = new Chart(scatter, {
  type: 'scatter',
  data: {
      datasets: [{
          label: 'Scatter Dataset',
          backgroundColor: "rgba(229, 106, 72, 1)",
          borderColor: 'rgba(229, 106, 72, .7)',
          data: data.map((cereal) =>{ 
            const selection = cereal[dataType];
            const rating = cereal.rating;
            if (selection != -1) {
              return { 
                x: selection, 
                y: rating
              }
            } else {
              return
            }
            })

      }]
  },
  options: {
      scales: {
          xAxes: [{
              type: 'linear',
              position: 'bottom',
              scaleLabel: {
                display: true,
                labelString: `Amount of ${dataType}`
              }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Score',
            }
          }]
      }
  }
});

const keys = Object.keys(data[0]);


keys.forEach((key) => {
  const node = document.createElement("button");
    node.onclick = () => {      
      dataType = key
      scatterChart.data.datasets[0].data = data.map((cereal) =>{ 
        const selection = cereal[dataType];
        const rating = cereal.rating;
        if (selection != -1) {
          return { 
            x: selection, 
            y: rating
          }
        } else {
          return
        }
        })
      console.log('changed!');
      console.log(dataType);
      console.log(scatterChart.update());
      
    }
    node.innerHTML = key;
  document.getElementById('scatterButtons').appendChild(node)
})

const radar = document.getElementById('radar').getContext('2d');

const cerealIndex = 10;
console.log(data[cerealIndex]);

let cerealKeys = Object.keys(data[cerealIndex]);
cerealKeys = ["calories", "protein", "fat", "sodium", "fiber", "carbo", "sugars", "potass", "vitamins"]

const myRadarChart = new Chart(radar, {
  type: 'radar',
  data: {
    labels: cerealKeys,
    datasets: [{
      label: data[cerealIndex].name,
      backgroundColor: "rgba(72, 200, 229, .7)",
      borderColor: "rgba(72, 200, 229, 1)",
      data: cerealKeys.map(key => data[cerealIndex][key]),
    }],
  },
  options: {
    
  }
});

const doughnut = document.getElementById('doughnut').getContext('2d');

const doughData = data.reduce((obj, cereal) => {
  if(cereal.mfr in obj) {
    obj[cereal.mfr] += 1
  } else {
    obj[cereal.mfr] = 1
  }
  return obj;
}, []);

const dataLabels = Object.keys(doughData)
const dataValues = dataLabels.map(key => doughData[key])


const myDoughnutChart = new Chart(doughnut, {
  type: 'doughnut',
  data: {
    datasets: [{
      data: dataValues,
      backgroundColor: ["#e6194B", "#f58231", "#ffe119", "#bfef45", "#3cb44b", "#42d4f4", "#4363d8"]
    }],
    labels: dataLabels,
  },
  options: {
    styling: {

    }
  }
});