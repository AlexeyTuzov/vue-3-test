<template>
	<h2>Feed</h2>
	<transition-group name="post-list">
		<PostItem
			:post="post"
			class="post"
			v-for="post in posts"
			:key="post.id"
			@deletePost="$emit('deletePost', post)"
		/>
	</transition-group>
</template>

<script setup lang="ts">
import type { Post } from './Post.vue';

export interface IProps {
	posts: Post[];
}

const props = defineProps<IProps>();
</script>

<style>
.post-list-move,
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.7s linear;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(-150px);
}
</style>
