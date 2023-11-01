import { useState } from "react";
import axios from "axios";


const useRequest = ({ url, method, body, onSucess }) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        try {
            setErrors(null);
            const response = await axios[method](url, body);
            if (onSucess) {
                onSucess(response.data);
            }
            return response.data;
        } catch (err) {
            setErrors(
                <div className="alert alert-danger">
                    <h4>Oops..</h4>
                    <ul className="my-0">
                        {err.response.data.errors.map((err, i) =>
                            <li key={i} className="text-danger">{err.field}: {err.message}</li>)}
                    </ul>
                </div>
            );
        }
    }

    return { doRequest, errors }
}

export default useRequest;