export interface StockChartOptions {
    startDate: string | Date;
    endDate: string | Date;
    interval?: '1d' | '1wk' | '1mo';
    width?: number;
    height?: number;
    output?: string;
}
export declare function generateStockChart(symbol: string, options: StockChartOptions): Promise<Buffer>;
