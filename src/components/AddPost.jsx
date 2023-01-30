import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { AiOutlineAudio } from "react-icons/ai";
import { BiImageAdd, BiPaperclip } from "react-icons/bi";
import { BsClipboardMinus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import User from "../assets/user.jpg";
import { storage } from "../firebase";
import { privateRequest } from "../makeRequest";
import { newPost } from "../redux/apiCalls";

const AddPost = (type) => {
  const userPicture = useSelector((state) => state.user.user.picturePath);
  const userId = useSelector((state) => state.user.user._id);
  const useId = useSelector((state) => state.user.user._id);

const dispatch = useDispatch()
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
 


  const { id :paramsId } = useParams();



  const handleClick = (e) => {
    e.preventDefault();

    const storageRef = ref(storage, image.name);

    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          const post ={description,userId:userId,postPicturePath:downloadURL,picturePath:userPicture}
          newPost(post,dispatch,paramsId,useId)


         
        });
      }
    );
  };

  return (
    <Container>
      <Top>
        <UserImg>
          <Img src={userPicture} />
        </UserImg>
        <InputDiv>
          <Input
            placeholder="Whats on your mind"
            onChange={(e) => setDescription(e.target.value)}
          />
        </InputDiv>
      </Top>
      <Hr />
      <Bottom>
        <AddPostItem>
          <Dropzone onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <BiImageAdd />
                </div>
              </section>
            )}
          </Dropzone>
        </AddPostItem>
        <AddPostItem>
          <BsClipboardMinus />
        </AddPostItem>
        <AddPostItem>
          <BiPaperclip />
        </AddPostItem>
        <AddPostItem>
          <AiOutlineAudio />
        </AddPostItem>
        <AddPostButton>
          <Button onClick={handleClick}>Add Post</Button>
        </AddPostButton>
      </Bottom>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.bg};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 20px 20px 20px 20px;
  margin-bottom: 30px;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const UserImg = styled.div`
  flex: 1;
`;
const Img = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
`;
const InputDiv = styled.div`
  flex: 5;
  background: ${({ theme }) => theme.soft};
  width: 100%;
  padding: 10px;
  border-radius: 10px;
`;

const Input = styled.input`
  width: 100%;
  background: ${({ theme }) => theme.soft};
  outline: none;
  border: none;
  padding: 5px 0px 5px 0px;
  font-size: 16px;
`;
const Hr = styled.hr`
  border: 0.5px solid ${({ theme }) => theme.soft};
  margin: 15px 0px;
`;

const Bottom = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const AddPostItem = styled.div`
  flex: 1;
`;

const AddPostButton = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex: 1;
`;
const Button = styled.button`
  width: 100%;
  background: #00aed1;
  border-radius: 10px;
  border: 1px solid #00aed1;
  padding: 3px 0px;
  color: ${({ theme }) => theme.bg};
`;

export default AddPost;
