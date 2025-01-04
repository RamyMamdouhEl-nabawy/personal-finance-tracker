import { createStore } from 'vuex';
import { mount } from 'cypress/vue';
import router from '../../src/router/index';
import { createMemoryHistory, createRouter } from 'vue-router';
// Helper function to create a new Vuex store
function getStore() {
    return createStore({
        state: {
            transactions: [{
                    id: 1,
                    type: 'expense',
                    amount: 1000,
                    category: 'Food',
                    currency: 'USD',
                    date: '2023-01-01',
                }],
            filteredTransactions: [],
            exchangeRates: {},
            baseCurrency: 'USD',
        },
        mutations: {},
        actions: {},
    });
}
// Extend Cypress commands
Cypress.Commands.add('mount', mount);
// Helper function to create a new Vue router
Cypress.Commands.add('mount', (component, options = {}) => {
    // Setup options object
    options.global = options.global || {};
    options.global.plugins = options.global.plugins || [];
    // create router if one is not provided
    if (!options.router) {
        options.router = createRouter({
            routes: router.options.routes,
            history: createMemoryHistory(),
        });
    }
    // Add router plugin
    options.global.plugins.push({
        install(app) {
            app.use(options.router);
        },
    });
    return mount(component, options);
});
Cypress.Commands.add('mount', (component, options = {}) => {
    // Setup options object
    options.global = options.global || {};
    options.global.stubs = options.global.stubs || {};
    options.global.stubs['transition'] = false;
    options.global.components = options.global.components || {};
    options.global.plugins = options.global.plugins || [];
    // Use store passed in from options, or initialize a new one
    const { store = getStore(), ...mountOptions } = options;
    // Add Vuex plugin
    options.global.plugins.push({
        install(app) {
            app.use(store);
        },
    });
    return mount(component, mountOptions);
});
//# sourceMappingURL=component.js.map