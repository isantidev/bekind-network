import type { CategoryStore } from "@tstypes/activities";
import { create } from "zustand";

export const useCategoryStore = create<CategoryStore>((set) => ({
    categories: [
        {
            id: "1",
            name: "Foto + Descripción",
            icon: "📷",
            status: "Activo",
            description:
                "Realizar actividad física al menos 30 minutos cada día",
            createdDate: "Abr 3, 2024",
        },
        {
            id: "2",
            name: "Foto + Descripción",
            icon: "📷",
            status: "Activo",
            description:
                "Realizar actividad física al menos 30 minutos cada día",
            createdDate: "Abr 3, 2024",
        },
    ],
    searchTerm: "",
    currentPage: 1,
    itemsPerPage: 10,
    setSearchTerm: (term) => set({ searchTerm: term }),
    setCurrentPage: (page) => set({ currentPage: page }),
    setItemsPerPage: (items) => set({ itemsPerPage: items }),
    deleteCategory: (id) =>
        set((state) => ({
            categories: state.categories.filter((cat) => cat.id !== id),
        })),
}));
