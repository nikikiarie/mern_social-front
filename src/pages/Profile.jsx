import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Main from "../components/Main";
import Navbar from "../components/Navbar";

const Profile = ({lightMode,setLightMode}) => {
  const {id} =  useParams()
  console.log(id)
  return (
    <Container>
      <Navbar lightMode={lightMode} setLightMode={setLightMode} />
      <Main type="profile" id={id} />
    </Container>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.bgLighter};
`

export default Profile;
