const grpc = require("@grpc/grpc-js");
const ProductService = require("../interface/rpc/services/productService");

const server = new grpc.Server();

// add all available services
function _configureServer() {
    console.log("Configuring rpc server...");
    // add rpc product service
    server.addService(ProductService.service, ProductService.methods);
}


module.exports.initRpcServer = (appConfig) => {
    console.log("Starting rpc server...");
    _configureServer();

    server.bindAsync(
        `localhost:${appConfig.rpc.port}`,
        grpc.ServerCredentials.createInsecure(),
        (err, port) => {
            if (err) {
                // server run failed
                console.log(`[RPC] failed to listen on port ${port}`);
                console.error(err);
                process.exit(1);
            }
            console.log(`[RPC] server running on port ${port}`);
            server.start();
        }
    );
}