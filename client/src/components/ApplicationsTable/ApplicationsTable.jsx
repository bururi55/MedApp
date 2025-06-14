import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getApplications } from "../../api/api";
import { format } from "date-fns";
import styled from "styled-components";

const ApplicationsTableContainer = ({ className }) => {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const data = await getApplications(token);
        setApplications(data);
      } catch (error) {
        console.error("Ошибка при получении заявок:", error);
        navigate("/login");
      }
    };

    fetchApplications();
  }, [navigate]);

  const filteredApplications = applications.filter(
    (application) =>
      application.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.phone.includes(searchTerm) ||
      (application.problemDescription &&
        application.problemDescription
          .toLowerCase()
          .includes(searchTerm.toLowerCase()))
  );

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (a[sortField] < b[sortField]) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (a[sortField] > b[sortField]) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  const paginatedApplications = sortedApplications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedApplications.length / itemsPerPage);

  return (
    <div className={className}>
      <h1>Заявки с формы</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Поиск..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th
                onClick={() => {
                  setSortField("createdAt");
                  setSortOrder(
                    sortField === "createdAt" && sortOrder === "asc"
                      ? "desc"
                      : "asc"
                  );
                }}
              >
                Дата отправки{" "}
                {sortField === "createdAt" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th
                onClick={() => {
                  setSortField("fullName");
                  setSortOrder(
                    sortField === "fullName" && sortOrder === "asc"
                      ? "desc"
                      : "asc"
                  );
                }}
              >
                ФИО{" "}
                {sortField === "fullName" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th
                onClick={() => {
                  setSortField("phone");
                  setSortOrder(
                    sortField === "phone" && sortOrder === "asc"
                      ? "desc"
                      : "asc"
                  );
                }}
              >
                Телефон{" "}
                {sortField === "phone" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th>Проблема</th>
            </tr>
          </thead>
          <tbody>
            {paginatedApplications.map((application) => (
              <tr key={application._id}>
                <td>
                  {format(new Date(application.createdAt), "dd.MM.yyyy HH:mm")}
                </td>
                <td>{application.fullName}</td>
                <td>{application.phone}</td>
                <td>{application.problemDescription}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Предыдущая
          </button>
          <span>
            Страница {currentPage} из {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Следующая
          </button>
        </div>
      )}
    </div>
  );
};

export const ApplicationsTable = styled(ApplicationsTableContainer)`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }

  .search-container {
    margin-bottom: 20px;

    input {
      padding: 8px;
      width: 300px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  }

  .table-container {
    overflow-x: auto;
    margin-bottom: 20px;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    th {
      background-color: #f2f2f2;
      cursor: pointer;

      &:hover {
        background-color: #e6e6e6;
      }
    }

    tr:hover {
      background-color: #f5f5f5;
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin-top: 20px;

    button {
      padding: 5px 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
      }
    }
  }
`;
