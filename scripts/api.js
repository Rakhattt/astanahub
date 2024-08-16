import axios from 'axios';

function showNotification(message) {
    const notificationElement = document.getElementById('notification');
    if (notificationElement) {
        notificationElement.textContent = message;
        notificationElement.style.display = 'block';
        setTimeout(() => {
            notificationElement.style.display = 'none';
        }, 5000);
    } else {
        console.warn('Notification element not found');
    }
}


export async function loadTransactions() {
    try {
        const response = await axios.get('http://localhost:3000/transactions');
        return response.data;

    } catch (error) {
        console.error('Error loading transactions:', error);
        showNotification('Не удалось загрузить транзакции. Попробуйте еще раз позже.');
        return [];
    }
}

export async function getTransactionById(id) {
    try {
        const response = await axios.get(`https://665801795c36170526468b7c.mockapi.io/api/v1/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error loading transaction with ID ${id}:`, error);
        showNotification(`Не удалось загрузить детальные данные для транзакции с ID ${id}. Попробуйте еще раз позже.`);
        return null;
    }
}
