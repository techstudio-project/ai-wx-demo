<template>
	<view class="question-bank-page">
		<view class="search-panel">
			<view class="search-row">
				<view class="search-box">
					<uni-icons type="search" size="16" color="#9aa3b7"></uni-icons>
					<input
						class="search-input"
						type="text"
						v-model="keyword"
						placeholder="搜索试题名称"
						placeholder-class="search-placeholder"
					/>
				</view>
				<button class="search-btn" @click="handleSearch">搜索</button>
			</view>

			<view class="quick-filter-row">
				<view class="drop-field" @click="toggleDropdown('school')">
					<text>{{ selectedSchoolLabel }}</text>
					<uni-icons :type="dropdownOpen.school ? 'top' : 'bottom'" size="12" color="#73809d"></uni-icons>
				</view>
				<view class="drop-field" @click="toggleDropdown('subject')">
					<text>{{ selectedSubjectLabel }}</text>
					<uni-icons :type="dropdownOpen.subject ? 'top' : 'bottom'" size="12" color="#73809d"></uni-icons>
				</view>
				<view class="drop-field" @click="toggleDropdown('grade')">
					<text>{{ selectedGradeLabel }}</text>
					<uni-icons :type="dropdownOpen.grade ? 'top' : 'bottom'" size="12" color="#73809d"></uni-icons>
				</view>
				<button class="filter-btn" @click="openFilterDrawer">
					<uni-icons type="settings" size="14" color="#3f67f3"></uni-icons>
					<text>筛选</text>
				</button>
			</view>

			<view v-if="dropdownOpen.school" class="dropdown-panel">
				<text class="dropdown-title">按学校筛选</text>
				<view class="option-grid">
					<text
						v-for="item in schools"
						:key="item"
						class="option-tag"
						:class="{ active: selectedSchoolLabel === item }"
						@click.stop="chooseOption('school', item)"
					>
						{{ item }}
					</text>
				</view>
			</view>

			<view v-if="dropdownOpen.subject" class="dropdown-panel">
				<text class="dropdown-title">按科目筛选</text>
				<view class="option-grid">
					<text
						v-for="item in subjects"
						:key="item"
						class="option-tag"
						:class="{ active: selectedSubjectLabel === item }"
						@click.stop="chooseOption('subject', item)"
					>
						{{ item }}
					</text>
				</view>
			</view>

			<view v-if="dropdownOpen.grade" class="dropdown-panel">
				<text class="dropdown-title">按年级筛选</text>
				<view class="option-grid">
					<text
						v-for="item in grades"
						:key="item"
						class="option-tag"
						:class="{ active: selectedGradeLabel === item }"
						@click.stop="chooseOption('grade', item)"
					>
						{{ item }}
					</text>
				</view>
			</view>
		</view>

		<view class="result-row">
			<text class="result-count">共 {{ filteredQuestions.length }} 套试题</text>
			<text class="result-sort">综合推荐</text>
		</view>

		<view class="question-list">
			<view class="question-card" v-for="item in filteredQuestions" :key="item.id">
				<image class="thumb" :src="item.thumb" mode="aspectFill"></image>
				<view class="card-main">
					<text class="name">{{ item.name }}</text>
					<text class="price">¥{{ item.price }}</text>
					<view class="stats-row">
						<view class="stats-left">
							<text class="views-text">{{ item.views }}人浏览</text>
							<view class="page-wrap">
								<text class="page-icon">📄</text>
								<text>{{ item.pages }}页</text>
							</view>
						</view>
						<text class="date">{{ item.date }}</text>
					</view>
				</view>
			</view>
		</view>

		<view v-if="!filteredQuestions.length" class="empty-box">
			<uni-icons type="search" size="24" color="#9aa3b7"></uni-icons>
			<text>暂无匹配试题，请调整筛选条件</text>
		</view>

		<uni-drawer ref="filterDrawer" mode="right" :width="300">
			<view class="drawer-body">
				<text class="drawer-title">全部筛选条件</text>
				<view class="drawer-group">
					<text class="group-label">试卷类型</text>
					<view class="tag-row">
						<text class="tag" v-for="item in paperTypes" :key="item">{{ item }}</text>
					</view>
				</view>
				<view class="drawer-group">
					<text class="group-label">题量区间</text>
					<view class="tag-row">
						<text class="tag" v-for="item in amountRanges" :key="item">{{ item }}</text>
					</view>
				</view>
				<view class="drawer-group">
					<text class="group-label">难度</text>
					<view class="tag-row">
						<text class="tag" v-for="item in levels" :key="item">{{ item }}</text>
					</view>
				</view>
				<button class="drawer-close" @click="closeFilterDrawer">完成</button>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
const questionData = [
	{ id: 1, name: '2025学年高一数学上册期中测试卷（含解析）', school: '全部学校', subject: '数学', grade: '高一', price: '9.90', date: '2026-03-12', views: 1286, pages: 12, thumb: '/static/c1.png' },
	{ id: 2, name: '某重点中学高二物理月考卷（力学综合）', school: '第一中学', subject: '物理', grade: '高二', price: '12.80', date: '2026-02-20', views: 934, pages: 10, thumb: '/static/c2.png' },
	{ id: 3, name: '2026届高三英语二轮复习阅读专项训练', school: '实验中学', subject: '英语', grade: '高三', price: '15.00', date: '2026-01-28', views: 2201, pages: 18, thumb: '/static/c3.png' },
	{ id: 4, name: '初二语文下册单元综合测试（含作文指导）', school: '育才中学', subject: '语文', grade: '初二', price: '7.50', date: '2026-03-05', views: 763, pages: 8, thumb: '/static/c4.png' },
	{ id: 5, name: '高三化学实验与反应原理专题卷', school: '第一中学', subject: '化学', grade: '高三', price: '11.60', date: '2026-03-30', views: 1468, pages: 14, thumb: '/static/c5.png' }
]

export default {
	data() {
		return {
			keyword: '',
			schools: ['全部学校', '第一中学', '实验中学', '育才中学'],
			subjects: ['全部科目', '语文', '数学', '英语', '物理', '化学'],
			grades: ['全部年级', '初二', '高一', '高二', '高三'],
			selectedSchoolLabel: '全部学校',
			selectedSubjectLabel: '全部科目',
			selectedGradeLabel: '全部年级',
			dropdownOpen: {
				school: false,
				subject: false,
				grade: false
			},
			questions: questionData,
			paperTypes: ['月考', '期中', '期末', '专题训练', '联考'],
			amountRanges: ['10题以下', '10-20题', '20-30题', '30题以上'],
			levels: ['基础', '提升', '冲刺']
		}
	},
	computed: {
		filteredQuestions() {
			return this.questions.filter((item) => {
				const matchKeyword = !this.keyword || item.name.toLowerCase().includes(this.keyword.toLowerCase())
				const matchSchool = this.selectedSchoolLabel === '全部学校' || item.school === this.selectedSchoolLabel
				const matchSubject = this.selectedSubjectLabel === '全部科目' || item.subject === this.selectedSubjectLabel
				const matchGrade = this.selectedGradeLabel === '全部年级' || item.grade === this.selectedGradeLabel
				return matchKeyword && matchSchool && matchSubject && matchGrade
			})
		}
	},
	methods: {
		handleSearch() {
			uni.showToast({ title: '已完成检索', icon: 'none' })
		},
		toggleDropdown(type) {
			const next = !this.dropdownOpen[type]
			this.dropdownOpen = { school: false, subject: false, grade: false }
			this.dropdownOpen[type] = next
		},
		chooseOption(type, value) {
			if (type === 'school') this.selectedSchoolLabel = value
			if (type === 'subject') this.selectedSubjectLabel = value
			if (type === 'grade') this.selectedGradeLabel = value
			this.dropdownOpen = { school: false, subject: false, grade: false }
		},
		openFilterDrawer() {
			this.$refs.filterDrawer.open()
		},
		closeFilterDrawer() {
			this.$refs.filterDrawer.close()
		}
	}
}
</script>

<style>
.question-bank-page { min-height: 100vh; box-sizing: border-box; padding: 24rpx; background: #f5f7fb; }
.search-panel { background: #fff; padding: 24rpx; border-radius: 20rpx; box-shadow: 0 8rpx 30rpx rgba(31, 36, 51, 0.06); }
.search-row { display: flex; gap: 16rpx; }
.search-box { flex: 1; display: flex; align-items: center; gap: 12rpx; background: #f6f8fe; border-radius: 14rpx; padding: 0 18rpx; height: 74rpx; }
.search-input { flex: 1; font-size: 26rpx; color: #1f2433; }
.search-placeholder { color: #9aa3b7; }
.search-btn { height: 74rpx; line-height: 74rpx; border-radius: 14rpx; background: linear-gradient(135deg, #4f7bff, #3f67f3); color: #fff; font-size: 26rpx; padding: 0 28rpx; }
.search-btn::after, .filter-btn::after, .drawer-close::after { border: none; }
.quick-filter-row { margin-top: 16rpx; display: grid; grid-template-columns: 1fr 1fr; gap: 12rpx; }
.drop-field { height: 64rpx; border-radius: 12rpx; background: #f6f8fe; padding: 0 18rpx; font-size: 24rpx; color: #47506b; display: flex; align-items: center; justify-content: space-between; }
.filter-btn { grid-column: span 2; display: flex; align-items: center; justify-content: center; gap: 8rpx; height: 64rpx; border-radius: 12rpx; font-size: 24rpx; color: #3f67f3; background: #eef3ff; }
.dropdown-panel { margin-top: 14rpx; border-radius: 12rpx; background: #f8faff; padding: 16rpx; border: 1px solid #e7ecfb; }
.dropdown-title { font-size: 23rpx; color: #5d6885; }
.option-grid { margin-top: 12rpx; display: flex; flex-wrap: wrap; gap: 10rpx; }
.option-tag { padding: 10rpx 18rpx; border-radius: 999rpx; background: #fff; color: #58627d; font-size: 22rpx; border: 1px solid #e6ebf7; }
.option-tag.active { color: #3f67f3; border-color: #cdd9ff; background: #eef3ff; }
.result-row { margin-top: 22rpx; display: flex; justify-content: space-between; align-items: center; padding: 0 4rpx; }
.result-count { font-size: 25rpx; font-weight: 600; color: #1f2433; }
.result-sort { font-size: 22rpx; color: #9aa3b7; }
.question-list { margin-top: 16rpx; display: flex; flex-direction: column; gap: 16rpx; }
.question-card { display: flex; gap: 16rpx; padding: 18rpx; border-radius: 18rpx; background: #ffffff; box-shadow: 0 10rpx 30rpx rgba(17, 33, 84, 0.06); }
.thumb { width: 172rpx; height: 172rpx; border-radius: 14rpx; background: #eef1f9; }
.card-main { flex: 1; display: flex; flex-direction: column; min-width: 0; }
.name { font-size: 28rpx; font-weight: 600; color: #1f2433; line-height: 1.45; }
.price { margin-top: 10rpx; font-size: 34rpx; font-weight: 700; color: #ff4c4f; }
.stats-row { margin-top: 12rpx; display: flex; align-items: center; justify-content: space-between; gap: 10rpx; }
.stats-left { display: flex; align-items: center; gap: 20rpx; color: #8f9bb2; font-size: 22rpx; }
.page-wrap { display: flex; align-items: center; gap: 6rpx; }
.page-icon { font-size: 20rpx; line-height: 1; }
.date { font-size: 22rpx; color: #78829a; }
.empty-box { margin-top: 80rpx; display: flex; flex-direction: column; align-items: center; gap: 10rpx; color: #8f9bb2; font-size: 24rpx; }
.drawer-body { height: 100%; padding: 34rpx 26rpx; background: #fff; box-sizing: border-box; }
.drawer-title { font-size: 30rpx; font-weight: 700; color: #1f2433; }
.drawer-group { margin-top: 28rpx; }
.group-label { font-size: 24rpx; color: #66708b; }
.tag-row { margin-top: 14rpx; display: flex; flex-wrap: wrap; gap: 12rpx; }
.tag { padding: 10rpx 16rpx; border-radius: 999rpx; background: #f4f6fb; font-size: 22rpx; color: #596583; }
.drawer-close { margin-top: 34rpx; height: 72rpx; line-height: 72rpx; border-radius: 12rpx; font-size: 26rpx; color: #fff; background: linear-gradient(135deg, #4f7bff, #3f67f3); }
</style>
