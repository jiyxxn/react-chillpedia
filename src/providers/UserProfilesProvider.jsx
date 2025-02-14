import { createContext, useEffect, useState } from 'react';
import supabase from '../shared/supabaseClient';

// * Profiles DB context
export const UserProfileContext = createContext();

const UserProfilesProvider = ({ children }) => {
  const [allUserProfiles, setAllUserProfiles] = useState([]);

  useEffect(() => {
    const fetchUserProfiles = async () => {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*');

      if (profileError) {
        console.log('profileError=> ', profileError);
        return;
      }

      if (profileData) {
        setAllUserProfiles(profileData);
      } else {
        setAllUserProfiles([]);
      }
    };
    fetchUserProfiles();
  }, []);

  return (
    <UserProfileContext.Provider value={allUserProfiles}>
      {children}
    </UserProfileContext.Provider>
  );
};

export default UserProfilesProvider;
