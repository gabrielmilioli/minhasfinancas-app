import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

class NotificationUtils {

  static show(type, message) {
    var options = {
      autoClose: 5000,
      type: toast.TYPE.INFO,
      hideProgressBar: false,
      position: toast.POSITION.BOTTOM_LEFT,
      pauseOnHover: true,
    };

    switch (type) {
      case 'success':
        options.type = toast.TYPE.SUCCESS;
        toast.success(message, options);
        break;
      case 'info':
        options.type = toast.TYPE.INFO;
        toast.info(message, options);
        break;
      case 'warning':
        options.type = toast.TYPE.WARNING;
        toast.warn(message, options);
        break;
      case 'error':
        options.type = toast.TYPE.ERROR;
        toast.error(message, options);
        break;
      default:
        break;
    }
  };
};

export default NotificationUtils;