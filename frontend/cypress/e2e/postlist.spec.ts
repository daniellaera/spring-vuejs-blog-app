/// <reference types="cypress" />

describe('PostList', () => {
    beforeEach(() => {
        // Mock the API call to /api/v3/post and return mock data from the fixture
        cy.intercept('GET', '/api/v3/post', { fixture: 'posts.json' }).as('getPosts'); // Match the exact API endpoint

        // Visit the page
        cy.visit('/');
    });

    it('displays a list of posts', () => {
        cy.wait('@getPosts', { timeout: 10000 });  // Wait for the mock response
        cy.get('.card', { timeout: 10000 }).should('have.length.greaterThan', 0); // Ensure cards are displayed
    });

    it('displays correct post data', () => {
        cy.wait('@getPosts', { timeout: 10000 });  // Wait for the mock response

        // Log the content of the first card for debugging
            cy.get('.card-title').should('contain', 'Post 1');  // Check post title
            cy.get('.card-text').should('contain', 'This is the first post.');  // Check post content
    });

    it('has a working view details button', () => {
        cy.wait('@getPosts', { timeout: 10000 });

        // Simulate clicking the "View Details" button
        cy.get('.btn-primary').first().click();

        // Verify that the URL contains the post ID
        cy.url().should('include', '/post/1');
    });
});