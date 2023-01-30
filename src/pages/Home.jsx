import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Main from "../components/Main";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { formToJSON } from "axios";

const Home = ({ lightMode, setLightMode }) => {
  const location = useLocation();
  const user = useSelector((state) => state.user.user.token);
  console.log(user);
  console.log(location);

  return (
    <Container>
      <Navbar lightMode={lightMode} setLightMode={setLightMode} />
      <Main type="main" />
    </Container>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.bgLighter};
`;
export default Home;
