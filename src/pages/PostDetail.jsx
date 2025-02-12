import React, { useEffect, useState } from 'react';
import supabase from '../shared/supabaseClient';

const PostDetail = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('TASTY_DB').select('*');
      if (error) {
        console.log('error=> ', error);
      } else {
        console.log('data=> ', data);
        setUsers(data);
      }
    };
    fetchData();
  }, []);

  return <div>PostDetail</div>;
};

export default PostDetail;
