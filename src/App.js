import './App.css';
import {useState, useEffect} from 'react';
import Card from './Card';
import DisplayRatings from './DisplayRatings';
import {Route, Switch} from 'react-router-dom';
import Header from './Header';

function App() {
  const [arts, setArts] = useState([])
  const [refresh, setRefresh] = useState(1)

  function handleArts() {
    fetch('https://museum-art-gallery-app.herokuapp.com/arts')
    .then(res => res.json())
    .then(data => setArts(data)
    )
  };

  useEffect(handleArts, [refresh])

  return (
    <div>
  <Switch>
  <Route exact path={`/:id`}>
        <DisplayRatings arts = {arts}/>
  </Route>
  <Route exact path={'/'}>
    <Header/>
  <div className='container'>
    <div className='row'>
      {arts.map(art => (
        <Card key = {art.id} id = {art.id} title = {art.title} image = {art.img_url} altText = {art.alt_text} artistTitle = {art.artist_title} dateStart = {art.date_start} dateEnd = {art.date_end} setArts = {setArts} arts = {arts} setRefresh = {setRefresh} refresh = {refresh}></Card> ))}
    </div>
  </div>
  </Route>
  </Switch>  
  </div>
  )
};

export default App;
