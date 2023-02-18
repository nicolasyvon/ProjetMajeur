export default class NotificationService {
    
    instance = null;

    constructor(server){
        this.ioServer = server;
        this.sockets_list = new Map();
        this.userConnection=this.userConnection.bind(this);
        this.notifyUser=this.notifyUser.bind(this);
        this.setServer=this.setServer.bind(this);
    }

    static getInstance(server){
        if(!this.instance)  
        {
            this.instance =  new NotificationService(server);
        }
        return this.instance;
    }

    setServer(server){
        this.ioServer = server;
    }

    userConnection(socket,userId){
        if(userId != undefined){
            this.sockets_list.set(userId.toString(),socket)
        }
    }

    usersConnected(){
        return(Array.from(this.sockets_list.keys()));
    }

    notifyUser(userId,event,data){       
        try{
            this.sockets_list.get(userId.toString()).emit(event,data);
        }
       catch{
        //console.log("issue",userId,event,data)
       }
       finally{
        //console.log("done")
       }
    }
}
