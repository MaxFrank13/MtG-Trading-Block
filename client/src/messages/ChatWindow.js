import React, { useState, useEffect } from "react";

import MessageInterface from './MessageInterface';

import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

export default function Chat() {

  // User information being fetched from GQL and set as a state variable
  const { loading, data } = useQuery(GET_ME);

  const [userData, setUserData] = useState(data?.me || {});

  // useEffect that fires as soon as the data comes in from the GQL request
  // sets userData to the response from the request
  useEffect(() => {

    const user = data?.me || {};

    console.log(user);

    setUserData(user);

  }, [data]);

  return (
    <MessageInterface
      userData={userData}
      setUserData={setUserData}
      loadingUser={loading}
    />
  )
}

