import React from "react";
import styled from "styled-components";
import AddPost from "./AddPost";
import Posts from "./Posts";

const Center = ({type,id}) => {
  console.log(type)
  return (
    <Container>
      <AddPost type={type} />
      <Posts type={type} id={id}/>
    </Container>
  );
};

const Container = styled.div`
  flex: 1.5;
  display: flex;
  flex-direction: column;
  
`;
export default Center;
