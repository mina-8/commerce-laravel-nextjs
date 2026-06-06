export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: string;
    image: string;
}

export interface ProductPagination {
    current_page: number;
    data: Product[];
    first_page_url: string;
    last_page: number;
    total: number;
}


export interface categories {
    id: number;
    name: string;
}[];

export interface barnds {
    id: number;
    name: string;
}[];