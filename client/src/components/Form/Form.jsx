import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitApplication } from "../../api/api";
import styled from "styled-components";

const FormContainer = ({ className }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    problemDescription: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "ФИО обязательно для заполнения";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Номер телефона обязателен для заполнения";
    } else if (!/^\+?[0-9\s\-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Некорректный номер телефона";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      await submitApplication(formData);
      setIsSubmitted(true);
      setFormData({
        fullName: "",
        phone: "",
        problemDescription: "",
      });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  return (
    <div className={className}>
      <h1>Запись к врачу</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ФИО</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={errors.fullName ? "error" : ""}
          />
          {errors.fullName && (
            <span className="error-message">{errors.fullName}</span>
          )}
        </div>

        <div className="form-group">
          <label>Номер телефона</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+7 (XXX) XXX-XX-XX"
            className={errors.phone ? "error" : ""}
          />
          {errors.phone && (
            <span className="error-message">{errors.phone}</span>
          )}
        </div>

        <div className="form-group">
          <label>Опишите вашу проблему</label>
          <textarea
            name="problemDescription"
            value={formData.problemDescription}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={isSubmitted}>
          {isSubmitted ? "Отправлено!" : "Отправить"}
        </button>
      </form>
    </div>
  );
};

export const Form = styled(FormContainer)`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  label {
    font-weight: bold;
    color: #555;
  }

  input,
  textarea {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }

  input.error {
    border-color: #ff0000;
  }

  .error-message {
    color: #ff0000;
    font-size: 14px;
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }

  button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;

    &:hover {
      background-color: #45a049;
    }

    &:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
  }
`;
