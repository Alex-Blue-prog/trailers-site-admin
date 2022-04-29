import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useSelector } from "react-redux"

const Home = () => {
  // const [userStats, setUserStats] = useState([]);

  // const MONTHS = useMemo(
  //   () => [
  //     "Jan",
  //     "Fev",
  //     "Mar",
  //     "Abr",
  //     "Mai",
  //     "Jun",
  //     "Jul",
  //     "Ago",
  //     "Set",
  //     "Out",
  //     "Nov",
  //     "Dez"
  //   ],
  //   []
  // );

  // useEffect(()=> {
  //   const getStats = async ()=> {
  //     try{
  //       const res = await userRequest("/users/stats");
  //       const list = res.data.sort((a,b) => {
  //         return a._id - b._id;
  //       })
  //       list.map(item=> {
  //         setUserStats(prev => [
  //           ...prev,
  //           {name:MONTHS[item._id-1], "Usuários ativos": item.total}
  //         ])
  //       });
  //     }catch{}
  //   }

  //   getStats();
  // },[MONTHS]);

  let {currentUser} = useSelector(state => state.user);


  return (
    
    <div className="home">

        {currentUser && 
        <>
          <FeaturedInfo />
          <div className="homeWidgets">
            <WidgetLg />  
          </div>
        </>
        }
        
        
    </div>
  )
}


export default Home