export const validateName = (name: string): string | null => {
    if (!name.trim()) return "Name is required";
    if (name.length < 3) return "Name must be at least 3 characters";
    return null;
};

export const validateCategory = (category: string): string | null => {
    if (!category.trim())
        return "Category is required.";
    return null;
};

export const validateShortDescription = (description: string): string | null => {
    if (!description.trim()) return "Required";
    if (description.length < 20) return "Must be at least 20 characters";
    return null;
};

export const validatePrice = (price: string): string | null => {
  if (!price.trim()) return "Price is required";
  if (isNaN(Number(price)) || Number(price) <= 0) return "Price must be a valid positive number";
  return null;
};

export const validateQuantity = (quantity: string): string | null => {
    if (!quantity.trim()) return "Quantity is required";
    if (isNaN(Number(quantity)) || Number(quantity) <= 0) return "Quantity must be a valid positive number";
    return null;
};

export const validateWeight = (weight: string): string | null => {
    if (!weight.trim()) return "Weight is required";
    if (isNaN(Number(weight)) || Number(weight) <= 0) return "Weight must be a valid positive number";
    return null;
};

export const validateLength = (length: string): string | null => {
    if (!length.trim()) return "Length is required";
    if (isNaN(Number(length)) || Number(length) <= 0) return "Length must be a valid positive number";
    return null;
};

export const validatetColor = (colour: string): string | null => {
    if (!colour.trim()) return "Colour is required";
    if (colour.length < 3) return "Colour must be at least 3 characters";
    if (!/^[a-zA-Z\s\-]+$/.test(colour)) return "Colour should only contain letters and spaces";
    return null;
};

export const validateSize = (size: string): string | null => {
    if (!size.trim()) return "Size is required";
    if (isNaN(Number(size)) || Number(size) <= 0) return "Price must be a valid positive number";
    return null;
};

export const validateImageUpload = (files: File[]) => {
   if (files.length === 0) {
    return "Please upload at least one product image.";
  }

  if (files.length > 10) {
    return "You can upload a maximum of 10 images.";
  }

    return null;
};