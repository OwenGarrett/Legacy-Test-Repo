import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Container from './Container';
import Row from './Row';
import Col from './Col';
import Card from './Card';
import SearchForm from './SearchForm';
import ArtDetail from './ArtDetail';
import API from '../../utils/API';

import { ADD_ART } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';

const ArtContainer = () => {
  const [result, setResult] = useState({});
  const [search, setSearch] = useState('');
const [addArt, { error }] = useMutation(ADD_ART); 

  // When the search form is submitted, use the API.search method to search for the movie(s)
  const searchMovie = (query) => 
    API.artsearch(query)
      .then((res) => { 
        if (!res.data.objectIDs) {return setResult({title: ""});}
        //var i = 0;
        for (let i=0; i<2; i++) {
        API.artobject(res.data.objectIDs[i])
         .then((x) => { 
         console.log(i);
         if (x.data.primaryImageSmall != "" && i<2) {
         
         return setResult(x.data);i = 2;}
         })
         .catch((err) => console.log(err))
      }
       return setResult({title: ""});
      })
      .catch((err) => console.log(err));

  // useEffect hook runs on startup only. starts with a preset movie
  useEffect(() => {
    searchMovie('mona lisa');
  },[]);

  // handleInputChange lets you type in the search textbox
  const handleInputChange = (event) => {
    console.log(event.target.value);
     setSearch(event.target.value);
  };

  //  Fix the handleFormSubmit function not actually searching for the movie
  const handleFormSubmit = (e) => {
    e.preventDefault();
    searchMovie(search);
  };

  const handleArtSubmit = async (e) => {
    e.preventDefault();
let aid = parseInt(result.objectID);
 const atitle = result.title;
    try {
console.log(aid)
      const { data } = await addArt({
        variables: {
          artId: result.objectID,
          artTitle: atitle,
          artImage: result.primaryImageSmall,
          thoughtAuthor: Auth.getProfile().data.username,
        },
      });
       window.location.assign('/me');
    } catch (err) {
      console.error(err);
      } 
    };


  // Destructure the result object to make the code more readable, assign them to empty strings to start
  const {
    title = '',
    primaryImageSmall = '',
    artistDisplayName = '',
    department = '',
    accessionYear = '',
  } = result;

  /* Fall back to default header if `Title` is undefined
  Does `Title` exist? If so, render the `ArtDetail` card 
  If not, render a different header */

  return (
    <Container>
      {Auth.loggedIn() ? (
      <Row>
        <Col size="md-8">
          <Card heading={title || 'Search Again'}>
            {title ? (
              <ArtDetail
                title={title}
                src={primaryImageSmall}
                director={artistDisplayName}
                genre={department}
                released={accessionYear}
              />
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Card>
        </Col>
        <Col size="md-4">
          <Card heading="Search">
            <SearchForm
              value={search}
              handleInputChange={handleInputChange}
              handleFormSubmit={handleFormSubmit}
              handleArtSubmit={handleArtSubmit}
            />
          </Card>
        </Col>
      </Row>) : (
        <p>
          Sign up to start making a gallery! Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </Container>
  );
};

export default ArtContainer;
