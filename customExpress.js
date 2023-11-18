const http = require('http');
const url = require('url');

const executeHandlers = [];

const customExpress = () => {
    const server = http.createServer((req, res) => {
        const request = defaultRequest(req);
        const response = defaultResponse(res);

        executeHandlerFn(request, response);
    });

    return {
        use(handler) {
            executeHandlers.push(handler)
        },
        get(path, callback){
            this.use((req, res, next) => {
                console.log("GET");
                if(req.method === 'GET' && req.url === path) {
                    callback(req, res);
                }
                next();
            })
        },
        post(path, callback) {
            this.use((req, res, next) => {
                if(req.method === 'POST' && req.url === path) {
                    console.log("calling cb");
                    callback(req, res);
                }
                if(next) next();
            })
        },
        listen(port, callback) {
            server.listen(port, callback);
        }
    }

}

const executeHandlerFn = (req, res) => {
    let index = 0

    const next = () => {
        if(index >= executeHandlers.length) return;

        const handler = executeHandlers[index++];


        if(handler) {
            handler(req, res, next)
        }

    }

    next();
    return;
}

const defaultRequest = (inputReq) => {
    const parsedUrl = url.parse(inputReq.url, true);

    return {
        method: inputReq.method,
        url: parsedUrl.pathname,
        query: parsedUrl.query,
        headers: inputReq.headers,
        on(event, callback) {
            inputReq.on(event, callback);
        }
    }
}

const defaultResponse = (inputResponse) => {
    return {
        statusCode: 200,
        headers: {},
        end(text) {
            inputResponse.end(text)
        }
     }
}

module.exports = customExpress