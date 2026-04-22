<template>
	<view class="school-more-page">
		<view class="title">更多名校</view>
		<view class="list">
			<view class="item" v-for="school in schools" :key="school" @click="goSchoolDetail(school)">
				<text class="name">{{ school }}</text>
				<uni-icons type="right" size="16" color="#a3abc1" />
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			schools: ['南京大学', '武汉大学', '中山大学', '同济大学', '华中科大', '北京师范大学', '南开大学', '厦门大学']
		}
	},
	methods: {
		goSchoolDetail(name) {
			uni.navigateTo({ url: `/pages/school-detail/index?name=${encodeURIComponent(name)}` })
		}
	}
}
</script>

<style>
.school-more-page { min-height: 100vh; padding: 28rpx; background: #f7f9ff; box-sizing: border-box; }
.title { font-size: 34rpx; font-weight: 600; color: #1f2333; margin-bottom: 18rpx; }
.list { background: #fff; border-radius: 18rpx; padding: 0 18rpx; }
.item { display: flex; align-items: center; justify-content: space-between; padding: 24rpx 0; border-bottom: 1px solid #edf0f7; }
.item:last-child { border-bottom: none; }
.name { font-size: 28rpx; color: #2b3142; }
</style>
