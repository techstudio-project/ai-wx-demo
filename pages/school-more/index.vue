<template>
	<view class="school-more-page">
		<view class="search-card">
			<view class="search-row">
				<uni-icons type="search" size="18" color="#8b94aa" />
				<input class="search-input" v-model="keyword" placeholder="输入学校名称搜索" placeholder-class="placeholder" />
			</view>
			<view class="filter-group">
				<text class="filter-label">区域</text>
				<view class="chips">
					<view class="chip" :class="{ active: area === item }" v-for="item in areaOptions" :key="item" @click="area = item">{{ item }}</view>
				</view>
			</view>
			<view class="filter-group">
				<text class="filter-label">学段</text>
				<view class="chips">
					<view class="chip" :class="{ active: type === item }" v-for="item in typeOptions" :key="item" @click="type = item">{{ item }}</view>
				</view>
			</view>
			<view class="filter-group">
				<text class="filter-label">属性</text>
				<view class="chips">
					<view class="chip" :class="{ active: level === item }" v-for="item in levelOptions" :key="item" @click="level = item">{{ item }}</view>
				</view>
			</view>
		</view>

		<view class="result-head">
			<text>共 {{ filteredSchools.length }} 所学校</text>
			<text class="result-sub">按热度排序</text>
		</view>

		<view class="school-list">
			<view class="school-card" v-for="school in filteredSchools" :key="school.id" @click="goSchoolDetail(school)">
				<image class="school-logo" :src="school.logo" mode="aspectFit" />
				<view class="school-main">
					<view class="card-top">
						<text class="school-name">{{ school.name }}</text>
						<view class="hotness"><uni-icons type="fire" size="14" color="#ff7a45" /> {{ school.hot }}</view>
					</view>
					<view class="tag-wrap">
						<text class="tag" v-for="tag in school.tags" :key="tag">{{ tag }}</text>
					</view>
				</view>
			</view>
		</view>

		<view v-if="!filteredSchools.length" class="empty">未找到匹配学校，请更换筛选条件</view>
	</view>
</template>

<script>
const schools = [
	{ id: 1, name: '清华大学附属中学', logo: '/static/uni.png', area: '北京', type: '高中', level: '市重点', hot: 9961, tags: ['市重点', '竞赛强校', '寄宿'] },
	{ id: 2, name: '北京大学附属小学', logo: '/static/c2.png', area: '北京', type: '小学', level: '区重点', hot: 8240, tags: ['区重点', '双语', '素质教育'] },
	{ id: 3, name: '复旦大学附属中学', logo: '/static/c3.png', area: '上海', type: '高中', level: '市重点', hot: 9112, tags: ['市重点', '创新班', '强基培养'] },
	{ id: 4, name: '上海交大附属初级中学', logo: '/static/c4.png', area: '上海', type: '初中', level: '区重点', hot: 7635, tags: ['区重点', '理科见长', '社团丰富'] },
	{ id: 5, name: '浙江大学附属高级中学', logo: '/static/c6.png', area: '华东', type: '高中', level: '省重点', hot: 8526, tags: ['省重点', '实验班', '升学稳定'] },
	{ id: 6, name: '华中科技大学附属中学', logo: '/static/c7.png', area: '华中', type: '高中', level: '市重点', hot: 7401, tags: ['市重点', '理工特色', '科技课程'] },
	{ id: 7, name: '南京大学附属中学', logo: '/static/c5.png', area: '华东', type: '初中', level: '区重点', hot: 6888, tags: ['区重点', '小班教学', '家校共育'] },
	{ id: 8, name: '中山大学附属小学', logo: '/static/c9.png', area: '华南', type: '小学', level: '区重点', hot: 6230, tags: ['区重点', '阅读特色', '活动丰富'] }
]

export default {
	data() {
		return {
			keyword: '',
			area: '全部',
			type: '全部',
			level: '全部',
			areaOptions: ['全部', '北京', '上海', '华东', '华中', '华南'],
			typeOptions: ['全部', '小学', '初中', '高中'],
			levelOptions: ['全部', '区重点', '市重点', '省重点'],
			schools
		}
	},
	computed: {
		filteredSchools() {
			const kw = this.keyword.trim()
			return this.schools.filter((school) => {
				const matchName = !kw || school.name.includes(kw)
				const matchArea = this.area === '全部' || school.area === this.area
				const matchType = this.type === '全部' || school.type === this.type
				const matchLevel = this.level === '全部' || school.level === this.level
				return matchName && matchArea && matchType && matchLevel
			}).sort((a, b) => b.hot - a.hot)
		}
	},
	methods: {
		goSchoolDetail(school) {
			uni.navigateTo({ url: `/pages/school-detail/index?id=${school.id}&name=${encodeURIComponent(school.name)}` })
		}
	}
}
</script>

<style>
.school-more-page { min-height: 100vh; padding: 24rpx; background: #f3f6ff; box-sizing: border-box; }
.search-card { background: #fff; border-radius: 22rpx; padding: 22rpx; box-shadow: 0 8rpx 22rpx rgba(43, 66, 138, 0.08); }
.search-row { display: flex; align-items: center; gap: 10rpx; height: 76rpx; background: #f5f7ff; border-radius: 14rpx; padding: 0 18rpx; }
.search-input { flex: 1; font-size: 24rpx; color: #1f2333; }
.placeholder { color: #9aa2b8; }
.filter-group { margin-top: 18rpx; }
.filter-label { font-size: 22rpx; color: #646f8c; }
.chips { display: flex; flex-wrap: wrap; gap: 12rpx; margin-top: 12rpx; }
.chip { padding: 8rpx 20rpx; border-radius: 999rpx; font-size: 22rpx; color: #5f6880; background: #f4f6fb; }
.chip.active { color: #3154ff; background: #e8edff; font-weight: 600; }
.result-head { display: flex; justify-content: space-between; font-size: 23rpx; color: #6f7892; margin: 20rpx 4rpx 14rpx; }
.result-sub { color: #9aa2b8; }
.school-list { display: flex; flex-direction: column; gap: 14rpx; }
.school-card { display: flex; align-items: center; gap: 16rpx; padding: 18rpx; border-radius: 18rpx; background: #fff; box-shadow: 0 8rpx 20rpx rgba(37, 56, 120, 0.07); }
.school-logo { width: 84rpx; height: 84rpx; border-radius: 50%; background: #f4f7ff; }
.school-main { flex: 1; }
.card-top { display: flex; align-items: center; justify-content: space-between; gap: 12rpx; }
.school-name { flex: 1; font-size: 28rpx; font-weight: 600; color: #1e2536; }
.hotness { flex-shrink: 0; padding: 6rpx 12rpx; border-radius: 999rpx; background: #fff2eb; color: #ff7a45; font-size: 22rpx; display: inline-flex; align-items: center; gap: 4rpx; }
.tag-wrap { margin-top: 12rpx; display: flex; flex-wrap: wrap; gap: 10rpx; }
.tag { padding: 4rpx 12rpx; border-radius: 10rpx; background: #f1f4ff; color: #50607f; font-size: 20rpx; }
.empty { margin-top: 100rpx; text-align: center; color: #97a0b8; font-size: 24rpx; }
</style>
