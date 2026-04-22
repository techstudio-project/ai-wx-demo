<template>
	<view class="home-page">
		<swiper class="banner-swiper" autoplay circular indicator-dots indicator-color="rgba(255,255,255,0.45)" indicator-active-color="#fff">
			<swiper-item v-for="item in banners" :key="item.id">
				<image class="banner-image" :src="item.image" mode="aspectFill" />
			</swiper-item>
		</swiper>

		<view class="notice-bar card-block">
			<uni-icons type="sound-filled" size="18" color="#4d63f6" />
			<swiper class="notice-swiper" vertical autoplay circular interval="3000" duration="500" @change="onNoticeChange">
				<swiper-item v-for="notice in notices" :key="notice.id">
					<view class="notice-text" @click="goNoticeDetail(notice)">{{ notice.title }}</view>
				</swiper-item>
			</swiper>
			<uni-icons type="right" size="16" color="#9ca4bb" />
		</view>

		<view class="section card-block">
			<view class="section-head">
				<view>
					<text class="section-title">名校专区</text>
				</view>
				<view class="more-chip" @click="goSchoolMore">
					<text>查看全部</text>
					<uni-icons type="arrow-right" size="13" color="#4d63f6" />
				</view>
			</view>
			<view class="school-grid">
				<view class="school-item" v-for="school in schools" :key="school.id" @click="goSchoolDetail(school)">
					<image class="school-logo" :src="school.logo" mode="aspectFit" />
					<text class="school-name">{{ school.name }}</text>
				</view>
			</view>
		</view>

		<view class="section card-block">
			<view class="section-head">
				<text class="section-title">活动报名</text>
				<text class="section-sub">考试活动 / 训练营</text>
			</view>

			<view class="activity-list">
				<view class="activity-card" v-for="activity in activities" :key="activity.id" @click="goActivityDetail(activity)">
					<image class="activity-image" :src="activity.image" mode="aspectFill" />
					<view class="activity-content">
						<view class="activity-top">
							<text class="activity-name">{{ activity.name }}</text>
							<text class="status" :class="activity.status === '报名中' ? 'ongoing' : 'ended'">{{ activity.status }}</text>
						</view>
						<text v-if="activity.desc" class="activity-desc">{{ activity.desc }}</text>
						<view class="activity-footer">
							<text class="activity-price">¥{{ activity.price }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>

export default {
	data() {
		return {
			currentNotice: 0,
			banners: [
				{ id: 1, image: '/static/c1.png' },
				{ id: 2, image: '/static/c5.png' },
				{ id: 3, image: '/static/c9.png' }
			],
			notices: [
				{ id: 1, title: '2026 春季统考报名通道已开启，报名截止至 5 月 30 日' },
				{ id: 2, title: '名校冲刺训练营新增 2 场公开课，限时免费预约' },
				{ id: 3, title: '模拟考试系统升级完成，新增成绩趋势分析功能' }
			],
			schools: [
				{ id: 1, name: '清华大学', logo: '/static/uni.png' },
				{ id: 2, name: '北京大学', logo: '/static/c2.png' },
				{ id: 3, name: '复旦大学', logo: '/static/c3.png' },
				{ id: 4, name: '上海交大', logo: '/static/c4.png' },
				{ id: 5, name: '浙江大学', logo: '/static/c6.png' },
				{ id: 6, name: '中国人大', logo: '/static/c8.png' },
				{ id: 7, name: '南京大学', logo: '/static/c5.png' },
				{ id: 8, name: '武汉大学', logo: '/static/c7.png' },
				{ id: 9, name: '中山大学', logo: '/static/c9.png' }
			],
			activities: [
				{ id: 101, image: '/static/c7.png', name: '2026 全国联考模考赛', desc: '官方命题趋势模拟，实时排名与错题解析', price: 99, status: '报名中' },
				{ id: 102, image: '/static/c5.png', name: '名校面试实战营', desc: '6 场直播 + 2 次一对一点评', price: 299, status: '报名中' },
				{ id: 103, image: '/static/c1.png', name: '寒假冲刺集训班', desc: '已完结，支持回放学习', price: 199, status: '已结束' }
			]
		}
	},
	methods: {
		onNoticeChange(e) {
			this.currentNotice = e.detail.current
		},
		goNoticeDetail(notice) {
			uni.navigateTo({ url: `/pages/notice-detail/index?id=${notice.id}&title=${encodeURIComponent(notice.title)}` })
		},
		goSchoolDetail(school) {
			uni.navigateTo({ url: `/pages/school-detail/index?id=${school.id}&name=${encodeURIComponent(school.name)}` })
		},
		goSchoolMore() {
			uni.navigateTo({ url: '/pages/school-more/index' })
		},
		goActivityDetail(activity) {
			uni.navigateTo({ url: `/pages/activity-detail/index?id=${activity.id}&name=${encodeURIComponent(activity.name)}` })
		}
	}
}
</script>

<style>
.home-page {
	min-height: 100vh;
	padding: 24rpx 24rpx 200rpx;
	background: linear-gradient(180deg, #f3f6ff 0%, #f8f9fc 45%, #ffffff 100%);
	box-sizing: border-box;
}

.banner-swiper { height: 320rpx; border-radius: 24rpx; overflow: hidden; box-shadow: 0 14rpx 34rpx rgba(24, 36, 87, 0.16); }
.banner-image { width: 100%; height: 100%; }
.card-block { margin-top: 22rpx; background: #fff; border-radius: 24rpx; box-shadow: 0 10rpx 28rpx rgba(22, 33, 74, 0.07); }
.notice-bar { display: flex; align-items: center; padding: 0 20rpx; height: 88rpx; gap: 12rpx; }
.notice-swiper { flex: 1; height: 88rpx; }
.notice-text { height: 88rpx; line-height: 88rpx; font-size: 24rpx; color: #2a3040; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.section { padding: 24rpx 20rpx; }
.section-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 18rpx; }
.section-title { display: block; font-size: 32rpx; font-weight: 600; color: #1f2333; }
.section-sub { display: block; margin-top: 8rpx; font-size: 22rpx; color: #9aa2b8; }
.more-chip { display: flex; align-items: center; gap: 4rpx; height: 52rpx; padding: 0 18rpx; border-radius: 999rpx; background: #eef2ff; color: #4d63f6; font-size: 22rpx; }
.school-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16rpx 12rpx; }
.school-item { display: flex; flex-direction: column; align-items: center; gap: 10rpx; padding: 14rpx 10rpx; border-radius: 16rpx; background: linear-gradient(135deg, #f8f9ff 0%, #f1f4ff 100%); }
.school-logo { width: 72rpx; height: 72rpx; border-radius: 50%; }
.school-name { font-size: 22rpx; color: #2d3448; }
.activity-list { display: flex; flex-direction: column; gap: 18rpx; }
.activity-card { display: flex; border-radius: 18rpx; overflow: hidden; background: #f9faff; }
.activity-image { width: 210rpx; height: 170rpx; flex-shrink: 0; }
.activity-content { flex: 1; padding: 14rpx 16rpx; display: flex; flex-direction: column; justify-content: space-between; }
.activity-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 10rpx; }
.activity-name { font-size: 27rpx; font-weight: 600; color: #1f2333; line-height: 1.35; }
.status { font-size: 20rpx; padding: 4rpx 10rpx; border-radius: 999rpx; white-space: nowrap; }
.status.ongoing { color: #1e8f4e; background: #e9f9ee; }
.status.ended { color: #8a90a5; background: #eef1f8; }
.activity-desc { margin-top: 8rpx; font-size: 22rpx; color: #616a80; line-height: 1.4; }
.activity-footer { margin-top: 10rpx; }
.activity-price { color: #ff5f45; font-size: 30rpx; font-weight: 700; }
</style>
