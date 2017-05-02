"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var testing_1 = require("@angular/http/testing");
/**
 * Created by yitala on 2017/1/15.
 */
exports.FakeBackendProvider = {
    provide: http_1.Http,
    useFactory: function (backend, options) {
        backend.connections.subscribe(function (connection) {
            var testUser = { username: 'yitala', password: '123' };
            setTimeout(function () {
                if (connection.request.url.endsWith('api/authenticate') && connection.request.method === http_1.RequestMethod.Post) {
                    var params = JSON.parse(connection.request.getBody());
                    console.log(params);
                    if (params.username === testUser.username && params.password === testUser.password) {
                        connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({ status: 200, body: { user: { token: 'fake-jwt-token' } } })));
                    }
                    else {
                        connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({ status: 200 })));
                    }
                }
            }, 800);
        });
        return new http_1.Http(backend, options);
    },
    deps: [testing_1.MockBackend, http_1.BaseRequestOptions]
};
//# sourceMappingURL=fake-backend.js.map