import axios from "axios";
import { useState } from "react";

function useRequest({ url, method, body, onSuccess }) {
  const [errors, setErrors] = useState(null);

  async function doRequest() {
    try {
      setErrors(null);
      const response = await axios[method](url, body);
      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (error) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Ooops...</h4>
          <ul className="my-0">
            {error.response.data.errors.map((err) => {
              return <li key={err.message}>{err.message}</li>;
            })}
          </ul>
        </div>
      );
    }
  }

  return { doRequest, errors };
}

export default useRequest;
