<template>
	<form class="form" @submit.prevent>
		<h4>Post creation</h4>
		<input-item placeholder="Title" v-model="post.title" />
		<input-item placeholder="Body" v-model="post.body" />
		<button-item title="Submit" @click="createPost" />
	</form>
</template>

<script lang="ts">
import ButtonItem from '@/components/UI/Button.vue';

export default {
	components: {
		ButtonItem
	},
	data() {
		return {
			post: {
				title: '',
				body: ''
			}
		};
	},
	methods: {
		createPost() {
			const newPost = {
				id: Date.now(),
				title: this.post.title,
				body: this.post.body
			};

			this.$emit('createPost', newPost);
			this.post = {
				title: '',
				body: ''
			};
		}
	}
};
</script>

<style>
.form {
	display: flex;
	flex-direction: column;
	padding: 10px;
}
</style>
