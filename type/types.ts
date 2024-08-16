export interface Transaction {
    id: number;
    date: string;
    amount: number;
    type: string;
    details: string;
}
export interface Transaction {
    description: string;
    price: number;
    material: string;
    image: string;
}
export interface TransactionElement extends HTMLElement {
    dataset: DOMStringMap & {
        id?: string; 
    };
}

export interface FilterElements {
    search: HTMLInputElement;
    typeFilter: HTMLSelectElement;
    dateFilter: HTMLInputElement;
    searchButton: HTMLButtonElement;
}

export interface TransactionDOMElements {
    loader: HTMLElement | null;
    transactionDetails: HTMLElement | null;
}

export interface URLParams {
    id: string | null;
}