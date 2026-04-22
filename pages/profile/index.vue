<template>
	<view class="simple-page">
		<view class="title">个人信息</view>
		<view class="desc">此页面用于维护头像、手机号、昵称、账号安全等信息。</view>
	</view>
</template>

<script>
export default {}
</script>

<style>
.simple-page {
	min-height: 100vh;
	padding: 32rpx;
	background: #f7f8fc;
	box-sizing: border-box;
}

.title {
	font-size: 36rpx;
	font-weight: 600;
	color: #1f2333;
}

.desc {
	margin-top: 18rpx;
	font-size: 26rpx;
	color: #6e7486;
	line-height: 1.7;
}
</style>
