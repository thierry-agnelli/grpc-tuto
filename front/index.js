// Dépendances
import path from "path";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

// Path fichier proto
const PROTO_PATH = path.resolve() + "/../protos/grpc_tuto.proto";
// const PROTO_PATH = "./grpc_tuto.proto";

// Chargement proto
// let packageDefinition = protoLoader.loadSync(
//     PROTO_PATH,
//     {
//         keepCase: true,
//         longs: String,
//         enums: String,
//         defaults: true,
//         oneofs: true
//     });

let packageDefinition = protoLoader.loadSync(PROTO_PATH);

const grpcTuto_proto = grpc.loadPackageDefinition(packageDefinition).grpctuto;


const client = new grpcTuto_proto.GrpcTuto("localhost:3001", grpc.credentials.createInsecure());


client.grpcTutoReply({base: "Hello There!", number: 17}, (err, response) => {
    console.log("Server response :", response.reply, response.incNum);
});
