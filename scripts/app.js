import { loadTransactions } from './api';
import { updateContent } from './i18n';
import i18next from 'i18next';

document.addEventListener('DOMContentLoaded', async () => {
    const transactions = await loadTransactions();

    function convertDate(dateStr) {
        const [day, month, year] = dateStr.split('.');
        return `${year}-${month}-${day}`;
    }

    function renderTransactions(filteredTransactions) {
        const listElement = document.getElementById('transactions-list');
        if (!listElement) return;

        listElement.innerHTML = '';

        filteredTransactions.forEach(transaction => {
            const item = document.createElement('div');
            item.classList.add('transaction-item');
            item.innerHTML = `
                <div class="transaction-el">${i18next.t('date')}: ${transaction.date}</div>
                <div class="transaction-el">${i18next.t('amount')}: <span>${transaction.amount}</span></div>
                <div class="transaction-el">${i18next.t('type')}: ${transaction.type}</div>
                <div class="transaction-el">${i18next.t('details')}: ${transaction.details}</div>
            `;
            
            item.addEventListener('click', () => {
                window.location.href = `transaction-details.html?id=${transaction.id}`;
            });
            
            listElement.appendChild(item);
        });
    }
    
    function filterTransactions() {
        const searchQuery = (document.getElementById('search')).value.toLowerCase();
        const typeFilter = (document.getElementById('type-filter')).value;
        const dateFilter = (document.getElementById('date-filter')).value;

        const filtered = transactions.filter(transaction => {
            const matchesSearch = transaction.details.toLowerCase().includes(searchQuery) ||
                                  transaction.amount.toString().includes(searchQuery);
            const matchesType = typeFilter === '' || transaction.type === typeFilter;
            const matchesDate = !dateFilter || convertDate(transaction.date) === dateFilter;

            return matchesSearch && matchesType && matchesDate;
        });

        renderTransactions(filtered);

        document.getElementById('clear-button').style.display = searchQuery || typeFilter || dateFilter ? 'inline-block' : 'none';
    }

    function clearFilters() {
        document.getElementById('search').value = '';
        document.getElementById('type-filter').value = '';
        document.getElementById('date-filter').value = '';
        
        renderTransactions(transactions);
        document.getElementById('clear-button').style.display = 'none';
    }

    document.getElementById('search-button').addEventListener('click', filterTransactions);
    document.getElementById('type-filter').addEventListener('change', filterTransactions);
    document.getElementById('date-filter').addEventListener('change', filterTransactions);
    document.getElementById('clear-button').addEventListener('click', clearFilters);

    renderTransactions(transactions);

    document.getElementById('language-select').addEventListener('change', (event) => {
        i18next.changeLanguage(event.target.value, (err) => {
            if (err) return console.error(err);
            updateContent(); // Обновляем заголовки и фильтры
            renderTransactions(transactions); // Обновляем список транзакций с новым языком
        });
    });
});
