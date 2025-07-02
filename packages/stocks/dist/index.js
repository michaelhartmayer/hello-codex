"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStockChart = generateStockChart;
const chartjs_node_canvas_1 = require("chartjs-node-canvas");
const yahoo_finance2_1 = __importDefault(require("yahoo-finance2"));
const fs_1 = require("fs");
async function generateStockChart(symbol, options) {
    const { startDate, endDate, interval = '1d', width = 800, height = 600, output, } = options;
    const period1 = new Date(startDate);
    const period2 = new Date(endDate);
    const historical = await yahoo_finance2_1.default.historical(symbol, {
        period1,
        period2,
        interval,
    });
    const sorted = historical.sort((a, b) => a.date.getTime() - b.date.getTime());
    const labels = sorted.map((d) => d.date.toISOString().split('T')[0]);
    const prices = sorted.map((d) => d.close);
    const configuration = {
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
    const canvas = new chartjs_node_canvas_1.ChartJSNodeCanvas({ width, height });
    const buffer = await canvas.renderToBuffer(configuration, 'image/png');
    if (output) {
        await fs_1.promises.writeFile(output, buffer);
    }
    return buffer;
}
