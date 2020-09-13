const http=require('http');
const fs=require('fs');
const hostName='localhost';
const port=1999;
const server=http.createServer((request,response)=>{
    route(getTheNeededRoute(request.url),response);
});
server.listen(port,hostName,()=>{
    console.log('server Running Now...')
});
function route(data,response) {
    fs.readFile(page,(error,data)=>{
        response.setHeader('Content-Type','text/html');
        response.statusCode=200;
        response.write(data);
        response.end();
    });
}
function getTheNeededRoute(url){
    let page='index.html';
    switch (url) {
        case '/':
            page='index.html';
            break;
        case '/about':
            page='about.html';
            break;
        case '/contact':
            page='contact.html';
            break;
        default:
            page='index.html';
            break;
    }
    return page;
}