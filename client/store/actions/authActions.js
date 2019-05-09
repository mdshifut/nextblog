import { SET_USER } from './actionTypes';
import setAuthToken from '../../utils/setAuthToken';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import axios from 'axios';
import { inlineLoading } from '../../store/actions/metaActions';
import { catchError } from './errorActions';
import { setCookie } from '../../utils/cookieUtils';
// Sign up user/
export const signUp = ({ user, router }) => async dispatch => {
  try {
    const { message, error, id } = (await axios.post(
      '/api/user/register',
      user
    )).data;

    // If receiving the error then show the error
    if (error) {
      if (error.message) {
        toast.error(error.message);
        return {
          isSignUpDone: false
        };
      }

      // If the error is related to the input fields
      dispatch(catchError({ signUp: error }));
      return {
        isSignUpDone: false
      };
    }

    // Reset all error after  registration successful
    dispatch(catchError({ signUp: {} }));

    // Show success message
    toast.success(message, {
      onClose: () =>
        router.push(
          `/registrationconfirmation?id=${id}`,
          `/registrationconfirmation/${id}`
        ),
      autoClose: 2000
    });

    return {
      isSignUpDone: true
    };
  } catch (error) {
    toast.error("Server isn't responding. Please try again...");

    return {
      isSignUpDone: false
    };
  }
}; //End signUp

// Sign in user/
export const signIn = ({
  user,
  router,
  userMenuTrigger = null
}) => async dispatch => {
  try {
    const { message = '', error = '', token } = (await axios.post(
      '/api/user/login',
      user
    )).data;

    // If receiving the error then show the error
    if (error) {
      // If user sign in by user nav then show the error inside it
      if (userMenuTrigger) {
        dispatch(catchError({ signInNav: error }));
        return {
          isSignInDone: false
        };
      }
      // Otherwise show the error sign in page
      dispatch(catchError({ signIn: error }));
      return {
        isSignInDone: false
      };
    }

    // Reset all error after successful user registration
    dispatch(catchError({ signInNav: {}, signIn: {} }));

    localStorage.setItem('auth_token', token);

    setCookie('x-access-token', token);
    setAuthToken(token);

    const decode = jwtDecode(token);

    dispatch(setUser(decode));

    // Show success message
    toast.success(message, { autoClose: 1000 });

    // If user Sign In by User card then close it and show success message
    if (userMenuTrigger) {
      userMenuTrigger();

      return {
        isSignInDone: true
      };
    }

    // If youser Sign In by Sign In page then redirect user to the user dashboard
    // router && router.push('/dashboard');
    return {
      isSignInDone: true
    };
  } catch (error) {
    toast.error('Serve not responding. Please try again...');
    return {
      isSignInDone: false
    };
  }
}; //End Sign In

// Reset password/
export const resetPassword = ({
  userInfo,
  userMenuTrigger = null
}) => async dispatch => {
  try {
    const { message = '', error = '' } = (await axios.post(
      '/api/user/resetpasswordlinkgenerator',
      {
        userInfo
      }
    )).data;

    // If receiving the error then show the error
    if (error) {
      // If the error isn't related to the input fields
      if (error.message) {
        toast.error(error.message, { autoClose: 2000 });
        return {
          isResetDone: false
        };
      }

      // If user reset password by user nav then show the error inside it
      if (userMenuTrigger) {
        dispatch(catchError({ passwordResetNav: error }));
        return {
          isResetDone: false
        };
      }

      dispatch(catchError({ passwordReset: error }));
      return {
        isResetDone: false
      };
    }

    // Reset all error after successful user registration
    dispatch(catchError({ passwordResetNav: {}, passwordReset: {} }));

    // Show success message
    toast.success(message, { autoClose: 2000 });

    // If user reset password by User card the close it and show success message
    if (userMenuTrigger) {
      userMenuTrigger();
      return {
        isResetDone: true
      };
    }

    return {
      isResetDone: true
    };
  } catch (error) {
    toast.error('Serve not responding. Please try again...');

    return {
      isResetDone: false
    };
  }
}; //End Reset password

// Create new password/
export const createNewPassword = ({
  newPassword,
  token,
  router
}) => async dispatch => {
  try {
    const { message = '', error = '' } = (await axios.post(
      '/api/user/createnewpassword',
      {
        ...newPassword,
        token
      }
    )).data;

    // If receiving the input releted error then show the error
    if (error.password || error.confirmPassword) {
      dispatch(catchError({ createNewPassword: error }));

      return {
        isCreateNewPasswordDone: false
      };
    }

    // If receiving others error then show the error
    if (error.message) {
      toast.error(error.message);
      return {
        isCreateNewPasswordDone: false
      };
    }

    // Reset all error after creating new password successfully
    dispatch(catchError({ createNewPassword: error }));

    toast.success(message, { autoClose: 1000 });
    return router.push('/signin');
  } catch (error) {
    toast.error('Serve not responding. Please try again...');
    return {
      isCreateNewPasswordDone: false
    };
  }
}; //End Reset password

// Send new Activation link
export const sendNewActivationLink = (user, router) => async dispatch => {
  try {
    dispatch(inlineLoading(true));

    const { message, error, type } = (await axios.get(
      `/api/user/resendlink/${user}`
    )).data;

    if (error) {
      dispatch(inlineLoading(false));
      return toast.error(error.message, {
        autoClose: 4000
      });
    }

    toast.success(message, {
      autoClose: 4000,
      onClose: () => {
        if (type === 'ACTIVATED') {
          router.push('/signin');
        }
      }
    });

    return dispatch(inlineLoading(false));
  } catch (error) {
    if (error) {
      dispatch(inlineLoading(false));
      return toast.error('Server Error', {
        autoClose: 4000
      });
    }
  }
}; // Send new Activation link

// Set user
export const setUser = user => {
  return {
    type: SET_USER,
    payload: {
      user: user ? user : null
    }
  };
}; // Set user

// Signout user
export const signOut = () => dispatch => {
  localStorage.removeItem('auth_token');
  setAuthToken();
  dispatch(setUser());
};
