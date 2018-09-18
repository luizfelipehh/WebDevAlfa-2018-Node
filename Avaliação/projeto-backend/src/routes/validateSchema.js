module.exports = function validateSchema(schema) {
    return function middleware(request, response, next) {
        request.check(schema);
        request.getValidationResult()
            .then(result => {
                if (!result.isEmpty()) {
                    response.status(422).json({ validationErrors: result.mapped() });
                    return;
                }

                next();
            })
            .catch(next);
    };
}