import { privateRequest, publicRequest } from "../makeRequest";
import { replaceLikedPost, setNewPost } from "./postSlice";
import { replaceProfilePost, setOnePost } from "./profilePostSlice";
import { addUser, isError, isLoading } from "./userSlice";
import { getFriends } from "./userSlice";

export const logIn = async (dispatch, navigate, user) => {
  try {
    dispatch(isLoading());
    const res = await publicRequest.post("/auth/login", user);
    console.log(res.data);
    dispatch(addUser(res.data));
    const data = res.data;
    navigate("/", { state: data });
  } catch (error) {
    dispatch(isError());
  }
};

export const registerUser = async (product, navigate) => {
  console.log(product);
  try {
    const res = await publicRequest.post("/auth/register", { ...product });
    navigate("/login");
    console.log(res.data);
  } catch (err) {}
};

export const newPost = async (post, dispatch, paramsId, useId, token) => {
  console.log(post);
  console.log({ ...post });
  try {
    const res = await privateRequest.post(
      "/posts/new",
      { ...post },
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
    console.log(res.data);
    dispatch(setNewPost(res.data));
    dispatch(setOnePost({ paramsId, useId, ...res.data }));
  } catch (err) {}
};

export const addRemoveFriend = async (
  dispatch,
  userId,
  postId,
  setError,
  token
) => {
  console.log(userId, postId);
  try {
    const res = await privateRequest.patch(
      "/users/friend/",
      { id: userId, friendId: postId },
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
    console.log(res.data);
    dispatch(getFriends(res.data));
  } catch (err) {
    console.log(err);
    setError(err.response.data);
  }
};

export const likeDislike = async (dispatch, userId, postId, token) => {
  const id = userId;
  try {
    const res = await privateRequest.patch(
      "/posts/like",
      { userId: userId, postId: postId },
     
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
    dispatch(replaceLikedPost(res.data));
    dispatch(replaceProfilePost({ ...res.data, id }));
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};
