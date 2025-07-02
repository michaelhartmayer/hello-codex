# @michaelhartmayer/stocks

Generate a stock price chart as a PNG.

## Usage

```
import { generateStockChart } from '@michaelhartmayer/stocks';

await generateStockChart('AAPL', {
  startDate: '2024-01-01',
  endDate: '2024-06-30',
  interval: '1d', // '1d', '1wk', or '1mo'
  output: 'chart.png'
});
```

The function returns a `Buffer` containing the PNG data. If `output` is provided the
image will also be saved to that path.
