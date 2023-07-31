useGlobalInterceptors

When we say that an interceptor can be applied globally, it means that the interceptor will be active for all incoming requests and outgoing responses in your NestJS application. This global scope ensures that the interceptor's logic will be executed for every request-response cycle throughout your entire application.

By registering an interceptor as a global interceptor using the app.useGlobalInterceptors() method in the main.ts file, you are instructing NestJS to apply that interceptor to all incoming requests and outgoing responses.

For example, let's say you have multiple modules or controllers in your NestJS application, each handling different parts of your API. If you register an interceptor globally, it will be automatically applied to all requests and responses within each of those modules or controllers.

catch()
when you dont pass any paramenter in inside the catch function it know i have run every type of exception
httpAdaptorhost=>we can the response object 



In summary, Interceptors deal with modifying the request and response objects, while Guards handle the authorization and access control logic. While they are both part of the middleware layer, they serve distinct purposes in Nest.js applications.