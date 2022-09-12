// Dépendances
import path from "path";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

// Path fichier proto
const PROTO_PATH = path.resolve() + "/../protos/grpc_tuto.proto";
const PORT = 3001;

// Chargement proto
let packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

const grpcTuto_proto = grpc.loadPackageDefinition(packageDefinition).grpctuto;

// Méthodes RPC
const grpcTutoReply = (call, callback) => {
    console.log("request");
    callback(null, { reply: `your message was: ${call.request.base}`, incNum: call.request.number + 1 })
};

// Configuration et démarrage du serveur (port: 3001)

const server = new grpc.Server();
server.addService(grpcTuto_proto.GrpcTuto.service, { grpcTutoReply: grpcTutoReply });
server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), () => {
    try {
        server.start();
        console.log(`Server running on port: ${PORT}`);
    }
    catch (err){
        console.log("Error at the server start");
        console.log(err);
    }
});
