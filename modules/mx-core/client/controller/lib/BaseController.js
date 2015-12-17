BaseController = RouteController.extend({
    layoutTemplate:"ApplicationLayout",
    notFoundTemplate:"404",
    yieldTemplates: {
        'defaultToolbar': {to: 'toolbar'},
        'defaultStyle': {to: 'style'},
        'defaultNavigation': {to: "navigation"}
    }
});
