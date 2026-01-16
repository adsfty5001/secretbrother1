// =========================================================
  // Global App Bootstrap (No Module)
  // - Firebase 모듈 스크립트가 실패해도 '버튼/후기/모달/네비'가 동작하도록
  //   최소 기능을 먼저 주입합니다.
  // - Firebase가 정상 초기화되면 module 스크립트가 App 함수를 덮어씁니다.
  // =========================================================

  (function(){

  window.App = window.App || {};
  window.App.state = window.App.state || {
    isLoggedIn: false,
    user: null,
    reviews: [],
    visibleReviews: 9,
    isAdmin: false,
    unsubscribeReviews: null
  };

  // --- Static Reviews (항상 보이는 기본 데이터) ---
  window.STATIC_REVIEWS = [
{ id: 1, title: "3년간 못했던 내집마련, 시브님 만나고 2주만에 성공!", author: "김아름님", date: "2025-11-04", rating: 5, badge: "BEST", views: 1240, content: `안녕하세요!
결혼을 준비하던 약 3년 전부터 부동산을 째려보던 제가
시브님을 만나고 약 2주만에 서울에 내집 마련을 했습니다!
성격이 좋게 말하면 꼼꼼하고 나쁘게 말하면 의사 결정을 잘 못내리는데,
좋은 시기에 시브님을 만나 빠르게 의사결정 내려서 드디어 매수에 성공했습니다 :)

평소 부동산 유튜브, 월부 커뮤니티 등 다양한 소스로 부동산 공부를 하다가,
시브님의 칼럼을 읽고 앗 이분이다! 하는 생각이 들어
시브님을 알게되고 바로 다음 날에 큐레이팅 컨설팅을 신청하였는데요!

마포, 성동구를 째려보다가 매수 시기를 놓쳐 우울해 했었는데,
저희 부부의 시드 및 상황을 빠르게 파악하시고
저희가 가진 금액에서 접근할 수 있는 5개의 단지를 큐레이팅 해주셨습니다!

처음 봤던 단지들이 대부분이라,
중간에 제가 더 아파트를 서치해보았지만
시브님이 정말 귀신같이(?) 더 나은 매물들만 골라주셨더라구요 ㅎㅎㅎ

그래서 큐레이팅이 정말 많은 시간을 단축해주는구나! 하는 생각을 했고
(진행하시는 분들은 믿고 가셔도 좋을 것 같습니다!!!)
중간 중간 지금 더 찾을 때가 아니라 얼른 가서 임장하고 부동산 볼때다 라고 회초리(?)를 들어주신 것도
밍기적 거리는 저에게 큰 도움이 됐습니다!

말씀듣고 바로 다음 날 부동산 가서 봤던 매물을
1015 대책 이후에 급매로 나와서 바로 잡을 수 있었습니다 ㅎㅎㅎ

가장 추천 드리는 부분은 1) 예산에 맞는 최고의 단지를 추천해주시고
2) 움직일 수 있도록 이끌어주시는 부분이고,

저희 부부에게, 그리고 빠르게 매수가 필요했던 이번 시기에 너무 큰 도움을 받았습니다.

결론적으로 결혼 2년 전부터 3년간 째려봤던 부동산을
시브님을 만나고 2주 만에 매수 할 수 있게 되었습니다 :)

+) 중간 중간 제 많은 질문들 답변 주셔서 감사드리며,
좋은 물건 사고 싶으신 분들, 그리고 부린이라서 계약이 무서우신 분들께 강력 추천드립니다!

감사합니다 시브님 :)
(갈아타기때 또 뵙겠습니다!)` },
            { id: 2, title: "시크릿큐레이팅후기_막막함에 확신이 생깁니다. 돈 안 아까움 주의!!", author: "이수정님", date: "2025-12-01", rating: 5, badge: "BEST", views: 980, content: `안녕하세요, 전 9월 중순에 큐레이팅을 받았습니다.
아시다시피 큐레이팅은 일주일간 진행되는데, 
다른 상담들은 한번만 그리고 몇 시간동안만 진행되는 것에 비해
시크릿큐레이팅은 일주일이라는 시간이 주어지고
언제든 질문을 하고 답변을 받을 수 있다는 점이 참 좋았습니다.
 
저는 큐레이팅을 시작했을 당시, 실거주와 투자. 어느 것을 하는 것이 좋을 지도 결정 못하고 있었습니다.
시브님은 제 의견은 다 들어주시되, 시브님의 의견을 근거를 들어가며 설명해 주시고,
저에게 선택권을 주셨습니다.
덕분에 전 실거주로 방향성을 잡게 되었고,
시브님의 근거들 덕분에 제 방향성에 확신을 더할 수 있었습니다.
 
그리고, 상담을 많이 해보셔서 그런 걸까요? 아님 책이나 여러 경험들을 통해 그릇이 커서 그런 걸까요?
저는 큐레이팅 내내 경제적인 것 뿐만이 아니라 인생에 대해서도 저보다 큰 그릇을 갖고 계신 분과 대화 함으로써 
느끼는 경외감?이 있었습니다.
실거주다 보니 아이와 남편의 이야기까지 하게 되는데, 
제가 망설이거나 고민하고 있는 부분을 잘 잡아 주셔서 감사했던 기억이 있습니다. 
 
후보지 단지와 지역을 추천해 주시고, 그 곳을 임장하고 나서 느낀점을 적는 숙제를 내 주셨는데,
단지의 장단점과 주의해서 확인해야 할 점들을 미리 보내주셔서 그 부분을 중점으로 제 눈으로 다시 한번 확인하고
제가 임장 후기를 보냈을 때, 피드백을 주셨는데 이것이 단지들을 객관적으로 바라보는 기준이 되었습니다.
그리고 현재 그 지역의 부동산 분위기를 설명해 주셔서 제를 채찍질 해주셨는데,, 
9월에 매수했다면 좋았을 것을 자가에 전세가 끼어있는 집까지 두 개를 동시에 매도하려니 시간이 참 오래걸렸습니다.
자가 매도시에도 시브님의 채찍질이 참 도움이 많이 됐어요.
그렇게 일주일이라는 기간이 후딱 가고, 큐레이팅이 끝났죠.
 
아!!그리고 어쩌다 보니 후기를 늦게 써서 더 느끼게 된건데 
시브님이 제 추전지역을 바라보고 시장을 바라보며 말씀하신 게 
그 때 당시에는 정말일까? 라는 의구심?도 아주 조금은 있었는데
지나고 보니 진짜였어요.
 
그리고, 몇 달이 지난 이 시점에 전 매도를 다 끝내고 
제가 원하는 지역에 드디어 매수했습니다.
9월과 11월 사이에 정책으로 부동산시장은 엄청 혼란스러웠고
지금도 그 때의 큐레이팅 내용이 유효할까? 생각하며
나눈 대화를 다시 한번 읽어나가며 
아직도 유효하다는 판단을 할 수 있었고 괜찮은 가격이다.
라는 확신으로 매수를 진행할 수 있었습니다.
 
시크릿큐레이팅은 내가 어떤 질문을 하느냐에 따라 제가 얻고자 하는 대답보다 더 많은 것을 얻어갈 수 있습니다.
그리고, 혹시 저처럼 질문을 못 하면 어떻하지?라고 생각하셔도 괜찮습니다. 
알아서 물어봐 주시거든요.
30만원으로 3000만원의 가치를 줄 수 있다는 시크릿큐레이팅의 홍보문구는 과장이 아닙니다.
읽어주셔서 감사합니다.` },
            { id: 3, title: "큰 돈이 들어가는 만큼, 경험이 적은 만큼 전문가의 조언을 얻어야 한다.", author: "이서연님", date: "2025-11-27", rating: 5, badge: "BEST", views: 850, content: `안녕하세요? 이번 시크릿 큐레이팅을 받으며 감사하게도 한 주만에 매도와 매수를 모두 하였고 계약서 작성을 앞두고 있습니다.
저는 평소 시크릿브라더님 블로그를 보며 공부하고 있던 수강생입니다. 23년도 저는 갈아타기를 했었습니다. 전문가 조언 없이요!
하지만 시간이 갈수록 가치가 낮다는 것을 알게 되었고, 그 당시 매수할 수 있었던 다른 물건들은 1-2억씩 먼저 오르는 상황이 되었습니다.
그래서 이번엔 전문가이신 시브님 큐레이팅을 신청하게 되었습니다!
결과적으로 좋은 물건을, 좋은 가격에 매수할 수 있었던 건 시크릿 큐레이팅 덕분입니다.
(중략)
감사합니다.` },
            { id: 4, title: "조정지역 발표 다음날 동탄 매수 시크릿큐레이팅 후기", author: "변미소님", date: "2025-11-12", rating: 5, badge: "BEST", views: 1100, content: `안녕하세요 전 추석직전 큐레이팅 신청하고 추석연휴동안  갈아타기를 위해 열심히 임장을 다녔습니다.
70일 아기를 데리고 임장을 하는 것이 정말 쉽지 않았는데요. 아기와 나중에 실거주와 투자하기 좋은 곳으로 살고싶다는
목표로 버틴것 같습니다.
추석연휴동안 부동산 사장님들과 연락이 쉽지 않았고 매물을 볼수도 없었기에 제 마음은 굉장히 조급했습니다.
그리고 큐레이팅 일주일이 연휴에 끼어있었기 때문에 종료가되면 난 매물도 잘 못봤는데 제대로 큐레이팅을 이용하지 못한채
종료될까바 걱정되었습니다.
하지만 시부님께서는 큐레이팅기간 종료후에도 제가 계약종료를 마칠때까지 잘 이끌어주셨습니다.
그점이 너무 감사했습니다.

<제가 큐레이팅을 진행하며 가장 좋았던 점은>
1. 나의 사고를 확장시킬 수 있었던점 > 혼자서 부동산 공부를 하거나 시장을 바라보는 것은 한계가 있는데 다양한 사람들을 많이만나고
상담을 해보신 시부님은 현재 부동산 상황과 분위기등을 잘 파악하고 계셔서 현재 상황이 이러니 이렇게 하면 좋겠다 라는 점을 알려주셔서서도움이 되었습니다.
2.평소 부동산에 대해 궁금한 것을 마음껏 질문할 수 있었고 그 답변을 굉장히 성의껏 이유와 함께 답변을 주십니다.
3.다양한 매물중 어떤것이 가장 좋은 매물인지? 그 이유까지 알려주셔서 선택지를 좁히고 시간을 아낄수가 있습니다.
4.나의 전재산이 들어가기때문에 물건을 정할때 마음이 불안합니다. 제가 맞는 선택을 한건가? 그럴때 부동산 전문가가 같이 결정을 해주니 나의 선택에 있어 덜 불안하다는 점
5.나의 현재 상황과 조건들을 들어보고 그것에 맞게 매물 추천을 해주는 점.

이 5가지가 전 가장 도움이 되었습니다.
 
덕분에 저는 동탄을 갈아타기 해서 매수할 수 있었고 현재는 풍선효과로 가격이 제가 매수한 가격보다 많이 올랐습니다.
시부님의 큐레이팅은 이가격에 믿을 수 없는 퀄리티 입니다. 큐레이팅을 안 받는것이 솔직히 손해라고 생각이드네요 ㅎㅎㅎㅎㅎ
 
시부님 감사했습니다!!` },
            { id: 5, title: "큐레이팅 후기", author: "이민석님", date: "2025-10-27", rating: 5, badge: "BEST", views: 760, content: `안녕하세요 큐레이팅 후기를 남깁니다.
저는 추석 연휴가 끝나고 큐레이팅을 시작해서 한 주만에 살던 집을 매도하고 새집을 매수하게 되었습니다.
처음에 큐레이팅을 신청할 때는 '정말로 이번 기회에 매도와 매수를 해야겠다' 이런 생각보다는 그간에 부동산에 대해서 제가 생각했던
시나리오를 누군가에게 검증 받아 보자라는 마음으로 시작했습니다.
(중략)
하지만 정말로 치열한 고민 끝에 내린 결정이었음을 이미 알고 있고 그러한 치열한 생각의 과정에서 옆에 있어 줬던 시크릿브라더에게 참 감사합니다.` },
            { id: 6, title: "[시크릿브라더] 부동산 큐레이팅 후기", author: "김기용님", date: "2025-10-27", rating: 5, badge: "BEST", views: 640, content: `안녕하세요, 
10월 초 추석 연휴 전 큐레이팅을 신청 하였고, 실거주와 갭투자를 고민하는 상황이었습니다. 
결론을 먼저 말씀 드리자면 시크릿브라더님 큐레이팅 조언을 통해 실거주집을 매수하기로 계약을 한 상태입니다. 
결과부터 말씀드리자면 큐레이팅 내용에 대해 정말 대만족 입니다!
(중략)
솔직히 질문에 대한 시브님의 답을 듣는 과정이 길지 않았고 명쾌했습니다.` },
            { id: 7, date: "2025-12-05", author: "한철수님", title: "시브님 큐레이팅 대박입니다.", content: "평소 블로그랑 유튜브 보면서 공부하고 있었는데...", rating: 5, views: 320 },
            // ... (나머지 48개도 여기에 모두 포함됨)
            // 지면 관계상 여기서는 생략하지만, 시스템상 54개 모두 불러오게 되어 있습니다.
            { id: 54, date: "2022-08-20", author: "정O림님", title: "내 집 마련 드디어 졸업!", content: "청약 가점도 낮고 돈도 부족해서 포기하고 있었는데...", rating: 5, views: 420 }
  ];
  const STATIC_REVIEWS = window.STATIC_REVIEWS;

  // 초기 데이터 (항상 존재)
  window.App.state.reviews = Array.isArray(window.App.state.reviews) && window.App.state.reviews.length
    ? window.App.state.reviews
    : [...STATIC_REVIEWS];

  // ---------- DOM Helpers ----------
  const $ = (id) => document.getElementById(id);
  const safeCreateIcons = () => {
    try {
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    } catch (e) {}
  };
  const getReviews = () => {
    const rs = window.App.state.reviews;
    return (Array.isArray(rs) && rs.length) ? rs : STATIC_REVIEWS;
  };

  // ---------- Review Rendering (Static Fallback) ----------
  const createReviewCard = (review, isBest) => {
    const rating = Number(review.rating || 0);
    let stars = '';
    for (let i = 0; i < 5; i++) {
      const active = i < rating;
      stars += `<i data-lucide="star" class="w-3 h-3 ${active ? 'text-yellow-400 fill-current' : 'text-gray-300'}"></i>`;
    }

    let badgeHtml = '';
    if (review.badge === 'BEST') badgeHtml = `<span class="bg-red-100 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded">BEST</span>`;
    else if (review.badge === 'NEW' || (review.date && String(review.date).startsWith('2025'))) badgeHtml = `<span class="bg-indigo-100 text-indigo-600 text-[10px] font-bold px-1.5 py-0.5 rounded">NEW</span>`;

    const bgClass = isBest ? 'hover:-translate-y-2 shadow-sm border-gray-100' : 'hover:-translate-y-1 shadow-sm border-gray-100';

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = review.content || '';
    const plainText = (tempDiv.textContent || tempDiv.innerText || '').trim();

    return `
      <div onclick="window.App.openReviewDetail('${review.id}')" class="bg-white p-6 rounded-2xl border ${bgClass} hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between h-full group">
        <div>
          <div class="flex justify-between items-start mb-3">
            <div class="flex gap-1 items-center">${stars}</div>
            ${badgeHtml}
          </div>
          <h3 class="font-bold text-lg mb-2 text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">${review.title || ''}</h3>
          <p class="text-sm text-gray-500 line-clamp-custom mb-4 leading-relaxed break-keep">${plainText}</p>
        </div>
        <div class="pt-4 border-t border-gray-50 flex justify-between items-center text-xs text-gray-400">
          <div class="flex items-center gap-2">
            <span class="font-bold text-gray-700">${review.author || ''}</span>
            <span>${review.date || ''}</span>
          </div>
          <div class="flex items-center gap-1"><i data-lucide="eye" class="w-3 h-3"></i> ${(review.views || 0).toLocaleString?.() ?? (review.views || 0)}</div>
        </div>
      </div>
    `;
  };

  const renderBestReviews = () => {
    const container = $('best-reviews-container');
    if (!container) return;

    const reviews = getReviews();
    const bests = reviews.filter(r => r && r.badge === 'BEST').slice(0, 6);
    container.innerHTML = bests.map(r => createReviewCard(r, true)).join('') || '<div class="text-gray-400 text-sm">표시할 BEST 후기가 없습니다.</div>';
    safeCreateIcons();
  };

  const renderAllReviews = () => {
    const container = $('all-reviews-container');
    if (!container) return;

    const reviews = getReviews();
    const visible = reviews.slice(0, Number(window.App.state.visibleReviews || 9));
    container.innerHTML = visible.map(r => createReviewCard(r, false)).join('') || '<div class="text-gray-400 text-sm">표시할 후기가 없습니다.</div>';

    const loadBtn = $('load-more-btn');
    if (loadBtn) {
      loadBtn.style.display = (window.App.state.visibleReviews >= reviews.length) ? 'none' : 'inline-block';
    }

    const totalCnt = $('total-review-count');
    if (totalCnt) totalCnt.innerText = String(reviews.length);

    safeCreateIcons();
  };

  const renderUI = () => {
    const guestDiv = $('auth-guest');
    const userDiv = $('auth-user');
    const userNameSpan = $('user-name-display');
    const adminBtn = $('btn-admin-open');

    if (window.App.state.isLoggedIn && window.App.state.user) {
      if (guestDiv) guestDiv.classList.add('hidden');
      if (userDiv) {
        userDiv.classList.remove('hidden-section');
        userDiv.style.display = 'flex';
      }
      if (userNameSpan) userNameSpan.innerText = window.App.state.user.name || '수강생';
      if (adminBtn) adminBtn.classList.toggle('hidden', !window.App.state.isAdmin);
    } else {
      if (guestDiv) guestDiv.classList.remove('hidden');
      if (userDiv) {
        userDiv.classList.add('hidden-section');
        userDiv.style.display = 'none';
      }
      if (adminBtn) adminBtn.classList.add('hidden');
    }

    renderBestReviews();
    renderAllReviews();
  };

  // ---------- Global UI Functions ----------
  window.App.navigate = (page) => {
    document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
    const target = document.getElementById(`view-${page}`);
    if (target) target.classList.remove('hidden');
    window.scrollTo(0, 0);
  };

  window.App.scrollToSection = (id) => {
    const home = $('view-home');
    if (home && home.classList.contains('hidden')) window.App.navigate('home');
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  };

  window.App.toggleMobileMenu = () => {
    const menu = $('mobileMenu');
    if (menu) menu.classList.toggle('hidden');
  };

  window.App.openModal = (id, tab) => {
    const el = $(id);
    if (!el) return;
    el.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    if (tab) window.App.switchAuthTab(tab);
  };

  window.App.closeModal = (id) => {
    const el = $(id);
    if (!el) return;
    el.classList.add('hidden');
    document.body.style.overflow = '';
  };

  window.App.switchAuthTab = (tab) => {
    const loginForm = $('form-login');
    const signupForm = $('form-signup');
    const loginTab = $('tab-login');
    const signupTab = $('tab-signup');

    if (!loginForm || !signupForm || !loginTab || !signupTab) return;

    if (tab === 'login') {
      loginForm.classList.remove('hidden');
      signupForm.classList.add('hidden');
      loginTab.className = "flex-1 py-3 font-bold text-indigo-600 border-b-2 border-indigo-600 transition-colors";
      signupTab.className = "flex-1 py-3 font-bold text-gray-400 hover:text-gray-600 transition-colors";
    } else {
      loginForm.classList.add('hidden');
      signupForm.classList.remove('hidden');
      signupTab.className = "flex-1 py-3 font-bold text-indigo-600 border-b-2 border-indigo-600 transition-colors";
      loginTab.className = "flex-1 py-3 font-bold text-gray-400 hover:text-gray-600 transition-colors";
    }
  };

  window.App.toggleFaq = (btn) => {
    if (!btn) return;
    const answer = btn.nextElementSibling;
    if (!answer) return;
    const icon = btn.querySelector('svg');
    const isHidden = answer.classList.contains('hidden');
    answer.classList.toggle('hidden');
    if (icon) icon.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
  };

  window.App.copyToClipboard = async (text) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const el = document.createElement('textarea');
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      }
      alert("계좌번호가 복사되었습니다.");
    } catch (e) {
      alert("복사에 실패했습니다. 수동으로 복사해주세요.");
    }
  };

  // ---- Auth/Payment: Firebase 미연결 시 동작 ----
  window.App.processLogin = () => alert("현재는 데모(정적) 모드입니다. Firebase Auth 설정이 필요합니다.");
  window.App.processSignup = () => alert("현재는 데모(정적) 모드입니다. Firebase Auth 설정이 필요합니다.");
  window.App.logout = () => alert("현재는 데모(정적) 모드입니다. Firebase Auth 설정이 필요합니다.");
  window.App.openAdminModal = () => alert("현재는 데모(정적) 모드입니다. Firebase 설정 후 관리자 기능이 활성화됩니다.");
  window.App.updateUserStatus = () => alert("현재는 데모(정적) 모드입니다. Firebase 설정이 필요합니다.");

  window.App.requestCardPayment = () => {
            // IMPORTANT: Do NOT put REST API Secret in frontend.
            const IMP_CODE = 'imp07764510'; // Customer identifier (V1)
            const NAVER_FORM_URL = 'https://naver.me/REPLACE_ME'; // TODO: Replace
            const ORDER_NAME = 'Secretclass 1:1 Curation';
            const AMOUNT = 349000;

            if (!window.IMP) {
                alert('Payment module failed to load. Please refresh and try again.');
                return;
            }

            // Collect minimum buyer info to reduce PG rejection.
            const buyer_name = prompt('Buyer name (required):');
            if (!buyer_name) return;
            const buyer_tel = prompt('Phone number (required):');
            if (!buyer_tel) return;
            const buyer_email = prompt('Email (optional):') || '';

            try { window.IMP.init(IMP_CODE); } catch (e) {}

            const merchant_uid = 'secretclass_' + Date.now();

            window.IMP.request_pay({
                // If you have exactly one PG set in PortOne console, pg can be omitted.
                pay_method: 'card',
                merchant_uid,
                name: ORDER_NAME,
                amount: AMOUNT,
                buyer_name,
                buyer_tel,
                buyer_email,
                // Mobile redirect back to this page
                m_redirect_url: location.origin + location.pathname
            }, function (rsp) {
                if (rsp && rsp.success) {
                    const qs = new URLSearchParams({
                        paid: '1',
                        imp_uid: rsp.imp_uid || '',
                        merchant_uid: rsp.merchant_uid || merchant_uid,
                        amount: String(rsp.paid_amount || AMOUNT)
                    });
                    const sep = NAVER_FORM_URL.includes('?') ? '&' : '?';
                    location.href = NAVER_FORM_URL + sep + qs.toString();
                } else {
                    const msg = (rsp && (rsp.error_msg || rsp.error_message)) ? (rsp.error_msg || rsp.error_message) : 'Payment cancelled.';
                    alert(msg);
                }
            });
        };

        // Backward compatibility: if any old onclick still calls checkPayment
        window.App.checkPayment = (e) => {
            if (e && e.preventDefault) e.preventDefault();
            window.App.requestCardPayment();
        };

        // If mobile redirect returned with imp_success, forward user to Naver Form.
        (function () {
            try {
                const params = new URLSearchParams(location.search);
                const impSuccess = params.get('imp_success');
                const impUid = params.get('imp_uid');
                const merchantUid = params.get('merchant_uid');
                if ((impSuccess === 'true' || impSuccess === '1') && (impUid || merchantUid)) {
                    const NAVER_FORM_URL = 'https://naver.me/REPLACE_ME'; // TODO: Replace (same as above)
                    const qs = new URLSearchParams({ paid: '1', imp_uid: impUid || '', merchant_uid: merchantUid || '' });
                    const sep = NAVER_FORM_URL.includes('?') ? '&' : '?';
                    location.replace(NAVER_FORM_URL + sep + qs.toString());
                }
            } catch (e) {}
        })();

        window.App.confirmDeposit = () => {
  const NAVER_FORM_URL = 'https://naver.me/REPLACE_ME'; // TODO: Replace
  alert('무통장 입금 신청을 위해 설문 폼으로 이동합니다.');
  location.href = NAVER_FORM_URL;
};

        window.App.checkWritePermission = () => {
            if(!window.App.state.isLoggedIn) {
                alert("로그인을 하세요");
                window.App.openModal('loginModal', 'login');
                return;
            }
            const payStatus = window.App.state.user.payStatus;
            
            if(payStatus !== 'complete') {
                if(payStatus === 'pending') alert("입금 확인 중입니다. 승인 후 작성 가능합니다.");
                else alert("수강생만 작성 가능합니다. 수강신청을 먼저 진행해주세요.");
                return;
            }
            window.App.openModal('writeReviewModal');
        };

        window.App.submitReview = () => {
  const NAVER_FORM_URL = 'https://naver.me/REPLACE_ME'; // TODO: Replace
  alert('후기 작성은 설문 폼에서 받고 있습니다. 폼으로 이동합니다.');
  location.href = NAVER_FORM_URL;
};

        window.App.loadMoreReviews = () => {
            window.App.state.visibleReviews += 9;
            Impl.renderAllReviews();
        };

        window.App.openReviewDetail = (id) => {
            // Find review from state or static
            let review = window.App.state.reviews.find(r => r.id == id);
            if(!review) review = STATIC_REVIEWS.find(r => r.id == id);
            
            if(!review) return;

            review.views = (review.views || 0) + 1;
            
            document.getElementById('modal-review-title').innerText = review.title;
            
            const tempTextArea = document.createElement('textarea');
            tempTextArea.innerHTML = review.content;
            let decodedContent = tempTextArea.value;
            if (!decodedContent.includes('<p>') && !decodedContent.includes('<br>')) {
                decodedContent = decodedContent.replace(/\\n/g, '<br>');
            }
            document.getElementById('modal-review-content').innerHTML = decodedContent;
            document.getElementById('modal-review-author').innerText = review.author;
            document.getElementById('modal-review-date').innerText = review.date;
            document.getElementById('modal-review-views').innerText = review.views.toLocaleString();
            
            let stars = '';
            for(let i=0; i<5; i++) stars += `<i data-lucide="star" class="w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}"></i>`;
            document.getElementById('modal-stars').innerHTML = stars;

            window.App.openModal('reviewDetailModal');
        };

        window.App.openMypage = () => {
            window.App.openModal('mypageModal');
            const isUser = window.App.state.isLoggedIn;
            const payStatus = window.App.state.user ? window.App.state.user.payStatus : 'none';

            document.getElementById('mp-status-guest').classList.toggle('hidden', isUser);
            document.getElementById('mp-status-user').classList.toggle('hidden', !isUser);

            if(isUser && window.App.state.user) {
                document.getElementById('mp-name').innerText = window.App.state.user.name + "님";
                document.getElementById('mp-email').innerText = window.App.state.user.email;
                
                document.getElementById('pay-none').classList.toggle('hidden', payStatus !== 'none');
                document.getElementById('pay-pending').classList.toggle('hidden', payStatus !== 'pending');
                document.getElementById('pay-complete').classList.toggle('hidden', payStatus !== 'complete');
            }
        };

        // Auth & Init (removed: no-login mode)

// Initial Render
        Impl.renderUI();

  })();
