import Chart from 'chart.js/auto'; 
import { loadTransactions } from './api'; 

document.addEventListener('DOMContentLoaded', async () => {
    const transactions = await loadTransactions();

    function calculateTotals(transactions) {
        let income = 0;
        let expense = 0;

        transactions.forEach(transaction => {
            if (transaction.type === 'income') {
                income += transaction.amount;
            } else if (transaction.type === 'expense') {
                expense += transaction.amount;
            }
        });

        const balance = income - expense;

        return { income, expense, balance };
    }

    function prepareChartData(transactions) {
        const totals = calculateTotals(transactions);
        const labels = ['Доход', 'Расход', 'Баланс'];
        const data = [totals.income, totals.expense, totals.balance];

        return { labels, data };
    }

    function initializeCharts() {
        const ctx = document.getElementById('bar-chart').getContext('2d');
        const lineChartCtx = document.getElementById('monthly-transactions-chart').getContext('2d');

        const { labels, data } = prepareChartData(transactions);

        const barChartData = {
            labels: labels,
            datasets: [{
                label: 'Общий обзор по платежам',
                data: data,
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 159, 64, 1)'],
                borderWidth: 1
            }]
        };

        const barChartConfig = {
            type: 'bar',
            data: barChartData,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };

        new Chart(ctx, barChartConfig);

        const labelsMonths = generateMonthLabels(3);
        const monthlyData = [65, 59, 80];

        new Chart(lineChartCtx, {
            type: 'line',
            data: {
                labels: labelsMonths,
                datasets: [{
                    label: 'Транзакции по месяцам',
                    data: monthlyData,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
        });
    }

    function generateMonthLabels(count) {
        const labels = [];
        const now = new Date();
        for (let i = 0; i < count; i++) {
            const month = now.getMonth() - i;
            const year = now.getFullYear();
            const date = new Date(year, month);
            labels.unshift(date.toLocaleString('default', { month: 'short' }));
        }
        return labels;
    }

    initializeCharts();
});
