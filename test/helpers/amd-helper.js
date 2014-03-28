(function (root) {

    root.define = function define(dependencies, factory) {
        var name = factory.toString().match(/function (.+?)\(/)[1];
        root.Modules = root.Modules || {};
        root.Modules[name] = factory;
    };

    root.require = function require(dependencies, factory) {
        var name = factory.toString().match(/function (.+?)\(/)[1];
        root.Modules = root.Modules || {};
        root.Modules[name] = factory;
    };

} (this));
