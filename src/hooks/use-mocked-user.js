export const useMockedUser = () => {
  // To get the user from the authContext, you can use
  // `const { user } = useAuth();`
  return {
    id: '5e86809283e28b96d2d38537',
    avatar: '/assets/avatars/avatar-jane-rotanson.png',
    name: 'Jane Rotanson',
    email: 'jane.rotanson@devias.io'
  };
};
