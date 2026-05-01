import styled from "styled-components";
import "../App.css";

export const Button = styled.button`
  background-color: #12d312;
  padding: 8px 20px;
  border: none;
  border-radius: 10px;
  color: white; 
  cursor: pointer; 
  transition: 0.3s; 

  &:hover {
    background-color: rgb(19, 180, 19);
  }

  &:active {
    transform: scale(0.98); 
  }
`;