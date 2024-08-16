import i18next from 'i18next';

i18next.init({
    lng: 'en', 
    resources: {
        en: {
            translation: {
                "transaction_history": "Transaction History",
                "search_placeholder": "Search transactions...",
                "type_filter_all": "All Types",
                "type_filter_income": "Income",
                "type_filter_expense": "Expense",
                "date": "Date",
                "amount": "Amount",
                "type": "Type",
                "details": "Details",
            }
        },
        ru: {
            translation: {
                "transaction_history": "История транзакций",
                "search_placeholder": "Поиск транзакций...",
                "type_filter_all": "Все типы",
                "type_filter_income": "Доход",
                "type_filter_expense": "Расход",
                "date": "Дата",
                "amount": "Сумма",
                "type": "Тип",
                "details": "Подробности",
            }
        }
    }
}, function(err, t) {
    if (err) return console.error(err);
    updateContent();
});

export function updateContent() {
    const title = document.getElementById('title');
    const search = document.getElementById('search');
    const typeFilter = document.getElementById('type-filter');
    const languageSelect = document.getElementById('language-select');

    if (title) title.innerHTML = i18next.t('transaction_history');
    if (search) search.setAttribute('placeholder', i18next.t('search_placeholder'));
    if (typeFilter) {
        typeFilter.children[0].innerHTML = i18next.t('type_filter_all');
        typeFilter.children[1].innerHTML = i18next.t('type_filter_income');
        typeFilter.children[2].innerHTML = i18next.t('type_filter_expense');
    }
    if (languageSelect) languageSelect.value = i18next.language;
}

export function changeLanguage(lng) {
    i18next.changeLanguage(lng, (err) => {
        if (err) return console.error(err);
        updateContent();
    });
}

const languageSelect = document.getElementById('language-select');
if (languageSelect) {
    languageSelect.addEventListener('change', (event) => {
        changeLanguage(event.target.value);
    });
}
