import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import { ChartConfiguration } from 'chart.js';
import yahooFinance from 'yahoo-finance2';
import { promises as fs } from 'fs';

export interface StockChartOptions {
  startDate: string | Date;
  endDate: string | Date;
  interval?: '1d' | '1wk' | '1mo';
  width?: number;
  height?: number;
  output?: string;
}

export async function generateStockChart(symbol: string, options: StockChartOptions): Promise<Buffer> {
  const {
    startDate,
    endDate,
    interval = '1d',
    width = 800,
    height = 600,
    output,
  } = options;

  const period1 = new Date(startDate);
  const period2 = new Date(endDate);

  const historical = await yahooFinance.historical(symbol, {
    period1,
    period2,
    interval,
  });

  const sorted = historical.sort((a, b) => a.date.getTime() - b.date.getTime());
  const labels = sorted.map((d) => d.date.toISOString().split('T')[0]);
  const prices = sorted.map((d) => d.close as number);

  const configuration: ChartConfiguration<'line', number[], string> = {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: symbol.toUpperCase(),
          data: prices,
          fill: false,
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.1,
        },
      ],
    },
  };

  const canvas = new ChartJSNodeCanvas({ width, height });
  const buffer = await canvas.renderToBuffer(configuration, 'image/png');

  if (output) {
    await fs.writeFile(output, buffer);
  }

  return buffer;
}
