import axios from 'axios';
import { toast } from 'react-toastify';
import { inlineLoading } from '../store/actions/metaActions';
import store from '../store';
const sendNewActivationLink = async userId => {
  try {
    store.dispatch(inlineLoading(true));

    const { message, error } = (await axios.get(
      `/api/user/resendlink/${userId}`
    )).data;
    if (error) {
      store.dispatch(inlineLoading(false));
      return toast.error(error.message, {
        autoClose: 4000
      });
    }

    toast.success(message, {
      autoClose: 4000
    });

    return store.dispatch(inlineLoading(false));
  } catch (error) {
    if (error) {
      store.dispatch(inlineLoading(false));
      return toast.error('Server Error', {
        autoClose: 4000
      });
    }
  }
};

export default sendNewActivationLink;
