import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import fetch from 'src/hooks/use-fetch';
import { TOKEN } from 'src/constant/auth';
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";
const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });


export const AuthProvider = (props) => {
  const cookie = new Cookies();
  const router = useRouter()
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;
    const token = cookie.get(TOKEN, {path: '/'})
    if (token) {
      isAuthenticated = true
      router.push('/')
      setBearer(token)
    } 
    else router.push('/auth/login')


    if (isAuthenticated) {
      const user = decodedJWT(token)

    dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    []
  );

  const setBearer = (token) => {
    fetch.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  const decodedJWT = (payload) => {
    const user = jwtDecode(payload)
    return user
  }

  const signIn = async (email, password) => {

    try {
      const response = await fetch.post("/cms/auth/signin",{ email: email, password: password })
      if (response) {
        const user = decodedJWT(response.data.data.token)
        if (user) {
          dispatch({
            type: HANDLERS.SIGN_IN,
            payload: user
          });
        }
        cookie.set(TOKEN, response.data.data.token, { path: '/' });
        setBearer(response.data.data.token)
      }
    } catch (err) {
      console.error(err);
      throw new Error('Please check your email and password');
    }


  };

  const signUp = async (email, name, password) => {
    throw new Error('Sign up is not implemented');
  };

  const signOut = () => {
    cookie.remove(TOKEN, { path: '/' });
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
