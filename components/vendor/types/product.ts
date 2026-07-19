export interface ProductFormData {
    name: string;
    category: string;
    shortDescription: string;

    price: string;
    discountPrice: string;
    quantity: string;

    weight: string;
    length: string;
    width: string;
    height: string;

    color: string;
    size: string;
    warranty: string;
    images: File[];
}

export interface ProductFormErros {
    name: string;
    category: string;
    shortDescription: string;

    price: string;
    discountPrice: string;
    quantity: string;

    weight: string;
    length: string;
    width: string;
    height: string;

    color: string;
    size: string;
    warranty: string;
    images: string;
}

export interface ProductFormTouched {
    name: boolean;
    category: boolean;
    shortDescription: boolean;

    price: boolean;
    discountPrice: boolean;
    quantity: boolean;

    weight: boolean;
    length: boolean;
    width: boolean;
    height: boolean;

    color: boolean;
    size: boolean;
    warranty: boolean;
    images: boolean;
}