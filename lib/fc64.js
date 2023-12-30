(function () {
    'use strict';

    function greeter(entity) {
        return `Hello ${entity}!`;
    }
    const entity = 'World';
    document.body.textContent = greeter(entity);

})();
