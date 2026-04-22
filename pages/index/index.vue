<template>
	<view class="mine-page">
		<view class="member-card" :style="memberCardStyle">
			<view class="member-card__top">
				<image class="avatar" :src="member.avatar" mode="aspectFill" />
				<view class="user-meta">
					<view class="phone-row">
						<text class="phone">{{ displayPhone }}</text>
					</view>
					<view v-if="!member.phoneBound" class="bind-phone" @click="bindPhone">立即绑定</view>
				</view>
					<view v-if="member.isMember" class="level-emblem" @click="goBenefits">
						<view class="emblem-light"></view>
						<uni-icons type="vip-filled" size="16" color="#f9e6b1" />
						<text class="emblem-level">{{ memberLevel }}</text>
						<text class="emblem-text">MEMBER</text>
					</view>
				<view v-else class="open-member" @click="goMembershipPurchase">
					<text class="open-member__text">立即开通会员</text>
					<uni-icons type="right" size="14" color="#fff3cf" />
				</view>
			</view>

			<view class="member-card__stats">
				<view class="stat-item">
					<text class="stat-label">当前积分</text>
					<text class="stat-value">{{ member.points }}</text>
				</view>
				<view class="stat-item">
					<text class="stat-label">即将过期</text>
					<text class="stat-value danger">{{ member.expiringPoints }}</text>
				</view>
			</view>
		</view>

		<view class="quick-grid card-block">
			<view
				v-for="item in quickActions"
				:key="item.title"
				class="quick-item"
				@click="handleMenuClick(item)"
			>
				<view class="quick-icon" :style="{ background: item.bg }">
					<uni-icons :type="item.icon" size="20" color="#ffffff" />
				</view>
				<text class="quick-title">{{ item.title }}</text>
			</view>
		</view>

		<view class="menu-section card-block">
			<view class="section-title">常用服务</view>
			<view
				v-for="menu in serviceMenus"
				:key="menu.title"
				class="menu-row"
				@click="handleMenuClick(menu)"
			>
				<view class="list-icon" :style="{ background: menu.bg }">
					<uni-icons :type="menu.icon" size="17" color="#fff" />
				</view>
				<view class="menu-content" :class="{ 'single-line': !menu.note }">
					<text class="menu-title">{{ menu.title }}</text>
					<text v-if="menu.note" class="menu-note">{{ menu.note }}</text>
				</view>
				<uni-icons type="right" size="16" color="#b9bfd0" />
			</view>
		</view>
	</view>
</template>

<script>
const levelThemeMap = {
	v1: 'linear-gradient(135deg, #7b6a5f 0%, #9f8a7e 50%, #d0b8a0 100%)',
	v2: 'linear-gradient(135deg, #2e5e93 0%, #4f7db2 45%, #83a8d0 100%)',
	v3: 'linear-gradient(135deg, #1e1f23 0%, #353741 45%, #6a5a3d 100%)',
	none: 'linear-gradient(135deg, #3f4453 0%, #5a647a 45%, #8691ad 100%)'
}

export default {
	data() {
		return {
			member: {
				avatar: 'https://picsum.photos/120/120',
				phone: '',
				phoneBound: false,
				points: 12860,
				expiringPoints: 320,
				level: 'v3',
				isMember: true
			},
			quickActions: [
				{ title: '积分充值', icon: 'wallet', bg: 'linear-gradient(135deg, #fa8c16, #ffb347)' },
				{ title: '学生管理', icon: 'person', bg: 'linear-gradient(135deg, #2f54eb, #5b8cff)' },
				{ title: '我的订单', icon: 'cart', bg: 'linear-gradient(135deg, #13c2c2, #5cdbd3)' },
				{ title: '会员权益', icon: 'vip', bg: 'linear-gradient(135deg, #7a4cff, #9d7bff)', url: '/pages/benefits/index' }
			],
			serviceMenus: [
				{ title: '个人信息', note: '头像 / 手机号 / 账号设置', icon: 'contact', bg: '#4f6cff', url: '/pages/profile/index' },
				{ title: '积分使用记录', note: '', icon: 'bars', bg: '#3a86ff', url: '/pages/points-record/index' },
				{ title: '我的学习档案', note: '学习时长 / 进度统计', icon: 'compose', bg: '#2b7dfa' },
				{ title: '发票与合同', note: '订单开票与电子合同下载', icon: 'paperplane', bg: '#3cb371' },
				{ title: '收货地址', note: '教材与礼品寄送地址管理', icon: 'location', bg: '#00b894' },
				{ title: '意见反馈', note: '问题建议与客服支持', icon: 'chatbubble', bg: '#fa541c' },
				{ title: '设置', note: '账号安全 / 通知 / 隐私管理', icon: 'gear', bg: '#8c8c8c' }
			]
		}
	},
	computed: {
		memberCardStyle() {
			const key = this.member.isMember ? this.member.level : 'none'
			return {
				background: levelThemeMap[key] || levelThemeMap.v1
			}
		},
		displayPhone() {
			return this.member.phoneBound ? this.member.phone : '未绑定手机号'
		},
		memberLevel() {
			return (this.member.level || 'v1').toUpperCase()
		}
	},
	methods: {
		bindPhone() {
			uni.navigateTo({
				url: '/pages/profile/index'
			})
		},
		goBenefits() {
			uni.navigateTo({
				url: '/pages/benefits/index'
			})
		},
		goMembershipPurchase() {
			uni.navigateTo({
				url: '/pages/membership-purchase/index'
			})
		},
		handleMenuClick(item) {
			if (item.url) {
				uni.navigateTo({ url: item.url })
				return
			}
			uni.showToast({
				title: `${item.title}功能开发中`,
				icon: 'none'
			})
		}
	}
}
</script>

<style>
.mine-page {
	min-height: 100vh;
	padding: 30rpx 24rpx;
	background: linear-gradient(180deg, #f3f6ff 0%, #f7f8fa 40%, #f6f6f6 100%);
	box-sizing: border-box;
}

.member-card {
	position: relative;
	padding: 32rpx 28rpx;
	border-radius: 28rpx;
	color: #ffffff;
	box-shadow: 0 18rpx 40rpx rgba(27, 38, 87, 0.22);
	overflow: hidden;
}

.member-card::after {
	content: '';
	position: absolute;
	width: 280rpx;
	height: 280rpx;
	right: -100rpx;
	top: -120rpx;
	background: radial-gradient(circle, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0) 72%);
}

.member-card__top {
	display: flex;
	align-items: center;
	position: relative;
	z-index: 2;
}

.avatar {
	width: 94rpx;
	height: 94rpx;
	border-radius: 50%;
	border: 3rpx solid rgba(255, 255, 255, 0.5);
	flex-shrink: 0;
}

.user-meta {
	margin-left: 20rpx;
	flex: 1;
}

.phone-row {
	display: flex;
	align-items: center;
	gap: 12rpx;
}

.phone {
	font-size: 34rpx;
	font-weight: 600;
	letter-spacing: 1rpx;
}

.bind-phone {
	margin-top: 12rpx;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 8rpx 18rpx;
	font-size: 22rpx;
	border-radius: 999rpx;
	background: rgba(255, 255, 255, 0.2);
	border: 1px solid rgba(255, 255, 255, 0.5);
}

.level-emblem {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 128rpx;
	height: 128rpx;
	border-radius: 50%;
	background: linear-gradient(145deg, rgba(255, 255, 255, 0.34), rgba(255, 255, 255, 0.08));
	border: 1px solid rgba(255, 236, 196, 0.62);
	box-shadow: inset 0 2rpx 10rpx rgba(255, 245, 214, 0.4), 0 8rpx 24rpx rgba(9, 12, 28, 0.3);
	overflow: hidden;
}

.emblem-light {
	position: absolute;
	top: -12rpx;
	left: 18rpx;
	width: 64rpx;
	height: 20rpx;
	border-radius: 999rpx;
	background: rgba(255, 255, 255, 0.48);
	filter: blur(3rpx);
}

.emblem-level {
	margin-top: 4rpx;
	font-size: 30rpx;
	font-weight: 700;
	letter-spacing: 1rpx;
	color: #ffe7ab;
	text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.24);
}

.emblem-text {
	font-size: 16rpx;
	letter-spacing: 2rpx;
	opacity: 0.95;
}

.open-member {
	display: flex;
	align-items: center;
	gap: 8rpx;
	padding: 12rpx 16rpx;
	border-radius: 999rpx;
	background: linear-gradient(135deg, rgba(255, 215, 126, 0.34), rgba(255, 234, 185, 0.18));
	border: 1px solid rgba(255, 236, 195, 0.75);
}

.open-member__text {
	font-size: 22rpx;
	font-weight: 600;
	color: #fff5dc;
}

.member-card__stats {
	margin-top: 34rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 22rpx 20rpx;
	border-radius: 20rpx;
	background: rgba(8, 11, 23, 0.16);
	backdrop-filter: blur(6rpx);
	position: relative;
	z-index: 2;
	gap: 18rpx;
}

.stat-item {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 8rpx;
}

.stat-label {
	font-size: 22rpx;
	opacity: 0.85;
}

.stat-value {
	font-size: 36rpx;
	font-weight: 700;
}

.stat-value.danger {
	color: #ffd591;
}

.card-block {
	margin-top: 24rpx;
	background: #ffffff;
	border-radius: 24rpx;
	padding: 12rpx;
	box-shadow: 0 10rpx 30rpx rgba(15, 28, 63, 0.05);
}

.quick-grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 12rpx;
	padding: 20rpx 12rpx;
}

.quick-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 12rpx;
	padding: 12rpx 0;
}

.quick-icon {
	width: 72rpx;
	height: 72rpx;
	border-radius: 20rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 8rpx 20rpx rgba(45, 61, 122, 0.22);
}

.quick-title {
	font-size: 24rpx;
	color: #2f3447;
}

.menu-section {
	padding-top: 8rpx;
}

.section-title {
	padding: 16rpx 18rpx;
	font-size: 30rpx;
	font-weight: 600;
	color: #1f2333;
}

.menu-row {
	display: flex;
	align-items: center;
	padding: 14rpx 12rpx;
	border-bottom: 1px solid #f1f3f9;
}

.menu-row:last-child {
	border-bottom: none;
}

.list-icon {
	width: 56rpx;
	height: 56rpx;
	margin-right: 20rpx;
	border-radius: 16rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}

.menu-content {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 12rpx 0;
	gap: 8rpx;
}

.menu-content.single-line {
	min-height: 76rpx;
	justify-content: center;
}

.menu-title {
	font-size: 28rpx;
	color: #1f2333;
}

.menu-note {
	font-size: 22rpx;
	color: #949db3;
}
</style>
