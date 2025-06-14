import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/api";
import styled from "styled-components";

const LoginFormContainer = ({ className }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { token } = await login(formData);
      localStorage.setItem("token", token);
      navigate("/applications");
    } catch (err) {
      setError("Неверный email или пароль");
    }
  };

  return (
    <div className={className}>
      <h1>Вход для операторов</h1>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Электронная почта</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export const LoginForm = styled(LoginFormContainer)`
  max-width: 400px;
  width: 100%;
  padding: 30px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  h1 {
    text-align: center;
    margin-bottom: 25px;
    color: #333;
  }

  .error-message {
    color: #ff0000;
    text-align: center;
    margin-bottom: 15px;
    font-size: 14px;
    background-color: #ffebee;
    padding: 10px;
    border-radius: 4px;
  }

  .form-group {
    margin-bottom: 20px;

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #555;
    }

    input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 16px;
      box-sizing: border-box;
    }
  }

  button {
    width: 100%;
    padding: 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #0056b3;
    }
  }
`;
