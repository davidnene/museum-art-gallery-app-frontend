import React from "react";
import { useParams, useHistory } from "react-router-dom";


function DisplayRatings({ arts }) {
    const params = useParams()
    const history = useHistory()
    const id = params.id - 1

    function handleClickBack() {
        history.push('/')
    };

    return (
        <div className="card gx-1" style={{width: 25 + "rem"}}>
        <img style={{height: 220 + "px",width:220 + "px"}} src={arts[id].img_url} className="card-img-top" alt={arts[id].title}/>
        <div className="card-body">
            <h5 className="card-title">{arts[id].title}</h5>
            <p className="card-text">Artist: {arts[id].artist_title}</p>
            <button style={{position:"absolute", right:"10px"}} onClick={handleClickBack} className="btn btn-danger">Back</button>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Rating ID</th>
                            <th scope="col">Rating</th>
                            <th scope="col">Comment</th>
                            </tr>
                        </thead>
                        <tbody>
                        {arts[id].ratings.map(rating => (
                            <tr key = {rating.id}>
                            <th  scope="row">{rating.id}</th>
                            <td>{rating.art_rating}/10</td>
                            <td>{rating.comment}</td>
                            <td><button>Remove</button></td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                </div>
            
        </div>
    </div>
    )
};


export default DisplayRatings;