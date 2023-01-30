import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import { BsBrightnessHigh } from "react-icons/bs";
import { BiMessageDetail } from "react-icons/bi";
import { MdNotificationsNone } from "react-icons/md";
import { BiHelpCircle } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ lightMode, setLightMode, type }) => {
  const [openModal, setOpenModal] = useState(false);
 

  const user = useSelector((state) => state.user.user);
  

  const dispatch = useDispatch();
  const fullName = `${user?.firstName} ${user?.lastName}`;
  console.log(fullName);
  const navigate = useNavigate();

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(logOut());
    navigate("/login");
  };
  return (
    <Container>
      <Wrapper type={type}>
        <Left>
          <Link to="/" style={{textDecoration:"none"}} >
          <Logo>SOCIOPEDIA</Logo>
          
          </Link>
          <Search type={type}>
            <Input placeholder="Search" />
            <AiOutlineSearch />
          </Search>
        </Left>
        <Right type={type}>
          <Icon>
            <BsBrightnessHigh onClick={() => setLightMode(!lightMode)} />
          </Icon>
          <Icon>
            <BiMessageDetail />
          </Icon>
          <Icon>
            <MdNotificationsNone />
          </Icon>
          <Icon>
            <BiHelpCircle />
          </Icon>
          <DropDown>
            <Name>{fullName}</Name>
            <IoMdArrowDropdown onClick={() => setOpenModal((prev) => !prev)} />
            {openModal ? (
              <button onClick={handleLogOut}>LogOut</button>
            ) : undefined}
          </DropDown>
        </Right>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  align-items: center;
  background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  padding: 1rem 6%;
  display: flex;
  justify-content: space-between;
`;
const Left = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const Logo = styled.h1`
  font-weight: 1500;
  color: #00aed1;
  font-size: 25px;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  background-color: #dad6d6;
  padding: 0px 0.5rem;
  border-radius: 10px;
  > svg {
    color: #00aed1;
  }
`;

const Input = styled.input`
  display: flex;
  border: none;
  outline: none;
  background-color: #dad6d6;
  color: black;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.text};
  margin: 0px 12px;
`;

const DropDown = styled.div`
  border: 1px solid gray;
  background-color: #dad6d6;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  margin-left: 20px;
  border-radius: 10px;
  > svg {
    color: black;
  }
`;

const Name = styled.span`
  font-size: 12px;
  color: black;
`;

export default Navbar;
