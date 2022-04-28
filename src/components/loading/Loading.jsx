import './loading.css';
import { useSelector } from 'react-redux';

const Loading = ({text}) => {
    let progressBar = useSelector(state => state.anime.progressBar);
    let fetching = useSelector(state => state.anime.isFetching);
  

    return (
        <>
        {fetching && 
            <div>
                <div className="loadingContainer">
                    {text ? "DELETANDO" : "FAZENDO UPLOAD"}
                    <div className="loading"></div>
                    <div className="loading dot2"></div>
                    <div className="loading dot3"></div>
                </div>
            

                <div className="progressBar" style={{width: progressBar + '%'}} ></div>
           
            </div>
        }
        </>
    )
}

export default Loading;