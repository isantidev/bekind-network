export interface Category {
    id: string;
    name: string;
    icon: string;
    status: "Activo" | "Inactivo";
    description: string;
    createdDate: string;
}

export interface CategoryStore {
    categories: Category[];
    searchTerm: string;
    currentPage: number;
    itemsPerPage: number;
    setSearchTerm: (term: string) => void;
    setCurrentPage: (page: number) => void;
    setItemsPerPage: (items: number) => void;
    deleteCategory: (id: string) => void;
}
