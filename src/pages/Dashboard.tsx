import { useState } from "react";
import { Search, SlidersHorizontal, Pencil, Trash2, Eye } from "lucide-react";
import { useCategoryStore } from "@context/Categories";

// Component
export const DashboardPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<
        "categorias" | "tipos" | "evidencias"
    >("categorias");
    const {
        categories,
        searchTerm,
        currentPage,
        itemsPerPage,
        setSearchTerm,
        setCurrentPage,
        setItemsPerPage,
    } = useCategoryStore();

    const filteredCategories = categories.filter(
        (cat: any) =>
            cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cat.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedCategories = filteredCategories.slice(startIndex, endIndex);

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Categorías</h1>

            <div className="tabs-container">
                <button
                    className={`tab ${
                        activeTab === "categorias" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("categorias")}
                >
                    Categorías
                </button>
                <button
                    className={`tab ${activeTab === "tipos" ? "active" : ""}`}
                    onClick={() => setActiveTab("tipos")}
                >
                    Tipos
                </button>
                <button
                    className={`tab ${
                        activeTab === "evidencias" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("evidencias")}
                >
                    Evidencias
                </button>
            </div>

            <div className="toolbar">
                <div className="toolbar-left">
                    <div className="search-box">
                        <Search className="search-icon" />
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Buscar"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="filter-btn">
                        <SlidersHorizontal size={18} />
                        Filtros
                    </button>
                </div>
                <button className="create-btn">Crear tipo de categoría</button>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Nombre de la categoría</th>
                            <th>Ícono de la categoría</th>
                            <th>Estado</th>
                            <th>Descripción</th>
                            <th>Fecha de creación</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedCategories.map((category: any) => (
                            <tr key={category.id}>
                                <td>{category.name}</td>
                                <td>
                                    <div className="icon-cell">
                                        {category.icon}
                                    </div>
                                </td>
                                <td>
                                    <span className="status-badge">
                                        {category.status}
                                    </span>
                                </td>
                                <td>{category.description}</td>
                                <td>{category.createdDate}</td>
                                <td>
                                    <div className="actions-cell">
                                        <button
                                            className="action-btn"
                                            title="Editar"
                                        >
                                            <Pencil size={18} />
                                        </button>
                                        <button
                                            className="action-btn"
                                            title="Eliminar"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                        <button
                                            className="action-btn"
                                            title="Ver"
                                        >
                                            <Eye size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="pagination">
                    <div className="pagination-info">
                        <span>Resultados por página</span>
                        <select
                            className="pagination-select"
                            value={itemsPerPage}
                            onChange={(e) =>
                                setItemsPerPage(Number(e.target.value))
                            }
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>

                    <div className="pagination-controls">
                        <span className="pagination-text">
                            {startIndex + 1} -{" "}
                            {Math.min(endIndex, filteredCategories.length)} de{" "}
                            {filteredCategories.length}
                        </span>
                        <button
                            className="pagination-btn"
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                        >
                            «
                        </button>
                        <button
                            className="pagination-btn"
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            ‹
                        </button>
                        <button
                            className="pagination-btn"
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            ›
                        </button>
                        <button
                            className="pagination-btn"
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages}
                        >
                            »
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
