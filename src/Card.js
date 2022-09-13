import { useState } from "react"
import { Link } from "react-router-dom"

function Card({ id, title, image, altText, artistTitle, dateStart, dateEnd, setArts, arts, refresh, setRefresh}) {
    const [ratingInput, setRatingInput] = useState(0)
    const [commentInput, setCommentInput] = useState('')
    const [rated, setRated] = useState(false)

    function handleOnChangeRating(e) {
        setRatingInput(e.target.value)
    };

    function handleOnChangeComment(e) {
        setCommentInput(e.target.value)
    }
    const btn = rated? "btn btn-success": "btn btn-warning"

    const data = {
        art_rating: ratingInput,
        comment: commentInput,
        art_id: id
    }

    const appendRating = (arts) => {
        const artsUpdated = [...arts]
        for(let art of artsUpdated) {
            if (art.id === id) {
                art.ratings.concat(data)
            }
            return artsUpdated
        }
    }


    function handleRatingSubmit(e) {
        e.preventDefault()
        fetch('https://museum-art-gallery-app.herokuapp.com/ratings', {
            method: 'POST',
            headers:{
                'content-Type':'application/json',
            },
            body : JSON.stringify(data)
        })
        .then(res => res.json())
        .then(rating => console.log('success', rating))
        setArts(appendRating(arts))
        setRefresh(()=> refresh += 1)
        setCommentInput('')
        setRatingInput(0)
        setRated(true)
        
    }


    return (
        <div className='col'>
            <div className="card gx-1" style={{width: 23 + "rem", height: 37 + "rem"}}>
                <img style={{height: 220 + "px",width:220 + "px"}} src={image} className="card-img-top" alt={altText} title={altText}/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5><br/>
                    <figcaption className="blockquote-footer">
                       <b>Artist:</b> <cite title="Source Title"><b>{artistTitle}</b></cite>
                    </figcaption>
                    <p className="card-text"> <b>Date started :</b> {dateStart} <b>Date ended : </b>{dateEnd}</p>
                    <p className="card-text"><b>Rating :</b> {ratingInput}</p>
                    <form onSubmit={handleRatingSubmit}>
                    <input onChange={handleOnChangeRating} type="range" className ="form-range" min="0" max="10" step="2" id="customRange3" value={ratingInput}></input>
                    <input onChange={handleOnChangeComment} className ="form-control" type="text" placeholder="Add comment here" aria-label="default input example" required value={commentInput}></input><br/>
                    <button type = "submit" className= {btn} >{rated? "Rated!":"Rate this art"}</button>
                    </form>
                    <Link exact="true" to={`/${id}`} >View Ratings</Link> 
                </div>
            </div>
        </div>
        
        )
}

export default Card