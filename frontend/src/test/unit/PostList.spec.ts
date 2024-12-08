import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PostList from '@/views/PostList.vue';
import apiClient from '@/plugins/axiosConfig';
import { RouterLinkStub } from '@vue/test-utils';

// Mock the API endpoint '/post'
vi.mock('@/plugins/axiosConfig');

// Mock the Vue Router properly by stubbing RouterLink
vi.mock('vue-router', () => ({
    RouterLink: RouterLinkStub,  // Stub RouterLink
}));

describe('PostList.vue', () => {
    beforeEach(() => {
        // Clear previous mock calls to prevent state leakage
        vi.clearAllMocks();
    });

    it('displays posts when available', async () => {
        const postsData = [
            { id: 1, title: 'First Post', content: 'This is the first post', comments: [] },
            { id: 2, title: 'Second Post', content: 'This is the second post', comments: [] },
        ];

        // Mock the API response to return postsData
        vi.mocked(apiClient.get).mockResolvedValueOnce({ data: postsData });

        // Mount the component with router mock and stubbing RouterLink
        const wrapper = mount(PostList, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub,  // Stub RouterLink to avoid Vue warnings
                },
            },
        });

        // Wait for the next DOM update cycle after API call to ensure reactivity
        await wrapper.vm.$nextTick();  // Ensures Vue reacts to the mocked data

        // Force update to ensure Vue reacts to the mocked data
        wrapper.vm.$forceUpdate(); // Force Vue to re-render

        // Wait for the DOM update cycle to reflect the changes
        await wrapper.vm.$nextTick();  // Ensure DOM updates after forceUpdate

        // Check the posts in the component
        console.log('Component Posts:', wrapper.vm.posts);  // This should print postsData

        // Get all card-title elements and log their text content
        const postTitles = wrapper.findAll('.card-title').map((node) => node.text());
        console.log('Rendered Post Titles:', postTitles);  // This should print ['First Post', 'Second Post']

        // Assert that the post titles are rendered correctly
        expect(postTitles).toEqual(['Create a New Post', 'First Post', 'Second Post']);
    });

    it('displays an alert when no posts are available', async () => {
        // Mock the API response to return an empty array
        vi.mocked(apiClient.get).mockResolvedValueOnce({ data: [] });

        // Mount the component
        const wrapper = mount(PostList, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub, // Stub RouterLink to avoid warnings
                },
            },
        });

        // Wait for the API call to complete and the DOM to update
        await wrapper.vm.$nextTick(); // Wait for initial reactivity to process
        await wrapper.vm.$nextTick(); // Wait again to ensure DOM has updated

        // Assert that the "No posts available." alert is displayed
        const alertMessage = wrapper.find('.alert.alert-info'); // Target specific element
        expect(alertMessage.exists()).toBe(true); // Ensure the element exists
        expect(alertMessage.text()).toBe('No posts available.'); // Check for the correct message
    });
});