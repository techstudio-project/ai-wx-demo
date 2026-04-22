<template>
	<view class="redirecting">正在进入会员权益...</view>
</template>

<script>
export default {
	onLoad() {
		uni.redirectTo({
			url: '/pages/benefits/index'
		})
	}
}
</script>

<style>
.redirecting {
	padding: 80rpx 32rpx;
	font-size: 28rpx;
	color: #7a8093;
}
</style>
