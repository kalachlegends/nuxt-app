export const beforeUploadFileInput = (request) => {
    console.log(request, 'request');
    request.xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
    return request;
};
