import { mount } from '@vue/test-utils';
import PostDetail from '@/views/PostDetail.vue';
import { describe, it, expect, vi, beforeAll, afterEach } from 'vitest';
import apiClient from "@/plugins/axiosConfig";

// Mock axiosConfig to return mock data
beforeAll(() => {
    vi.mock('@/plugins/axiosConfig', () => ({
        default: {
            get: vi.fn().mockResolvedValue({
                data: {
                    id: 1,
                    title: 'This is a test post',
                    content: 'This is the content of the post',
                    comments: [
                        { text: 'Great post!' },
                        { text: 'Very informative!' }
                    ]
                }
            })
        }
    }));

    // Mock vue-router
    vi.mock('vue-router', () => ({
        useRouter: vi.fn().mockReturnValue({
            back: vi.fn(),
        }),
        useRoute: vi.fn().mockReturnValue({
            params: { id: '1' },
        }),
    }));
});

afterEach(() => {
    vi.clearAllMocks(); // Clear mock calls after each test to prevent state leakage
});

describe('PostDetail.vue', () => {
    it('should exist', async () => {
        const wrapper = mount(PostDetail, {
            global: {
                stubs: ['RouterLink'],
            },
        });

        // Check if the component exists by testing if it has a root element
        expect(wrapper.exists()).toBe(true);
    });

    it('displays loading message initially', async () => {
        const wrapper = mount(PostDetail, {
            global: {
                stubs: ['RouterLink'],
            },
        });

        // Initially, the loading message should be displayed
        expect(wrapper.text()).toContain('Loading post...');
    });

    it('fetches post based on route params (post ID)', async () => {
        const wrapper = mount(PostDetail, {
            global: {
                stubs: ['RouterLink'],
            },
        });

        // Wait for the component to finish fetching data
        await wrapper.vm.$nextTick();

        // Ensure that the API call was made with the correct post ID
        expect(vi.mocked(apiClient.get).mock.calls[0][0]).toBe('/post/1');
    });

    it('displays the post title and content after fetching data', async () => {
        const wrapper = mount(PostDetail, {
            global: {
                stubs: ['RouterLink'],
            },
        });

        // Wait for the component to finish fetching the data
        await wrapper.vm.$nextTick(); // Ensure Vue updates after the async operation
        await wrapper.vm.$nextTick(); // Double check if Vue is done with the DOM update

        // Check that the post's title and content are rendered after data fetch
        expect(wrapper.text()).toContain('This is a test post');
        expect(wrapper.text()).toContain('This is the content of the post');
    });

    it('displays the comments when available', async () => {
        const wrapper = mount(PostDetail, {
            global: {
                stubs: ['RouterLink'],
            },
        });

        // Wait for the component to finish fetching the data
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick(); // Ensure all DOM updates are completed

        // Check if the comments are rendered
        expect(wrapper.text()).toContain('Great post!');
        expect(wrapper.text()).toContain('Very informative!');
    });

    it('displays a "No comments yet" message when no comments are available', async () => {
        // Override the mock to return a post with no comments
        vi.mocked(apiClient.get).mockResolvedValueOnce({
            data: {
                id: 1,
                title: 'Post without comments',
                content: 'No comments for this post',
                comments: []
            }
        });

        const wrapper = mount(PostDetail, {
            global: {
                stubs: ['RouterLink'],
            },
        });

        // Wait for the component to finish fetching the data
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick(); // Ensure Vue updates after the data fetch

        // Check if the "No comments yet" message is displayed
        expect(wrapper.text()).toContain('No comments yet. Be the first to comment!');
    });
});