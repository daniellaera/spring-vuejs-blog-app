import { mount } from '@vue/test-utils';
import PostDetail from '@/views/PostDetail.vue'; // Path to your component
import { describe, it, expect, vi, beforeAll } from 'vitest';
import apiClient from "@/plugins/axiosConfig";

// Mock axiosConfig once for all tests inside `beforeAll`
beforeAll(() => {
    vi.mock('@/plugins/axiosConfig', () => {
        return {
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
        };
    });

    // Mock vue-router
    vi.mock('vue-router', () => ({
        useRouter: vi.fn().mockReturnValue({
            back: vi.fn(), // Mock the back method of the router
        }),
        useRoute: vi.fn().mockReturnValue({
            params: { id: '1' }, // Mock route params
        }),
    }));
});

describe('PostDetail.vue', () => {
    it('should exist', () => {
        const wrapper = mount(PostDetail, {
            global: {
                stubs: ['RouterLink'], // Stub RouterLink if used in your component
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
});