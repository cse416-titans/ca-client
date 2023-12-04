import { faker } from "@faker-js/faker";

let i = 1;

export const bubbleData = Array.from({ length: 50 }, () => ({
  label: i++,
  x: faker.number.float({ min: -1, max: 1 }),
  y: faker.number.float({ min: -1, max: 1 }),
  z: faker.number.float({ min: 0.7, max: 1 }),
}));

i = 0;
export const scatterData = Array.from({ length: 10000 }, () => ({
  label: i++,
  x: faker.number.float({ min: -1, max: 1 }),
  y: faker.number.float({ min: -1, max: 1 }),
  z: faker.number.float({ min: 0.7, max: 1 }),
}));

export const dynamicColors = function () {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  const a = 0.1 + Math.random() * 0.5;
  return "rgba(" + r + "," + g + "," + b + "," + a + ")";
};

export const randomColorArr = Array.from({ length: 50 }, () => dynamicColors());

i = 1;
export const data = {
  labels: Array.from({ length: 50 }, () => i++),
  datasets: [
    {
      type: "bubble",
      label: "Cluster",
      data: Array.from({ length: 50 }, () => ({
        x: faker.number.float({ min: -1, max: 1 }),
        y: faker.number.float({ min: -1, max: 1 }),
        r: faker.number.int({ min: 10, max: 30 }),
      })),
      backgroundColor: randomColorArr,
      datalabels: {
        color: "black",
      },
    },
    {
      type: "scatter",
      label: "Individual District Plan",
      data: Array.from({ length: 10000 }, () => ({
        x: faker.number.float({ min: -1, max: 1 }),
        y: faker.number.float({ min: -1, max: 1 }),
      })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      pointRadius: 0.5,
      pointHoverRadius: 0.5,
      pointHitRadius: 0,
      datalabels: {
        labels: {
          title: null,
        },
      },
    },
  ],
};

export const dataPlan = {
  datasets: [
    {
      type: "scatter",
      label: "Available Plans",
      data: Array.from({ length: 500 }, () => ({
        x: faker.number.float({ min: -1, max: 1 }),
        y: faker.number.float({ min: -1, max: 1 }),
      })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      pointRadius: 4,
      pointHoverRadius: 6,
      pointHitRadius: 5,
    },
    {
      type: "scatter",
      label: "Unavailable Plans",
      data: Array.from({ length: 500 }, () => ({
        x: faker.number.float({ min: -1, max: 1 }),
        y: faker.number.float({ min: -1, max: 1 }),
      })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      pointRadius: 2,
      pointHoverRadius: 2,
      pointHitRadius: 2,
    },
  ],
};
