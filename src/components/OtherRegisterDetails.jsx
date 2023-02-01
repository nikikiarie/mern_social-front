import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { storage } from "../firebase";
import { publicRequest } from "../makeRequest";
import { registerUser } from "../redux/apiCalls";

const OtherRegisterDetails = ({ type, data }) => {
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [password, setPassword] = useState("");
  const [dataz, setDataz] = useState({});
 

  const [success, setSuccess] = useState(false);
  const { image, firstName, lastName } = data;


  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    const storageRef = ref(storage,image.name)

  
      
     const uploadTask = uploadBytesResumable(storageRef, image);
    
   
      uploadTask.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        // Handle unsuccessful uploads
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          const product = { firstName, lastName,location,occupation,picturePath:downloadURL,password,email}
          
          registerUser(product,navigate)
        });
      }
    );


  };

  return (
    <Container type={type}>
      <Input placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
      <Input
        placeholder="Occupation"
        onChange={(e) => setOccupation(e.target.value)}
      />
      <Input
        placeholder="Location"
        onChange={(e) => setLocation(e.target.value)}
      />
      <Input
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleClick}>GET STARTED</Button>
      {success && (
        <>
          <h4>User successfully Registered</h4>
          <Link to="/login">
            <h5 style={{ color: "#099e97", textDecoration: "underline" }}>
              Please Log In
            </h5>
          </Link>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: ${(props) => (props.type === "login" ? "none" : "flex")};
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  padding: 8px 5px;
  border-radius: 5px;
  outline: none;
  border: 1px solid #69696953;
  margin: 10px 0px;
`;

const Button = styled.button`
  flex: 1;
  padding: 10px 0px;
  background-color: #00aed1;
  border: none;
  color: ${({ theme }) => theme.text};
  font-weight: 500;
  margin: 10px 0px;
`;
export default OtherRegisterDetails;
