<template>
	<div>
		<div class="head_menu">
			<button-item title="Create Post" @click="showModal" />
			<selector-item v-model="selectedOption" :options="options" />
		</div>
		<modal-window v-model:show="isModalVisible">
			<post-form @createPost="createPost" />
		</modal-window>
		<posts-list v-if="!isFetching" :posts="posts" @deletePost="deletePost" />
		<div v-else>Loading posts...</div>
	</div>
</template>

<script lang="ts">
import PostForm from '@/components/PostForm.vue';
import PostsList from '@/components/PostsList.vue';
import type { Post } from '@/components/Post.vue';
import axios from 'axios';
import type { IOptions } from './components/UI/Selector.vue';

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
					title: 'Search by title',
					value: 'title'
				},
				{
					title: 'Search by text',
					value: 'body'
				}
			] as IOptions[],
			selectedOption: ''
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
					'https://jsonplaceholder.typicode.com/posts?_limit=10'
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
	watch: {
		selectedOption(criteria: keyof Post) {
			this.posts.sort((post1, post2) => {
				return String(post1[criteria]).localeCompare(String(post2[criteria]));
			});
		}
	}
};
</script>

<style>
.head_menu {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}
</style>
