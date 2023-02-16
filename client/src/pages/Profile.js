import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import ThoughtForm from '../components/ThoughtForm';
import ThoughtList from '../components/ThoughtList';
import ArtList from '../components/ArtList';
import ArtContainer from '../components/ArtContainer';

import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { DEL_ART } from '../utils/mutations';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const [removeArt, { error }] = useMutation(DEL_ART);

  const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

// create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteArt = async (aId) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeArt({
        variables: { aId },
      });

    } catch (err) {
      console.error(err);
    }
    window.location.assign('/me');
  };

// HAHA why is user.gallery.reverse() not allowed
  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>
        {!userParam && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          >
            <ArtContainer />
          </div>
        )}
        <div className="col-12 col-md-10 mb-5">
          <ArtList
            art={user.gallery}
            title={`${user.username}'s gallery`}
            showTitle={false}
            showUsername={false}
            handleDeleteArt={handleDeleteArt}
            closebutton={userParam ? false : true }
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
