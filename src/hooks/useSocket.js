import { useContext } from "react";
import { io } from "socket.io-client"
import { SocketContext } from "../SocketProvider";
const useSocket = () => {
	const { setSocket } = useContext(SocketContext)
	const socketConection = () => {
		//  is the person is logged in then establish a connection 
		//  if not logged in then leave it 
		const isLoggedIn = localStorage.getItem("isLoggedIn") ? true : false;
		const email = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")).email : null
		let socket;
		if (isLoggedIn) {
			socket = io("http://localhost:4000", {
				query: {
					email
				}
			});
			setSocket(socket);
			socket.on("connect", () => {
				console.log("socket connection is established here : ", socket.id);
			});
		} else {
			console.log(" kindly login to connect to socket ")
		}
		return socket;
	}
	return socketConection;
}

export default useSocket;