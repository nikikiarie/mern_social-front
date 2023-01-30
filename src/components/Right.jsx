import React from "react";
import styled from "styled-components";
import Advert from './Advert'
import FriendsList from "./FriendsList";

const Right = ({type}) => {
  return <Container type={type}> 
    <Advert/>
    <FriendsList type={type}/>
  </Container>;
};

const Container = styled.div`
  flex: 1;
  display:${({type})=> type ==="profile" && "none"  };


`;
export default Right;
