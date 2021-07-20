const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = __dirname + "/../../interface/rpc/proto/product.proto";

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const ProductService = grpc.loadPackageDefinition(packageDefinition).ProductService;

module.exports.productClient = new ProductService(
    `localhost:${process.env.RPC_PORT}`,
    grpc.credentials.createInsecure()
);

module.exports.getProductClient = (port) => {
    return new ProductService(
        `localhost:${port || process.env.RPC_PORT}`,
        grpc.credentials.createInsecure()
    );
}