<template>
	<div>
		<h1>Posts Page</h1>
		<div class="head_menu">
			<div class="create_n_search">
				<button-item title="Create Post" @click="showModal" />
				<selector-item
					v-model="selectedOption"
					:options="options"
					placeholder="Sort by..."
				/>
			</div>
			<input-item v-model="searchBy" placeholder="Search..." />
		</div>
		<modal-window v-model:show="isModalVisible">
			<post-form @createPost="createPost" />
		</modal-window>
		<posts-list
			v-if="!isFetching"
			:posts="sortedAndSearchedPosts"
			@deletePost="deletePost"
		/>
		<div v-else>Loading posts...</div>
		<pagination-wrapper
			:totalCount="totalPagesCount"
			v-model:currentPage="currentPage"
		/>
	</div>
</template>

<script lang="ts">
import PostForm from '@/components/PostForm.vue';
import PostsList from '@/components/PostsList.vue';
import type { Post } from '@/components/Post.vue';
import axios from 'axios';
import type { IOptions } from './components/UI/Selector.vue';
import debounce from '@/utilites/debounce';

export default {
	components: {
		PostForm,
		PostsList
	},
	data() {
		return {
			posts: [] as Post[],
			isModalVisible: false,
			isFetching: false,
			options: [
				{
					title: 'Sort by title',
					value: 'title'
				},
				{
					title: 'Sort by text',
					value: 'body'
				}
			] as IOptions[],
			selectedOption: '',
			searchBy: '',
			pageLimit: 10,
			totalPagesCount: 1,
			currentPage: 1
		};
	},
	methods: {
		createPost(post: Post) {
			this.posts.push(post);
			this.isModalVisible = false;
		},
		deletePost(post: Post) {
			this.posts = this.posts.filter((item) => item.id !== post.id);
		},
		showModal() {
			this.isModalVisible = true;
		},
		changeSearchOption(value: string) {
			this.selectedOption = value;
		},
		async fetchPosts() {
			try {
				this.isFetching = true;
				const response = await axios.get(
					'https://jsonplaceholder.typicode.com/posts',
					{
						params: {
							_page: this.currentPage,
							_limit: this.pageLimit
						}
					}
				);
				this.totalPagesCount = Math.ceil(
					response.headers['x-total-count'] / this.pageLimit
				);
				this.posts = response.data;
			} catch (err) {
				alert('Something is gone wrong while loading the posts!');
			} finally {
				this.isFetching = false;
			}
		}
	},
	mounted() {
		this.fetchPosts();
	},

	computed: {
		sortedPosts() {
			return [...this.posts].sort((post1, post2) =>
				String(post1[this.selectedOption as keyof Post])?.localeCompare(
					String(post2[this.selectedOption as keyof Post])
				)
			);
		},
		sortedAndSearchedPosts() {
			return this.sortedPosts.filter((post) =>
				post.title.includes(this.searchBy)
			);
		}
	},
    watch: {
        currentPage() {
            this.fetchPosts();
        }
    }
};
</script>

<style>
.head_menu {
	display: flex;
	align-items: center;
	flex-direction: column;
}

.create_n_search {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}
</style>
