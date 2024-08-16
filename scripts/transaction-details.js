import { getTransactionById } from './api';
import '../styles/styles.css';

document.addEventListener('DOMContentLoaded', async () => {
    const elements = {
        loader: document.getElementById('loader'),
        transactionDetails: document.getElementById('transaction-details'),
    };

    if (elements.loader) elements.loader.style.display = 'block';

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) {
        if (elements.loader) elements.loader.style.display = 'none';
        return;
    }

    try {
        const transaction = await getTransactionById(id); 

        if (!transaction && elements.transactionDetails) {
            elements.transactionDetails.innerHTML = 'Transaction not found.';
            return;
        }

        if (elements.transactionDetails) {
            elements.transactionDetails.innerHTML = `
                <div class="d-flex">
                    <div>
                        <p class="transaction-el">ID: ${transaction.id}</p>
                        <p class="transaction-el">Description: ${transaction.description}</p>
                        <p class="transaction-el">Price: ${transaction.price}</p>
                        <p class="transaction-el">Material: ${transaction.material}</p>
                    </div>
                    <div class="transaction-img">
                        <div class="image-loader" id="image-loader"></div>
                        <img src="${transaction.image}" alt="image">
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading transaction details:', error);
        if (elements.transactionDetails) {
            elements.transactionDetails.innerHTML = 'An error occurred while loading the transaction details.';
        }
    } finally {
        setTimeout(() => {
            if (elements.loader) elements.loader.style.display = 'none';
        }, 2500); 
    }
});
