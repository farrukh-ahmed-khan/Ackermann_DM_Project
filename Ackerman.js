let memo = {};

let x = 2;
let y = [];

for (let i = 0; i < 500; i++) {
  y.push(i);
}

let ans = document.getElementById('ans');

let ack = (x, y) => {
  if (x === 0) {
    return y + 1;
  } else if (y === 0) {
    return ack(x - 1, 1);
  } else {
    let key = x + ',' + y;
    if (key in memo) {
      return memo[key];
    } else {
      memo[key] = ack(x - 1, ack(x, y - 1));
      return memo[key];
    }
  }
};

const calTime = (x, y) => {
  let sum = 0;
  for (let i = 0; i < 3; i++) {
    let start = performance.now();
    ack(x, y);
    let end = performance.now();
    let time = end - start;
    sum += time;
  }

  return sum / 3;
};

const PlotChart = (FinalAverage) => {
  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: y,
      datasets: [
        {
          label: 'Average Time of Execution with Respect to Y',
          data: FinalAverage,
          fill: false,
          borderColor: 'purple',
          tension: 0.1,
        },
        {
          label: 'Ackermann',
          data: y,
          fill: false,
          borderColor: 'green',
          tension: 0.1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

window.onload = () => {
  let Average = [];
  for (let i = 0; i < y.length; i++) {
    let Avg = calTime(x, y[i]);

    Average.push(Avg);

    ans.innerHTML += `
            <tr>
                <td>${i}</td>
                <td>${x}</td>
                <td>${y[i]}</td>
                <td>${Avg}</td>
            </tr>
        `;
  }
  PlotChart(Average);
};
