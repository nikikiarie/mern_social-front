import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { privateRequest } from "../makeRequest";
import { getFriends } from "../redux/userSlice";
import UserFriendWidget from "./UserFriendWidget";

const FriendsList = ({ type }) => {
  const [friend,setFriends] = useState([])
  const userId = useSelector((state) => state.user.user._id);
const {id} = useParams()
console.log(id)
  const friends = useSelector((state) => state.user.user.friends);
  console.log(friends)
  const dispatch = useDispatch()

  const token = useSelector((state)=>state.user.user.token)

  const fetchFriends = async(m) =>{
    const res = await privateRequest.get(`/users/friends/${m}`,{headers:{token: `Bearer ${token}`}})
    console.log(res.data)
    dispatch(getFriends(res.data))
    id && setFriends(res.data)
    
  }

useEffect(()=>{
  if (type === "main"){
    fetchFriends(userId)
  }else{
    fetchFriends(id)
  }
},[id,])

  return (
    <Container>
      <FriendsText>FriendsList</FriendsText>
      <FriendsListItem >
        { type === "main" ? friends.map((item) => {
          return <UserFriendWidget  key= {item._id} friend ={item}  />;
        })
      : friend.map((item) => {
        return <UserFriendWidget  key= {item._id} friend ={item} type={type}/>;
      })
      }
      </FriendsListItem>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.bg};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const FriendsText = styled.span`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;
const FriendsListItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export default FriendsList;
