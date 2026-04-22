<template>
	<view class="detail-page">
		<view class="title">{{ name }}</view>
		<view class="content">这里是名校详情页示例，可展示院校介绍、课程资源、招生计划等信息。</view>
	</view>
</template>

<script>
export default {
	data() {
		return { name: '名校详情' }
	},
	onLoad(options) {
		if (options.name) this.name = decodeURIComponent(options.name)
	}
}
</script>

<style>
.detail-page { padding: 30rpx; }
.title { font-size: 34rpx; font-weight: 600; color: #1f2333; }
.content { margin-top: 18rpx; font-size: 26rpx; color: #636b82; line-height: 1.8; }
</style>
