// pages/routes.js
import { Routes, Route } from "react-router-dom";
import Home from "./home";
import About from "./about";
import Contact from "./contact";
import PostList from "./PostsList";
import PostDetails from "./PostDetails";
import Err404 from "./(404 page)";
import Layout from "./layoutExpandNestedRoute";
import AddPost from "./addPost(test nested Route)";
import DeletePost from "./deletePost(test nested Route)";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> {/* Default route */}
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* ******************************************** */}
      {/* Note: here we used the regular Route */}
      {/* <Route path="/posts" element={<PostList />} />
      <Route path="/posts/:id" element={<PostDetails />} /> */}
      {/* ******************************************** */}


      {/* 
        - Note: but here we will use Nested route,
        in Nested route there are a lot of features `like specify layout`.

        - it also make the code more Prettier
      
      */}
      <Route path="/posts" element={<Layout />}>
        <Route index element={<PostList />} /> {/* this the base route of nested route = /posts */}
        <Route path=":id" element={<PostDetails />} />
        <Route path="new" element={<AddPost />} />
        <Route path="delete" element={<DeletePost />} />
      </Route>
      {/* if the route is not defined before we use `*` to match 404 page */}
      <Route path="*" element={<Err404 />} />
    </Routes>
  );
};

export default AppRoutes;
