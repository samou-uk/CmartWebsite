'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'en' | 'zh'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.recipes': 'Recipes',
    'nav.location': 'How to Find Us',
    'nav.contact': 'Contact',
    'nav.games': 'Games',
    
    // Homepage
    'home.hero.slogan': 'A Contented Mind Is a Perpetual Feast',
    'home.hero.exploreRecipes': 'Explore Recipes',
    'home.hero.visitStore': 'Visit Store',
    'home.gallery.title': 'Visit Our Store',
    'home.gallery.description': 'Experience the vibrant atmosphere and authentic products at Cmart',
    'home.featuredRecipes.title': 'Featured Recipes',
    'home.featuredRecipes.description': 'Discover authentic Asian recipes using ingredients from Cmart',
    'home.featuredRecipes.viewAll': 'View All Recipes',
    'home.exploreMore.title': 'Explore More',
    'home.exploreMore.about': 'About Us',
    'home.exploreMore.aboutDesc': 'Learn more about our story and commitment to quality',
    'home.exploreMore.recipes': 'Recipes',
    'home.exploreMore.recipesDesc': 'Discover authentic Asian recipes and cooking inspiration',
    'home.exploreMore.findUs': 'Find Us',
    'home.exploreMore.findUsDesc': 'Visit our store in Earley, Reading',
    'home.exploreMore.contact': 'Contact Us',
    'home.exploreMore.contactDesc': 'Get in touch with our team',
    'home.exploreMore.learnMore': 'Learn More',
    'home.exploreMore.viewRecipes': 'View Recipes',
    'home.exploreMore.getDirections': 'Get Directions',
    'home.exploreMore.sendMessage': 'Send Message',
    'home.exploreMore.games': 'Games',
    'home.exploreMore.gamesDesc': 'Test your knowledge with our recipe builder game',
    'home.exploreMore.playNow': 'Play Now',
    
    // Footer
    'footer.description': 'Your trusted source for authentic oriental groceries in Earley, Reading. Quality products, exceptional service.',
    'footer.quickLinks': 'Quick Links',
    'footer.storeInfo': 'Store Information',
    'footer.openingHours': 'Opening Hours',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Use',
    
    // Recipes
    'recipes.hero.badge': 'Recipes',
    'recipes.hero.title': 'Explore Recipes',
    'recipes.hero.description': 'Discover authentic Asian recipes using ingredients from Cmart',
    'recipes.filters.search': 'Search recipes...',
    'recipes.filters.cuisine': 'Cuisine Type',
    'recipes.filters.difficulty': 'Difficulty Level',
    'recipes.filters.allergies': 'Exclude Allergies',
    'recipes.filters.clear': 'Clear',
    'recipes.filters.clearAll': 'Clear All Filters',
    'recipes.results.found': 'recipe found',
    'recipes.results.foundPlural': 'recipes found',
    'recipes.empty.title': 'No recipes found',
    'recipes.empty.description': 'Try adjusting your filters or search terms',
    'recipes.card.viewRecipe': 'View Recipe',
    'recipes.categories.all': 'All Cuisines',
    'recipes.categories.chinese': 'Chinese',
    'recipes.categories.japanese': 'Japanese',
    'recipes.categories.korean': 'Korean',
    'recipes.categories.thai': 'Thai',
    'recipes.categories.vietnamese': 'Vietnamese',
    'recipes.categories.indian': 'Indian',
    'recipes.difficulty.all': 'All Levels',
    'recipes.difficulty.easy': 'Easy',
    'recipes.difficulty.medium': 'Medium',
    'recipes.difficulty.hard': 'Hard',
    'recipes.filters.title': 'Filters',
    'recipes.filters.searchLabel': 'Search',
    'recipes.allergies.gluten': 'Gluten',
    'recipes.allergies.dairy': 'Dairy',
    'recipes.allergies.nuts': 'Nuts',
    'recipes.allergies.shellfish': 'Shellfish',
    'recipes.allergies.eggs': 'Eggs',
    'recipes.allergies.soy': 'Soy',
    'recipes.allergies.fish': 'Fish',
    
    // Location
    'location.hero.title': 'How to Find Us',
    'location.hero.description': 'Located in the ASDA Mall, Lower Earley, we\'re easily accessible by bus or car and ready to welcome you.',
    'location.address.title': 'Our Address',
    'location.hours.title': 'Opening Hours',
    'location.hours.description': 'We\'re open throughout the week for your convenience',
    'location.bus.title': 'By Bus',
    'location.bus.routes': 'Bus Routes',
    'location.bus.walking': 'Walking Distance',
    'location.bus.stop': 'Bus stop is located near the ASDA Mall entrance',
    'location.car.title': 'By Car',
    'location.car.parking': 'Parking',
    'location.car.location': 'Location',
    'location.car.access': 'Easy access from major roads',
    
    // Contact
    'contact.hero.title': 'Contact Us',
    'contact.hero.description': 'Have a question or want to know more? We\'d love to hear from you.',
    'contact.form.title': 'Send Us a Message',
    'contact.form.description': 'We typically respond within 24 hours',
    'contact.card.visit': 'Visit Us',
    'contact.card.visitDesc': 'Come see us in store',
    'contact.card.hours': 'Store Hours',
    'contact.card.response': 'Quick Response',
    'contact.card.responseDesc': 'We\'ll get back to you soon',
    
    // Privacy Policy
    'privacy.title': 'Privacy Policy',
    'privacy.lastUpdated': 'Last Updated',
    'privacy.section1.title': 'Introduction',
    'privacy.section1.content': 'Cmart Oriental Ltd. ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.',
    'privacy.section2.title': 'Information We Collect',
    'privacy.section2.content': 'We may collect information about you in a variety of ways. The information we may collect includes:',
    'privacy.section2.item1': 'Personal data such as your name and email address when you contact us',
    'privacy.section2.item2': 'Usage data such as your IP address, browser type, and pages visited',
    'privacy.section2.item3': 'Cookies and tracking technologies to enhance your experience',
    'privacy.section2.item4': 'Any other information you voluntarily provide to us',
    'privacy.section3.title': 'How We Use Your Information',
    'privacy.section3.content': 'We use the information we collect to respond to your inquiries, improve our website, and provide you with relevant information about our products and services.',
    'privacy.section4.title': 'Data Security',
    'privacy.section4.content': 'We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.',
    'privacy.section5.title': 'Third-Party Services',
    'privacy.section5.content': 'Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites.',
    'privacy.section6.title': 'Contact Us',
    'privacy.section6.content': 'If you have any questions about this Privacy Policy, please contact us through our contact form.',
    'privacy.contact': 'For inquiries, please visit our Contact page.',
    
    // Terms of Use
    'terms.title': 'Terms of Use',
    'terms.lastUpdated': 'Last Updated',
    'terms.section1.title': 'Acceptance of Terms',
    'terms.section1.content': 'By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use this website.',
    'terms.section2.title': 'Use License',
    'terms.section2.content': 'Permission is granted to temporarily download one copy of the materials on Cmart\'s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.',
    'terms.section3.title': 'Disclaimer',
    'terms.section3.content': 'The materials on Cmart\'s website are provided on an "as is" basis. Cmart makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.',
    'terms.section4.title': 'Limitations',
    'terms.section4.content': 'In no event shall Cmart or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit) arising out of the use or inability to use the materials on Cmart\'s website.',
    'terms.section5.title': 'Accuracy of Materials',
    'terms.section5.content': 'The materials appearing on Cmart\'s website could include technical, typographical, or photographic errors. Cmart does not warrant that any of the materials on its website are accurate, complete, or current.',
    'terms.section6.title': 'Links',
    'terms.section6.content': 'Cmart has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Cmart.',
    'terms.section7.title': 'Modifications',
    'terms.section7.content': 'Cmart may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.',
    'terms.contact': 'For questions about these Terms of Use, please contact us through our Contact page.',
    
    // About
    'about.hero.title': 'About Us',
    'about.hero.badge': 'Our Story',
    'about.hero.description': 'Welcome to Cmart, where our journey began in the heart of Reading back in 2013',
    'about.content.paragraph1': 'Welcome to Cmart, where our journey began in the heart of Reading back in 2013. It all started with a simple yet powerful idea: to create more than just a store, but a place where people could come together, share moments over delicious Asian cuisine, and truly feel at home. From those modest beginnings, we\'ve experienced remarkable growth, fueled by the unwavering support of our customers and the tireless dedication of our team.',
    'about.content.paragraph2': 'As we expand our reach beyond Reading, our core values remain unchanged. Quality and community are at the forefront of everything we do. Every product on our shelves is carefully handpicked, ensuring that only the finest and freshest items make it to our customers\' baskets. We take pride in sourcing directly from suppliers across the Far East, forging strong partnerships built on trust and integrity. This direct relationship allows us to offer an authentic selection of ingredients and products that capture the essence of Asian cuisine.',
    'about.content.paragraph3': 'Just like in our early days in Reading, we are committed to fostering an environment where everyone feels welcomed and valued. Our aisles are not just filled with groceries; they\'re filled with stories, connections, and a sense of belonging. Whether you\'re a regular or a newcomer, you\'re not just a shopper—you\'re a part of our Cmart family.',
    'about.content.paragraph4': 'As we continue to grow, we remain dedicated to our founding principles: providing top-quality products, fostering a sense of community, and serving our customers with warmth and care. Thank you for being a part of our journey, and we look forward to continuing to serve you, wherever you are.',
    'about.storeInfo.title': 'Store Information',
    'about.storeInfo.address': 'Address',
    'about.storeInfo.hours': 'Opening Hours',
    'about.storeInfo.parking': 'Parking',
    'about.storeInfo.parkingDesc': 'Convenient parking available nearby',
    
    // Games
    'games.back': 'Back to Home',
    'games.score': 'Score',
    'games.time': 'Time',
    'games.streak': 'Streak',
    'games.highScore': 'High Score',
    'games.start': 'Start Game',
    'games.playAgain': 'Play Again',
    'games.gameOver': 'Game Over!',
    'games.points': 'Points',
    'games.correct': 'Correct',
    'games.wrong': 'Wrong',
    'games.newHighScore': 'New High Score!',
    'games.recipeBuilder.title': 'Recipe Builder Challenge',
    'games.recipeBuilder.description': 'Match ingredients to recipes and score points!',
    'games.recipeBuilder.instructions': 'How to Play',
    'games.recipeBuilder.rule1': 'Select the correct ingredients for each recipe',
    'games.recipeBuilder.rule2': 'Get +10 points for each correct ingredient',
    'games.recipeBuilder.rule3': 'Get +20 bonus for every 3 correct in a row (streak)',
    'games.recipeBuilder.rule4': 'Get +50 bonus for completing a recipe perfectly',
    'games.recipeBuilder.selectIngredients': 'Select the correct ingredients:',
    'games.recipeBuilder.availableIngredients': 'Available Ingredients',
    
    // Location - additional keys
    'location.hero.badge': 'Directions',
    'location.map.title': 'Find Us on the Map',
    'location.address.description': 'Located within the ASDA Mall for convenient shopping',
    'location.transport.title': 'How to Get Here',
    'location.transport.description': 'Choose the best way to reach us',
    'location.bus.routesLabel': 'Bus Routes',
    'location.bus.stopDesc': 'Get off at Lower Earley stop',
    'location.bus.walkingLabel': 'Walking Distance',
    'location.bus.walkingTime': '2-3 minutes',
    'location.car.parkingLabel': 'Parking',
    'location.car.parkingDesc': 'Free parking available for customers',
    'location.car.locationLabel': 'Location',
    'location.car.locationDesc': 'Store is within the ASDA Mall',
    'location.days.monThu': 'Monday - Thursday',
    'location.days.friday': 'Friday',
    'location.days.saturday': 'Saturday',
    'location.days.sunday': 'Sunday',
  },
  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.about': '关于我们',
    'nav.recipes': '食谱',
    'nav.location': '如何找到我们',
    'nav.contact': '联系我们',
    'nav.games': '游戏',
    
    // Homepage
    'home.hero.slogan': '知足常乐',
    'home.hero.exploreRecipes': '探索食谱',
    'home.hero.visitStore': '访问商店',
    'home.gallery.title': '访问我们的商店',
    'home.gallery.description': '体验Cmart充满活力的氛围和正宗产品',
    'home.featuredRecipes.title': '精选食谱',
    'home.featuredRecipes.description': '发现使用Cmart食材的正宗亚洲食谱',
    'home.featuredRecipes.viewAll': '查看所有食谱',
    'home.exploreMore.title': '了解更多',
    'home.exploreMore.about': '关于我们',
    'home.exploreMore.aboutDesc': '了解更多关于我们的故事和对质量的承诺',
    'home.exploreMore.recipes': '食谱',
    'home.exploreMore.recipesDesc': '发现正宗亚洲食谱和烹饪灵感',
    'home.exploreMore.findUs': '找到我们',
    'home.exploreMore.findUsDesc': '访问我们在Earley, Reading的商店',
    'home.exploreMore.contact': '联系我们',
    'home.exploreMore.contactDesc': '与我们的团队取得联系',
    'home.exploreMore.learnMore': '了解更多',
    'home.exploreMore.viewRecipes': '查看食谱',
    'home.exploreMore.getDirections': '获取路线',
    'home.exploreMore.sendMessage': '发送消息',
    'home.exploreMore.games': '游戏',
    'home.exploreMore.gamesDesc': '通过我们的食谱构建游戏测试您的知识',
    'home.exploreMore.playNow': '立即游戏',
    
    // Footer
    'footer.description': '您在Earley, Reading值得信赖的正宗东方杂货来源。优质产品，卓越服务。',
    'footer.quickLinks': '快速链接',
    'footer.storeInfo': '商店信息',
    'footer.openingHours': '营业时间',
    'footer.privacy': '隐私政策',
    'footer.terms': '使用条款',
    
    // Recipes
    'recipes.hero.badge': '食谱',
    'recipes.hero.title': '探索食谱',
    'recipes.hero.description': '发现使用Cmart食材的正宗亚洲食谱',
    'recipes.filters.search': '搜索食谱...',
    'recipes.filters.cuisine': '菜系类型',
    'recipes.filters.difficulty': '难度级别',
    'recipes.filters.allergies': '排除过敏原',
    'recipes.filters.clear': '清除',
    'recipes.filters.clearAll': '清除所有筛选',
    'recipes.results.found': '个食谱',
    'recipes.results.foundPlural': '个食谱',
    'recipes.empty.title': '未找到食谱',
    'recipes.empty.description': '尝试调整您的筛选条件或搜索词',
    'recipes.card.viewRecipe': '查看食谱',
    'recipes.categories.all': '所有菜系',
    'recipes.categories.chinese': '中式',
    'recipes.categories.japanese': '日式',
    'recipes.categories.korean': '韩式',
    'recipes.categories.thai': '泰式',
    'recipes.categories.vietnamese': '越式',
    'recipes.categories.indian': '印式',
    'recipes.difficulty.all': '所有级别',
    'recipes.difficulty.easy': '简单',
    'recipes.difficulty.medium': '中等',
    'recipes.difficulty.hard': '困难',
    'recipes.filters.title': '筛选',
    'recipes.filters.searchLabel': '搜索',
    'recipes.allergies.gluten': '麸质',
    'recipes.allergies.dairy': '乳制品',
    'recipes.allergies.nuts': '坚果',
    'recipes.allergies.shellfish': '贝类',
    'recipes.allergies.eggs': '鸡蛋',
    'recipes.allergies.soy': '大豆',
    'recipes.allergies.fish': '鱼类',
    
    // Location
    'location.hero.title': '如何找到我们',
    'location.hero.description': '位于ASDA购物中心，Lower Earley，我们可通过巴士或汽车轻松到达，随时欢迎您的到来。',
    'location.address.title': '我们的地址',
    'location.hours.title': '营业时间',
    'location.hours.description': '我们整周营业，方便您的购物',
    'location.bus.title': '乘巴士',
    'location.bus.routes': '巴士路线',
    'location.bus.walking': '步行距离',
    'location.bus.stop': '巴士站位于ASDA购物中心入口附近',
    'location.car.title': '开车',
    'location.car.parking': '停车',
    'location.car.location': '位置',
    'location.car.access': '从主要道路轻松到达',
    
    // Contact
    'contact.hero.title': '联系我们',
    'contact.hero.description': '有问题或想了解更多？我们很乐意听到您的消息。',
    'contact.form.title': '给我们留言',
    'contact.form.description': '我们通常在24小时内回复',
    'contact.card.visit': '访问我们',
    'contact.card.visitDesc': '来店里看看我们',
    'contact.card.hours': '营业时间',
    'contact.card.response': '快速回复',
    'contact.card.responseDesc': '我们会尽快回复您',
    
    // Privacy Policy
    'privacy.title': '隐私政策',
    'privacy.lastUpdated': '最后更新',
    'privacy.section1.title': '介绍',
    'privacy.section1.content': 'Cmart Oriental Ltd.（"我们"、"我们的"或"本公司"）致力于保护您的隐私。本隐私政策说明当您访问我们的网站时，我们如何收集、使用、披露和保护您的信息。',
    'privacy.section2.title': '我们收集的信息',
    'privacy.section2.content': '我们可能以多种方式收集有关您的信息。我们可能收集的信息包括：',
    'privacy.section2.item1': '个人数据，如您联系我们时的姓名和电子邮件地址',
    'privacy.section2.item2': '使用数据，如您的IP地址、浏览器类型和访问的页面',
    'privacy.section2.item3': 'Cookie和跟踪技术，以增强您的体验',
    'privacy.section2.item4': '您自愿向我们提供的任何其他信息',
    'privacy.section3.title': '我们如何使用您的信息',
    'privacy.section3.content': '我们使用收集的信息来回复您的询问、改进我们的网站，并为您提供有关我们产品和服务的相关信息。',
    'privacy.section4.title': '数据安全',
    'privacy.section4.content': '我们实施适当的技术和组织措施来保护您的个人信息。但是，通过互联网传输的任何方法都不是100%安全的。',
    'privacy.section5.title': '第三方服务',
    'privacy.section5.content': '我们的网站可能包含指向第三方网站的链接。我们不对这些外部网站的隐私做法负责。',
    'privacy.section6.title': '联系我们',
    'privacy.section6.content': '如果您对本隐私政策有任何疑问，请通过我们的联系表与我们联系。',
    'privacy.contact': '如有疑问，请访问我们的联系页面。',
    
    // Terms of Use
    'terms.title': '使用条款',
    'terms.lastUpdated': '最后更新',
    'terms.section1.title': '接受条款',
    'terms.section1.content': '通过访问和使用本网站，您接受并同意受本协议条款和规定的约束。如果您不同意这些条款，请不要使用本网站。',
    'terms.section2.title': '使用许可',
    'terms.section2.content': '允许临时下载Cmart网站上材料的一份副本，仅供个人、非商业临时查看。这是许可的授予，不是所有权的转让。',
    'terms.section3.title': '免责声明',
    'terms.section3.content': 'Cmart网站上的材料按"原样"提供。Cmart不作任何明示或暗示的保证，并特此否认和否定所有其他保证。',
    'terms.section4.title': '限制',
    'terms.section4.content': '在任何情况下，Cmart或其供应商均不对因使用或无法使用Cmart网站上的材料而产生的任何损害（包括但不限于数据或利润损失）承担责任。',
    'terms.section5.title': '材料的准确性',
    'terms.section5.content': '出现在Cmart网站上的材料可能包括技术、排版或摄影错误。Cmart不保证其网站上的任何材料都是准确、完整或最新的。',
    'terms.section6.title': '链接',
    'terms.section6.content': 'Cmart尚未审查链接到其网站的所有网站，不对任何此类链接网站的内容负责。包含任何链接并不意味着Cmart的认可。',
    'terms.section7.title': '修改',
    'terms.section7.content': 'Cmart可随时修改其网站的服务条款，恕不另行通知。通过使用本网站，您同意受这些服务条款的当前版本约束。',
    'terms.contact': '如有关于这些使用条款的问题，请通过我们的联系页面与我们联系。',
    
    // About
    'about.hero.title': '关于我们',
    'about.hero.badge': '我们的故事',
    'about.hero.description': '欢迎来到Cmart，我们的旅程始于2013年雷丁市中心',
    'about.content.paragraph1': '欢迎来到Cmart，我们的旅程始于2013年雷丁市中心。一切都始于一个简单而强大的想法：不仅仅是创建一个商店，而是一个人们可以聚在一起、分享美味亚洲美食时刻、真正感到宾至如归的地方。从那些谦逊的开始，我们经历了显著的增长，这得益于客户坚定不移的支持和团队不懈的奉献。',
    'about.content.paragraph2': '随着我们将业务扩展到雷丁以外，我们的核心价值观保持不变。质量和社区是我们所做一切的核心。我们货架上的每种产品都经过精心挑选，确保只有最优质、最新鲜的商品才能进入客户的购物篮。我们为直接从远东供应商采购而感到自豪，建立了基于信任和诚信的强大合作伙伴关系。这种直接关系使我们能够提供真正体现亚洲美食精髓的食材和产品。',
    'about.content.paragraph3': '就像我们在雷丁的早期一样，我们致力于营造一个让每个人都感到受欢迎和受重视的环境。我们的过道不仅充满了杂货；它们充满了故事、联系和归属感。无论您是常客还是新来者，您不仅仅是购物者——您是我们Cmart家庭的一部分。',
    'about.content.paragraph4': '随着我们继续成长，我们仍然致力于我们的创始原则：提供顶级产品、培养社区意识，并以温暖和关怀为客户服务。感谢您成为我们旅程的一部分，我们期待继续为您服务，无论您在哪里。',
    'about.storeInfo.title': '商店信息',
    'about.storeInfo.address': '地址',
    'about.storeInfo.hours': '营业时间',
    'about.storeInfo.parking': '停车',
    'about.storeInfo.parkingDesc': '附近有便利的停车位',
    
    // Games
    'games.back': '返回首页',
    'games.score': '分数',
    'games.time': '时间',
    'games.streak': '连击',
    'games.highScore': '最高分',
    'games.start': '开始游戏',
    'games.playAgain': '再玩一次',
    'games.gameOver': '游戏结束！',
    'games.points': '分',
    'games.correct': '正确',
    'games.wrong': '错误',
    'games.newHighScore': '新最高分！',
    'games.recipeBuilder.title': '食谱构建挑战',
    'games.recipeBuilder.description': '匹配食材到食谱并得分！',
    'games.recipeBuilder.instructions': '游戏说明',
    'games.recipeBuilder.rule1': '为每个食谱选择正确的食材',
    'games.recipeBuilder.rule2': '每个正确食材获得+10分',
    'games.recipeBuilder.rule3': '每连续3个正确获得+20奖励（连击）',
    'games.recipeBuilder.rule4': '完美完成食谱获得+50奖励',
    'games.recipeBuilder.selectIngredients': '选择正确的食材：',
    'games.recipeBuilder.availableIngredients': '可用食材',
    
    // Location - additional keys
    'location.hero.badge': '路线',
    'location.map.title': '在地图上找到我们',
    'location.address.description': '位于ASDA购物中心内，购物便利',
    'location.transport.title': '如何到达',
    'location.transport.description': '选择最适合您的到达方式',
    'location.bus.routesLabel': '巴士路线',
    'location.bus.stopDesc': '在Lower Earley站下车',
    'location.bus.walkingLabel': '步行距离',
    'location.bus.walkingTime': '2-3分钟',
    'location.car.parkingLabel': '停车',
    'location.car.parkingDesc': '为客户提供免费停车',
    'location.car.locationLabel': '位置',
    'location.car.locationDesc': '商店位于ASDA购物中心内',
    'location.days.monThu': '周一至周四',
    'location.days.friday': '周五',
    'location.days.saturday': '周六',
    'location.days.sunday': '周日',
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'zh')) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

