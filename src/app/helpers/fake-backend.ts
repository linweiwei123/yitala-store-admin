import {Http, BaseRequestOptions, RequestMethod, Response, ResponseOptions} from "@angular/http";
import {MockBackend, MockConnection} from "@angular/http/testing";
/**
 * Created by yitala on 2017/1/15.
 */

export let FakeBackendProvider = {
    provide:Http,
    useFactory:(backend:MockBackend,options:BaseRequestOptions) =>{
        backend.connections.subscribe((connection:MockConnection)=>{
            let testUser = {username:'yitala',password:'123'};

            setTimeout(()=>{

                if(connection.request.url.endsWith('api/authenticate') && connection.request.method === RequestMethod.Post){
                    let params = JSON.parse(connection.request.getBody());
                    console.log(params);
                    if(params.username === testUser.username && params.password === testUser.password){
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status:200,body:{ user:{token:'fake-jwt-token'}}})
                        ));
                    }
                    else {
                        connection.mockRespond(new Response(
                            new ResponseOptions( { status:200})
                        ));
                    }
                }

            },800)
        });

        return new Http(backend,options);
    },
    deps:[MockBackend,BaseRequestOptions]
}