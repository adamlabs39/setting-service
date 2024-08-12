import NotfoundException from "../exception/notfound-exception.js";
import BadRequestException from "../exception/bad-request-exception.js";

const errorMiddleware = (error, request, response) => {
    if (error instanceof NotfoundException) {
        response.status(error.code).json({message: error.message});
    } else if (error instanceof BadRequestException) {
        response.status(error.status).json({message: error.message});
    }

    response.status(500).json({message: error.stack});
};

export default errorMiddleware;