import "./app.css";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newPage/NewUser";
import NewAnime from "./pages/newAnime/NewAnime";
import Login from "./pages/login/Login";
import {useSelector} from "react-redux";
import AnimesList from "./pages/animesList/AnimesList";
import Anime from "./pages/anime/Anime";
import AddAnimeEps from "./pages/addAnimeEps/AddAnimeEps";
import AnimesEpsList from "./pages/animeEpsList/AnimesEpsList";
import NewEp from "./pages/newEp/NewEp";


function App() {

  let {currentUser} = useSelector(state => state.user);

  if(currentUser) {
    if(!currentUser.isAdmin) {
      currentUser = null;
    }
  }

  // currentUser = true;

  return (
    <Router>
      {currentUser &&  <Topbar />}
     
      <div className="container">
        {currentUser && <Sidebar />}
        

        <Routes>
          <Route path="/" element={currentUser ? <Home /> : <Navigate to="/login" />}/>
          <Route path="/users" element={currentUser ? <UserList /> : <Navigate to="/login" />} />
          <Route path="/user/:userId" element={currentUser ? <User /> : <Navigate to="/login" />} />
          <Route path="/newUser" element={currentUser ? <NewUser /> : <Navigate to="/login" />} />
          <Route path="/animes" element={currentUser ? <AnimesList /> : <Navigate to="/login" />} />
          <Route path="/anime/:animeId" element={currentUser ? <Anime /> : <Navigate to="/login" />} />
          <Route path="/newanime" element={currentUser ? <NewAnime /> : <Navigate to="/login" />} />
          <Route path="/anime/ep/:animeId" element={currentUser ? <AddAnimeEps /> : <Navigate to="/login" />} />
          <Route path="/anime/eps/:animeId" element={currentUser ? <AnimesEpsList /> : <Navigate to="/login" />} />
          <Route path="/anime/epscreate/:animeId" element={currentUser ? <NewEp /> : <Navigate to="/login" />} />
          <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/" />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;



// function App() {

//   const [admin, setAdmin] = useState(false);


//   useEffect(()=> {
//     if(localStorage.getItem("persist:root")){

//       if(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser) {
//         setAdmin(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.isAdmin);
//       }
//     }
//   },[]);
  

//   console.log(admin);

  

//   return (
//     <Router>
//       {admin &&  <Topbar />}
     
//       <div className="container">
//         {admin && <Sidebar />}
        

//         <Routes>
//           <Route path="/login" element={!admin ? <Login /> : <Navigate to="/" />} />
//           { admin &&
//           <>
//             <Route path="/" element={<Home />}/>
//             <Route path="/users" element={<UserList />} />
//             <Route path="/user/:userId" element={<User />} />
//             <Route path="/newUser" element={<NewUser /> } />
//             <Route path="/products" element={<ProductList /> } />
//             <Route path="/product/:productId" element={<Product /> } />
//             <Route path="/newproduct" element={<NewProduct /> } />
//           </>
//           }
          
//         </Routes>
        
//       </div>
//     </Router>
//   );
// }

// export default App;


